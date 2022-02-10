<script setup>
import { ref } from "vue";

const props = defineProps(["total", "limit", "getUsersList", "users"]);

let pagesCount = Math.ceil(props.total / props.limit);

let pages = [];
for (let i = 1; i <= pagesCount; i++) {
  pages.push(i);
}

let portionCount = Math.ceil(pagesCount / props.limit);
let portionNumber = ref(1);
let leftPortionPageNumber = (portionNumber.value - 1) * props.limit + 1;
let rightPortionPageNumber = portionNumber.value * props.limit;

</script>

<template>
  <div>
    <div v-if="portionNumber > 1">
      <button @click="portionNumber - 1">Prev</button>
    </div>
    <div v-else>
      листать некуда
    </div>

    <div>
      <span
        v-for="page in pages"
        :key="page"
        @click="props.getUsersList(page - 1)"
        class="paginatorSpan"
      >
        {{ page }}
      </span>
    </div>

    <div v-if="portionCount > portionNumber">
      <button @click="portionNumber + 1">Next</button>
    </div>
    <div v-else>
      листать некуда
    </div>
  </div>
</template>

<style scoped>
.paginatorSpan {
    display: inline-block;
    padding: 5px;
    border: 1px solid red;
    border-radius: 5px;
    margin: 2px;
}
</style>