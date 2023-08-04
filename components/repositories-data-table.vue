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
import axios from 'axios';
import { VueGoodTable } from 'vue-good-table-next';

import 'vue-good-table-next/dist/vue-good-table-next.css';

interface Repository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  language: string;
  updated_at: string;
  pushed_at: string;
  stargazers_count: number;
}

export default defineComponent({
  components: {
    VueGoodTable,
  },
  data: function() {
    return {
      isLoading: false,
      serverParams: {
        columnFilters: {},
        page: 1,
        perPage: 10,
        sort: [],
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
          field: 'stargazers_count',
        },
        {
          label: 'Activity',
          field: 'updated_at',
        },
      ],
    };
  },
  methods: {
    fetchRepositories: async function() {
      this.isLoading = true;

      const runtimeConfig = useRuntimeConfig()
      const baseUrl = runtimeConfig.public.VUE_APP_API_BASE_URL;

      const sortOrder = this.serverParams.sort[0]?.type;
      const sortField = this.serverParams.sort[0]?.field;
      const pageSize = this.serverParams.perPage;
      const pageNumber = this.serverParams.page;

      const params = {
        filter: this.name,
        sortOrder,
        sortField,
        pageSize,
        pageNumber,
      };

      const queryString = Object.entries(params)
        .filter(([key, value]) => value !== null && value !== undefined && value !== '')
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

      const response = await axios.get(`${baseUrl}/repos?${queryString}`);
      const data = response.data.data;

      const { repositories, meta } = data;

      this.isLoading = false;
      this.total = meta.total;
      this.rows = repositories.map((repository: Repository) => ({
        name: repository.name,
        stargazers_count: repository.stargazers_count,
        updated_at: repository.updated_at,
      }));
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
  props: {
    name: String,
  },
  watch: {
    name: {
      handler: function() {
        this.fetchRepositories();
      },
      immediate: false,
    },
    serverParams: {
      handler: function() {
        this.fetchRepositories();
      },
      immediate: true,
      deep: true,
    },
  },
});
</script>
