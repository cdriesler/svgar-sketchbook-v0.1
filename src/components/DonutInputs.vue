<template>
    <div>
        <div v-for="label of labels" v-bind:key="label" class="slider">
            <div class="slider__value">
                {{values[labels.indexOf(label)]}}
            </div>
            <div class="slider__swatch">
            </div>
            <div class="slider__slider">
                <input type="range" min="0" max="100" v-model="values[labels.indexOf(label)]" class="slider__input">
            </div>
        </div>
    </div>
</template>

<style>
.slider {
    width: 100%;
    height: 20px;

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-start;

    margin-bottom: 10px;
}

.slider__value {
    width: 40px;
    height: 100%;

    line-height: 20px;
    text-align: center;

    font-size: 10px;

    margin-right: 5px;

    outline: 2px solid black;
    outline-offset: -2px;
}

.slider__swatch {
    width: 20px;
    height: 100%;

    margin-right: 5px;

    background: gainsboro;
}

.slider__slider {
    flex-grow: 1;

    height: 100%;

    transform: translateY(-2px);
}

.slider__input {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 2px;

    background: gainsboro;
}

.slider__input::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 10px;
    height: 20px;
    border: 2px solid black;
    background: white;
    cursor: pointer;
}

.slider__input::-moz-range-thumb {
    -webkit-appearance: none;
    width: 10px;
    height: 20px;
    border: 2px solid black;
    background: white;
    cursor: pointer;
}
</style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "donut-inputs",
    data() {
        return {
            labels: [
                "first",
                "second"
            ],
            values: [
                10,
                20
            ]
        }
    }
    
})
</script>
