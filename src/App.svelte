<script>
  import Router from "svelte-spa-router";
  import View from "./pages/view.svelte";
  import Editor from "./pages/editor.svelte";
  import { get } from "svelte/store";
</script>

<Router
  routes={{
    "/view": View,
    "/editor": Editor,
  }}
/>
