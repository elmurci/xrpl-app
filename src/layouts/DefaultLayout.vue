<template>
    <div id="app">
        <Header />
        <div class="w-full container mx-auto py-2">
            <div class="p-0 h-100">
                <router-view>
                    <slot />
                </router-view>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import Header from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";

    export default defineComponent({
        name: "DefaultLayout",
        components: {
            Header,
            Footer,
        }
    });
</script>
