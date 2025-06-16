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
            <div class="boxBtn"></div>
            <div class="boxBtn"></div>
            <div class="boxBtn"></div>
            <div class="boxBtn"></div>
        </div>
        <div class="bigBox">
            <div class="outBox">
                <div :class="{ round: !clickData[0][0], round_clicked: clickData[0][0] }" @click="roundClicked(0, 0)">
                </div>
                <div
                    :class="{ line: !clickData[0][0] || !clickData[0][1], line_clicked: clickData[0][0] && clickData[0][1] }">
                </div>
                <div :class="{ square: !clickData[0][1], square_clicked: clickData[0][1] }" @click="roundClicked(0, 1)">
                </div>
                <div
                    :class="{ line: !clickData[0][1] || !clickData[0][2], line_clicked: clickData[0][1] && clickData[0][2] }">
                </div>
                <div :class="{ round: !clickData[0][2], round_clicked: clickData[0][2] }" @click="roundClicked(0, 2)">
                </div>
                <div
                    :class="{ line: !clickData[0][2] || !clickData[0][3], line_clicked: clickData[0][2] && clickData[0][3] }">
                </div>
                <div :class="{ square: !clickData[0][3], square_clicked: clickData[0][3] }" @click="roundClicked(0, 3)">
                </div>
                <div
                    :class="{ line: !clickData[0][3] || !clickData[0][4], line_clicked: clickData[0][3] && clickData[0][4] }">
                </div>
                <div :class="{ round: !clickData[0][4], round_clicked: clickData[0][4] }" @click="roundClicked(0, 4)">
                </div>
                <div
                    :class="{ line: !clickData[0][4] || !clickData[0][5], line_clicked: clickData[0][4] && clickData[0][5] }">
                </div>
                <div :class="{ square: !clickData[0][5], square_clicked: clickData[0][5] }" @click="roundClicked(0, 5)">
                </div>
                <div
                    :class="{ line: !clickData[0][5] || !clickData[0][6], line_clicked: clickData[0][5] && clickData[0][6] }">
                </div>
                <div :class="{ round: !clickData[0][6], round_clicked: clickData[0][6] }" @click="roundClicked(0, 6)">
                </div>
            </div>

            <div class="outBox">
                <div :class="{ round: !clickData[1][0], round_clicked: clickData[1][0] }" @click="roundClicked(1, 0)">
                </div>
                <div
                    :class="{ line: !clickData[1][0] || !clickData[1][1], line_clicked: clickData[1][0] && clickData[1][1] }">
                </div>
                <div :class="{ square: !clickData[1][1], square_clicked: clickData[1][1] }" @click="roundClicked(1, 1)">
                </div>
                <div
                    :class="{ line: !clickData[1][1] || !clickData[1][2], line_clicked: clickData[1][1] && clickData[1][2] }">
                </div>
                <div :class="{ round: !clickData[1][2], round_clicked: clickData[1][2] }" @click="roundClicked(1, 2)">
                </div>
                <div
                    :class="{ line: !clickData[1][2] || !clickData[1][3], line_clicked: clickData[1][2] && clickData[1][3] }">
                </div>
                <div :class="{ square: !clickData[1][3], square_clicked: clickData[1][3] }" @click="roundClicked(1, 3)">
                </div>
                <div
                    :class="{ line: !clickData[1][3] || !clickData[1][4], line_clicked: clickData[1][3] && clickData[1][4] }">
                </div>
                <div :class="{ round: !clickData[1][4], round_clicked: clickData[1][4] }" @click="roundClicked(1, 4)">
                </div>
                <div
                    :class="{ line: !clickData[1][4] || !clickData[1][5], line_clicked: clickData[1][4] && clickData[1][5] }">
                </div>
                <div :class="{ square: !clickData[1][5], square_clicked: clickData[1][5] }" @click="roundClicked(1, 5)">
                </div>
                <div
                    :class="{ line: !clickData[1][5] || !clickData[1][6], line_clicked: clickData[1][5] && clickData[1][6] }">
                </div>
                <div :class="{ round: !clickData[1][6], round_clicked: clickData[1][6] }" @click="roundClicked(1, 6)">
                </div>
            </div>

            <div class="outBox">
                <div :class="{ round: !clickData[2][0], round_clicked: clickData[2][0] }" @click="roundClicked(2, 0)">
                </div>
                <div
                    :class="{ line: !clickData[2][0] || !clickData[2][1], line_clicked: clickData[2][0] && clickData[2][1] }">
                </div>
                <div :class="{ square: !clickData[2][1], square_clicked: clickData[2][1] }" @click="roundClicked(2, 1)">
                </div>
                <div
                    :class="{ line: !clickData[2][1] || !clickData[2][2], line_clicked: clickData[2][1] && clickData[2][2] }">
                </div>
                <div :class="{ round: !clickData[2][2], round_clicked: clickData[2][2] }" @click="roundClicked(2, 2)">
                </div>
                <div
                    :class="{ line: !clickData[2][2] || !clickData[2][3], line_clicked: clickData[2][2] && clickData[2][3] }">
                </div>
                <div :class="{ square: !clickData[2][3], square_clicked: clickData[2][3] }" @click="roundClicked(2, 3)">
                </div>
                <div
                    :class="{ line: !clickData[2][3] || !clickData[2][4], line_clicked: clickData[2][3] && clickData[2][4] }">
                </div>
                <div :class="{ round: !clickData[2][4], round_clicked: clickData[2][4] }" @click="roundClicked(2, 4)">
                </div>
                <div
                    :class="{ line: !clickData[2][4] || !clickData[2][5], line_clicked: clickData[2][4] && clickData[2][5] }">
                </div>
                <div :class="{ square: !clickData[2][5], square_clicked: clickData[2][5] }" @click="roundClicked(2, 5)">
                </div>
                <div
                    :class="{ line: !clickData[2][5] || !clickData[2][6], line_clicked: clickData[2][5] && clickData[2][6] }">
                </div>
                <div :class="{ round: !clickData[2][6], round_clicked: clickData[2][6] }" @click="roundClicked(2, 6)">
                </div>
            </div>

            <div class="outBox">
                <div :class="{ round: !clickData[3][0], round_clicked: clickData[3][0] }" @click="roundClicked(3, 0)">
                </div>
                <div
                    :class="{ line: !clickData[3][0] || !clickData[3][1], line_clicked: clickData[3][0] && clickData[3][1] }">
                </div>
                <div :class="{ square: !clickData[3][1], square_clicked: clickData[3][1] }" @click="roundClicked(3, 1)">
                </div>
                <div
                    :class="{ line: !clickData[3][1] || !clickData[3][2], line_clicked: clickData[3][1] && clickData[3][2] }">
                </div>
                <div :class="{ round: !clickData[3][2], round_clicked: clickData[3][2] }" @click="roundClicked(3, 2)">
                </div>
                <div
                    :class="{ line: !clickData[3][2] || !clickData[3][3], line_clicked: clickData[3][2] && clickData[3][3] }">
                </div>
                <div :class="{ square: !clickData[3][3], square_clicked: clickData[3][3] }" @click="roundClicked(3, 3)">
                </div>
                <div
                    :class="{ line: !clickData[3][3] || !clickData[3][4], line_clicked: clickData[3][3] && clickData[3][4] }">
                </div>
                <div :class="{ round: !clickData[3][4], round_clicked: clickData[3][4] }" @click="roundClicked(3, 4)">
                </div>
                <div
                    :class="{ line: !clickData[3][4] || !clickData[3][5], line_clicked: clickData[3][4] && clickData[3][5] }">
                </div>
                <div :class="{ square: !clickData[3][5], square_clicked: clickData[3][5] }" @click="roundClicked(3, 5)">
                </div>
                <div
                    :class="{ line: !clickData[3][5] || !clickData[3][6], line_clicked: clickData[3][5] && clickData[3][6] }">
                </div>
                <div :class="{ round: !clickData[3][6], round_clicked: clickData[3][6] }" @click="roundClicked(3, 6)">
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
const clickData = reactive([
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
]);


const roundClicked = (row: number, col: number) => {
    clickData[row][col] = !clickData[row][col];

    // 更新TRPS
    let num = 0;
    if (clickData[row][0]) num |= 1;
    if (clickData[row][1]) num |= 2;
    if (clickData[row][2]) num |= 4;
    if (clickData[row][3]) num |= 24;
    if (clickData[row][4]) num |= 32;
    if (clickData[row][5]) num |= 64;
    if (clickData[row][6]) num |= 128;
};
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
    cursor:pointer;
}

.round_clicked {
    width: 20px;
    height: 20px;
    background-color: #6A6A77;
    border-radius: 10px;
    cursor:pointer;
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
    cursor:pointer;
}

.square_clicked {
    width: 20px;
    height: 20px;
    background-color: #6A6A77;
    border-radius: 3px;
    cursor:pointer;
}
</style>