<template>
    <div class="d-flex jc-between text-grey">
        <div class="dot"></div>
        <div class="d-flex flex-column ai-center dot">
            <div><img src="../../assets/images/menu/high/down.png" /></div>
            <div>1.0mm</div>
        </div>
        <div class="d-flex flex-column ai-center dot">
            <div><img src="../../assets/images/menu/high/down.png" /></div>
            <div>3.6mm</div>
        </div>
        <div class="d-flex flex-column ai-center dot">
            <div><img src="../../assets/images/menu/high/up.png" /></div>
            <div>3.6mm</div>
        </div>
        <div class="d-flex flex-column ai-center dot">
            <div><img src="../../assets/images/menu/high/up.png" /></div>
            <div>1.0mm</div>
        </div>
    </div>

    <div class="d-flex">
        <div class="DKSBtnBox">
            <div v-for="item in useAdvKey.$state.advKeyDKS.list"
                @click="useAdvKey.$state.advKeyDKS.selectedDKS(item.index)" :class="['boxBtn', item.isSelected()]"><span
                    style="word-wrap: break-word;filter: drop-shadow(#6a6a77 99999px 0);position: relative;left: -99999px;color:#6a6a77"
                    v-html="useAdvKey.keyText(item.key)"></span>
            </div>
        </div>
        <div class="bigBox">
            <div class="outBox" v-for="item in useAdvKey.$state.advKeyDKS.list">
                <div :class="{ round: !item.value[0], round_clicked: item.value[0] }" @click="item.roundClicked(0)">
                </div>
                <div :class="{ line: !item.value[0] || !item.value[1], line_clicked: item.value[0] && item.value[1] }">
                </div>
                <div :class="{ square: !item.value[1], square_clicked: item.value[1] }" @click="item.roundClicked(1)">
                </div>
                <div :class="{ line: !item.value[1] || !item.value[2], line_clicked: item.value[1] && item.value[2] }">
                </div>
                <div :class="{ round: !item.value[2], round_clicked: item.value[2] }" @click="item.roundClicked(2)">
                </div>
                <div :class="{ line: !item.value[2] || !item.value[3], line_clicked: item.value[2] && item.value[3] }">
                </div>
                <div :class="{ square: !item.value[3], square_clicked: item.value[3] }" @click="item.roundClicked(3)">
                </div>
                <div :class="{ line: !item.value[3] || !item.value[4], line_clicked: item.value[3] && item.value[4] }">
                </div>
                <div :class="{ round: !item.value[4], round_clicked: item.value[4] }" @click="item.roundClicked(4)">
                </div>
                <div :class="{ line: !item.value[4] || !item.value[5], line_clicked: item.value[4] && item.value[5] }">
                </div>
                <div :class="{ square: !item.value[5], square_clicked: item.value[5] }" @click="item.roundClicked(5)">
                </div>
                <div :class="{ line: !item.value[5] || !item.value[6], line_clicked: item.value[5] && item.value[6] }">
                </div>
                <div :class="{ round: !item.value[6], round_clicked: item.value[6] }" @click="item.roundClicked(6)">
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useAdvKeyStore } from "@/stores/rk_c61/advKeyStore";
import { useKeyStore } from "@/stores/rk_c61/keyStore";

const useKey = useKeyStore();
const useAdvKey = useAdvKeyStore();

</script>
<style scoped lang="scss">
.dot {
    width: 85px;
    color: #6A6A77;
}

.DKSBtnBox {
    display: grid;
    gap: 10px;
    align-content: space-evenly;
}

.bigBox {
    display: grid;
    gap: 10px;
    margin-left: 20px;
}

.outBox {
    height: 50px;
    display: flex;
    justify-items: center;
    align-items: center;
}

.round {
    width: 20px;
    height: 20px;
    background-color: #BABABB;
    border-radius: 10px;
    cursor: pointer;
}

.round_clicked {
    width: 20px;
    height: 20px;
    background-color: #6A6A77;
    border-radius: 10px;
    cursor: pointer;
}

.line {
    width: 25px;
    height: 2px;
    background-color: #BABABB;
}

.line_clicked {
    width: 25px;
    height: 2px;
    background-color: #6A6A77;
}

.square {
    width: 20px;
    height: 20px;
    background-color: #BABABB;
    border-radius: 3px;
    cursor: pointer;
}

.square_clicked {
    width: 20px;
    height: 20px;
    background-color: #6A6A77;
    border-radius: 3px;
    cursor: pointer;
}
</style>