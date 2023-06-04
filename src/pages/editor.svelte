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
  import Image from "../components/renderer/image.svelte";

  let loaded = false;
  $: loaded;

  export let params;

  onMount(async () => {
    ProjectId.set(params.id);
    const project: Project = await loadProject(params.id);
    Images.set(await fetchImages(params.id));
    ProjectConfiguration.set(project.config);
    ProjectData.set(project.data);
    CurrentPage.set(project.data[0]);
    loaded = true;
  });
</script>

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

<style lang="scss">
  .editor {
    font-family: "Poppins", sans-serif;
  }

  .vertical_flex {
    display: flex;
    flex-direction: column;
    height: 100svh;
  }

  .horizontal_flex {
    display: flex;
    justify-content: space-between;
    height: 100%;
    overflow: hidden;
  }
</style>
