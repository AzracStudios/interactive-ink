<script lang="ts">
  import { get } from "svelte/store";
  import { CurrentPage } from "../../../../globalStore";
  import { AddElementModal } from "../store";
  import ElementIcon from "./elementIcon.svelte";
  import { TextTemplate } from "../../../../templates/text";
  import { ImageTemplate } from "../../../../templates/image";

  const elements = ["Text", "Image"];
  const templates = {
    Text: TextTemplate,
    Image: ImageTemplate,
  };

  const handleClick = (element: string) => {
    AddElementModal.set(false);
    let id = crypto.randomUUID();
    let temp = get(CurrentPage);
    let toAdd = structuredClone(templates[element]);
    toAdd["id"] = id;
    temp.components[id] = toAdd;
    CurrentPage.set(temp);
  };
</script>

<div class="overlay" />
<div class="add_element_modal">
  <div class="head">
    <p>Add Element</p>
  </div>

  <div class="elements">
    {#each elements as element}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="element_card" on:click={() => handleClick(element)}>
        <ElementIcon type={element} selected={false} />
        <p>{element}</p>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    background: rgba(255, 255, 255, 0.763);
    width: 100vw;
    height: 100vh;
  }

  .add_element_modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50vw;
    height: 50vh;
    background: white;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    border-radius: 1rem;
    z-index: 501;

    .head {
      font-size: 1.2rem;
      font-weight: bold;
      width: fit-content;
      padding: 0.5rem;
      margin-inline: auto;
    }

    .elements {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      padding: 2rem;
      gap: 2rem;

      .element_card {
        width: 7rem;
        height: 7rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        box-shadow: 0px 0px 2px rgb(0 0 0 / 0.4);
        border-radius: 0.2rem;
        cursor: pointer;
      }
    }
  }
</style>
