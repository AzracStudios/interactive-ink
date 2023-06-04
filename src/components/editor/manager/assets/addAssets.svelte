<script lang="ts">
  import { get } from "svelte/store";
  import { Fonts, Images, ProjectId } from "../../../../globalStore";
  import "../element/addElement.scss";
  import { AddAssetModal } from "../store";
  import { fetchImages, uploadImage } from "../../../../lib/pocketbase";
  import { sleep } from "../../../../utils";
  let currentTab: string = "Font";
  $: currentTab;

  let fontName: string;

  const addFont = async () => {
    try {
      await fetch(`https://fonts.googleapis.com/css?family=${fontName}`);
    } catch {
      return alert("Font Does Not Exist");
    }

    let temp = get(Fonts);
    temp.push(fontName);
    Fonts.set(temp);
    AddAssetModal.set(false);
    alert("Font Added Successfully!");
    fontName = "";
  };

  let fileField: HTMLInputElement;
  $: fileField;

  let fileFieldText: string;
  $: fileFieldText;

  let uploading: boolean = false;
  $: uploading;

  const addImage = async (e: SubmitEvent) => {
    uploading = true;
    await sleep(1000 * fileField.files.length);

    if (fileField.files) {
      for (let i = 0; i < fileField.files.length; i++) {
        const data = new FormData();
        data.append("image", fileField.files[i]);
        data.append("project_id", get(ProjectId));
        await uploadImage(data);
      }
    }

    AddAssetModal.set(false);
    alert("Files uploaded successfully!");
    Images.set(await fetchImages(get(ProjectId)));
    uploading = false;
  };

  onkeydown = (e) => {
    if (e.code == "Escape") AddAssetModal.set(false);
  };

  let hasFile = false;
  $: hasFile;
</script>

<div class="overlay" />
<div class="add_asset_modal">
  <div class="head">
    <p>Add Assets</p>
  </div>

  <div class="tabs">
    {#each ["Font", "Image"] as tab}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="tab {currentTab == tab ? 'tab--active' : ''}"
        on:click={() => {
          currentTab = tab;
        }}
      >
        <p>{tab}</p>
      </div>
    {/each}
  </div>

  {#if currentTab == "Font"}
    <div class="fonts_tab">
      <div class="wrapper">
        <div class="field">
          <p class="label text_bold">Font Name</p>
          <div class="flex justify_between" style="gap: 1rem;">
            <input type="text" bind:value={fontName} />
            <button on:click={addFont}>Add</button>
          </div>
        </div>

        <button
          class="action_button"
          on:click={() => {
            window.open("https://fonts.google.com", "_blank");
          }}>Browse Fonts</button
        >
      </div>
    </div>
  {/if}

  {#if currentTab == "Image"}
    <div class="image_tab">
      <div class="wrapper">
        <form
          enctype="multipart/form-data"
          on:submit={(e) => {
            e.preventDefault();
            addImage(e);
          }}
        >
          <input
            type="file"
            accept="image/jpeg, image/jpg, image/webp, image/gif, image/svg+xml, image/png"
            name="fileInput"
            bind:this={fileField}
            multiple
            on:change={(e) => {
              hasFile = true;
            }}
            on:input={(e) => {
              fileFieldText =
                fileField.files.length == 0
                  ? "Select Files"
                  : `${fileField.files.length} ${
                      fileField.files.length == 1 ? "file" : "files"
                    } selected`;
            }}
          />
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          {#if fileField}
            <div
              class="select_file flex justify_between"
              on:click={() => {
                fileField.click();
              }}
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 3C0 1.34315 1.34315 0 3 0H33C34.6569 0 36 1.34315 36 3V33C36 34.6569 34.6569 36 33 36H3C1.34315 36 0 34.6569 0 33V3ZM3 2C2.44772 2 2 2.44772 2 3V27.6195L7.71512 20.3804C7.89905 20.1474 8.17697 20.0082 8.47369 20.0003C8.77042 19.9925 9.05528 20.117 9.25121 20.3399L14.3013 26.0874L21.8282 15.4234C22.0063 15.171 22.2911 15.0151 22.5996 15.001C22.9082 14.987 23.206 15.1163 23.4063 15.3514L34 27.7845V3C34 2.44772 33.5523 2 33 2H3ZM2 33V30.8472L8.5411 22.5618L13.6359 28.3601C13.838 28.5901 14.1344 28.7149 14.4402 28.6986C14.746 28.6823 15.0275 28.5268 15.2041 28.2766L22.7194 17.629L34 30.8683V33C34 33.5523 33.5523 34 33 34H3C2.44772 34 2 33.5523 2 33ZM9 7C6.79086 7 5 8.79086 5 11C5 13.2091 6.79086 15 9 15C11.2091 15 13 13.2091 13 11C13 8.79086 11.2091 7 9 7ZM7 11C7 9.89543 7.89543 9 9 9C10.1046 9 11 9.89543 11 11C11 12.1046 10.1046 13 9 13C7.89543 13 7 12.1046 7 11Z"
                  fill="white"
                />
              </svg>
              <p>{fileFieldText || "Select Files"}</p>
            </div>
          {/if}
          <p class="size-text">Max Size: 5MB per file</p>

          {#if hasFile}
            <div class="btn_wrapper">
              <input type="submit" value="Upload Image" class="action_button" />
            </div>
          {/if}

          {#if uploading}
            <p class="text_bold" style="text-align:center;">
              Uploading Files...
            </p>
          {/if}
        </form>
      </div>
    </div>
  {/if}
</div>
