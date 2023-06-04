<script lang="ts">
  import Router from "svelte-spa-router";
  import View from "./pages/view.svelte";
  import Editor from "./pages/editor.svelte";
  import { get } from "svelte/store";
  import { Fonts, ProjectConfiguration, ProjectData } from "./globalStore";
  import { generateFontString } from "./utils";

  let fonts: string[];
  $: fonts;

  Fonts.subscribe((val) => {
    fonts = val;
    if (!get(ProjectConfiguration)) return;
    let temp = get(ProjectConfiguration);
    temp.fonts = val;
    ProjectConfiguration.set(temp);
  });
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
  <link
    href="https://fonts.googleapis.com/css?family={generateFontString(fonts)}"
    rel="stylesheet"
  />
</svelte:head>

<Router
  routes={{
    "/view": View,
    "/editor/:id": Editor,
  }}
/>
