<template>
  <div class="m-4">
    <div class="fw-b fs-xxl">{{ useKey.profile?.name }}</div>
    <div class="d-flex">
      <div class="d-flex ai-center">
        <el-radio-group v-model="useKey.keyOS" class="mr-2">
          <el-radio-button label="win">
            <img src="../../assets/images/win.png" width="32">
          </el-radio-button>
          <el-radio-button label="mac">
            <img src="../../assets/images/mac.png" width="32" />
          </el-radio-button>
        </el-radio-group>
        <el-radio-group v-model="useKey.keyMatrixLayer" text-color="#00ffff" fill="#ffff00"
          @change="useKey.getKeyMatrix">
          <el-radio v-for="item in useKey.state.MatrixLayers" :value="item.value" :label="item.value">
            <span>{{ $t(item.label) }}</span>
          </el-radio>
        </el-radio-group>
      </div>
      <div class="d-flex ml-4">
        <div>
          <!--<el-tooltip effect="light"
                :content="$t('tip.tape')"
                placement="bottom"
                popper-class="tip_font"
              >
              <el-checkbox v-model="isLayer" :label="$t('set.layer_1')" style="width: 100%;" @change="LayerChanged">
                {{ $t('set.layer_1') }}
              </el-checkbox>
          </el-tooltip> -->
          <el-popover effect="light" :width="440" placement="bottom">
            <div class="d-flex flex-column">
              <span>{{ $t('tip.tape1') }}</span>
              <span>{{ $t('tip.tape2') }}</span>
              <span>{{ $t('tip.tape3') }}</span>
            </div>
            <template #reference>
              <el-checkbox v-model="isLayer" :label="$t('set.layer_1')" style="width: 100%;" @change="LayerChanged">
                {{ $t('set.layer_1') }}
              </el-checkbox>
            </template>
          </el-popover>
        </div>
        <div class="ml-1 px-3" v-if="isLayer">
          <el-slider style="width: 360px" v-model="layer" :min="1" :max="127" @change="setLayer" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { KeyMatrixLayer } from "@/keyboard/enum";
import { useKeyStore } from "@/stores/keyStore";
import { uselightStore } from "@/stores/lightStore";
import { ref, onMounted, onBeforeUnmount } from 'vue';

const useLight = uselightStore();
const useKey = useKeyStore();
const isLayer = ref(false);
const layer = ref(0);

const LayerChanged = () => {
  if (!isLayer.value) {
    useLight.setLayer(0)
  } else {
    useLight.setLayer(layer.value)
  }
  useKey.saveProfile();
}

const setLayer = () => {
  useLight.setLayer(layer.value);
  useKey.saveProfile();
}

onMounted(async () => {
  await useKey.init();
});

onBeforeUnmount(() => {
  useKey.destroy();
});
</script>
<style scoped lang="scss">
:deep {
  .el-radio-button__inner {
    padding: 0 5px;
  }

  .is-active {
    img {
      position: relative;
      left: -99999px;
      filter: drop-shadow(#ffffff 99999px 0);
    }
  }

  .el-radio__input.is-checked .el-radio__inner {
    --el-color-primary: #3235b4;
  }

  .el-radio__input.is-checked+.el-radio__label {
    --el-color-primary: #3235b4;
  }
}
</style>