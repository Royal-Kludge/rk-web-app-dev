<template>
  <div class="mx-4 mt-3">
    <div class="fw-b fs-xxl">{{ useKey.profile?.name }}</div>
    <div class="d-flex mt-4">
      <div class="d-flex ai-center mr-4">
          <el-radio-group v-if="isLayoutTableSupport" v-model="useKey.keyMatrixTable" class="mr-4" @change="useKey.keyMatrixChange">
          <el-radio-button v-for="item in useKey.state.MatrixTable" :value="item.value" :label="item.value">
            <img :src="item.img" width="32" />
          </el-radio-button>
        </el-radio-group>
        <el-radio-group class="ml-4" v-model="useKey.keyMatrixLayer" text-color="#00ffff" fill="#ffff00" @change="useKey.getKeyMatrix">
          <el-radio v-for="item in useKey.state.MatrixLayers" :value="item.value" :label="item.value">
            <span>{{ $t(item.label) }}</span>
          </el-radio>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useKeyStore } from "@/stores/rk_c61/keyStore";
import { uselightStore } from "@/stores/rk_c61/lightStore";
import { ref, onMounted, onBeforeUnmount } from 'vue';

const useLight = uselightStore();
const useKey = useKeyStore();
const isLayer = ref(false);
const layer = ref(0);
const isLayoutTableSupport = ref(true);

// const LayerChanged = () => {
//   if (!isLayer.value) {
//     useLight.setLayer(0)
//   } else {
//     useLight.setLayer(layer.value)
//   }
//   useKey.saveProfile();
// }

// const setLayer = () => {
//   useLight.setLayer(layer.value);
//   useKey.saveProfile();
// }

onMounted(async () => {
  await useKey.init();
});

onBeforeUnmount(() => {
  useKey.destroy();
});
</script>
<style scoped lang="scss">
:deep(.el-radio-button__inner) {
  padding: 0 5px;
}

:deep(.is-active) {
  img {
    position: relative;
    left: -99999px;
    filter: drop-shadow(#ffffff 99999px 0);
  }
}

:deep(.el-radio__input.is-checked .el-radio__inner) {
  --el-color-primary: #3235b4;
}

:deep(.el-radio__input.is-checked+.el-radio__label) {
  --el-color-primary: #3235b4;
}
</style>