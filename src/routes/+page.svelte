<script>
  import "../global.css";
  import { goto } from '$app/navigation';

  function handleClick() {
    goto('/camera');
  }
</script>

<div class="wrapper">
  <img src="/imgs/header.png" alt="header" class="header"/>
  <img src="/imgs/body.png" alt="body" class="body"/>
  <img src="/imgs/gnb.png" alt="gnb" class="gnb"/>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="camera" on:click={handleClick}/>
</div>

<style>
  .wrapper {
    display: flex;
    flex-wrap: wrap;
  }

  .header {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 1;
  }

  .body {
    width: 100%;
    margin-top: 56px;
    margin-bottom: 56px;
  }

  .gnb {
    width: 100%;
    position: fixed;
    bottom: 0;
  }

  .camera {
    min-width: 12%;
    height: 0;
    padding-bottom: 12%;
    position: fixed;
    left: 44%;
    bottom: 1%;
    border-radius: 50%;
  }
</style>