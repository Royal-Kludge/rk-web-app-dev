<template>
  <div class="mx-4 mt-3">
    <div class="fw-b fs-xxl">{{ useKey.profile?.name }}</div>
    <div class="d-flex mt-4">
      <div class="d-flex ai-center mr-4">
        <el-radio-group v-if="isLayoutTableSupport" v-model="useKey.keyMatrixTable" class="mr-4" @change="useKey.getKeyMatrix">
          <el-radio-button v-for="item in useKey.state.MatrixTable" :value="item.value" :label="item.value">
            <img :src="item.img" width="32" />
          </el-radio-button>
        </el-radio-group>
        <el-radio-group class="ml-4" v-model="useKey.keyMatrixLayer" text-color="#00ffff" fill="#ffff00"
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
        <div class="ml-2 px-3" v-if="isLayer">
          <el-slider style="width: 180px" v-model="layer" :min="1" :max="127" @change="setLayer" />
        </div>
        <div class="ml-4 d-flex ai-center ">
          <el-switch v-model="isTouchPad" inline-prompt active-text="On" inactive-text="Off" @change="touchPadChanged"/>
          <span class="ml-1 px-3" style="text-align: left">{{ $t('set.tocuh_pad') }}</span>
          <el-tooltip effect="light" :content="$t('set.website_input_tip')" placement="top" popper-class="tip_font">
                <div class="py-1 px-3 but-green text-white mx-3 c-p" @click="openWebSiteInput" v-if="isTouchPad" style="width:96px; text-align: center;">
                {{ $t('set.set_website') }}
              </div>
          </el-tooltip>
          <el-dialog v-model="isSetWebSite" top="30vh" width="720px" :lock-scroll="true">
              <div class="d-flex ai-center">
                <el-input v-model="www" placeholder="Please input" maxlength="80" />
              </div>
              <div class="d-flex jc-start">
                <span class="mt-2 px-3" style="text-align: left">{{ $t('set.tocuh_pad_mac') }}</span>
              </div>
              <div class="d-flex jc-end">
                <div class="d-flex jc-between c-p mt-2">
                  <div class="py-1 px-4 but-red text-white " @click="isSetWebSite = false">{{ $t('set.cancel') }}</div>
                  <div class="ml-4 py-1 px-4 but-green text-white" @click="setWebSite">{{ $t('set.confirm') }}</div>
                </div>
              </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { KeyDefineEnum } from "@/common/keyCode";
import { useKeyStore } from "@/stores/rk_l75/keyStore";
import { uselightStore } from "@/stores/rk_l75/lightStore";
import { ref, onMounted, onBeforeUnmount } from 'vue';

const useLight = uselightStore();
const useKey = useKeyStore();
const isLayer = ref(false);
const isTouchPad = ref(true);
const layer = ref(0);
const isLayoutTableSupport = ref(true);
const www = ref('')
const isSetWebSite = ref<boolean>(false);

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

const touchPadChanged = () => {
  let index = useKey.getIndex(0, 18);
  useKey.setKeyCode(index, isTouchPad.value ? KeyDefineEnum.KEY_RK_WWW : KeyDefineEnum.NONE);
}

const openWebSiteInput = () => {
  www.value = '';
  isSetWebSite.value = true;
}

const setWebSite = async () => {
  await useKey.setWebsite(www.value);
  isSetWebSite.value = false;
}

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