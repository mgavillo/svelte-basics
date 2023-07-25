<script lang="ts">
  import { afterUpdate, onDestroy, onMount } from "svelte";
  import { hover, action} from "./gameStore";
  import { tweened } from "svelte/motion";
  import { quintOut } from "svelte/easing";
  import { draw, fade, slide } from "svelte/transition";

  console.log($hover, $action);
</script>

<div
  class="absolute text-5xl z-50 -translate-y-full"
  style={`top:${$hover.screenPos[1]}px; left:${$hover.screenPos[0]}px`}
>
  {#key $hover.name}
    <div class="flex flex-row gap-1">
      {#if $hover.name !== ""}
        <svg viewBox="0 0 130 200" width="130px" height="200px">
          <!-- <text
          in:fade={{ duration: 1000, easing: quintOut, delay: 500 }}
          x="132"
          y="24"
          dominant-baseline="middle"
          text-anchor="left"
          fill="white"
          font-size="20px">{$hover.name}</text
        > -->
          <circle
            in:draw={{ duration: 1500, easing: quintOut }}
            cx="16"
            cy="184"
            r="15"
            stroke="white"
            stroke-width="1"
            fill="transparent"
          />
          <line
            in:draw={{ duration: 1500, easing: quintOut }}
            x1={40}
            y1={160}
            x2={130}
            y2={10}
            stroke="white"
            stroke-width="1"
          />
          <!-- {/if} -->
        </svg>
      {/if}
      <div>
        <p
          class=" text-sm"
          in:slide={{ duration: 1000, easing: quintOut, delay: 500 }}
        >
          
          {$hover.name}
        </p>
      </div>
    </div>
  {/key}
</div>
