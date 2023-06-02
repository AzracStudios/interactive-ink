<script lang="ts">
  import "./edit.scss";
  import { onMount } from "svelte";
  import PageRenderer from "../../renderer/page.svelte";
  import {
    Direction,
    type Page,
    type ProjectConfig,
    type Vector2,
  } from "../../../types.d";
  import { getHeight, sleep } from "../../../utils";
  import {
    CurrentPage,
    Mode,
    MovingSelected,
    ProjectConfiguration,
    ScalingSelected,
    SelectedElement,
    ViewScaleFactor,
  } from "../../../globalStore";
  import { get } from "svelte/store";
  import { page, projconf } from "../temp";
  import { select_multiple_value } from "svelte/internal";

  let canvas: HTMLDivElement;

  let padding: Vector2 = { x: 0, y: 50 };

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

  ProjectConfiguration.set(projconf);

  ProjectConfiguration.subscribe((val) => {
    config = val;
  });

  CurrentPage.set(page);

  CurrentPage.subscribe((val) => {
    currentPage = val;
  });

  SelectedElement.subscribe((val) => {
    if (val) {
      let temp = get(CurrentPage);
      temp.components[val.id] = val;
      CurrentPage.set(temp);
    }
  });

  function recalculate() {
    clientDimensions.x = canvas.parentElement.getBoundingClientRect().width;
    clientDimensions.y = canvas.parentElement.getBoundingClientRect().height;

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

  onMount(() => {
    recalculate();
    Mode.set("edit");
  });

  let movingSelected: boolean = false;
  $: movingSelected;

  let scalingSelected: Direction | null = null;
  $: scalingSelected;

  let previousMousePosition: Vector2 = { x: 0, y: 0 };

  MovingSelected.subscribe((val) => {
    movingSelected = val;
  });

  ScalingSelected.subscribe((val) => {
    scalingSelected = val;
  });

  onmouseup = () => {
    MovingSelected.set(null);
    ScalingSelected.set(null);
  };

  const handleMouse = (e: MouseEvent) => {
    let selected = get(SelectedElement);
    if (!selected) return;

    if (movingSelected) {
      if (!e.shiftKey) {
        selected.transform.position.fieldValue.x =
          (e.clientX - padding.x - canvas.getBoundingClientRect().left) *
            inverseScaleFactor +
          50;
      }

      if (!e.ctrlKey) {
        selected.transform.position.fieldValue.y =
          (e.clientY - padding.y) * inverseScaleFactor - canvasPosition.y - 25;
      }
    }

    (() => {
      if (selected.type == "text" && selected.properties.autoWidth.fieldValue) return;
      if (scalingSelected == Direction.left) {
        let delta = previousMousePosition.x - e.clientX;
        selected.transform.scale.fieldValue.x += delta * inverseScaleFactor;
        selected.transform.position.fieldValue.x -= delta * inverseScaleFactor;
      }

      if (scalingSelected == Direction.right) {
        let delta = e.clientX - previousMousePosition.x;
        selected.transform.scale.fieldValue.x += delta * inverseScaleFactor;
      }

      if (scalingSelected == Direction.top) {
        let delta = previousMousePosition.y - e.clientY;
        selected.transform.scale.fieldValue.y += delta * inverseScaleFactor;
        selected.transform.position.fieldValue.y -= delta * inverseScaleFactor;
      }

      if (scalingSelected == Direction.bottom) {
        let delta = e.clientY - previousMousePosition.y;
        selected.transform.scale.fieldValue.y += delta * inverseScaleFactor;
      }
    })();
    previousMousePosition = { x: e.clientX, y: e.clientY };
    SelectedElement.set(selected);
  };
</script>

<svelte:window
  on:resize={() => {
    recalculate();
  }}
  on:load={() => {
    recalculate();
  }}
/>

<div class="canvas-wrapper" on:mousemove={(e) => handleMouse(e)}>
  <div
    class="editor_canvas"
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
