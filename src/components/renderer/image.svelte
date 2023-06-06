<script lang="ts">
  import {
    Mode,
    MovingSelected,
    SelectedElement,
    ViewScaleFactor,
  } from "../../globalStore";
  import type { ApplicationMode, Component, Image } from "../../types";
  import { cssHexToRGBA } from "../../utils";
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
      position: absolute;
      left: ${component.transform.position.fieldValue.x}px;
      top: ${component.transform.position.fieldValue.y}px;
      z-index: ${component.transform.zIndex.fieldValue};
      transform: rotateZ(${component.transform.rotation.fieldValue}deg);
      `}
  >
    <Interactable {mode} {selected}>
      <img
        src={component.properties.src.fieldValue}
        alt={component.properties.alt.fieldValue}
        style={`  
          width: ${component.transform.scale.fieldValue.x}px;
          height: ${component.transform.scale.fieldValue.y}px; 
          user-select:none;
          filter:blur(${component.effects.blur.blur.fieldValue}px) brightness(${
          component.properties.brightness.fieldValue
        }%) contrast(${component.properties.contrast.fieldValue}%) saturate(${
          component.properties.saturation.fieldValue
        }%) hue-rotate(${component.properties.hue.fieldValue}deg) sepia(${
          component.properties.sepia.fieldValue
        }%) drop-shadow(${component.effects.shadow.offset.fieldValue.x}px ${
          component.effects.shadow.offset.fieldValue.y
        }px ${component.effects.shadow.blur.fieldValue}px ${cssHexToRGBA(
          component.effects.shadow.color.fieldValue,
          component.effects.shadow.opacity.fieldValue
        )});
          outline: ${component.effects.outline.width.fieldValue} ${
          component.effects.outline.strokeStyle.fieldValue
        } ${component.effects.outline.color.fieldValue};
          border-radius: ${component.properties.borderRadius.fieldValue}px;
      `}
        on:click={() => {
          SelectedElement.set(component);
        }}
        on:mousedown={() => {
          MovingSelected.set(true);
        }}
        on:dragstart={(e) => {
          e.preventDefault();
        }}
      />
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
