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
            <div class="w-9/12">
            </div>
            <div class="w-3/12">
            </div>
        </div>
    </div>
</template>