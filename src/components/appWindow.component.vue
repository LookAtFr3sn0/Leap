<script setup>
import { RouterView } from 'vue-router';
import { usePointer } from '@vueuse/core';
const { x, y } = usePointer();

function dragApp() {
    const appWindow = document.getElementById('appWindow');
    const appBar = document.getElementById('appBar');
    appBar.style.cursor = 'grabbing';
    let offsetX = appWindow.offsetLeft - x.value;
    let offsetY = appWindow.offsetTop - y.value;

    const onMouseMove = () => {
        appWindow.style.left = offsetX + x.value + 'px';
        appWindow.style.top = offsetY + y.value + 'px';

        // keep the app window in the viewport
        if (appWindow.offsetLeft < appWindow.offsetWidth/2) {
            appWindow.style.left = appWindow.offsetWidth/2 + 'px';
        }
        if (appWindow.offsetTop < appWindow.offsetHeight/2) {
            appWindow.style.top = appWindow.offsetHeight/2 + 'px';
        }
        if (appWindow.offsetLeft + appWindow.offsetWidth / 2 > appWindow.parentNode.clientWidth) {
            appWindow.style.left = appWindow.parentNode.clientWidth - appWindow.offsetWidth/2 + 'px';
        }
        if (appWindow.offsetTop + appWindow.offsetHeight / 2 > appWindow.parentNode.clientHeight) {
            appWindow.style.top = appWindow.parentNode.clientHeight - appWindow.offsetHeight/2 + 'px';
        }
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', onMouseMove);
        appBar.style.cursor = 'default';
    }, { once: true });
}

function appResize() {
    const appWindow = document.getElementById('appWindow');
    const appResizeButton = document.getElementById('appResizeButton');
    const startWidth = appWindow.offsetWidth;
    const startHeight = appWindow.offsetHeight;
    const startX = x.value;
    const startY = y.value;

    const onMouseMove = () => {
        let newWidth = startWidth + (x.value - startX) * 2;
        let newHeight = startHeight + (y.value - startY) * 2;
        if (newWidth < 300) newWidth = 300;
        if (newHeight < 600) newHeight = 600;
        appWindow.style.width = newWidth + 'px';
        appWindow.style.height = newHeight + 'px';
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', onMouseMove);
        appResizeButton.style.cursor = 'default';
    }, { once: true });
}
</script>

<template>
    <div id="appWindow" class="bg-white dark:bg-[#103030] dark:text-white w-8/12 h-5/6 absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-10">
        <div id="appBar" class="bg-[#00000010] w-full h-8 flex justify-between" @mousedown="dragApp()">
            <div class="px-2 py-0.5">{{ $route.meta.title }}</div>
            <div class="flex *:cursor-pointer text-center *:aspect-square h-8 absolute right-0">
                <span class="material-symbols-outlined text-lg hover:bg-gray-200" @click="">minimize</span>
                <span class="material-symbols-outlined text-lg hover:bg-gray-200" @click="">crop_square</span>
                <span class="material-symbols-outlined text-lg hover:bg-red-600" @click="$emit('appClose')">close</span>
            </div>
        </div>
        <main class="overflow-auto w-full h-full mb-12">
            <RouterView />
        </main>
        <div class="bg-[#00000010] absolute h-4 w-full bottom-0 flex">
            <span id="appResizeButton" @mousedown="appResize" class="material-symbols-outlined text-base cursor-nwse-resize -rotate-45 ml-auto">filter_list</span>
        </div>
    </div>
</template>