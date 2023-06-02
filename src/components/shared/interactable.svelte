<script lang="ts">
  import { get } from "svelte/store";
  import {
    CurrentPage,
    MovingSelected,
    ScalingSelected,
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
    <div
      class="move"
      style="display: {selected ? 'flex' : 'none'}"
      on:mousedown={() => {
        MovingSelected.set(true);
      }}
      on:mouseup={() => {
        MovingSelected.set(false);
      }}
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.6667 3.93929L10.41 5.33563C10.0405 5.74615 9.40824 5.77942 8.99773 5.40997C8.58722 5.04051 8.55394 4.40822 8.9234 3.99771L11.914 0.674804C11.9286 0.6582 11.9438 0.641978 11.9596 0.626171C12.0416 0.544058 12.1347 0.47902 12.2344 0.4313C12.3711 0.365729 12.519 0.333273 12.6667 0.333321C12.9239 0.333403 13.18 0.432109 13.3738 0.626205C13.3896 0.642001 13.4048 0.658212 13.4194 0.674805L16.41 3.99771C16.7794 4.40822 16.7462 5.04051 16.3357 5.40997C15.9251 5.77942 15.2929 5.74615 14.9234 5.33563L13.6667 3.93929V12H21.7274L20.331 10.7433C19.9205 10.3738 19.8873 9.74155 20.2567 9.33104C20.6262 8.92053 21.2585 8.88725 21.669 9.25671L24.9918 12.2473C25.0085 12.2619 25.0247 12.2771 25.0405 12.2929C25.1226 12.3749 25.1877 12.468 25.2354 12.5677C25.3009 12.7044 25.3334 12.8524 25.3334 13C25.3333 13.2572 25.2346 13.5134 25.0405 13.7071C25.0247 13.723 25.0085 13.7381 24.9919 13.7527L21.669 16.7433C21.2585 17.1128 20.6262 17.0795 20.2567 16.669C19.8873 16.2585 19.9205 15.6262 20.331 15.2567L21.7274 14H13.6667V22.0607L14.9234 20.6644C15.2929 20.2539 15.9251 20.2206 16.3357 20.59C16.7462 20.9595 16.7794 21.5918 16.41 22.0023L13.4194 25.3252C13.4048 25.3418 13.3896 25.358 13.3738 25.3738C13.2918 25.4559 13.1987 25.521 13.099 25.5687C12.8278 25.6985 12.5084 25.7002 12.2344 25.5687C12.1349 25.521 12.0418 25.4561 11.9599 25.3742C11.944 25.3582 11.9287 25.3419 11.914 25.3252L8.9234 22.0023C8.55394 21.5918 8.58722 20.9595 8.99773 20.59C9.40824 20.2206 10.0405 20.2539 10.41 20.6644L11.6667 22.0607V14H3.60597L5.00231 15.2567C5.41282 15.6262 5.4461 16.2585 5.07664 16.669C4.70718 17.0795 4.07489 17.1128 3.66438 16.7433L0.341479 13.7527C0.324886 13.7381 0.308675 13.7229 0.292879 13.7071C0.210749 13.6251 0.1457 13.532 0.0979743 13.4323C-0.0334854 13.1583 -0.0318428 12.8389 0.0979732 12.5677C0.145629 12.4682 0.210557 12.3751 0.292514 12.2932C0.308425 12.2773 0.324758 12.262 0.341478 12.2473L3.66438 9.25671C4.07489 8.88725 4.70718 8.92053 5.07664 9.33104C5.4461 9.74155 5.41282 10.3738 5.00231 10.7433L3.60596 12H11.6667V3.93929Z"
          fill="#2567CA"
        />
      </svg>
    </div>

    <div class="scale" style="display: {selected ? 'flex' : 'none'}">
      <div
        class="l"
        on:mousedown={() => {
          ScalingSelected.set(Direction.left);
        }}
        on:mouseup={() => {
          ScalingSelected.set(null);
        }}
      />
      <div
        class="r"
        on:mousedown={() => {
          ScalingSelected.set(Direction.right);
        }}
        on:mouseup={() => {
          ScalingSelected.set(null);
        }}
      />
      <div
        class="t"
        on:mousedown={() => {
          ScalingSelected.set(Direction.top);
        }}
        on:mouseup={() => {
          ScalingSelected.set(null);
        }}
      />
      <div
        class="b"
        on:mousedown={() => {
          ScalingSelected.set(Direction.bottom);
        }}
        on:mouseup={() => {
          ScalingSelected.set(null);
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

    .scale {
      * {
        width: 30px;
        aspect-ratio: 1;
        background-color: #019aff;
        position: absolute;
      }

      .l {
        left: 0;
        top: 50%;
        translate: -50% -50%;
      }

      .r {
        right: 0;
        top: 50%;
        translate: 50% -50%;
      }

      .t {
        top: 0;
        left: 50%;
        translate: -50% -50%;
      }

      .b {
        bottom: 0;
        left: 50%;
        translate: -50% 50%;
      }
    }

    .move {
      position: absolute;
      top: 0;
      left: 0;
      transform: translate(-50%, -50%);
      width: 100px;
      height: 100px;
      border-radius: 100%;
      background: rgb(255, 255, 255);
      box-shadow: 0px 0px 25px rgb(0 0 0 / 0.3);
      z-index: 95;
      align-items: center;
      justify-content: center;

      svg {
        width: 80%;
        height: 80%;
      }
    }
  }
</style>
