<script lang="ts">
  import "./view.scss";
  import { onMount } from "svelte";
  import PageRenderer from "../components/renderer/page.svelte";
  import {
    Direction,
    type Page,
    type Project,
    type ProjectConfig,
    type Vector2,
  } from "../types.d";
  import { getHeight, getWidth, sleep } from "../utils";
  import Loader from "../components/shared/loader.svelte";
  import {
    CurrentPage,
    Fonts,
    Images,
    Mode,
    PageIndex,
    ProjectConfiguration,
    ProjectData,
    ProjectId,
    ViewScaleFactor,
  } from "../globalStore";
  import { get } from "svelte/store";
  import { fetchImages, loadProject } from "../lib/pocketbase";

  let canvas: HTMLDivElement;

  let clientDimensions: Vector2 = { x: 0, y: 0 };
  $: clientDimensions;

  let canvasDimensions: Vector2 = { x: 0, y: 0 };
  $: canvasDimensions;

  let canvasScaleFactor: number;
  $: canvasScaleFactor;

  let inverseScaleFactor: number;
  $: inverseScaleFactor;

  let canvasPosition: Vector2 = { x: 0, y: 0 };
  $: canvasPosition;

  let pageBackground: string = "hsl(100, 55, 100)";
  $: pageBackground;

  let config: ProjectConfig;
  $: config;

  let currentPage: Page;
  $: currentPage;

  let pages: any;
  $: pages;

  let pageIndex: number;
  $: pageIndex;

  ProjectConfiguration.subscribe((val) => {
    if (!val) return;
    config = val;

    if (get(Fonts) != val.fonts) Fonts.set(val.fonts);
  });

  ProjectData.subscribe((val) => {
    if (!val) return;
    pages = val;
  });

  CurrentPage.subscribe((val) => {
    currentPage = val;
  });

  PageIndex.subscribe((val) => {
    pageIndex = val;
  });

  export let params;

  function recalculate() {
    if (!config) return;
    clientDimensions.x = getWidth();
    clientDimensions.y = getHeight();

    canvasScaleFactor =
      getHeight() < getWidth()
        ? clientDimensions.y / config.dimensions.y
        : clientDimensions.x / config.dimensions.x;

    ViewScaleFactor.set(canvasScaleFactor);

    inverseScaleFactor = 1 / canvasScaleFactor;

    sleep(1).then(() => {
      canvasDimensions.x = canvas.getBoundingClientRect().width;
      canvasDimensions.y = canvas.getBoundingClientRect().height;

      canvasPosition.x = (clientDimensions.x - canvasDimensions.x) / 2;
      canvasPosition.y = (clientDimensions.y - canvasDimensions.y) / 2;
    }); 
  }

  let loaded = false;
  $: loaded;

  let loaderOut = false;
  $: loaderOut;

  onMount(async () => {
    ProjectId.set(params.id);
    const project: Project = await loadProject(params.id);
    Images.set(await fetchImages(params.id));
    ProjectConfiguration.set(project.config);
    ProjectData.set(project.data);
    CurrentPage.set(project.data[0]);
    loaderOut = true;
    await sleep(500);
    loaded = true;
    recalculate();
    Mode.set("view");
  });
</script>

<svelte:window
  on:resize={() => {
    recalculate();
  }}
  on:load={() => {
    recalculate();
  }}
/>

<svelte:head>
  <title>Interactive Ink - Viewer</title>
</svelte:head>

{#if loaded}
  <div
    class="controls"
    style="width:{config.dimensions.x *
      (canvasScaleFactor - 0.01)}px; height:{config.dimensions.y *
      (canvasScaleFactor - 0.01)}px"
  >
    <button
      class="left"
      on:click={() => {
        if (pageIndex - 1 < 0) return;
        pageIndex--;
        PageIndex.set(pageIndex);
      }}
    />
    <button
      class="right"
      on:click={() => {
        if (pageIndex > config.pageOrder.length - 2) return;
        pageIndex++;
        PageIndex.set(pageIndex);
      }}
    />
  </div>
  <div class="canvas-wrapper-viewer">
    <div
      class="viewer_canvas"
      style={`
        width: ${config.dimensions.x}px; 
        height: ${config.dimensions.y}px; 
        transform: scale(${canvasScaleFactor - 0.01});
        left: ${canvasPosition.x}px;
        top: ${canvasPosition.y}px;
        `}
      bind:this={canvas}
    >
      {#each config.pageOrder as page, _}
        <PageRenderer page={pages[page]} loaded={_ == pageIndex} index={_} />
      {/each}
    </div>
  </div>
{/if}
{#if !loaded}
  <Loader {loaderOut} />
{/if}
