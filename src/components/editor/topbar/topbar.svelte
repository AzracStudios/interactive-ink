<script lang="ts">
  import { get } from "svelte/store";
  import {
    CurrentPage,
    FileHistory,
    HistoryIndex,
    ProjectConfiguration,
    ProjectData,
    SelectedElement,
    Clipboard,
  } from "../../../globalStore";
  import { saveProject } from "../../../lib/pocketbase";
  import "./topbar.scss";
  import type { ProjectConfig } from "../../../types";

  let conf: ProjectConfig;
  $: conf;

  let saving: boolean;
  $: saving;

  ProjectConfiguration.subscribe((val) => {
    conf = val;
  });

  let menu = [
    {
      title: "File",
      open: false,
      options: [
        {
          title: "Save",
          do: async () => {
            let data = get(ProjectData);
            data[0] = get(CurrentPage);
            saving = true;
            await saveProject({
              config: get(ProjectConfiguration),
              data: data,
            });
            saving = false;
          },
        },
        {
          title: "Preview",
          do: () => {
            window.open(`/#/view/${conf.id}?preview=true`);
          },
        },
        {
          title: "Publish",
          do: () => {
            alert("Publish Modal Placeholder");
          },
        },
      ],
    },
    {
      title: "Edit",
      open: false,
      options: [
        {
          title: "Undo",
          do: () => {
            if (get(HistoryIndex) < 0) return;
            HistoryIndex.set(get(HistoryIndex) - 1);
          },
        },
        {
          title: "Redo",
          do: () => {
            if (get(HistoryIndex) > get(FileHistory).length - 2) return;
            HistoryIndex.set(get(HistoryIndex) + 1);
          },
        },
        {
          title: "Cut",
          do: () => {
            let selected = get(SelectedElement);
            if (!selected) return;
            Clipboard.set(structuredClone(selected));
            let currentPage = get(CurrentPage);
            delete currentPage.components[selected.id];
            CurrentPage.set(currentPage);
            SelectedElement.set(null);
          },
        },
        {
          title: "Copy",
          do: () => {
            let selected = get(SelectedElement);
            if (!selected) return;
            Clipboard.set(structuredClone(selected));
            console.log(get(Clipboard))
          },
        },
        {
          title: "Paste",
          do: () => {
            SelectedElement.set(null);
            let element = get(Clipboard);
            let currentPage = get(CurrentPage);
            let id = crypto.randomUUID();
            element.id = id;
            currentPage.components[id] = element;
            element.transform.position.fieldValue.x += 30;
            element.transform.position.fieldValue.y += 30; 
            CurrentPage.set(currentPage);
            SelectedElement.set(get(CurrentPage).components[element.id]);
          },
        },
      ],
    },
  ];
</script>

<div class="editor__topbar flex justify_between full_width">
  <div class="left">
    <a class="logo" href="/#/home"> <img src="/logo.svg" alt="logo" /></a>
    <div class="menu">
      {#each menu as menu_item}
        <div class="menu-item">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <p
            class="disp"
            on:click={() => {
              for (let i = 0; i < menu.length; i++) {
                if (menu[i].title == menu_item.title) continue;
                menu[i].open = false;
              }
              menu_item.open = !menu_item.open;
            }}
          >
            {menu_item.title}
          </p>

          {#if menu_item.open}
            <div class="opt">
              {#each menu_item.options as opt}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <p
                  class="opt-item"
                  on:click={() => {
                    menu_item.open = false;
                    opt.do();
                  }}
                >
                  {opt.title}
                </p>
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <div class="center">
    <p class="text_bold">{conf.name}</p>
  </div>

  <div class="right">
    <p>
      Developed By <a href="https://adarshravikumar.netlify.app"
        >Adarsh Ravikumar</a
      >
    </p>
  </div>

  {#if saving}
    <div class="overlay" />
    <div class="save_modal">
      <p>Saving Document</p>
      <p>DO NOT CLOSE THIS TAB!</p>
    </div>
  {/if}
</div>
