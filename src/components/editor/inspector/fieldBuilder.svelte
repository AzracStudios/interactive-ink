<script lang="ts">
  import { get } from "svelte/store";
  import { CurrentPage, Fonts, SelectedElement } from "../../../globalStore";
  import "./fields.scss";
  import type { Field } from "../../../types";
  import SelectImage from "./selectImage.svelte";

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

    if (["blur", "shadow", "outline"].includes(writeTo)) {
      let temp = get(SelectedElement);
      temp.effects[writeTo][fieldKey].fieldValue = property.fieldValue;
      return SelectedElement.set(temp);
    }

    let temp = get(SelectedElement);
    temp[writeTo][fieldKey].fieldValue = property.fieldValue;
    SelectedElement.set(temp);
  };

  export let fonts = [];
  let selectImage = false;
  $: selectImage;
</script>

{#if property}
  <div class="dynamic_field">
    <p class="label">{property.fieldName}</p>

    <div class="value">
      {#if property.fieldType == "String"}
        <input
          type="text"
          bind:value={property.fieldValue}
          on:input={handleWrite}
        />
      {/if}
      {#if property.fieldType == "TextArea"}
        <textarea bind:value={property.fieldValue} on:input={handleWrite} />
      {/if}
      {#if property.fieldType == "Enum"}
        <select
          name={property.fieldName}
          bind:value={property.fieldValue}
          on:change={handleWrite}
        >
          {#each property.fieldOptions as opt}
            <option value={opt}>{opt}</option>
          {/each}
        </select>
      {/if}
      {#if property.fieldType == "FontEnum"}
        <select
          name={property.fieldName}
          bind:value={property.fieldValue}
          on:change={handleWrite}
        >
          {#each fonts as opt, _}
            <option value={opt}>{opt}</option>
          {/each}
        </select>
      {/if}
      {#if property.fieldType == "Number"}
        <input
          type="number"
          bind:value={property.fieldValue}
          on:input={handleWrite}
        />
      {/if}
      {#if property.fieldType == "Range"}
        <input
          type="range"
          name="range"
          bind:value={property.fieldValue}
          on:input={handleWrite}
          min={property.fieldOptions[0]}
          max={property.fieldOptions[1]}
          style="width: 85%"
        />

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <svg
          width="48"
          height="41"
          viewBox="0 0 48 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style="width: 10%; position: absolute; left: 95%; "
          on:click={() => {
            property.fieldValue = property.fieldDefault;
            handleWrite();
          }}
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17.0859 3.33627C20.4806 2.66103 23.9993 3.00758 27.197 4.33212C30.3947 5.65665 33.1278 7.89967 35.0507 10.7775C36.6565 13.1807 37.637 15.9364 37.9168 18.7955L33.0607 13.9393C32.4749 13.3536 31.5251 13.3536 30.9394 13.9393C30.3536 14.5251 30.3536 15.4749 30.9394 16.0607L37.9393 23.0607C38.5251 23.6465 39.4749 23.6465 40.0607 23.0607L47.0607 16.0607C47.6465 15.4749 47.6465 14.5251 47.0607 13.9393C46.4749 13.3536 45.5251 13.3536 44.9393 13.9393L40.8505 18.0282C40.4643 14.8492 39.337 11.7926 37.5451 9.11082C35.2926 5.73961 32.0909 3.11208 28.345 1.56048C24.5991 0.00888231 20.4773 -0.397086 16.5007 0.393911C12.524 1.18491 8.8713 3.13734 6.00432 6.00432C3.13734 8.8713 1.18491 12.524 0.393911 16.5007C-0.397086 20.4773 0.00888236 24.5991 1.56048 28.345C3.11208 32.0909 5.73961 35.2926 9.11082 37.5451C12.482 39.7977 16.4455 41 20.5 41C21.3284 41 22 40.3284 22 39.5C22 38.6716 21.3284 38 20.5 38C17.0388 38 13.6554 36.9737 10.7775 35.0507C7.89967 33.1278 5.65665 30.3947 4.33212 27.197C3.00758 23.9993 2.66103 20.4806 3.33627 17.0859C4.01151 13.6913 5.67822 10.5731 8.12564 8.12564C10.5731 5.67822 13.6913 4.01151 17.0859 3.33627Z"
            fill="#a8a8a8"
          />
        </svg>
      {/if}
      {#if property.fieldType == "Color"}
        <div class="color" style="background: {property.fieldValue}" />
        <input
          type="color"
          bind:value={property.fieldValue}
          on:input={handleWrite}
        />
      {/if}
      {#if property.fieldType == "Image"}
        <div style="width: 100%%;">
          <button
            class="action_button"
            on:click={() => {
              selectImage = true;
            }}>Select Image</button
          >
        </div>
      {/if}

      {#if property.fieldType == "Boolean"}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="tabs">
          <div
            class="tab {property.fieldValue == true ? 'tab--active' : ''}"
            on:click={() => {
              property.fieldValue = true;
              handleWrite();
            }}
          >
            <p>Yes</p>
          </div>
          <div
            class="tab {property.fieldValue == false ? 'tab--active' : ''}"
            on:click={() => {
              property.fieldValue = false;
              handleWrite();
            }}
          >
            <p>No</p>
          </div>
        </div>
      {/if}
      {#if property.fieldType == "Vector2"}
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
      {/if}
    </div>
  </div>
{/if}
{#if selectImage}
  <SelectImage
    bind:value={property.fieldValue}
    bind:visibility={selectImage}
    {handleWrite}
  />
{/if}
