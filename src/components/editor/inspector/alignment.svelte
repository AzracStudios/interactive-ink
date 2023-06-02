<script lang="ts">
  import { get } from "svelte/store";
  import { ProjectConfiguration, SelectedElement } from "../../../globalStore";
  import type { Component } from "../../../types";
  import "./alignment.scss";
  import { transition_in } from "svelte/internal";

  let selected: Component;
  $: selected;

  SelectedElement.subscribe((val) => {
    selected = val;
  });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="alignments">
  <!-- LEFT -->
  <div
    class="item"
    on:click={() => {
      selected.transform.position.fieldValue.x = 0;
      SelectedElement.set(selected);
    }}
  >
    <svg
      width="17"
      height="21"
      viewBox="0 0 17 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 1C0 0.447716 0.447723 0 1 0C1.55228 0 2 0.447716 2 1V20C2 20.5523 1.55228 21 1 21C0.447723 21 0 20.5523 0 20V1ZM3 5C3 4.44772 3.44772 4 4 4H16C16.5523 4 17 4.44772 17 5V7C17 7.55228 16.5523 8 16 8H4C3.44772 8 3 7.55228 3 7V5ZM4 11C3.44772 11 3 11.4477 3 12V14C3 14.5523 3.44772 15 4 15H10C10.5523 15 11 14.5523 11 14V12C11 11.4477 10.5523 11 10 11H4Z"
      />
    </svg>
  </div>

  <!-- CENTER -->
  <div
    class="item"
    on:click={() => {
      selected.transform.position.fieldValue.x =
        -22  +
        (get(ProjectConfiguration).dimensions.x -
          selected.transform.scale.fieldValue.x) /
          2;
      SelectedElement.set(selected);
    }}
  >
    <svg
      width="16"
      height="21"
      viewBox="0 0 16 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7 1C7 0.447715 7.44772 0 8 0C8.55229 0 9 0.447715 9 1V4H15C15.5523 4 16 4.44772 16 5V7C16 7.55228 15.5523 8 15 8H9V11H12C12.5523 11 13 11.4477 13 12V14C13 14.5523 12.5523 15 12 15H9V20C9 20.5523 8.55229 21 8 21C7.44772 21 7 20.5523 7 20V15H4C3.44772 15 3 14.5523 3 14V12C3 11.4477 3.44772 11 4 11H7V8H1C0.447715 8 0 7.55228 0 7V5C0 4.44772 0.447715 4 1 4H7V1Z"
      />
    </svg>
  </div>

  <!-- RIGHT -->
  <div
    class="item"
    on:click={() => {
      selected.transform.position.fieldValue.x =
        get(ProjectConfiguration).dimensions.x -
        selected.transform.scale.fieldValue.x;
      SelectedElement.set(selected);
    }}
  >
    <svg
      width="17"
      height="21"
      viewBox="0 0 17 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17 1C17 0.447716 16.5523 0 16 0C15.4477 0 15 0.447716 15 1V20C15 20.5523 15.4477 21 16 21C16.5523 21 17 20.5523 17 20V1ZM14 5C14 4.44772 13.5523 4 13 4H1C0.447723 4 0 4.44772 0 5V7C0 7.55228 0.447723 8 1 8H13C13.5523 8 14 7.55228 14 7V5ZM13 11C13.5523 11 14 11.4477 14 12V14C14 14.5523 13.5523 15 13 15H7C6.44772 15 6 14.5523 6 14V12C6 11.4477 6.44772 11 7 11H13Z"
      />
    </svg>
  </div>

  <!-- TOP -->
  <div
    class="item"
    on:click={() => {
      selected.transform.position.fieldValue.y = 0;
      SelectedElement.set(selected);
    }}
  >
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 1C0 0.447716 0.447723 0 1 0H16C16.5523 0 17 0.447716 17 1C17 1.55228 16.5523 2 16 2H1C0.447723 2 0 1.55228 0 1ZM4 17C3.44772 17 3 16.5523 3 16V4C3 3.44772 3.44772 3 4 3H6C6.55228 3 7 3.44772 7 4V16C7 16.5523 6.55228 17 6 17H4ZM9.59335 10C9.59335 10.5523 10.0411 11 10.5934 11H12.5934C13.1456 11 13.5934 10.5523 13.5934 10V4C13.5934 3.44772 13.1456 3 12.5934 3H10.5934C10.0411 3 9.59335 3.44772 9.59335 4V10Z"
      />
    </svg>
  </div>

  <!-- MIDDLE -->
  <div
    class="item"
    on:click={() => {
      selected.transform.position.fieldValue.y =
        (get(ProjectConfiguration).dimensions.y -
          selected.transform.scale.fieldValue.y) /
        2;
      SelectedElement.set(selected);
    }}
  >
    <svg
      width="17"
      height="14"
      viewBox="0 0 17 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4 14C3.44772 14 3 13.5523 3 13V8H1C0.447723 8 0 7.55228 0 7C0 6.44772 0.447723 6 1 6H3V1C3 0.447716 3.44772 0 4 0H6C6.55228 0 7 0.447716 7 1V6H9.59335V4C9.59335 3.44772 10.0411 3 10.5934 3H12.5934C13.1456 3 13.5934 3.44772 13.5934 4V6H16C16.5523 6 17 6.44772 17 7C17 7.55228 16.5523 8 16 8H13.5934V10C13.5934 10.5523 13.1456 11 12.5934 11H10.5934C10.0411 11 9.59335 10.5523 9.59335 10V8H7V13C7 13.5523 6.55228 14 6 14H4Z"
      />
    </svg>
  </div>

  <!-- BOTTOM -->
  <div
    class="item"
    on:click={() => {
      selected.transform.position.fieldValue.y =
        get(ProjectConfiguration).dimensions.y -
        selected.transform.scale.fieldValue.y;
      SelectedElement.set(selected);
    }}
  >
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4 14C3.44772 14 3 13.5523 3 13V1C3 0.447716 3.44772 0 4 0H6C6.55228 0 7 0.447716 7 1V13C7 13.5523 6.55228 14 6 14H4ZM0 16C0 15.4477 0.447723 15 1 15H16C16.5523 15 17 15.4477 17 16C17 16.5523 16.5523 17 16 17H1C0.447723 17 0 16.5523 0 16ZM9.59335 13C9.59335 13.5523 10.0411 14 10.5934 14H12.5934C13.1456 14 13.5934 13.5523 13.5934 13V7C13.5934 6.44772 13.1456 6 12.5934 6H10.5934C10.0411 6 9.59335 6.44772 9.59335 7V13Z"
      />
    </svg>
  </div>
</div>
