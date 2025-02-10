<script setup>
import { RouterView } from 'vue-router';
import { usePointer } from '@vueuse/core';
const { x, y } = usePointer();
const props = defineProps(['app']);
const appName = props.app.charAt(0).toUpperCase() + props.app.slice(1)

function closeApp() {
    const appWindow = document.getElementById('appWindow');
    appWindow.parentElement.removeChild(appWindow);
}

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
</script>

<template>
    <div id="appWindow" class="bg-white">
        <div id="appBar" class="w-full flex justify-between" @mousedown="dragApp()">
            <div class="px-2 py-0.5">{{ appName }}</div>
            <div class="flex *:cursor-pointer text-center *:aspect-square h-8 absolute right-0">
                <span class="material-symbols-outlined text-lg hover:bg-gray-200" @click="">minimize</span>
                <span class="material-symbols-outlined text-lg hover:bg-gray-200" @click="">crop_square</span>
                <span class="material-symbols-outlined text-lg hover:bg-red-600" @click="closeApp()">close</span>
            </div>
        </div>
        <main>
            <RouterView />
        </main>
    </div>
</template>