<template>
  <div class="q-py-md">
    <q-input v-model="dataStore.search" outlined label="검색"/>
  </div>
  <q-table
    :rows="dataStore.filterRows"
    :columns="useColumns"
    row-key="code"
    :pagination="pagination"
  />
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {useDataStore} from "stores/data.store";

const dataStore = useDataStore();

const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 50
  // rowsNumber: xx if getting data from a server
});

const columns = ref([
  { name: 'code', align: 'center', label: '코드', field: 'code', sortable: true, useYn: true },
  { name: 'name', align: 'center', label: '종목명', field: 'name', sortable: true, useYn: true },
  { name: 'price', align: 'center', label: '현재가', field: 'price', sortable: true, useYn: true },
]);
const useColumns = computed(() => {
  return columns.value.filter((column) => column.useYn);
});

onMounted(async() => {
  dataStore.clear();
  const data = await window.$renderer.request('request.get.data');
  dataStore.add(data);
});

</script>
