<script setup lang="ts">
import type { NominatimResult } from "~/lib/types";

import { SearchSchema } from "~/lib/zod-schemas";

const searchResults = ref<NominatimResult[]>([]);

async function onSubmit(query: Record<string, string>) {
  try {
    const results = await $fetch("/api/search", {
      query,
    });
    searchResults.value = results;
  }
  catch (error) {
    console.log(error);
  }
}

const loading = ref(false);
</script>

<template>
  <Form
    v-slot="{ errors }"
    class="flex flex-col gap-2 items-center"
    :validation-schema="toTypedSchema(SearchSchema)"
    :initial-values="{ q: '' }"
    @submit="onSubmit"
  >
    <div class="join mt-4">
      <div>
        <label class="input join-item">
          <Icon name="tabler:search" />
          <Field
            type="text"
            name="q"
            placeholder="Search for a location..."
            :disabled="loading"
            :class="{
              'input-error': errors.q,
            }"
          />
        </label>
        <div v-if="errors.q" class="validator-hint text-error">
          {{ errors.q }}
        </div>
      </div>
      <button :disabled="loading" class="btn btn-neutral join-item">
        Search
      </button>
    </div>
  </Form>
</template>
