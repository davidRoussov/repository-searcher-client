<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-12">
        <div class="mb-3">
          <label for="nameInput" class="form-label">Name</label>
          <input
            type="text"
            class="form-control form-control-lg"
            id="nameInput"
            placeholder="Repository name"
            v-model="pendingName"
            @blur="handleInputBlur"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <RepositoriesDataTable
          :name="name"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import 'bootstrap/dist/css/bootstrap.css';

export default defineComponent({
  data: function() {
    return {
      pendingName: '',
      name: '',
    };
  },
  methods: {
    handleInputBlur: function() {
      this.name = this.pendingName;
    },
  },
});
</script>
