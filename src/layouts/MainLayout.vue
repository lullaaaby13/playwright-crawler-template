<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="showErrorDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">에러</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{errorMessage}}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup lang="ts">

import {onMounted} from "vue";

const showErrorDialog = ref(false);
const errorMessage = ref('');

onMounted(() => {
  window.$renderer.onReceive('error.main', (event, data: Error) => {
    errorMessage.value = data.message;
    showErrorDialog.value = true;
  });
});

</script>
