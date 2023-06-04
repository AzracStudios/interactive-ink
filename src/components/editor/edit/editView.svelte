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
    Fonts,
    Mode,
    MovingSelected,
    ProjectConfiguration,
    ScalingSelectedX,
    ScalingSelectedY,
    SelectedElement,
    ViewScaleFactor,
  } from "../../../globalStore";
  import { get } from "svelte/store";

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

  ProjectConfiguration.subscribe((val) => {
    config = val;
    if (get(Fonts) != val.fonts) Fonts.set(val.fonts);
  });

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

  let scalingSelectedX: Direction | null = null;
  $: scalingSelectedX;

  let scalingSelectedY: Direction | null = null;
  $: scalingSelectedY;

  let previousMousePosition: Vector2 = { x: 0, y: 0 };

  MovingSelected.subscribe((val) => {
    movingSelected = val;
  });

  ScalingSelectedX.subscribe((val) => {
    scalingSelectedX = val;
  });

  ScalingSelectedY.subscribe((val) => {
    scalingSelectedY = val;
  });

  onmousedown = (e: MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains("page")) {
      SelectedElement.set(null);
    }
  };

  onmouseup = () => {
    MovingSelected.set(null);
    ScalingSelectedX.set(null);
    ScalingSelectedY.set(null);
  };

  const handleMouse = (e: MouseEvent) => {
    let selected = get(SelectedElement);
    if (!selected) return;

    if (movingSelected) {
      if (!e.shiftKey) {
        selected.transform.position.fieldValue.x +=
          (e.clientX - previousMousePosition.x) * inverseScaleFactor;
      }

      if (!e.ctrlKey) {
        selected.transform.position.fieldValue.y +=
          (e.clientY - previousMousePosition.y) * inverseScaleFactor;
      }
    }

    (() => {
      if (scalingSelectedX == Direction.left) {
        let delta = previousMousePosition.x - e.clientX;
        selected.transform.scale.fieldValue.x += delta * inverseScaleFactor;
        selected.transform.position.fieldValue.x -= delta * inverseScaleFactor;
      }

      if (scalingSelectedX == Direction.right) {
        let delta = e.clientX - previousMousePosition.x;
        selected.transform.scale.fieldValue.x += delta * inverseScaleFactor;
      }

      if (scalingSelectedY == Direction.top) {
        let delta = previousMousePosition.y - e.clientY;
        selected.transform.scale.fieldValue.y += delta * inverseScaleFactor;
        selected.transform.position.fieldValue.y -= delta * inverseScaleFactor;
      }

      if (scalingSelectedY == Direction.bottom) {
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
