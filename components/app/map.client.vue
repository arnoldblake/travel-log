<script lang="ts" setup>
import type { MglEvent } from "@indoorequal/vue-maplibre-gl";
import type { LngLat } from "maplibre-gl";

import { CENTER_USA } from "~/lib/constants";

const colorMode = useColorMode();
const mapStore = useMapStore();

const style = computed(() =>
  colorMode.value === "dark"
    ? "/styles/dark.json"
    : "https://tiles.openfreemap.org/styles/liberty");
const zoom = 4;

function updateAddedPoint(location: LngLat) {
  if (mapStore.addedPoint) {
    mapStore.addedPoint.long = location.lng;
    mapStore.addedPoint.lat = location.lat;
  }
}

function onDoubleClick(mglEvent: MglEvent<"dblclick">) {
  if (mapStore.addedPoint) {
    mapStore.addedPoint.long = mglEvent.event.lngLat.lng;
    mapStore.addedPoint.lat = mglEvent.event.lngLat.lat;
  }
}

onMounted(() => {
  mapStore.init();
});
</script>

<template>
  <MglMap
    :map-style="style"
    :center="CENTER_USA"
    :zoom="zoom"
    @map:dblclick="onDoubleClick"
  >
    <MglNavigationControl />
    <MglMarker
      v-if="mapStore.addedPoint"
      draggable
      class-name="z-50"
      :coordinates="[mapStore.addedPoint.long, mapStore.addedPoint.lat]"
      @update:coordinates="updateAddedPoint"
    >
      <template #marker>
        <div
          class="tooltip tooltip-top tooltip-open hover:cursor-pointer"
          data-tip="Drag to your desired location"
        >
          <Icon
            class="text-warning"
            name="tabler:map-pin-filled"
            size="32"
          />
        </div>
      </template>
    </MglMarker>
    <MglMarker
      v-for="point in mapStore.mapPoints"
      :key="point.id"
      :coordinates="[point.long, point.lat]"
    >
      <template #marker>
        <div
          class="tooltip tooltip-top hover:cursor-pointer"
          :data-tip="point.name"
          :class="{
            'tooltip-open': isPointSelected(point, mapStore.selectedPoint) }"
          @mouseenter="mapStore.selectPointWithoutFlyTo(point)"
          @mouseleave="mapStore.selectPointWithoutFlyTo(null)"
        >
          <Icon
            name="tabler:map-pin-filled"
            size="24"
            :class="isPointSelected(point, mapStore.selectedPoint) ? 'text-accent' : 'text-secondary'"
          />
        </div>
      </template>
      <MglPopup>
        <h3 class="text-xl">
          {{ point.name }}
        </h3>
        <p v-if="point.description">
          {{ point.description }}
        </p>
        <div class="flex justify-end mt-4">
          <NuxtLink
            v-if="point.to"
            :to="point.to"
            class="btn btn-sm btn-outline"
          >
            {{ point.toLabel }}
          </NuxtLink>
        </div>
      </MglPopup>
    </MglMarker>
  </MglMap>
</template>
