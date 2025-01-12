<script setup>
import { usePointer } from '@vueuse/core';
const { x, y } = usePointer();

function closeWelcome() {
    document.getElementById('welcome').parentElement.removeChild(document.getElementById('welcome'));
    document.cookie = 'welcome;max-age=86400'; // 1 day
}

function dragWelcome() {
    const welcome = document.getElementById('welcome');
    const bar = document.getElementById('welcomeBar');
    bar.style.cursor = 'grabbing';
    let offsetX = welcome.offsetLeft - x.value;
    let offsetY = welcome.offsetTop - y.value;
    
    const onMouseMove = () => {
        welcome.style.left = offsetX + x.value + 'px';
        welcome.style.top = offsetY + y.value + 'px';
        // keep the welcome window in the viewport
        if (welcome.offsetLeft < welcome.offsetHeight/2) {
            welcome.style.left = welcome.offsetHeight/2 + 'px';
        }
        if (welcome.offsetTop < welcome.offsetHeight/2) {
            welcome.style.top = welcome.offsetHeight/2 + 'px';
        }
        if (welcome.offsetLeft + welcome.offsetWidth / 2 > welcome.parentNode.clientWidth) {
            welcome.style.left = welcome.parentNode.clientWidth - welcome.offsetWidth/2 + 'px';
        }
        if (welcome.offsetTop + welcome.offsetHeight / 2 > welcome.parentNode.clientHeight) {
            welcome.style.top = welcome.parentNode.clientHeight - welcome.offsetHeight/2 + 'px';
        }
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', onMouseMove);
        bar.style.cursor = 'grab';
    }, { once: true });
}
// var welcomeShow = document.cookie.indexOf('welcome') === -1;
var welcomeShow = true;
</script>

<template>
    <div v-if="welcomeShow" class="aspect-square h-64 flex flex-col text-center px-2 py-4" id="welcome">
        <div id="welcomeBar" class="absolute w-full h-6 top-0 left-0 cursor-grab" @mousedown="dragWelcome()">
            <span class="material-symbols-outlined text-base absolute right-0 w-6 cursor-pointer font-light" @click="closeWelcome()">close</span>
        </div>
        <span class="text-4xl marker">Hi!</span>
        <span class="mt-8">I'm a CS&nbsp;student and software/full&nbsp;stack developer</span>
        <div class="flex mt-auto mx-4 gap-4 *:aspect-square *:h-6 self-center">
            <a href="https://github.com/LookAtFr3sn0" target="_blank"><img src="/assets/icons/github.svg" alt="GitHub" /></a>
            <a href="https://github.com/LookAtFr3sn0" target="_blank"><span class="material-symbols-outlined">code</span></a>
            <a href="" target="_blank"><img src="/assets/icons/LinkedIn.svg" alt="LinkedIn" /></a>
        </div>
    </div>
</template>

<style scoped>
#welcome {
    rotate: 6deg;
    z-index: 99;
    background-color: #FEFF9C;
    font-family: "Delius";
    mask: linear-gradient( -45deg, transparent 0 calc(32px/sqrt(2)),#fff 0) bottom right;
}
#welcome::before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    border-width: 32px 32px 0 0;
    border-style: solid;
    border-color: hsl(61, 100%, 75%) transparent;
    box-shadow: 2px 2px 8px #000;
}
</style>