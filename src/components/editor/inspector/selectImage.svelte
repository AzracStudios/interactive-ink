<script lang="ts">
  import { get } from "svelte/store";
  import { Images } from "../../../globalStore";
  import "./imgselect.scss";
  export let value: string;
  export let visibility: boolean;
  export let handleWrite: () => void;
</script>

<div class="overlay" />
<div class="select_image_modal">
  <p class="head">Select Image</p>
  <div class="elements flex justify_center">
    {#each get(Images) as image}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <img
        src="{image.src}?thumb=200x0"
        alt={image.src}
        on:click={() => {
          value = image.src;
          visibility = false;
          handleWrite()
        }}
      />
    {/each}
  </div>
</div>
