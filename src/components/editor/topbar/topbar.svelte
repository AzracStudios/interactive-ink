<script lang="ts">
  import { get } from "svelte/store";
  import {
    CurrentPage,
    ProjectConfiguration,
    ProjectData,
  } from "../../../globalStore";
  import { saveProject } from "../../../lib/pocketbase";
  import "./topbar.scss";
</script>

<div class="editor__topbar flex justify_between full_width">
  <div class="left">
    <p>Left</p>
  </div>

  <p class="text_bold">Test Project</p>

  <div class="right">
    <button
      class="save"
      on:click={async () => {
        let data = get(ProjectData);
        data[0] = get(CurrentPage);
        
        await saveProject({
          config: get(ProjectConfiguration),
          data: data,
        });
        console.log("HOLA")
      }}>Save</button
    >
  </div>
</div>
