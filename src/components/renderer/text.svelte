<script lang="ts">
  import { Mode, SelectedElement, ViewScaleFactor } from "../../globalStore";
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
    if (!textDOM) return;
    if (!component.properties.autoWidth.fieldValue) return;
    component.transform.scale.fieldValue.y =
      textDOM.getBoundingClientRect().height / scaleFactor;
    component.transform.scale.fieldValue.x =
      textDOM.getBoundingClientRect().width / scaleFactor;
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
    bind:this={textDOM}
    style={`
    width: ${
      component.properties.autoWidth.fieldValue
        ? "fit-content"
        : `${component.transform.scale.fieldValue.x}px`
    };
    height: ${
      component.properties.autoWidth.fieldValue
        ? "fit-content"
        : `${component.transform.scale.fieldValue.y}px`
    };
    font-family: ${component.properties.fontFamily.fieldValue}; 
    font-size: ${component.properties.fontSize.fieldValue}px; 
    color: ${component.properties.color.fieldValue};
    z-index: ${component.renderPriority};
    transform: translateX(${
      component.transform.position.fieldValue.x
    }px) translateY(${component.transform.position.fieldValue.y}px) rotateZ(${
      component.transform.rotation.fieldValue
    }deg);
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
        style={`width: ${
          component.properties.autoWidth.fieldValue
            ? "fit-content"
            : `${component.transform.scale.fieldValue.x}px`
        };
        height: ${
          component.properties.autoWidth.fieldValue
            ? "fit-content"
            : `${component.transform.scale.fieldValue.y}px`
        };
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
          if (selected) {
            return SelectedElement.set(null);
          }

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
