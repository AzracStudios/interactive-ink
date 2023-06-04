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

  export let component: Component<Text>;
  $: component;

  let selected: boolean = false;

  let scaleFactor: number;
  $: scaleFactor;

  ViewScaleFactor.subscribe((val) => {
    scaleFactor = val;
  });

  let textDOM: HTMLDivElement;
  $: textDOM;

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
    class="text"
    style={`
    width: ${component.transform.scale.fieldValue.x}px;
    height:${component.transform.scale.fieldValue.y}px;
    font-family: ${component.properties.fontFamily.fieldValue}; 
    font-size: ${component.properties.fontSize.fieldValue}px; 
    color: ${component.properties.color.fieldValue};
    z-index: ${component.renderPriority};
    left: ${component.transform.position.fieldValue.x}px;
    top: ${component.transform.position.fieldValue.y}px;
    transform:rotateZ(${component.transform.rotation.fieldValue}deg);
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
    `}
  >
    <Interactable {mode} {selected}>
      <p
        on:mousedown={() => {
          MovingSelected.set(true);
        }}
        bind:this={textDOM}
        style={`
        width: ${component.transform.scale.fieldValue.x}px;
        height:${component.transform.scale.fieldValue.y}px;
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
