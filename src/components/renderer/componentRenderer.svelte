<script lang="ts">
  import { get } from "svelte/store";
  import type { Component } from "../../types";
  import Image from "./image.svelte";
  import Rect from "./rect.svelte";
  import TextRenderer from "./text.svelte";
  import { Mode } from "../../globalStore";
  import { onMount } from "svelte";

  export let component: Component<any>;
  $: component;

  let animate;
  $: animate;

  onMount(() => {
    if (get(Mode) == "view") {
      animate();
    }
  });
</script>

{#if component.type == "text"}
  <TextRenderer {component} bind:animate />
{/if}

{#if component.type == "image"}
  <Image {component} bind:animate />
{/if}

{#if component.type == "rect"}
  <Rect {component} bind:animate />
{/if}
