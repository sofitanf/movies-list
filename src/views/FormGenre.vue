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
        <label for="name">Name</label>
        <input
          v-model="form.name"
          minlength="3"
          required
          id="name"
          placeholder="Enter name"
          class="input"
          type="text"
        />
      </div>
    </div>
    <div class="d-flex justify-content-end text-end gap-3 mt-5">
      <RouterLink to="/genre">
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
const id = route.params.id;
const form = ref({
  name: '',
});

const onSubmit = async () => {
  if (id) {
    await axios.put(`genre/${id}`, form.value);
    router.push('/genre');
  } else {
    await axios.post('genre', form.value);
    router.push('/genre');
  }
};

const deleteData = async () => {
  if (confirm('Are you sure to delete this genre?')) {
    await axios.delete(`genre/${id}`);
    router.push('/genre');
  }
};

const getData = async () => {
  const { data } = await axios.get(`genre/${id}`);
  const { name } = data.data;
  form.value = {
    name: name,
  };
};

onMounted(() => {
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
