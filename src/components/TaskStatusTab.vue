<template>
  <q-table
    :rows="store.collectStatuses"
    :columns="columns"
    row-key="name"
    :pagination="pagination"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="url" :props="props">
          {{ props.row.url }}
        </q-td>
        <q-td key="id" :props="props">
          <q-btn color="orange" v-if="props.row.links" label="링크"/>
          <q-btn color="primary" v-if="props.row.html" label="HTML"/>
        </q-td>
        <q-td key="collect" :props="props">
          <q-btn unelevated push color="green" v-if="props.row.collect" label="성공">
            <q-popup-proxy>
              <q-banner v-if="props.row.links">
                {{props.row.links}}
              </q-banner>
              <q-banner v-if="props.row.html && props.row.screenshot" style="min-width: 800px;">
                <img :src="props.row.screenshot"/>
              </q-banner>
            </q-popup-proxy>
          </q-btn>
          <q-btn unelevated push color="red" v-else label="실패">
            <q-popup-proxy>
              <q-banner style="min-height: 100px; min-width: 500px; overflow: auto;">
                {{ props.row.collectError }}
              </q-banner>
            </q-popup-proxy>
          </q-btn>
        </q-td>
        <q-td key="collectSpentTimeInMillis" :props="props">
          {{ props.row.collectSpentTimeInMillis }} ms
        </q-td>
        <q-td key="parsing" :props="props">
          <template v-if="props.row.collect && props.row.html">
            <q-btn unelevated push color="green" v-if="props.row.parsing" label="성공">
              <q-popup-proxy>
                <q-banner style="min-height: 600px; min-width: 500px; overflow: auto;">
                <pre style="white-space: pre-wrap; word-wrap: break-word;">
                  {{ JSON.stringify(props.row.parsingResult, null, 2) }}
                </pre>
                </q-banner>
              </q-popup-proxy>
            </q-btn>
            <q-btn unelevated push color="red" v-else label="실패">
              <q-popup-proxy>
                <q-banner style="min-height: 100px; min-width: 500px; overflow: auto;">
                  {{ props.row.parsingError }}
                </q-banner>
              </q-popup-proxy>
            </q-btn>
          </template>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {useTaskStatusStore} from "stores/task-status.store";
import {CollectTask, ParsingTask} from "app/type";

const store = useTaskStatusStore();

const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 50
  // rowsNumber: xx if getting data from a server
});

const columns = [
  {
    name: 'url',
    align: 'center',
    label: 'URL',
    field: 'url',
    sortable: true,
  },
  {
    name: 'id',
    align: 'center',
    label: '수집대상',
    field: 'id',
    format: (val: string[], row: CollectTask) => {
      if (row.links && row.html) return '링크 & HTML';
      if (row.links) return '링크';
      if (row.html) return 'HTML';
    },
    sortable: true,
  },
  { name: 'collect',
    align: 'center',
    label: '수집결과',
    field: 'collect',
    format: (val: boolean) => val ? '성공' : '실패',
    sortable: true,
  },
  { name: 'collectSpentTimeInMillis',
    align: 'center',
    label: '수집 소요시간',
    field: 'collectSpentTimeInMillis',
    format: (val: boolean) => val + 'ms',
    sortable: true,
  },
  { name: 'parsing',
    align: 'center',
    label: '파싱결과',
    field: 'parsing',
    format: (val: boolean, row: CollectTask | ParsingTask) => val ? '성공' : '실패',
    sortable: true,
  },
]

onMounted(() => {
  window.$renderer.onReceive('crawler-task', (event: any, task: any) => {
    console.log('crawlerTask:', event, task);
    store.addCollectStatus(task);
  });
});

</script>
