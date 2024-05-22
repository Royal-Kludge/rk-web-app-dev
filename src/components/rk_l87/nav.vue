<template>
  <div class="m-4">
    <div class="fw-b fs-xxl">{{ useKey.profile?.name }}</div>
    <div>
      <el-radio-group v-model="useKey.keyMatrixLayer" text-color="#00ffff" fill="#ffff00" @change="useKey.getKeyMatrix">
        <el-radio v-for="item in useKey.state.MatrixLayers" :value="item.value" :label="item.value">
          {{ $t(item.label) }}
        </el-radio>
      </el-radio-group>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useKeyStore } from "@/stores/keyStore";
import { onMounted, onBeforeUnmount } from 'vue';
const useKey = useKeyStore();
onMounted(async () => {
  await useKey.init();
});

onBeforeUnmount(() => {
  useKey.destroy();
});
</script>
<style scoped lang="scss">
:deep {
  .el-radio__input.is-checked .el-radio__inner {
    --el-color-primary: #3235b4;
  }

  .el-radio__input.is-checked+.el-radio__label {
    --el-color-primary: #3235b4;
  }
}
</style>