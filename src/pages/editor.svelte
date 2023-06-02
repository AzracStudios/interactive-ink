<script>
  import EditView from "../components/editor/edit/editView.svelte";
  import Topbar from "../components/editor/topbar/topbar.svelte";
  import ManagerPanel from "../components/editor/manager/managerPanel.svelte";
  import InspectorPanel from "../components/editor/inspector/inspectorPanel.svelte";
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Noto+Serif+Display:wght@300&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="editor">
  <div class="vertical_flex">
  <Topbar />
  <div class="horizontal_flex">
    <ManagerPanel />
    <EditView />
    <InspectorPanel />
  </div>
  </div>
</div>

<style lang="scss">
  .editor {
    font-family: "Inter", sans-serif;
  }

  .vertical_flex {
    display: flex;
    flex-direction: column;
    height: 100svh;
  }

  .horizontal_flex {
    display: flex;
    justify-content: space-between;
    height: 100%;
    overflow: hidden;
  }
</style>
