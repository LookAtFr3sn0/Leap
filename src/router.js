import { createRouter, createMemoryHistory } from "vue-router";
import projectsView from "./views/projects.view.vue";

const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        {
            path: '/',
            redirect: '/projects'
        },
        {
            path: '/projects',
            component: projectsView,
            meta: {
                title: 'Projects',
            }
        }
    ]
});

export default router;