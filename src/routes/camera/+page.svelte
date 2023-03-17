<script lang="ts">
  import "../../global.css";
  import "../../static.css";
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { goto } from '$app/navigation';

  onMount(async function () {
    if (typeof window === 'undefined') return;
    let videoStream: MediaStream = await window.navigator.mediaDevices.getUserMedia(
      {
        video: { facingMode: 'user', aspectRatio: { exact: window.innerWidth / window.innerHeight } }
      }
    );
    const videoElement: HTMLVideoElement | null = document.querySelector('video');
    if (!videoElement) return;
    videoElement.srcObject = videoStream;
    await videoElement.play();
  });

  function handleClickX() {
    goto('/');
  }

  function handleClickCamera() {
    goto('/result');
  }
</script>

<div class="wrapper" transition:fly="{{ y: '100vh', duration: 300 }}">
  <video class="video">
    <track kind="captions">
  </video>
  <div class="horizontal-divider" style="top: 25%"/>
  <div class="horizontal-divider" style="top: 50%"/>
  <div class="horizontal-divider" style="top: 75%"/>
  <div class="vertical-divider" style="left: 33%"/>
  <div class="vertical-divider" style="left: 66%"/>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <img src="icons/x.png" alt="x" class="x" on:click={handleClickX}/>
  <img src="icons/light.png" alt="light" class="light" />
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <img src="icons/camera.png" alt="camera" class="camera" on:click={handleClickCamera}/>
  <div class="guide">초점을 맞춰 수평으로 찍어주세요</div>
</div>

<style>
  .wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  .video {
    width: 100%;
    height: 100vh;
    transform: scaleX(-1);
  }

  .vertical-divider {
    top: 0;
    position: absolute;
    width: 0.5px;
    height: 100%;
    background: white;
  }

  .horizontal-divider {
    position: absolute;
    width: 100%;
    height: 0.5px;
    background: white;
  }

  .x {
    position: absolute;
    top: 19.75px;
    left: 19.75px;
    width: 24px;
    height: 24px;
  }

  .light {
    position: absolute;
    top: 19.75px;
    right: 19.75px;
    width: 14px;
    height: 20px;
  }

  .camera {
    position: absolute;
    width: 68px;
    height: 68px;
    left: calc(50% - 34px);
    bottom: 32px;
  }

  .guide {
    position: absolute;
    width: 147px;
    height: 48px;
    left: calc(50% - 73.5px);
    top: calc(50% - 24px);
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    line-height: 24px;
    text-align: center;
    letter-spacing: -0.01em;
    color: white;
    text-shadow: 0px 0px 6px rgba(0, 0, 0, 0.4);
  }
</style>