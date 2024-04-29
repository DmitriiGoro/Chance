<script lang="ts">
  import { Currencies } from "./data/currencies";
  import { onMount } from "svelte";

  let from: number | string = 0;
  let to: number | string = 0;
  let fromCurrency: string = "RUB";
  let toCurrency: string = "USD";
  const rates: object = { conversion_rates: {} };
  let isDownloading: boolean = false;

  onMount(async () => {
    await fetchConversionRates(toCurrency);
  });

  async function fetchConversionRates(currency: string) {
    const url = `https://v6.exchangerate-api.com/v6/f763d3a3fca713780af23df5/latest/${currency}`;
    isDownloading = true;

    try {
      const responce = await fetch(url);

      const json = await responce.json();

      rates.conversion_rates = { ...json?.conversion_rates };
      console.log(rates);
    } catch (e) {
      console.log(e);
    }
    isDownloading = false;
  }

  function calculateTo() {
    const usdNumber =
      (1 / rates?.conversion_rates?.[fromCurrency]) * Number(from);

    to = (rates?.conversion_rates?.[toCurrency] * usdNumber).toFixed(2);
  }
  function calculateFrom() {
    const usdNumber = (1 / rates?.conversion_rates?.[toCurrency]) * Number(to);

    from = (rates?.conversion_rates?.[fromCurrency] * usdNumber).toFixed(2);
  }
</script>

<main>
  <div>
    <a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a>
    {#if !isDownloading}
      <div class="input_wrapper">
        <input
          placeholder="from"
          type="number"
          bind:value={from}
          on:input={calculateTo}
        />
        <input
          placeholder="to"
          type="number"
          bind:value={to}
          on:input={calculateFrom}
        />
      </div>
      <select
        on:change={(event) => {
          fromCurrency = event?.target?.value;
          to = 0;
          from = 0;
        }}
        >{#each Object.entries(Currencies) as [currencyCode, currencyName]}
          <option value={currencyCode} selected={currencyCode === fromCurrency}
            >{currencyName}</option
          >
        {/each}
      </select>
      <select
        on:change={(event) => {
          toCurrency = event?.target?.value;
          to = 0;
          from = 0;
        }}
        >{#each Object.entries(Currencies) as [currencyCode, currencyName]}
          <option value={currencyCode} selected={currencyCode === toCurrency}
            >{currencyName}</option
          >
        {/each}
      </select>
    {:else}
      <div>Currency conversion rates is fetching. Please wait for a while.</div>
    {/if}
  </div>
</main>

<style>
</style>
