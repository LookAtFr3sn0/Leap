<script setup>
import projects from '../data/projects.data.json'
</script>

<template>
    <div class="flex flex-col p-2 h-full">
        <div class="pt-12 pb-2 text-center text-xl">My projects</div>
        <div class="grid grid-cols-2">
            <div v-for="project in projects" class="flex flex-col py-2 px-4 m-2 rounded-md bg-white shadow-md border border-[#D1D9E0]">
                <RouterLink :to="project.page" class="text-lg dark:text-[#49AADE] font-medium hover:underline">{{ project.title }}</RouterLink>
                <span class="text-sm my-2">{{ project.description }}</span>
                <span class="text-xs my-1">{{ project.technologies ? project.technologies.join(', ') : '' }}</span>
            </div> 
        </div>
    </div>
</template>