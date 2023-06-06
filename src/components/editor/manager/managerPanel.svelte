<script lang="ts">
  import Page from "./pages/page.svelte";
  import Assets from "./assets/assets.svelte";
  import Elements from "./element/elements.svelte";
  import "./managerPanel.scss";
  let currentTab: string = "Pages";
  $: currentTab;

  let tabs = ["Pages", "Elements", "Assets"];
</script>

<div class="editor__manager">
  <div class="wrapper" style="margin-block:1rem;">
    <div class="tabs">
      {#each tabs as tab}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="tab {currentTab == tab ? 'tab--active' : ''}"
          on:click={() => {
            currentTab = tab;
          }}
        >
          <p>{tab}</p>
        </div>
      {/each}
    </div>
  </div>

  {#if currentTab == "Elements"}
    <Elements />
  {/if}

  {#if currentTab == "Assets"}
    <Assets />
  {/if}

  {#if currentTab == "Pages"}
    <Page />
  {/if}
</div>
