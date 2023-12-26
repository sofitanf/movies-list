import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'movie',
      component: () => import('../views/Movies.vue'),
    },
    {
      path: '/create-movie',
      name: 'create-movie',
      component: () => import('../views/FormMovie.vue'),
    },
    {
      path: '/movie/:id',
      name: 'edit-movie',
      component: () => import('../views/FormMovie.vue'),
    },
    {
      path: '/genre',
      name: 'genre',
      component: () => import('../views/Genres.vue'),
    },
    {
      path: '/create-genre',
      name: 'create-genre',
      component: () => import('../views/FormGenre.vue'),
    },
    {
      path: '/genre/:id',
      name: 'edit-genre',
      component: () => import('../views/FormGenre.vue'),
    },
  ],
});

export default router;
