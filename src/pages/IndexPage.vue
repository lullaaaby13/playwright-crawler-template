<template>
  <q-page class="column justify-start items-center">

    <q-card class="q-pa-lg q-my-lg" style="width: 80vw;">
      <q-card-actions>
        <q-btn color="primary" label="수집시작" padding="8px 12px" @click="onStartCollect"></q-btn>
        <q-btn color="secondary" label="데이터 새로고침" padding="8px 12px" @click="onRefreshData"></q-btn>
        <q-btn color="warning" label="데이터 초기화" padding="8px 12px" @click="onClearData"></q-btn>
        <q-btn color="green" label="엑셀 다운로드" padding="8px 12px" @click="onDownloadExcel"></q-btn>
      </q-card-actions>
    </q-card>

    <q-card class="q-pa-md" style="width: 80vw;">
      <q-tabs
        v-model="tab"
        align="left"
      >
        <q-tab name="taskStatus" label="작업상태" />
        <q-tab name="data" label="데이터" />
      <!--  configuration icon-->
        <q-tab name="config" label="설정" />

      </q-tabs>

      <q-tab-panels v-model="tab" animated class="shadow-2 rounded-borders">
        <q-tab-panel name="taskStatus">
          <TaskStatusTab/>
        </q-tab-panel>

        <q-tab-panel name="data">
          <DataTab/>
        </q-tab-panel>

        <q-tab-panel name="config">
          <ConfigTab/>
        </q-tab-panel>
      </q-tab-panels>

    </q-card>

  </q-page>
</template>

<script setup lang="ts">
import TaskStatusTab from "components/TaskStatusTab.vue";
import {onUnmounted, ref} from 'vue';
import {useTaskStatusStore} from "stores/task-status.store";
import {useDataStore} from "stores/data.store";

const taskStatusStore = useTaskStatusStore();
const dataStore = useDataStore();
const tab = ref<string>("result");

const mainMessage = ref('메인 프로세스로부터 데이터를 기다리는 중...');

const sendMessageToMain = () => {
  window.$renderer.sendToMain('message-from-renderer', { action: 'Hello from Vue Renderer!' });
};

const handleMainMessage = (event, data) => {
  console.log('📩 메인 프로세스에서 받은 메시지:', event, data);
};

onUnmounted(() => {
  window.$renderer.removeListener('message-from-main', handleMainMessage);
});

const onStartCollect = () => {
  taskStatusStore.clear();
  window.$renderer.request('request.post.start-crawler');
};

const onRefreshData = async () => {
  dataStore.clear();
  const data = await window.$renderer.request('request.get.data');
  console.log('📦 데이터 새로고침 결과:', data);
  dataStore.add(data);
};

const onClearData = async () => {
  await window.$renderer.request('request.delete.data');
  dataStore.clear();
};

const onDownloadExcel = async () => {
  await window.$renderer.request('request.get.excel-download', JSON.stringify(dataStore.filterRows));
};

</script>
