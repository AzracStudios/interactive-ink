<script lang="ts">
  import { get } from "svelte/store";
  import {
    Mode,
    MovingSelected,
    SelectedElement,
    ViewScaleFactor,
  } from "../../globalStore";
  import type { ApplicationMode, Component, Text } from "../../types";
  import Interactable from "../shared/interactable.svelte";
  import { cssHexToRGBA, sleep } from "../../utils";
  import FieldBuilder from "../editor/inspector/fieldBuilder.svelte";
  import { onMount } from "svelte";

  export let component: Component<Text>;
  $: component;

  let selected: boolean = false;

  let scaleFactor: number;
  $: scaleFactor;

  ViewScaleFactor.subscribe((val) => {
    scaleFactor = val;
  });

  let textContainer: HTMLDivElement;
  $: textContainer;

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
    class="text"
    bind:this={textContainer}
    style={`
    width: ${component.transform.scale.fieldValue.x}px;
    height:${component.transform.scale.fieldValue.y}px;
    z-index: ${component.transform.zIndex.fieldValue};
    left: ${component.transform.position.fieldValue.x}px;
    top: ${component.transform.position.fieldValue.y}px;
    transform:rotateZ(${component.transform.rotation.fieldValue}deg);

    ${
      mode == "view"
        ? `transition: all ${component.animation.timingFunction.fieldValue} ${component.animation.duration.fieldValue}s;`
        : ""
    }

    `}
  >
    <Interactable {mode} {selected}>
      <p
        on:mousedown={() => {
          MovingSelected.set(true);
        }}
        style={`
        width: ${component.transform.scale.fieldValue.x}px;
        height:${component.transform.scale.fieldValue.y}px;
        font-family: ${component.properties.fontFamily.fieldValue}; 
      opacity: ${component.properties.opacity.fieldValue}%;

        font-size: ${component.properties.fontSize.fieldValue}px; 
        color: ${component.properties.color.fieldValue};
        ${
          mode == "view"
            ? `transition: all ${component.animation.timingFunction.fieldValue} ${component.animation.duration.fieldValue}s;`
            : ""
        }

        ${
          component.properties.bold.fieldValue
            ? "font-weight:bold"
            : "font-weight: normal"
        };
        ${
          component.properties.underline.fieldValue
            ? "text-decoration: underline"
            : "text-decoration: none"
        };
        outline: ${component.effects.outline.width.fieldValue}px ${
          component.effects.outline.strokeStyle.fieldValue
        } ${component.effects.outline.color.fieldValue};
        text-shadow: ${component.effects.shadow.offset.fieldValue.x}px ${
          component.effects.shadow.offset.fieldValue.y
        }px ${component.effects.shadow.blur.fieldValue}px ${cssHexToRGBA(
          component.effects.shadow.color.fieldValue,
          component.effects.shadow.opacity.fieldValue
        )};
       filter: blur(${component.effects.blur.blur.fieldValue}px);
      line-height: ${
        component.properties.lineHeight.fieldValue == 0
          ? "normal"
          : `${component.properties.lineHeight.fieldValue}px`
      };
      text-align: ${component.properties.alignment.fieldValue
        .toString()
        .toLowerCase()};
     `}
        on:click={() => {
          SelectedElement.set(component);
        }}
      >
        {component.properties.text.fieldValue}
      </p>
    </Interactable>
  </div>
{/if}

<style lang="scss">
  .text {
    user-select: none;
    position: absolute;
    .interactable {
      p {
        overflow-wrap: break-word;
        margin-right: 0px;
      }
    }
  }
</style>
