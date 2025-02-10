<script setup>
const projects = []
</script>

<template>
    <div class="flex flex-col p-2">
        <div class="pt-12 text-center text-xl">Projects</div>
        <div class="grid grid-cols-2">
            <RouterLink v-for="project in projects" :to="project.page" class="p-2 m-2 rounded-lg shadow-md">
                <div class="text-xl">{{ project.title }}</div>
                <div class="text-sm py-2">{{ project.description }}</div>
                <div class="flex gap-4 justify-center text-white text-center h-10">
                    <a :href="project.link" target="_blank" class="material-symbols-outlined bg-blue-400 p-1 text-2xl rounded-md aspect-square">link</a>
                    <a :href="project.code" target="_blank" class="material-symbols-outlined bg-blue-400 p-1 text-2xl rounded-md aspect-square">code</a>
                </div>
            </RouterLink> 
        </div>
    </div>
</template>