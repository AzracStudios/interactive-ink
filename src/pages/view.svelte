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

  ProjectConfiguration.subscribe((val) => {
    if (!val) return;
    config = val;
    if (get(Fonts) != val.fonts) Fonts.set(val.fonts);
  });

  CurrentPage.subscribe((val) => {
    currentPage = val;
  });
  export let params;

  function recalculate() {
    if (!config) return;
    clientDimensions.x = getWidth();
    clientDimensions.y = getHeight();

    canvasScaleFactor =
      config.scaleBehaviour == "height"
        ? clientDimensions.y / config.dimensions.y
        : clientDimensions.x / config.dimensions.y;

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
      <PageRenderer page={currentPage} />
    </div>
  </div>
{/if}
{#if !loaded}
  <Loader {loaderOut} />
{/if}
