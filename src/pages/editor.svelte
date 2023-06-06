<script lang="ts">
  import EditView from "../components/editor/edit/editView.svelte";
  import Topbar from "../components/editor/topbar/topbar.svelte";
  import ManagerPanel from "../components/editor/manager/managerPanel.svelte";
  import InspectorPanel from "../components/editor/inspector/inspectorPanel.svelte";
  import {
    CurrentPage,
    Images,
    ProjectConfiguration,
    ProjectData,
    ProjectId,
  } from "../globalStore";
  import { onMount } from "svelte";
  import { fetchImages, loadProject } from "../lib/pocketbase";
  import type { Project } from "../types";
  import "./editor.scss";
  import { sleep } from "../utils";
  import Loader from "../components/shared/loader.svelte";

  let loaded = false;
  $: loaded;

  let loaderOut = false;
  $: loaderOut;

  export let params;

  onMount(async () => {
    ProjectId.set(params.id);
    const project: Project = await loadProject(params.id);
    Images.set(await fetchImages(params.id));
    ProjectConfiguration.set(project.config);
    ProjectData.set(project.data);
    CurrentPage.set(project.data[0]);
    loaderOut = true;
    await sleep(500);
    loaded = true;
  });
</script>

<svelte:head>
  <title>Interactive Ink - Editor</title>
</svelte:head>

{#if loaded}
  <div class="editor">
    <div class="vertical_flex">
      <Topbar />
      <div class="horizontal_flex">
        <ManagerPanel />
        <EditView />
        <InspectorPanel />
      </div>
    </div>
  </div>
{/if}

{#if !loaded}
  <Loader {loaderOut}/>
{/if}
