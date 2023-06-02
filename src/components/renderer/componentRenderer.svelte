<script lang="ts">
  import type { Component } from "../../types";
  import TextRenderer from "./text.svelte";

  export let component: Component;
  $: component;
</script>

{#if component.type == "text"}
  <TextRenderer {component} />
{/if}
