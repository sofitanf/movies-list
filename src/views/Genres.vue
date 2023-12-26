<template>
  <header class="pt-3 d-flex justify-content-between">
    <h4 class="fw-600">Genres</h4>
    <RouterLink to="/"><h6>Movies</h6></RouterLink>
  </header>
  <div>
    <div class="row">
      <div class="col-lg-4 col-sm-6">
        <div class="form w-100 mt-3 mb-5">
          <input
            v-model="search"
            class="input"
            placeholder="Search genre"
            required=""
            type="text"
            @keyup="getGenres(1, 'refresh')"
          />
          <span class="input-border"></span>
        </div>
      </div>
    </div>
    <div class="row">
      <div v-for="genre in genres" :key="genre.id" class="col-lg-4 col-sm-6">
        <RouterLink :to="'/genre/' + genre.id">
          <div class="card w-100 cursor-pointer">
            <h6>{{ genre.name }}</h6>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
  <RouterLink class="fixedButton" to="/create-genre">
    <div class="roundedFixedBtn">
      <p class="fw-700">+</p>
    </div>
  </RouterLink>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const genres = ref([]);
const search = ref('');
const currentPage = ref(1);
const nextPage = ref('');
const lastPage = ref(false);

const getGenres = async (page, type = '') => {
  const { data } = await axios.get('genre', {
    params: { search: search.value, page },
  });
  const { data: genre, current_page, next_page_url } = data.data;

  currentPage.value = current_page;
  nextPage.value = next_page_url;
  genres.value = type == 'refresh' ? genre : [...genres.value, ...genre];
  if (genre.length == 0) lastPage.value = true;
};

onMounted(() => {
  getGenres();
  window.onscroll = () => {
    let bottomOfWindow =
      Math.ceil(document.documentElement.scrollTop) + window.innerHeight ===
      document.documentElement.offsetHeight;

    if (bottomOfWindow && !lastPage.value) {
      getGenres(currentPage.value + 1);
    }
  };
});
</script>
