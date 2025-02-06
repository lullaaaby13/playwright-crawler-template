<template>
<q-card-section class="q-gutter-md">

  <p class="text-h6 bold">수집</p>
  <div class="row">
    <div class="col-3">
      <q-checkbox v-model="showBrowser" label="브라우저 보임"></q-checkbox>
    </div>
    <div class="col-3">
      <q-checkbox v-model="useScreenshot" label="수집 시 스크린샷 사용"></q-checkbox>
    </div>
    <div class="col-6">
      <q-input v-model="numberOfTabs" type="number" outlined label="동시 실행 탭"/>
    </div>
  </div>


  <q-space></q-space>
  <p class="text-h6 bold">엑셀</p>
  <div class="row">
    <div class="col-3 items-center">
      <q-checkbox v-model="useAutoExcel" label="수집 완료 시 엑셀 파일 자동 생성"></q-checkbox>
    </div>
    <div class="col-9">
      <q-input v-model="excelFileName" type="text" outlined label="엑셀 파일명"/>
    </div>

  </div>

</q-card-section>

  <q-card-actions>
    <q-btn
      color="primary"
      padding="8px 12px"
      label="저장"
      @click="updateConfiguration"
    />
  </q-card-actions>

</template>

<script setup lang="ts">

import {onMounted} from "vue";

const showBrowser = ref<boolean>(true);
const numberOfTabs = ref<number>(10);
const useScreenshot = ref<boolean>(true);
const useAutoExcel = ref<boolean>(true);
const excelFileName = ref<string>('');

const updateConfiguration = () => {
  window.$renderer.request('request.put.configuration', {
    headless: !showBrowser.value,
    numberOfTabs: numberOfTabs.value,
    useScreenshot: useScreenshot.value,
    useAutoExcel: useAutoExcel.value,
    excelFileName: excelFileName.value,
  });
}

onMounted(async () => {
  const config = await window.$renderer.request('request.get.configuration');
  console.log('getConfiguration', config);
  showBrowser.value = !config['headless'];
  numberOfTabs.value = config['numberOfTabs'];
  useScreenshot.value = config['useScreenshot'];
  useAutoExcel.value = config['useAutoExcel'];
  excelFileName.value = config['excelFileName'];
});


</script>
