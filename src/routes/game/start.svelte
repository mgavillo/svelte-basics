<script>
    	import { slide, draw, fade } from 'svelte/transition';
        import { quintOut } from 'svelte/easing';
</script>

<div
  class="w-full h-screen bg-gradient-radial from-base-100 to-base-300 flex flex-col items-center justify-center py-12 gap-10"
>
  <div class="flex flex-row">
    <div class="img-container relative p-[1px] bg-white" transition:fade="{{delay: 250, duration: 300, easing: quintOut}}">
      <img class="" src="/human.png" alt="a human" />
      <span
        class="absolute bottom-0 bg-white right-7 align-bottom px-4 text-black"
        >r25</span
      >
    </div>
    <div class="img-container relative p-[1px] bg-white" transition:fade="{{delay: 250, duration: 300, easing: quintOut}}">
      <img class="" src="/alien.png" alt="an alien" />
      <span
        class="absolute bottom-0 bg-white right-7 align-bottom px-4 text-black"
        >r25</span
      >
    </div>
  </div>
</div>

<style>
  .img-container {
    width: 700px;
    border: 1px;
    clip-path: polygon(80% 0, 100% 10%, 100% 100%, 20% 100%, 0% 90%, 0 0);
  }
  img {
    width: 100%;
    clip-path: polygon(80% 0, 100% 10%, 100% 100%, 20% 100%, 0% 90%, 0 0);
  }
</style>
