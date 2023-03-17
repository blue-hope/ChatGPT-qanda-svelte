<script lang="ts">
  import "../../global.css";
	import { afterUpdate, onMount } from "svelte";
  import { fly } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import { askGPT } from './api';

  let gptMode = 'off';
  let chats: {type: string, message: string}[] = [];
  let element;
  const onModeReserved: {type: string, message: string}[] = [
    {
      type: 'gpt',
      message: '안녕하세요, 저는 GPT에요.<br />검색하신 이미지를 바탕으로 문제를 풀어봤어요. 답변을 보고 이해가 안되거나 더 궁금한 부분이 있다면 물어봐주세요!'
    },
    {
      type: 'gpt-continue',
      message: '<img src="imgs/onanswer1.png" alt="answer1" style="width: 260px; margin-bottom: 2px;"/>정답을 입력해주세요.'
    },
    {
      type: 'user',
      message: '1'
    },
    {
      type: 'gpt',
      message: '정답입니다.<img src="imgs/onanswer2.png" alt="answer2" style="width: 260px; margin-top: 2px; margin-bottom: 2px;"/>정답을 입력해주세요.'
    },
    {
      type: 'user',
      message: '1'
    },
    {
      type: 'gpt',
      message: '정답입니다.<img src="imgs/onanswer3.png" alt="answer3" style="width: 260px; margin-top: 2px; margin-bottom: 2px;"/>정답을 입력해주세요.'
    },
    {
      type: 'user',
      message: '1?'
    },
    {
      type: 'gpt',
      message: '정답입니다.<img src="imgs/onanswer4.png" alt="answer4" style="width: 260px; margin-top: 2px; margin-bottom: 2px;"/>정답을 입력해주세요.'
    },
    {
      type: 'user',
      message: '답을 모르겠어'
    },
    {
      type: 'gpt',
      message: '근과 계수의 상관관계를 통해 해결하실 수 있습니다.'
    },
    {
      type: 'user',
      message: '그게 뭔지 모르겠는데?'
    },
    {
      type: 'gpt',
      message: '<img src="imgs/teacheranswer.png" alt="teacheranswer" style="width: 260px; margin-top: 2px;"/>관련된 개념 공부 영상을 추천해드릴게요.'
    },
    {
      type: 'user',
      message: '아 ㅇㅋ 알겠다! 1번이네'
    },
    {
      type: 'gpt',
      message: '정답이에요! 문제 풀이가 완료되었어요.<br/>더 궁금한 점이 있으면 질문해주시고, 다른 문제가 궁금하다면 사진을 찍어주세요.<br/> <div style="display: flex;flex-direction: row;justify-content: center;align-items: center;padding: 4px 16px;width: 260px;height: 36px;background: #EAEAEA;border-radius: 8px;">사진 찍기</div>'
    },
  ];
  const offModeReserved: {type: string, message: string}[] = [
    {
      type: 'gpt',
      message: '안녕하세요, 저는 GPT에요.<br />검색하신 이미지를 바탕으로 문제를 풀어봤어요. 답변을 보고 이해가 안되거나 더 궁금한 부분이 있다면 물어봐주세요!'
    },
    {
      type: 'gpt-continue',
      message: '<img src="imgs/offanswer1.png" alt="answer1" style="width: 260px;"/>'
    }
  ];
  let reservedCopy = [...offModeReserved];

  function handleClickBack() {
    goto('/camera');
  }

  function handleClickOn() {
    gptMode = 'on'
    reservedCopy = [...onModeReserved];
    chats = []
  }

  function handleClickOff() {
    gptMode = 'off'
    reservedCopy = [...offModeReserved];
    chats = []
  }

  afterUpdate(() => {
		if(chats) scrollToBottom(element);
  });

	$: if(chats && element) {
		console.log("tick");
		scrollToBottom(element);
	}

  const scrollToBottom = async (node) => {
    node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
  };

  onMount(async function () {
    setInterval(() => {
      if (reservedCopy.length === 0) return;
      chats = [...chats, reservedCopy[0]]
      reservedCopy = reservedCopy.slice(1)
    }, 1500)
    // await askGPT();
  })
</script>

<div class="wrapper" transition:fly="{{ y: '100vh', duration: 500 }}">
  <div class="header">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <img src="icons/back.png" alt="back" class="back" on:click={handleClickBack}/>
    <div class="title">검색 결과</div>
    {#if gptMode === 'on'}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <img src="icons/on.png" alt="on" class="mode" on:click={handleClickOff} />
    {:else}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <img src="icons/off.png" alt="off" class="mode" on:click={handleClickOn} />
    {/if}
  </div>
  <img src="imgs/question.png" alt="question" class="question" />
  <div class="slider">
    <img src="imgs/tab.png" alt="tab" class="tab" />
    <div class="gpt-wrapper" bind:this={element}>
      {#each chats as chat, i}
        {#if chat.type === 'gpt'}
          <div key={i} class="gpt-chat" transition:fly="{{ y: 100, duration: 300 }}">
            <img src="icons/gpt.png" alt="gpt" class="gpt" />
            <div class="chat-box">{@html chat.message}</div>
          </div>
        {:else if chat.type === 'user'}
          <div key={i} class="user-chat" transition:fly="{{ y: 100, duration: 300 }}">
            <div class="chat-box gray">{@html chat.message}</div>
            <img src="icons/user.png" alt="user" class="user" />
          </div>
        {:else}
          <div key={i} class="gpt-chat continue" transition:fly="{{ y: 100, duration: 300 }}">
            <div class="chat-box">{@html chat.message}</div>
          </div>
        {/if}
      {/each}
    </div>
  </div>
  <img src="imgs/chat-bottom.png" alt="chat-bottom" class="chat-bottom" />
</div>

<style>
  .wrapper {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    position: relative;
    background: white;
  }

  .header {
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 1;
    background: white;
  }

  .back {
    width: 24px;
    height: 24px;
    margin-left: 16px;
  }

  .header .title {
    margin-left: 24px;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    color: #1F1F1F;
  }

  .mode {
    margin-left: 230px;
  }

  .question {
    width: 100%;
    height: 142px;
    margin-top: 56px;
  }

  .slider {
    width: 100%;
    position: relative;
    bottom: 0;
    background: white;
  }

  .tab {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .gpt-wrapper {
    width: 100%;
    height: 540px;
    margin-top: 56px;
    padding-top: 24px;
    padding-left: 20px;
    padding-right: 25px;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #333333;
    overflow: scroll;
  }

  .gpt-chat {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .user-chat {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .continue {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
  }

  .gpt {
    width: 36px;
    height: 36px;
  }

  .user {
    width: 36px;
    height: 36px;
  }

  .chat-box {
    width: 284px;
    background: #FFF7F2;
    padding: 12px;
    border-radius: 13px;
  }

  .gray {
    background: #F4F4F4;
  }

  .chat-bottom {
    width: 100%;
    height: 70px;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
</style>