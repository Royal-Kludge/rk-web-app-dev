<template>
  <div style="height: 30vh;">
    <el-scrollbar>
      <div class="d-flex text-black jc-center">
        <div :class="[`d-flex flex-column ${line.style}`]" v-for="line in useKey.state.keyFunList">
          <div :class="[`mt-4 ${box.style}`]" v-for="box in line.boxs">
            <div class="bg-white-1 p-2" style="border-radius: 5px 5px 0px 0px">
              {{ $t(box.title) }}
            </div>
            <div class="d-flex flex-wrap bg-white p-1 jc-between" style="border-radius: 0px 0px 5px 5px">
              <div
                :class="[`c-p d-flex ai-center jc-center p-1 m-1 bg-grey ${item.style}`, useKey.isFunSelected(item.key)]"
                v-for="item in box.keys" @click="useKey.mapping(item.key)">
                {{ item.text }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import { useKeyStore } from "@/stores/keyStore";
const useKey = useKeyStore();
</script>
<style scoped lang="scss">
.selected {
  background-color: #4743A7 !important;
  color: #ffffff;
}

.key {
  width: 24px;
  height: 24px;
}

.key1 {
  width: 84px;
}

.key2 {
  width: 195px;
}


.box {
  width: 208px;
}

.box1 {
  width: 328px;
}

.box2 {
  width: 408px;
}
</style>