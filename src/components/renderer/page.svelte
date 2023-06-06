<script lang="ts">
  import type { Page } from "../../types";

  import ComponentRenderer from "./componentRenderer.svelte";
  export let page: Page;
  $: page;

</script>

{#if page.loaded}
  <div class="page" style="background-color:{page.background.fieldValue}">
    {#each Object.keys(page.components) as id}
      <ComponentRenderer component={page.components[id]} />
    {/each}
  </div>
{/if}

<style lang="scss">
  .page {
    position: relative;
    width: inherit;
    height: inherit;
    overflow: hidden;
    border-radius: 25px;
  }
</style>
