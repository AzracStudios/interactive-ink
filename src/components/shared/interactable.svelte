<script lang="ts">
  import { get } from "svelte/store";
  import {
    CurrentPage,
    ScalingSelectedX,
    ScalingSelectedY,
  } from "../../globalStore";
  import { invertHex } from "../../utils";
  import { Direction } from "../../types.d";

  export let mode: "view" | "edit";
  export let selected: boolean;
</script>

{#if mode == "edit"}
  <div
    class="interactable {selected ? 'interactable--selected' : ''}"
    style={selected
      ? `outline: 1px solid #${invertHex(
          get(CurrentPage).background.fieldValue.replace("#", "")
        )}`
      : ""}
  >
    <div class="scale" style="display: {selected ? 'flex' : 'none'}">
      <div
        class="tl round"
        on:mousedown={() => {
          ScalingSelectedX.set(Direction.left);
          ScalingSelectedY.set(Direction.top);
        }}
        on:mouseup={() => {
          ScalingSelectedX.set(null);
          ScalingSelectedY.set(null);
        }}
      />

      <div
        class="tr round"
        on:mousedown={() => {
          ScalingSelectedX.set(Direction.right);
          ScalingSelectedY.set(Direction.top);
        }}
        on:mouseup={() => {
          ScalingSelectedX.set(null);
          ScalingSelectedY.set(null);
        }}
      />

      <div
        class="bl round"
        on:mousedown={() => {
          ScalingSelectedX.set(Direction.left);
          ScalingSelectedY.set(Direction.bottom);
        }}
        on:mouseup={() => {
          ScalingSelectedX.set(null);
          ScalingSelectedY.set(null);
        }}
      />

      <div
        class="br round"
        on:mousedown={() => {
          ScalingSelectedX.set(Direction.right);
          ScalingSelectedY.set(Direction.bottom);
        }}
        on:mouseup={() => {
          ScalingSelectedX.set(null);
          ScalingSelectedY.set(null);
        }}
      />

      <div
        class="l"
        on:mousedown={() => {
          ScalingSelectedX.set(Direction.left);
        }}
        on:mouseup={() => {
          ScalingSelectedX.set(null);
        }}
      />
      <div
        class="r"
        on:mousedown={() => {
          ScalingSelectedX.set(Direction.right);
        }}
        on:mouseup={() => {
          ScalingSelectedX.set(null);
        }}
      />
      <div
        class="t"
        on:mousedown={() => {
          ScalingSelectedY.set(Direction.top);
        }}
        on:mouseup={() => {
          ScalingSelectedY.set(null);
        }}
      />
      <div
        class="b"
        on:mousedown={() => {
          ScalingSelectedY.set(Direction.bottom);
        }}
        on:mouseup={() => {
          ScalingSelectedY.set(null);
        }}
      />
    </div>
    <slot />
  </div>
{:else}
  <slot />
{/if}

<style lang="scss">
  .interactable {
    width: fit-content;
    height: fit-content;
    color: inherit;
    position: relative;
    cursor: move;

    .scale {
      cursor: scale;
      * {
        width: 30px;
        aspect-ratio: 1;
        background-color: #019aff;
        position: absolute;
      }

      .round {
        width: 50px;
        border-radius: 100%;
      }

      .tl {
        translate: -50% -50%;
        cursor: se-resize;
      }

      .tr {
        left: 100%;
        translate: -50% -50%;
        cursor: sw-resize;
      }

      .bl {
        left: 0;
        top: 100%;
        translate: -50% -50%;
        cursor: sw-resize;
      }

      .br {
        left: 100%;
        top: 100%;
        translate: -50% -50%;
        cursor: se-resize;
      }

      .l {
        left: 0;
        top: 50%;
        translate: -50% -50%;
        cursor: e-resize;
      }

      .r {
        right: 0;
        top: 50%;
        translate: 50% -50%;
        cursor: e-resize;
      }

      .t {
        top: 0;
        left: 50%;
        translate: -50% -50%;
        cursor: s-resize;
      }

      .b {
        bottom: 0;
        left: 50%;
        translate: -50% 50%;
        cursor: s-resize;
      }
    }
  }
</style>
