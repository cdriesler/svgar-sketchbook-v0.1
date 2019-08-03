<template>
    <div>
        <div v-for="label of labels" v-bind:key="label" class="slider">
            <div class="slider__value">
            </div>
            <div class="slider__swatch">
            </div>
            <div class="slider__slider">
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

    margin-bottom: 10px;
}

.slider__value {
    width: 40px;
    height: 100%;

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

    background: red;
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
            ]
        }
    }
    
})
</script>
