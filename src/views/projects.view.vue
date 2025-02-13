<script setup>
import projects from '../data/projects.data.json'
</script>

<template>
    <div class="flex flex-col p-2 h-full @container">
        <div class="pt-4 pb-2 text-center text-xl">My projects</div>
        <div class="grid grid-cols-1 @xl:grid-cols-2 @6xl:grid-cols-3">
            <div v-for="project in projects" class="flex flex-col py-2 px-4 m-2 rounded-md shadow-md border border-[#D1D9E0]">
                <RouterLink :to="project.page" class="text-lg link hover:underline font-medium mr-auto">{{ project.title }}</RouterLink>
                <span class="text-sm my-2">{{ project.summary }}</span>
                <span class="text-xs my-1">{{ project.technologies.join(' - ') }}</span>
            </div>
        </div>
    </div>
</template>