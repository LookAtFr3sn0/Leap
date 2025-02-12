<script setup>
import { useRoute } from 'vue-router';
import projects from '../data/projects.data.json'

const route = useRoute()

const project = projects.find(project => project.title === route.params.id)
</script>

<template>
    <div class="h-full w-full p-2">
        <div class="flex gap-1 *:self-center">
            <RouterLink to="/projects" class="text-sm font-medium link">Projects</RouterLink>
            <span class="text-sm font-medium">/</span>
            <span class="text-sm font-medium">{{ $route.params.id }}</span>
        </div>
        <div class="flex py-2 px-4 gap-8">
            <div class="w-9/12 flex flex-col">
                <h1 class="text-2xl font-bold mb-8">{{ project.title }}</h1>
                <h2 v-if="project.description" class="font-semibold">About</h2>
                <span>{{ project.description }}</span>
            </div>
            <div class="w-3/12 flex flex-col">
                <h2 class="font-semibold">Info</h2>
                <span class="text-sm mb-2">{{ project.summary }}</span>
                <div v-if="project.link" class="flex gap-1">
                    <span class="material-symbols-outlined">link</span>
                    <a :href="'https://' + project.link" class="link break-all">{{ project.link }}</a>
                </div>
                <div v-if="project.code" class="flex gap-1">
                    <span class="material-symbols-outlined">code</span>
                    <a :href="'https://' + project.code" class="link">GitHub</a>
                </div>
                <hr v-if="project.technologies" class="my-2">
                <div class="flex flex-col">
                    <h2 class="font-semibold mb-2">Technologies</h2>
                    <span v-for="i in project.technologies">{{ i }}</span>
                </div>
            </div>
        </div>
    </div>
</template>