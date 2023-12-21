<template>
  <header class="pt-3">
    <div class="d-flex justify-content-between">
      <h4 class="fw-600">Detail</h4>
      <p @click="deleteData" class="text-red cursor-pointer">Delete</p>
    </div>
  </header>
  <form @submit.prevent="onSubmit">
    <div class="row">
      <div class="col-md-6 mt-3">
        <label for="title">Title</label>
        <input
          v-model="form.title"
          minlength="5"
          required
          id="title"
          placeholder="Enter title"
          class="input"
          type="text"
        />
      </div>
      <div class="col-md-6 mt-3">
        <label for="director">Director</label>
        <input
          v-model="form.director"
          minlength="5"
          required
          id="director"
          placeholder="Enter director"
          class="input"
          type="text"
        />
      </div>
      <div class="col-md-6 mt-3">
        <label for="summary">Summary</label>
        <textarea
          v-model="form.summary"
          minlength="10"
          required
          maxlength="100"
          placeholder="Enter summary"
          name="summary"
          id="summary"
          cols="20"
          rows="5"
          class="input"
        ></textarea>
      </div>
    </div>
    <div class="row col-md-6 mt-3">
      <div class="d-flex flex-wrap gap-2">
        <div
          v-for="(genre, i) in genres"
          :key="i"
          class="card small cursor-pointer mb-0"
          :class="activeGenre(genre.id) ? 'active' : ''"
          @click="selectGenre(genre)"
        >
          {{ genre?.name }}
          {{ activeGenre(genre.id) }}
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-end text-end gap-3 mt-5">
      <RouterLink to="/">
        <button class="card gray">Cancel</button>
      </RouterLink>
      <button type="submit" class="card blue px-4">Save</button>
    </div>
  </form>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const genres = ref([]);
const id = route.params.id;
const movies = ref([]);
const nextGenre = ref(false);
const form = ref({
  id: '',
  title: '',
  director: '',
  summary: '',
  genres: [],
});

const selectGenre = (genre) => {
  // if (!form.value.genres.includes(genre)) {
  //   form.value.genres.push(genre);
  // } else {
  //   form.value.genres = form.value.genres.filter((item) => item !== genre);
  // }
};

const activeGenre = (id) => {
  // return form.value.genres.includes(genre);
  const isGenre = form.value.genres.filter((item) => item.id == id);
  return isGenre.length > 0;
};

const onSubmit = () => {
  if (form.value.genres) {
    if (id) {
      const data = movies.value.map((item) => {
        let result = item;
        if (item.id == id) {
          result = form.value;
        }

        return result;
      });
      sessionStorage.setItem('movies', JSON.stringify(data));
    } else {
      form.value.id = generateId();
      movies.value = [form.value, ...movies.value];
      sessionStorage.setItem('movies', JSON.stringify(movies.value));
    }

    router.push('/');
  }
};

const generateId = () => {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2, 8);
  const id = timestamp + '-' + randomString;
  return id;
};

const deleteData = async () => {
  if (confirm('Are you sure to delete this movie?')) {
    await axios.delete(`movie/${id}`);
    router.push('/');
  }
};

const getData = async () => {
  const { data } = await axios.get(`movie/${id}`);
  const { title, director, summary, genres: data_genres } = data.data;
  form.value = {
    title: title,
    director: director,
    summary: summary,
    genres: data_genres,
  };
};

const getGenres = async () => {
  const { data } = await axios.get('genre');
  genres.value = data.data.data;
};

onMounted(() => {
  getGenres();
  if (id) {
    getData();
  }
});
</script>

<style scoped>
.text-red {
  color: #dc3545;
}
.input {
  background-color: #292929;
  border: 1px solid #3e3e3e;
  border-radius: 8px;
  color: #fff;
  padding: 14px 20px;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}

textarea:focus,
input:focus {
  outline: none;
}

.card.small {
  font-size: 12px;
  padding: 10px;
  border-radius: 10px;
}

.card.blue,
.card.small.active {
  background-color: var(--border-after-color);
  border: none;
  box-shadow: none;
}
</style>
