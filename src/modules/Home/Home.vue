<default-layout>
    <div class="flex">
        <div class="container">
          <div class="flex flex-wrap">
            <div class="w-full pt-8">
                <div class="container">
                  <div class="flex text-white justify-center" :class="serverReady && ledgerCount > 1 ? 'show' : 'hidden'">
                    <div class="flex-none w-1/3">
                        <div class="grid place-items-center mt-6">
                            <div class="font-semibold text-xl tracking-tight">Version</div>
                            <div class="font-normal text-sm text-blue">{{ serverVersion }}</div>
                        </div>
                        <div class="grid place-items-center mt-12">
                            <div class="font-semibold text-lg text-yellow">Validated Ledger</div>
                            <div class="font-semibold text-5xl tracking-tight">{{
                              new Intl.NumberFormat('en-GB').format(
                                parseInt(ledgerData.ledger_index),
                              ) }}</div>
                            <div class="font-normal text-sm text-blue">it took {{ ledgerData.close_time - ledgerData.parent_close_time }} seconds to close</div>
                        </div>
                        <div class="grid place-items-center mt-6">
                            <div class="font-semibold text-4xl tracking-tight">{{ ledgerData.transactions && ledgerData.transactions.length }}</div>
                            <div class="font-normal text-sm text-blue">transactions from <span class="text-white">{{ ledgerData.number_of_accounts }}</span> accounts</div>
                        </div>
                        <div class="grid place-items-center mt-6">
                            <div class="font-semibold text-3xl tracking-tight">{{ ledgerData.xrp_burned }}</div>
                            <div class="font-normal text-sm text-blue">XRP Burned</div>
                        </div>
                        <div class="grid place-items-center mt-6">
                            <div class="font-semibold text-3xl tracking-tight">{{ ledgerData.xrp_payments }}</div>
                            <div class="font-normal text-sm text-blue">XRP Payments</div>
                        </div>
                        <div class="grid place-items-center mt-6">
                            <div class="font-semibold text-3xl tracking-tight">{{ ledgerData.token_payments }}</div>
                            <div class="font-normal text-sm text-blue">Token payments</div>
                        </div>
                    </div>
                    <div class="w-2/3 justify-center">
                      <div class="grid place-items-center">
                            <PolarArea id="ledgerTxs" :data="chartData" :options="chartOptions" :style="{ height: '600px' }"></PolarArea>
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-center text-green mt-16" v-if="serverReady && !serverError && ledgerCount < 2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span class="ml-6">Connected to server</span>
                  </div>
                  <div class="flex justify-center text-yellow mt-16" v-if="!serverError && !serverReady">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span class="ml-6">Connecting to server</span>
                  </div>
                  <div class="flex justify-center text-red mt-16" v-if="serverError">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span class="ml-6">Error connecting to server</span>
                  </div>
                  <div class="flex justify-center text-yellow mt-16" v-if="serverReady && ledgerCount < 2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span class="ml-6">Subscribing to ledger information...</span>
                  </div>
                </div>
            </div>
          </div>
        </div>
    </div>
</default-layout>