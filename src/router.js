import { createRouter, createWebHistory } from "vue-router";
import projectsView from "./views/projects.view.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/projects',
            component: projectsView
        }
    ]
});

export default router;