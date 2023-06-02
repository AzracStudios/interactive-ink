<script lang="ts">
  import { onMount, afterUpdate } from "svelte";
  import PageRenderer from "./page.svelte";
  import type { Page, ProjectConfig, Vector2 } from "../../types";
  import { getHeight, getWidth, sleep } from "../../utils";

  let canvas: HTMLDivElement;
  let padding: Vector2 = { x: 0, y: 50 };
  let clientDimensions: Vector2 = { x: 0, y: 0 };
  $: clientDimensions;
  let canvasDimensions: Vector2 = { x: 0, y: 0 };
  $: canvasDimensions;
  let canvasScaleFactor: number;
  $: canvasScaleFactor;
  let canvasPosition: Vector2 = { x: 0, y: 0 };
  $: canvasPosition;
  let pageBackground: Color = { h: 100, s: 55, l: 95 };
  $: pageBackground;

  let config: ProjectConfig = {
    name: "First Project",
    dimensions: { x: 2480, y: 3508 },
    author: "Azrac Studios",
    aspectRatio: 1 / Math.sqrt(2),
    scaleBehaviour: "height",
    created: {
      day: 30,
      month: 5,
      year: 2023,
      hours: 14,
      minutes: 38,
      seconds: 23,
    },
    lastModified: undefined,
  };

  let pages: Page[] = [
    {
      id: "sample-id",
      index: 0,
      background: { h: 100, s: 55, l: 95 },
      components: [
        {
          id: "sample-id-2",
          renderPriority: -1,
          transform: {
            position: {
              x: 50,
              y: 500,
            },

            rotation: -50,

            scale: {
              x: 1,
              y: 1,
            },
          },
          type: "text",
          loaded: true,
          properties: {
            text: "Hola Mundo!",
            font: "Poppins",
            size: 100,
            color: {
              h: 147,
              s: 50,
              l: 47,
            },
            bold: true,
          },
        },
      ],
      loaded: true,
    },
  ];

  function disableKeyboard(e: KeyboardEvent) {
    if (e.ctrlKey) {
      if (
        e.code == "NumpadAdd" ||
        e.code == "NumpadSubtract" ||
        e.code == "Equal" ||
        e.code == "Minus"
      ) {
        e.preventDefault();
      }
    }
  }

  function disableMouseScroll(e: MouseEvent) {
    e.preventDefault();
  }

  function recalculate() {
    clientDimensions.x = getWidth();
    clientDimensions.y =
      window.innerHeight == screen.height ? screen.height : getHeight();

    canvasScaleFactor =
      config.scaleBehaviour == "height"
        ? clientDimensions.y / config.dimensions.y
        : clientDimensions.x / config.dimensions.y;

    sleep(1).then(() => {
      canvasDimensions.x = canvas.getBoundingClientRect().width;
      canvasDimensions.y = canvas.getBoundingClientRect().height;

      canvasPosition.x = (clientDimensions.x - canvasDimensions.x) / 2;
      canvasPosition.y = (clientDimensions.y - canvasDimensions.y) / 2;
    });
  }

  onMount(() => {
    recalculate();
  });
</script>

<svelte:window
  on:wheel={(e) => {
    disableMouseScroll(e);
  }}
  on:keydown={(e) => {
    disableKeyboard(e);
  }}
  on:resize={() => {
    recalculate();
  }}
  on:load={() => {
    recalculate();
  }}
/>

<div class="page__ambient" style="background:{hslToString(pageBackground)};" />
<div
  class="canvas"
  style={`
    width: ${config.dimensions.x - padding.x}px; 
    height: ${config.dimensions.y - padding.y}px; 
    transform: scale(${canvasScaleFactor});
    left: ${canvasPosition.x}px;
    top: ${canvasPosition.y}px;
    `}
  bind:this={canvas}
>
  {#each pages as page}
    <PageRenderer {page}/>
  {/each}
</div>

<style lang="scss">
  .page__ambient {
    position: absolute;
    width: 25vw;
    height: 100vh;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    filter: blur(100px);
  }
</style>
