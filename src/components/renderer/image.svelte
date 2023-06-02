<script lang="ts">
  import { Mode, SelectedElement, ViewScaleFactor } from "../../globalStore";
  import type { ApplicationMode, Component, Image } from "../../types";
  import Interactable from "../shared/interactable.svelte";

  export let component: Component<Image>;
  $: component;

  let selected: boolean = false;

  let scaleFactor: number;
  $: scaleFactor;

  ViewScaleFactor.subscribe((val) => {
    scaleFactor = val;
  });

  SelectedElement.subscribe((val) => {
    selected = val == component;
  });

  let mode: ApplicationMode;
  $: mode;

  Mode.subscribe((val) => {
    mode = val;
  });
</script>

{#if component.properties}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="image"
    style={`
      width: ${component.transform.scale.fieldValue.x}px;
      height: ${component.transform.scale.fieldValue.y}px;
      z-index: ${component.renderPriority};
      transform: translateX(${component.transform.position.fieldValue.x}px) translateY(${component.transform.position.fieldValue.y}px) rotateZ(${component.transform.rotation.fieldValue}deg);
      `}
  >
    <Interactable {mode} {selected}>
      <img src={component.properties.src.fieldValue} alt={component.properties.alt.fieldValue} />
    </Interactable>
  </div>
{/if}

<style lang="scss">
  .image {
    position: absolute;
    .interactable {
      img {
        object-fit: contain;
      }
    }
  }
</style>
