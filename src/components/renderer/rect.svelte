<script lang="ts">
  import {
    Mode,
    MovingSelected,
    SelectedElement,
    ViewScaleFactor,
  } from "../../globalStore";
  import type { ApplicationMode, Component, Rect } from "../../types";
  import { cssHexToRGBA } from "../../utils";
  import Interactable from "../shared/interactable.svelte";

  export let component: Component<Rect>;
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
    class="rect"
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
      <div
        style={`  
            width: ${component.transform.scale.fieldValue.x}px;
            height: ${component.transform.scale.fieldValue.y}px; 
            background: ${component.properties.color.fieldValue};

            user-select:none;
            filter:blur(${
              component.effects.blur.blur.fieldValue
            }px) drop-shadow(${
          component.effects.shadow.offset.fieldValue.x
        }px ${component.effects.shadow.offset.fieldValue.y}px ${
          component.effects.shadow.blur.fieldValue
        }px ${cssHexToRGBA(
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
      />
    </Interactable>
  </div>
{/if}

<style lang="scss">
  .rect {
    position: absolute;
  }
</style>
