<template>
    <header
        class="header top-0 left-0 z-40 flex w-full items-center bg-transparent">
        <div id="backgroundImage"><div class="main"></div></div>
        <div class="container">
          <div class="relative -mx-4 flex items-center justify-between">
            <div class="w-64 max-w-full px-4 xl:mr-12 text-center">
              <a
                href="/"
                class="header-logo block w-full"
              >
                <img
                  src="/images/logo/logo.png"
                  alt="xrpl.app logo"
                  width="140"
                  height="30"
                  class="w-full"
                />
                <h1 class="hidden text-md leading-tight text-gray">
                xrpl.app
                </h1>
              </a>
            </div>
            <div>
              <p class="mt-1 text-base font-medium !leading-relaxed text-body-color text-white dark:opacity-90">
              XRP Ledger Mainnet Validator
              </p>
              <div class="text-blue flex flex-col items-center justify-center">
              nHUWpuUAaL7d6BKgzU7ttADu9UbeFUSnxMh4wESSBpATascVDUUm
              </div>
            </div>
            <div class="flex w-full items-center justify-between">
              <div></div>
              <div class="flex items-center justify-end pr-16 lg:pr-0">
                <a
                  href="https://xrpl.app/.well-known/xrp-ledger.toml"
                  target="_blank"
                  class="rounded-md bg-black/20 py-4 px-8 text-base font-semibold text-black duration-300 ease-in-out hover:bg-black/30 bg-white/20 text-white hover:bg-white/30"
                >
                  TOML File
              </a>
              </div>
            </div>
          </div>
        </div>
      </header>
</template>
  
<script lang="ts">
  export default {
    name: 'Header',
    components: {
    },
  }
  </script>

<style scoped>
</style>
