<script lang="ts">
  import { onMount } from "svelte";
  import "./home.scss";
  import { fetchProjects } from "../lib/pocketbase";
  import Loader from "../components/shared/loader.svelte";
  import Page from "../components/renderer/page.svelte";
  import { dateString } from "../utils";

  let projects: any[];
  $: projects;

  let canvasScaleFactor: number;
  $: canvasScaleFactor;

  onMount(async () => {
    projects = await fetchProjects();
  });
</script>

{#if projects}
  <nav>
    <div class="logo">
      <img src="/logo.svg" alt="logo" />
      <p>Interactable Ink</p>
    </div>
    <button>Create New Project</button>
  </nav>

  <div class="page-wrapper">
    <p class="head">Projects</p>
    <div class="projects">
      {#each projects as project}
        <a href="/#/editor/{project.project.config.id}">
          <div class="project">
            <p style="font-weight: bold;">{project.project.config.name}</p>
            <p>
              Last Modified: {dateString(project.project.config.lastModified) ||
                "Never"}
            </p>
          </div>
        </a>
      {/each}
    </div>
  </div>
{:else}
  <Loader loaderOut={!!projects} />
{/if}
