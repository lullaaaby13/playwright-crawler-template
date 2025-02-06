import { defineStore, acceptHMRUpdate } from 'pinia';

export const useTaskStatusStore = defineStore('collecStatus', () => {

  const collectStatuses = ref<any>([]);

  const addCollectStatus = (status: any) => {
    let find = collectStatuses.value.find(it => it.id === status.id);
    if (find) {
      Object.assign(find, status);
    } else {
      collectStatuses.value.push(status);
    }
  }
  const clear = () => {
    collectStatuses.value = [];
  }

  return {
    collectStatuses,
    addCollectStatus,
    clear,
  };

});
