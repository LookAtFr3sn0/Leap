<script setup>
const props = defineProps(['app']);
const appName =
  props.app.charAt(0).toUpperCase() + props.app.slice(1)
</script>

<template>
    <div class="bg-white max-w-4xl w-screen">
        <div id="appBar" class="w-full flex justify-between">
            <div class="px-2 py-0.5">{{ appName }}</div>
            <div class="flex *:cursor-pointer text-center *:aspect-square h-full absolute right-0">
                <span class="material-symbols-outlined text-lg hover:bg-gray-200" @click="closeApp()">minimize</span>
                <span class="material-symbols-outlined text-lg hover:bg-gray-200" @click="closeApp()">crop_square</span>
                <span class="material-symbols-outlined text-lg hover:bg-red-600" @click="closeApp()">close</span>
            </div>
        </div>
    </div>
</template>