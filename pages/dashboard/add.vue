<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";

import { LocationSchema } from "~/lib/db/schema";

const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(LocationSchema),
});

const onSubmit = handleSubmit((values) => {
  console.log(values);
});

effect(() => {
  console.log(toRaw(errors.value));
});
</script>

<template>
  <div class="container w-md mx-auto p4">
    <div class="my-4">
      <h1>Add Location</h1>
      <p class="text-sm">
        A location is a place you have traveled or will travel to. It can be a city, country, state or point of interest. You can add specific times you visited this location after adding it.
      </p>
    </div>
    <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          Name
        </legend>
        <Field
          name="name"
          type="text"
          class="input w-full"
        />
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          Description
        </legend>
        <Field
          name="description"
          type="textarea"
          class="textarea w-full"
        />
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          Latitude
        </legend>
        <Field
          name="lat"
          type="number"
          class="input w-full"
        />
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          Longitude
        </legend>
        <Field
          name="long"
          type="number"
          class="input w-full"
        />
      </fieldset>
      <div class="flex justify-end gap-2">
        <button type="button" class="btn btn-warning">
          <Icon name="tabler:arrow-left" size="24" />
          Cancel
        </button>
        <button type="submit" class="btn btn-success">
          Add
          <Icon name="tabler:circle-plus-filled" size="24" />
        </button>
      </div>
    </form>
  </div>
</template>
