<script lang="ts">
  import {
    Mode,
    MovingSelected,
    SelectedElement,
    ViewScaleFactor,
  } from "../../globalStore";
  import type { ApplicationMode, Component, Rect } from "../../types";
  import { cssHexToRGBA, sleep } from "../../utils";
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

  const setInitial = () => {
    for (let prop in component.animation.from.fieldValue.properties) {
      component.properties[prop] =
        component.animation.from.fieldValue.properties[prop];
    }

    for (let prop in component.animation.from.fieldValue.transform) {
      component.transform[prop] =
        component.animation.from.fieldValue.transform[prop];
    }

    for (let prop in component.animation.from.fieldValue.effects) {
      component.effects[prop] =
        component.animation.from.fieldValue.effects[prop];
    }
  };

  const setFinal = () => {
    for (let prop in component.animation.to.fieldValue.properties) {
      component.properties[prop] =
        component.animation.to.fieldValue.properties[prop];
    }

    for (let prop in component.animation.to.fieldValue.transform) {
      component.transform[prop] =
        component.animation.to.fieldValue.transform[prop];
    }

    for (let prop in component.animation.to.fieldValue.effects) {
      component.effects[prop] = component.animation.to.fieldValue.effects[prop];
    }
  };

  export const animate = async () => {
    if (
      !(
        component.animation.from.fieldValue && component.animation.to.fieldValue
      )
    )
      return;
    setInitial();
    await sleep(component.animation.delay.fieldValue * 1000 + 300);
    setFinal();
  };
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
        ${
          mode == "view"
            ? `transition: all ${component.animation.timingFunction.fieldValue} ${component.animation.duration.fieldValue}s;`
            : ""
        }
        `}
  >
    <Interactable {mode} {selected}>
      <div
        style={`  
            width: ${component.transform.scale.fieldValue.x}px;
            height: ${component.transform.scale.fieldValue.y}px; 
            background: ${component.properties.color.fieldValue};
      opacity: ${component.properties.opacity.fieldValue}%;
          
            ${
              mode == "view"
                ? `transition: all ${component.animation.timingFunction.fieldValue} ${component.animation.duration.fieldValue}s;`
                : ""
            }
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
            outline: ${component.effects.outline.width.fieldValue}px ${
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
