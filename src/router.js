import { createRouter, createMemoryHistory } from "vue-router";

const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        {
            path: '/',
            redirect: '/projects'
        },
        {
            path: '/projects',
            component: () => import('./views/projects.view.vue'),
            meta: {
                title: 'Project viewer',
            }
        },
        {
            path: '/projects/:id',
            component: () => import('./views/projectDetails.view.vue'),
            meta: {
                title: 'Project viewer',
            }
        }
    ]
});

export default router;