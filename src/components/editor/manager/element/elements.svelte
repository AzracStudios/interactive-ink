<script lang="ts">
  import "./elements.scss";
  import { CurrentPage, SelectedElement } from "../../../../globalStore";
  import type { Component } from "../../../../types";
  import ElementIcon from "./elementIcon.svelte";
  import AddElement from "./addElement.svelte";
  import { AddElementModal } from "../store";
  import { get } from "svelte/store";

  let elements: Component<any>[];
  $: elements;

  let selected: Component<any>;
  $: selected;

  CurrentPage.subscribe((val) => {
    if (val) elements = val.components;
  });

  SelectedElement.set(elements ? elements[0] : undefined);

  SelectedElement.subscribe((val) => {
    selected = val;
  });

  let addElementModal: boolean = false;
  $: addElementModal;

  AddElementModal.subscribe((val) => {
    addElementModal = val;
  });
</script>

<div class="editor__elements">
  <button
    class="add_element action_button"
    on:click={() => {
      AddElementModal.set(true);
    }}
  >
    + Add Element
  </button>

  {#if addElementModal}
    <AddElement />
  {/if}

  {#if elements}
    {#each Object.keys(elements) as id}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="element {selected
          ? selected == elements[id]
            ? 'element--selected'
            : ''
          : null}"
        on:click={() => {
          SelectedElement.set(selected == elements[id] ? null : elements[id]);
        }}
      >
        <div class="left">
          <ElementIcon
            type={elements[id].type}
            selected={selected == elements[id]}
          />
          <p>
            {elements[id].name}
          </p>
        </div>

        <div class="right">
          <svg
            width="21"
            height="23"
            viewBox="0 0 21 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            on:click={() => {
              SelectedElement.set(null);
              let temp = get(CurrentPage);
              delete temp.components[id];
              CurrentPage.set(temp);
            }}
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.38158 3.09314C7.56911 2.9056 7.82347 2.80024 8.08868 2.80024H12.0887C12.3539 2.80024 12.6083 2.9056 12.7958 3.09314C12.9833 3.28067 13.0887 3.53503 13.0887 3.80024V4.80024H7.08868V3.80024C7.08868 3.53503 7.19404 3.28067 7.38158 3.09314ZM5.08868 4.80024V3.80024C5.08868 3.00459 5.40476 2.24153 5.96736 1.67892C6.52997 1.11631 7.29303 0.800242 8.08868 0.800242H12.0887C12.8843 0.800242 13.6474 1.11631 14.21 1.67892C14.7726 2.24153 15.0887 3.00459 15.0887 3.80024V4.80024H17.0887H19.0887C19.641 4.80024 20.0887 5.24796 20.0887 5.80024C20.0887 6.35253 19.641 6.80024 19.0887 6.80024H18.0887V19.8002C18.0887 20.5959 17.7726 21.359 17.21 21.9216C16.6474 22.4842 15.8843 22.8002 15.0887 22.8002H5.08868C4.29303 22.8002 3.52997 22.4842 2.96736 21.9216C2.40475 21.359 2.08868 20.5959 2.08868 19.8002V6.80024H1.08868C0.536399 6.80024 0.0886841 6.35253 0.0886841 5.80024C0.0886841 5.24796 0.536399 4.80024 1.08868 4.80024H3.08868H5.08868ZM6.08868 6.80024H14.0887H16.0887V19.8002C16.0887 20.0655 15.9833 20.3198 15.7958 20.5073C15.6083 20.6949 15.3539 20.8002 15.0887 20.8002H5.08868C4.82347 20.8002 4.56911 20.6949 4.38158 20.5073C4.19404 20.3198 4.08868 20.0655 4.08868 19.8002V6.80024H6.08868ZM8.08868 9.80024C8.64097 9.80024 9.08868 10.248 9.08868 10.8002V16.8002C9.08868 17.3525 8.64097 17.8002 8.08868 17.8002C7.5364 17.8002 7.08868 17.3525 7.08868 16.8002V10.8002C7.08868 10.248 7.5364 9.80024 8.08868 9.80024ZM13.0887 16.8002V10.8002C13.0887 10.248 12.641 9.80024 12.0887 9.80024C11.5364 9.80024 11.0887 10.248 11.0887 10.8002V16.8002C11.0887 17.3525 11.5364 17.8002 12.0887 17.8002C12.641 17.8002 13.0887 17.3525 13.0887 16.8002Z"
              fill="#FA3535"
            />
          </svg>
        </div>
      </div>
    {/each}
  {/if}
</div>
