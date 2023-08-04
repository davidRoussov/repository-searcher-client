<template>
  <vue-good-table
    mode="remote"
    :pagination-options="{
      enabled: true,
      perPageDropdown: [10, 20, 40, 80, 100],
      perPage: serverParams.perPage,
      page: serverParams.page
    }"
    :totalRows="total"
    :columns="columns"
    :rows="rows"
    :isLoading="isLoading"
    v-on:page-change="onPageChange"
    v-on:sort-change="onSortChange"
    v-on:column-filter="onColumnFilter"
    v-on:per-page-change="onPerPageChange"
  >
  </vue-good-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { VueGoodTable } from 'vue-good-table-next';

import 'vue-good-table-next/dist/vue-good-table-next.css';

interface Repository {
  name: string;
  popularity: number;
  activity: string;
}

export default defineComponent({
  components: {
    VueGoodTable,
  },
  created: async function() {
    const repositories: Repository[] = await this.fetchRepositories();
    console.log('repositories', repositories);

    this.rows = repositories.map((repository: Repository) => ({
      name: repository.name,
      popularity: repository.popularity,
      activity: repository.activity,
    }));
  },
  data: function() {
    return {
      isLoading: false,
      serverParams: {
        columnFilters: {},
        page: 1,
        perPage: 10,
      },
      rows: [],
      total: 0,
      columns: [
        {
          label: 'Name',
          field: 'name',
        },
        {
          label: 'Popularity',
          field: 'popularity',
        },
        {
          label: 'Activity',
          field: 'activity',
        },
      ],
    };
  },
  methods: {
    fetchRepositories: async function(): Promise<Repository[]> {
      const repositories = [
        {
          name: 'one',
          popularity: 1,
          activity: 999,
        },
        {
          name: 'two',
          popularity: 2,
          activity: 888,
        },
        {
          name: 'three',
          popularity: 3,
          activity: 777,
        },
      ];

      return Promise.resolve(repositories);
    },
    updateParams: function(newProps): void {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },
    onPageChange(params) {
      this.updateParams({page: params.currentPage});
      this.fetchRepositories();
    },
    onPerPageChange(params) {
      this.updateParams({
        page: 1,
        perPage: params.currentPerPage
      });
      this.fetchRepositories();
    },
    onSortChange(params) {
      this.updateParams({
        sort: [{
          type: params[0].type,
          field: params[0].field,
        }],
      });
      this.fetchRepositories();
    },
    onColumnFilter(params) {
      this.updateParams(params);
      this.fetchProviders();
    },
  },
});
</script>
