<script>
  import { get } from "svelte/store";
  import { action } from "./gameStore";
</script>

<div
  class="absolute top-4 left-4 flex flex-col bg-transparent border-white rounded-sm border p-4 px-8 gap-4 z-30"
  style=""
>
  <h2 class="font-bold text-2xl">Action points left: {3}</h2>
  <button
    class="border border-white rounded-sm p-2 flex-col flex indicator cursor-pointer {$action == "move" ? "bg-neutral text-secondary" : "bg-transparent"} hover:bg-neutral hover:text-secondary transition-all"
    on:click={() => action.set("move")}
  >
    <span class="indicator-item badge badge-secondary">0 AP</span>

    <h3 class="font-bold">Move</h3>
    <div>Kitchen, Bed Room</div>
  </button>
  <button
    class="border border-white rounded-sm p-2 indicator {$action == "shoot" ? "bg-neutral text-secondary" : "bg-transparent"} hover:bg-neutral hover:text-secondary transition-all"
    on:click={() => action.set("shoot")}
  >
    <span class="indicator-item badge badge-secondary">0 AP</span>

    <h3 class="font-bold">Shoot</h3>
    <div>Kitchen, Bed Room</div>
  </button>

  <p class="font-bold border border-white rounded-sm p-2 indicator">
    Jump The Rail:
    <span class="indicator-item badge badge-secondary">0 AP</span>
    <span class=" font-normal">Move directly to the kitchen</span>
  </p>
</div>
