import { defineStore, acceptHMRUpdate } from 'pinia';

export const useDataStore = defineStore('data', () => {

  const search = ref('');
  const data = ref<any>([]);

  const add = (list: any[]) => {
    data.value = [...data.value, ...list];
  }
  const clear = () => {
    data.value = [];
  }

  const filterRows = computed(() => {
    return data.value.filter((row: any) => {
      return Object.values(row).some((value) => {
        return String(value).includes(search.value);
      });
    });
  });

  return {
    search,
    data,
    filterRows,
    add,
    clear,
  };

});
