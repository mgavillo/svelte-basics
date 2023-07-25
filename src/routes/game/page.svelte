<script lang="ts">
  import { gameState } from "../gameState";
  import Waiting from "./waiting.svelte";
  import Game from "./game.svelte";
  import Start from "./start.svelte";
  import { onMount } from "svelte";

  gameState.set("Waiting");
  onMount(() => {
    setTimeout(() => {
      gameState.set("Playing")
    }, 3000)
    setTimeout(() => {
      gameState.set("Starting")
    }, 1000)
  })
</script>

<main class="w-screen min-h-screen flex flex-col items-center">
  {#if $gameState === "Waiting"}
    <Waiting />
  {/if}
  {#if $gameState === "Starting"}
    <Start/>
  {/if}
  {#if $gameState === "Playing"}
    <Game/>
  {/if}
</main>
