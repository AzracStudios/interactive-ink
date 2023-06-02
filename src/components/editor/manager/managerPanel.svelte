<script lang="ts">
  import Elements from "./element/elements.svelte";
  import "./managerPanel.scss"
  let currentTab: string = "Elements";
  $: currentTab;

  let tabs = ["Pages", "Elements", "Assets"];
</script>

<div class="editor__manager">
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

  {#if currentTab == "Elements"}
    <Elements />
  {/if}
</div>