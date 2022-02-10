<script setup>
import Paginator from "./components/Paginator.vue";
import { ref, onMounted } from "vue";
import { getUsers } from "./api";

const isShow = ref(false);

const users = ref([]);
const total = ref(null);
const limit = ref(null);

const getUsersList = async (page) => {
  const res = await getUsers(page);
  if (res.status !== 200) return;
  users.value = res.data.items;
  total.value = res.data.total;
  limit.value = res.data.limit;
  isShow.value = true;
};


onMounted(() => {
  getUsersList();
});

const deleteUser = (id) => {
  users.value = users.value.filter((u) => u.id !== id);
};

</script>

<template>
  <div v-if="isShow">
    <h1 :style="{ textAlign: 'center' }">Список пользователей</h1>
    <div class="container" v-for="user in users" :key="user.id">
      <div>ID: {{ user.id }}</div>
      <div>Имя: {{ user.name }}</div>
      <div>Роль: {{ user.role }}</div>
      <div>
        Дата создания:
        {{10>new Date(user.ctime * 1000).getDate() ? '0' + new Date(user.ctime * 1000).getDate() : new Date(user.ctime * 1000).getDate()}}.{{10>new Date(user.ctime * 1000).getMonth() + 1 ? '0' + new Date(user.ctime * 1000).getMonth() + 1 : new Date(user.ctime * 1000).getMonth() + 1}}.{{new Date(user.ctime * 1000).getFullYear()}}
        {{10>new Date(user.ctime * 1000).getHours() ? '0' + new Date(user.ctime * 1000).getHours() : new Date(user.ctime * 1000).getHours()}}:{{10>new Date(user.ctime * 1000).getMinutes() ? '0' + new Date(user.ctime * 1000).getMinutes() : new Date(user.ctime * 1000).getMinutes()}}
      </div>
      <div>
        Действия: <button @click="() => deleteUser(user.id)">Удалить</button>
      </div>
    </div>
    <Paginator
      :users="users"
      :total="total"
      :limit="limit"
      :getUsersList="getUsersList"
    />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.container div {
  padding: 5px;
  margin: 2px;
  border-radius: 5px;
  border: 1px solid red;
}
</style>