<template>
    <div>
        <div 
        v-for="label of labels" 
        v-bind:key="label" 
        class="slider"
        >
            <div class="slider__value" :class="{ 'slider__value--active' : labels.indexOf(label) == selected }">
                {{labelValue[labels.indexOf(label)]}}
            </div>
            <div class="slider__swatch">
            </div>
            <div class="slider__slider">
                <input type="range" min="0" max="100" :v-model="values[labels.indexOf(label)]" :value="values[labels.indexOf(label)]" @input="onChange($event.target.valueAsNumber, label)" class="slider__input">
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

.slider__value--active {
    background: black;
    color: white;
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
    props: ['selected'],
    data() {
        return {
            labels: [
                "first",
                "second",
                "third",
                "fourth"
            ],
            values: [
                16,
                54,
                21,
                10
            ]
        }
    },
    computed: {
        labelValue() : any {
            return this.values;
        }
    },
    mounted() {
        this.$emit('update', this.values);
    },
    methods: {
        onChange(value: number, label: string) : void {
            Vue.set(this.values, this.labels.indexOf(label), value);
            this.$emit('update', this.values);
        },
        onClick(event: any) : void {
            console.log(event.path[0].attributes["svgar-tags"].value);
            //event.path[0].attributes.svgar-tags.value
        }
    }
    
})
</script>
