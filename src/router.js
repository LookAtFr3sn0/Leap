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
                title: 'Projects',
            },
            children: [
                {
                    path: 'leap',
                    component: () => import('./views/leap.project.view.vue'),
                    meta: {
                        title: 'Leap',
                    }
                }
            ]
        },
    ]
});

export default router;