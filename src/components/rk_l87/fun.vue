<template>
  <div style="height: 30vh;">
    <el-scrollbar>
      <div class="d-flex text-black jc-center">
        <div :class="[`d-flex flex-column ${line.style}`]" v-for="line in useKey.state.keyFunList">
          <div :class="[`mt-3 ${box.style}`]" v-for="box in line.boxs">
            <div class="bg-white-1 p-1" style="border-radius: 5px 5px 0px 0px">
              {{ $t(box.title) }}
            </div>
            <div class="d-flex flex-wrap bg-white jc-between" style="border-radius: 0px 0px 5px 5px">
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
.d-none {
  display: none;
}

.selected {
  background-color: #4743A7 !important;
  color: #ffffff;
}

.key {
  margin: 4px;
  font-size: 14px;
  width: 20px;
  height: 20px;
}

.key1 {
  width: 65px;
}

.key2 {
  width: 227px;
}


.box {
  width: 180px;
}

.box1 {
  width: 325px;
}

.box2 {
  width: 380px;
}
</style>