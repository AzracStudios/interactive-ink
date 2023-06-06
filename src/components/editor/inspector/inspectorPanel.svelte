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

    <div class="hr" />

    <p class="head">Effects</p>

    <div class="fields">
      {#each Object.keys(selected.effects) as key}
        <p class="thead">{key}</p>
        {#each Object.keys(selected.effects[key]) as k}
          <FieldBuilder
            fieldKey={k}
            property={selected.effects[key][k]}
            writeTo={key}
          />
        {/each}
      {/each}
    </div>

    <div class="hr" />

    <div class="head">Animation</div>

    <div class="fields">
      <FieldBuilder
        fieldKey="from"
        property={selected.animation.from}
        writeTo="animation"
      />
      <FieldBuilder
        fieldKey="to"
        property={selected.animation.to}
        writeTo="animation"
      />
      <FieldBuilder
        fieldKey="delay"
        property={selected.animation.delay}
        writeTo="animation"
      />
      <FieldBuilder
        fieldKey="duration"
        property={selected.animation.duration}
        writeTo="animation"
      />
      <FieldBuilder
        fieldKey="timingFunction"
        property={selected.animation.timingFunction}
        writeTo="animation"
      />
      <div class="wrapper" style="width: 80%">
        <button
          class="action_button"
          on:click={() => {
            selected.animation.from = null;
            selected.animation.to = null;
          }}>Clear Animation</button
        >
      </div>
    </div>

    <div class="space" />
  {:else}
    <p class="head">Page Settings</p>

    <div class="fields">
      <FieldBuilder
        fieldKey="name"
        property={currentPage.name}
        writeTo="page"
      />
      <FieldBuilder
        fieldKey="background"
        property={currentPage.background}
        writeTo="page"
      />
    </div>
  {/if}
</div>
