<script lang="ts">
  import "./inspector.scss";
  import { CurrentPage, Fonts, SelectedElement } from "../../../globalStore";
  import type { Component, Page } from "../../../types";
  import FieldBuilder from "./fieldBuilder.svelte";
  import Alignment from "./alignment.svelte";

  let currentPage: Page;
  $: currentPage;

  let selected: Component<any>;
  $: selected;
  let fonts = [];

  CurrentPage.subscribe((val) => {
    currentPage = val;
  });

  SelectedElement.subscribe((val) => {
    selected = val;
  });

  Fonts.subscribe((val) => {
    fonts = val;
  });
</script>

<div class="editor__inspector">
  {#if selected}
    <Alignment />
    <div class="hr" />

    <p class="head">Transform</p>

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

    <p class="head">Properties</p>

    <div class="fields">
      {#each selected.propertiesSortOrder as key}
        {#if key == "fontFamily"}
          <FieldBuilder
            fieldKey={key}
            property={selected.properties[key]}
            writeTo="properties"
            {fonts}
          />
        {:else}
          <FieldBuilder
            fieldKey={key}
            property={selected.properties[key]}
            writeTo="properties"
          />
        {/if}
      {/each}
    </div>

    <div class="space" />
  {:else}
    <p class="head">Page Settings</p>

    <div class="fields">
      <FieldBuilder
        fieldKey="background"
        property={currentPage.background}
        writeTo="page"
      />
    </div>
  {/if}
</div>
