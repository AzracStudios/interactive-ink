<script lang="ts">
  import { get } from "svelte/store";
  import { CurrentPage, SelectedElement } from "../../../globalStore";
  import "./fields.scss";
  import type { Field } from "../../../types";

  export let property: Field<any>;
  export let writeTo: string;
  export let fieldKey: string;
  let value = null;

  const handleWrite = () => {
    if (writeTo == "page") {
      let temp = get(CurrentPage);
      temp[fieldKey].fieldValue = property.fieldValue;
      return CurrentPage.set(temp);
    }

    let temp = get(SelectedElement);
    temp[writeTo][fieldKey].fieldValue = property.fieldValue;
    SelectedElement.set(temp);
  };
</script>

{#if property}
  <div class="dynamic_field">
    {#if property.fieldType == "String"}
      <p class="label">{property.fieldName}</p>
      <div class="value">
        <input
          type="text"
          bind:value={property.fieldValue}
          on:input={handleWrite}
        />
      </div>
    {/if}
    {#if property.fieldType == "TextArea"}
      <p class="label">{property.fieldName}</p>
      <div class="value">
        <textarea bind:value={property.fieldValue} on:input={handleWrite} />
      </div>
    {/if}

    {#if property.fieldType == "Enum"}
      <p class="label">{property.fieldName}</p>
      <div class="value">
        <select
          name={property.fieldName}
          bind:value={property.fieldValue}
          on:change={handleWrite}
        >
          {#each property.fieldOptions as opt}
            <option value={opt}>{opt}</option>
          {/each}
        </select>
      </div>
    {/if}

    {#if property.fieldType == "Number"}
      <p class="label">{property.fieldName}</p>
      <div class="value">
        <input
          type="number"
          bind:value={property.fieldValue}
          on:input={handleWrite}
        />
      </div>
    {/if}

    {#if property.fieldType == "Color"}
      <p class="label">{property.fieldName}</p>
      <div class="value">
        <div class="color" style="background: {property.fieldValue}" />
        <input
          type="color"
          bind:value={property.fieldValue}
          on:input={handleWrite}
        />
      </div>
    {/if}

    {#if property.fieldType == "Boolean"}
      <p class="label">{property.fieldName}</p>
      <div class="value">
        <input
          type="checkbox"
          bind:checked={property.fieldValue}
          on:change={handleWrite}
        />
      </div>
    {/if}

    {#if property.fieldType == "Vector2"}
      <p class="label">{property.fieldName}</p>
      <div class="value">
        <input
          type="number"
          bind:value={property.fieldValue.x}
          on:input={handleWrite}
        />
        <input
          type="number"
          bind:value={property.fieldValue.y}
          on:input={handleWrite}
        />
      </div>
    {/if}
  </div>
{/if}
