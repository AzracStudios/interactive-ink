<script lang="ts">
  import { get } from "svelte/store";
  import { Mode, PageIndex } from "../../globalStore";
  import type { Page } from "../../types";

  import ComponentRenderer from "./componentRenderer.svelte";
  export let loaded: boolean = false;
  $: loaded;
  export let page: Page;
  $: page;
  export let index: number;
  $: index;

  let pageIndex;
  $: pageIndex;

  PageIndex.subscribe((val) => {
    pageIndex = val;
  });
</script>

<div
  class="page"
  style="background-color:{page.background.fieldValue}; {get(Mode) == 'view'
    ? `left: ${-120 * (pageIndex - index)}%;`
    : ''}"
>
  {#each Object.keys(page.components) as id}
    <ComponentRenderer component={page.components[id]} />
  {/each}
</div>

<style lang="scss">
  .page {
    position: relative;
    width: inherit;
    height: inherit;
    overflow: hidden;
    border-radius: 25px;
  }
</style>
