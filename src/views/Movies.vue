<template>
  <header class="pt-3">
    <h4 class="fw-600">Movies Collection</h4>
  </header>
  <div>
    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <div class="form w-100 mt-3 mb-5">
          <input
            v-model="search"
            class="input"
            placeholder="Search movie"
            required=""
            type="text"
            @keyup="getMovies(1, 'refresh')"
          />
          <span class="input-border"></span>
        </div>
      </div>
    </div>
    <div class="row">
      <div v-for="movie in movies" :key="movie.id" class="col-lg-4 col-sm-6">
        <RouterLink :to="'/movie/' + movie.id">
          <div class="card w-100 cursor-pointer">
            <h6>{{ movie.title }}</h6>
            <p class="gray mb-2">{{ movie.director }}</p>
            <div class="text-end">
              <p class="gray mb-0 fs-sm">{{ generateGenres(movie.genres) }}</p>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
  <RouterLink class="fixedButton" to="/create-movie">
    <div class="roundedFixedBtn">
      <p class="fw-700">+</p>
    </div>
  </RouterLink>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const movies = ref([]);
const search = ref('');
const currentPage = ref(1);
const nextPage = ref('');
const lastPage = ref(false);

const generateGenres = (genres) => {
  return genres.map((item) => item.name).join(' / ');
};

const getMovies = async (page, type = '') => {
  const { data } = await axios.get('movie', {
    params: { search: search.value, page },
  });
  const { data: movie, current_page, next_page_url } = data.data;

  currentPage.value = current_page;
  nextPage.value = next_page_url;
  movies.value = type == 'refresh' ? movie : [...movies.value, ...movie];
  if (movie.length == 0) lastPage.value = true;
};

onMounted(() => {
  getMovies();

  window.onscroll = () => {
    let bottomOfWindow =
      document.documentElement.scrollTop + window.innerHeight ===
      document.documentElement.offsetHeight;

    if (bottomOfWindow && !lastPage.value) {
      getMovies(currentPage.value + 1);
    }
  };
});
</script>
