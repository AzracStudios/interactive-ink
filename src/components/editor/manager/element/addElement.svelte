<script lang="ts">
  import { get } from "svelte/store";
  import { CurrentPage, SelectedElement } from "../../../../globalStore";
  import { AddElementModal } from "../store";
  import ElementIcon from "./elementIcon.svelte";
  import { TextTemplate } from "../../../../templates/text";
  import { ImageTemplate } from "../../../../templates/image";
  import "./addElement.scss";
  import { RectTemplate } from "../../../../templates/rect";

  const elements = ["Text", "Image", "Rect"];
  const templates = {
    Text: TextTemplate,
    Image: ImageTemplate,
    Rect: RectTemplate,
  };

  const handleClick = (element: string) => {
    AddElementModal.set(false);
    let id = crypto.randomUUID();
    let temp = get(CurrentPage);
    let toAdd = structuredClone(templates[element]);
    toAdd["id"] = id;
    temp.components[id] = toAdd;
    CurrentPage.set(temp);
    SelectedElement.set(toAdd);
  };

  onkeydown = (e) => {
    if (e.code == "Escape") AddElementModal.set(false);
  };
</script>

<div class="overlay" />
<div class="add_element_modal">
  <div class="head">
    <p>Add Element</p>
  </div>

  <div class="elements flex justify_center">
    {#each elements as element}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="element_card" on:click={() => handleClick(element)}>
        <ElementIcon type={element} selected={false} />
        <p>{element}</p>
      </div>
    {/each}
  </div>
</div>
