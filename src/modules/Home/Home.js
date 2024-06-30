import { defineComponent, ref, reactive } from 'vue';
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import Chart from 'chart.js/auto';
import { XrplClient } from 'xrpl-client';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, RadialLinearScale, ArcElement } from "chart.js";
import { PolarArea } from "vue-chartjs";
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
const dexTxTypes = ["OfferCreate", "OfferCancel"];
const paymentTxTypes = ["Payment"];
const trustlineTxTypes = ["TrustSet"];
const escrowTxTypes = ["EscrowCreate", "EscrowCancel"];
const ammTxTypes = ["AMMBid", "AMMCreate", "AMMDeposit", "AMMDelete", "AMMVote", "AMMWithdraw"];
const nftTxTypes = ["NFTokenAcceptOffer", "NFTokenBurn", "NFTokenCancelOffer", "NFTokenCreateOffer", "NFTokenMint"];
export default defineComponent({
    name: 'Home',
    components: {
        PolarArea,
        DefaultLayout,
    },
    computed: {
        chartOptions() {
            return {
                animations: {
                    tension: {
                        duration: 1000,
                        easing: 'linear',
                        from: 1,
                        to: 0,
                        loop: true
                    }
                },
                plugins: {
                    legend: {
                        position: "bottom",
                        labels: {
                            color: "#2d6ccf"
                        }
                    }
                },
                scales: {
                    r: {
                        ticks: {
                            display: false
                        }
                    }
                }
            };
        },
        chartData() {
            return {
                labels: [
                    "DEX",
                    "Payments",
                    "Trustlines",
                    "Escrow",
                    "AMM",
                    "NFT",
                    "Other"
                ],
                datasets: [{
                        label: 'Ledger Transactions',
                        data: this.ledgerData.chart_data || [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        borderWidth: 0,
                        backgroundColor: [
                            "rgb(223,5,118,255)",
                            "rgb(76,182,177,255)",
                            "rgb(2100,148,164)",
                            "rgb(180,179,94)",
                            "rgb(164,75,140)",
                            "rgb(254,172,35,255)",
                            "rgb(91, 92, 94)"
                        ]
                    }]
            };
        }
    },
    methods: {
        extractChartData(transactions) {
            let dex = 0;
            let payments = 0;
            let trustlines = 0;
            let escrow = 0;
            let amm = 0;
            let nft = 0;
            let other = 0;
            let xrpPayments = 0;
            let tokenPayments = 0;
            const tempAccounts = [];
            for (let x = 0; x < transactions.length; x++) {
                const tx = transactions[x];
                const txType = tx.TransactionType;
                const acc = tx.Account;
                if (tempAccounts.indexOf(acc) < 0)
                    tempAccounts.push(acc);
                if (dexTxTypes.indexOf(txType) > -1) {
                    dex++;
                }
                else if (paymentTxTypes.indexOf(txType) > -1) {
                    if (tx.Amount.currency) {
                        tokenPayments++;
                    }
                    else {
                        xrpPayments++;
                    }
                    payments++;
                }
                else if (trustlineTxTypes.indexOf(txType) > -1) {
                    trustlines++;
                }
                else if (ammTxTypes.indexOf(txType) > -1) {
                    amm++;
                }
                else if (escrowTxTypes.indexOf(txType) > -1) {
                    escrow++;
                }
                else if (nftTxTypes.indexOf(txType) > -1) {
                    nft++;
                }
                else {
                    other++;
                }
            }
            return {
                numberOfAccounts: tempAccounts.length,
                xrpPayments,
                tokenPayments,
                chart: [dex, payments, trustlines, escrow, amm, nft, other]
            };
        }
    },
    async mounted() {
        const client = new XrplClient("wss://xrpl.app:6005");
        await client.ready();
        this.serverOnline = true;
        console.log("XRP CLient ready");
        const server = await client.send({
            "id": "serverInfo",
            "command": "server_info",
        });
        this.serverVersion = server.info.build_version;
        await client.send({
            "id": "subscribeToLedgerData",
            "command": "subscribe",
            "streams": ["ledger"]
        });
        client.on("ledger", async (ledger) => {
            const request = await client.send({
                id: "getLedgerData",
                command: "ledger",
                ledger_index: ledger.ledger_index,
                transactions: true,
                expand: true,
            });
            const ledger_data = request.ledger;
            const prevState = this.ledgerData;
            if (prevState.total_coins) {
                ledger_data["xrp_burned"] = (parseInt(prevState.total_coins) - ledger_data.total_coins) / 1_000_000;
            }
            const eData = this.extractChartData(ledger_data.transactions);
            ledger_data["token_payments"] = eData.tokenPayments;
            ledger_data["xrp_payments"] = eData.xrpPayments;
            ledger_data["number_of_accounts"] = eData.numberOfAccounts;
            ledger_data["chart_data"] = eData.chart;
            this.ledgerData = ledger_data;
            this.ledgerCount++;
        });
        client.on("online", () => {
            this.serverOnline = true;
        });
        client.on("offline", () => {
            this.serverOnline = false;
        });
    },
    data() {
        return {
            ledgerData: reactive({}),
        };
    },
    setup() {
        return {
            serverOnline: ref(false),
            serverVersion: ref(""),
            ledgerCount: ref(0)
        };
    },
});
