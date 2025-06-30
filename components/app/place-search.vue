<script setup lang="ts">
import type { FetchError } from "ofetch";

import type { NominatimResult } from "~/lib/types";

import { SearchSchema } from "~/lib/zod-schemas";
import getFetchErrorMessage from "~/utils/get-fetch-error-message";

const emit = defineEmits<{
  resultSelected: [result: NominatimResult];
}>();

const loading = ref(false);

const form = useTemplateRef("form");
const errorMessage = ref("");
const hasSearched = ref(false);
const searchResults = ref<NominatimResult[]>([]);

async function onSubmit(query: Record<string, string>) {
  try {
    loading.value = true;
    hasSearched.value = true;
    searchResults.value = [];
    errorMessage.value = "";
    const results = await $fetch("/api/search", {
      query,
    });
    searchResults.value = results;
  }
  catch (e) {
    const error = e as FetchError;
    errorMessage.value = getFetchErrorMessage(error);
  }
  loading.value = false;
}

function setLocation(result: NominatimResult) {
  emit("resultSelected", result);
  searchResults.value = [];
  errorMessage.value = "";
  hasSearched.value = false;
  if (form.value) {
    form.value.resetForm();
  }
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <Form
      ref="form"
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
    <div
      v-if="!loading && errorMessage"
      roles="alert"
      class="alert alert-error"
    >
      {{ errorMessage }}
    </div>
    <div
      v-if="!loading && hasSearched && !searchResults.length && !errorMessage"
      roles="alert"
      class="alert alert-warning"
    >
      No results found.
    </div>
    <div v-if="loading" class="flex justify-center">
      <div class="loading loading-lg" />
    </div>
    <div class="flex flex-col gap-2 overflow-auto max-h-60 mt-2">
      <div
        v-for="result in searchResults"
        :key="result.place_id"
        class="card-sm bg-base-100"
      >
        <div class="card-body">
          <h4 class="card-title">
            {{ result.display_name }}
          </h4>
          <div class="card-actions justify-end">
            <button class="btn btn-sm btn-warning" @click="setLocation(result)">
              Set Location
              <Icon name="tabler:map-pin-plus" size="14" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
