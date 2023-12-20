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
          />
          <span class="input-border"></span>
        </div>
      </div>
    </div>
    <div class="row">
      <div
        v-for="movie in filterSearch"
        :key="movie.id"
        class="col-lg-4 col-sm-6"
      >
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
import { computed, onMounted, ref } from 'vue';

const movies = ref([]);
const search = ref('');

const filterSearch = computed(() => {
  return movies.value.filter((item) =>
    item.title.toLowerCase().includes(search.value.toLowerCase())
  );
});

const generateGenres = (genres) => {
  return genres.join(' / ');
};

onMounted(() => {
  movies.value = JSON.parse(sessionStorage.getItem('movies')) || [];
});
</script>
