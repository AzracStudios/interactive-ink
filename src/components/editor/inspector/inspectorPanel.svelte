<script lang="ts">
  import "./inspector.scss";
  import { CurrentPage, SelectedElement } from "../../../globalStore";
  import type { Component, Page } from "../../../types";
  import FieldBuilder from "./fieldBuilder.svelte";
  import Alignment from "./alignment.svelte";

  let currentPage: Page;
  $: currentPage;

  let selected: Component;
  $: selected;

  CurrentPage.subscribe((val) => {
    currentPage = val;
  });

  SelectedElement.subscribe((val) => {
    selected = val;
  });
</script>

<div class="editor__inspector">
  {#if selected}
    <Alignment />
    <div class="hr" />

    <div class="head">
      <p>Transform</p>
    </div>

    <div class="fields">
      {#each Object.keys(selected.transform) as key}
        <FieldBuilder
          property={selected.transform[key]}
          writeTo="transform"
          fieldKey={key}
        />
      {/each}
    </div>

    <div class="hr" />

    <div class="head">
      <p>Properties</p>
    </div>
    <div class="fields">
      {#each Object.keys(selected.properties) as key}
        <FieldBuilder
          fieldKey={key}
          property={selected.properties[key]}
          writeTo="properties"
        />
      {/each}
    </div>
  {:else}
    <div class="head">
      <p>Page Settings</p>
    </div>

    <div class="fields">
      <FieldBuilder
        fieldKey="background"
        property={currentPage.background}
        writeTo="page"
      />
    </div>
  {/if}
</div>
