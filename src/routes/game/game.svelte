<script lang="ts">
  import { onMount } from "svelte";
  import Hud from "./hud.svelte";
  import Indicator from "./indicator.svelte";
  import { createScene } from "./scene";
  let el: HTMLCanvasElement;
  let minutes: number = 3;
  let secs: number = 0;
  onMount(() => {
    setInterval(() => {
      if (secs > 0) secs -= 1;
      else {
        secs = 59;
        minutes -= 1;
      }
    }, 3000);
    createScene(el);
  });
</script>

<div class="w-full h-full relative">
  <Hud />
  <!-- <div
    class="absolute top-4 grid grid-flow-col gap-5 text-center auto-cols-max bg-transparent z-30"
  >
    <div class="flex flex-col">
      <span class="countdown font-mono text-5xl">
        <span style="--value:{minutes};" />
      </span>
      min
    </div>
    <div class="flex flex-col">
      <span class="countdown font-mono text-5xl">
        <span style="--value:{secs};" />
      </span>
      sec
    </div>
  </div> -->
  <Indicator />
  <canvas class="w-full h-full absolute z-0" bind:this={el} />
</div>
