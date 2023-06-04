<script lang="ts">
  import type { Component } from "../../types";
  import Image from "./image.svelte";
  import TextRenderer from "./text.svelte";

  export let component: Component<any>;
  $: component;
</script>

{#if component.type == "text"}
  <TextRenderer {component} />
{/if}


{#if component.type == "image"}
  <Image {component} />
{/if}