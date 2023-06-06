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
  import { FileHistoryNode, getHeight, sleep } from "../../../utils";
  import {
    CurrentPage,
    FileHistory,
    Fonts,
    HistoryIndex,
    Mode,
    MovingSelected,
    ProjectConfiguration,
    ScalingSelectedX,
    ScalingSelectedY,
    SelectedElement,
    ViewScaleFactor,
  } from "../../../globalStore";
  import { get } from "svelte/store";
  import { replace } from "svelte-spa-router";

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
    if (get(SelectedElement) && get(FileHistory).length == 0) {
      let currentHistory = get(FileHistory);
      let newestEntry = structuredClone(get(SelectedElement));
      currentHistory.push(newestEntry);
      FileHistory.set(currentHistory);
    }
    if ((e.target as HTMLElement).classList.contains("page")) {
      SelectedElement.set(null);
    }
  };

  onmouseup = () => {
    (() => {
      if (
        get(SelectedElement) &&
        (movingSelected || scalingSelectedX || scalingSelectedY)
      ) {
        let currentHistory = get(FileHistory);
        let newestEntry = structuredClone(get(SelectedElement));
        if (get(HistoryIndex) > 0)
          currentHistory = currentHistory.slice(0, get(HistoryIndex) + 1);
        currentHistory.push(newestEntry);
        FileHistory.set(currentHistory);
        HistoryIndex.set(currentHistory.length - 1);
      }
    })();

    MovingSelected.set(null);
    ScalingSelectedX.set(null);
    ScalingSelectedY.set(null);
  };

  HistoryIndex.subscribe((val) => {
    let replacement = structuredClone(get(FileHistory))[val];
    if (!replacement) return;
    SelectedElement.set(replacement);
  });

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
