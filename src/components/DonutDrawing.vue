<template>
<div>
    <div v-html="svg">
    </div>
</div>
</template>

<style>

</style>

<script lang="ts">
import Vue from 'vue'
import DonutBuilder from "./DonutBuilder";

export default Vue.extend({
    props: ['size', 'values', 'labels', 'colors'],
    name: "donut-drawing",
    data() {
        return {
            W: 0,
            H: 0,
            Values: [] as number[],
            Labels: [] as string[],
            Colors: [] as string[],
            Radius: 0.425,
            ValueTotal: 0,
            ValueParameters: [] as number[],
            CosCoordinates: [] as number[],
            SinCoordinates: [] as number[]
        }
    },
    mounted() {
        this.W = +this.size;
        this.H = +this.size;
        this.Values = this.values;
        this.Labels = this.labels;
        this.Colors = this.colors;

        this.ValueTotal = this.Values.reduce((a, b) => a + b, 0);

        this.ValueParameters = [this.Values[0] / this.ValueTotal];

        for (let i = 1; i < this.Values.length; i++) {
            this.ValueParameters.push((this.Values[i] / this.ValueTotal) + this.ValueParameters[i - 1])
        }

        this.ValueParameters.forEach(x => {
            this.CosCoordinates.push((this.Radius + 0.02) * Math.cos((2 * Math.PI) * x));
            this.SinCoordinates.push((this.Radius + 0.02) * Math.sin((2 * Math.PI) * x));
        });
    },
    computed: {
        svg() : string {
            let DonutGraph = new DonutBuilder(this.values, this.Labels, this.Colors);

            return DonutGraph.Build().Compile(undefined, this.W, this.H);
        }
    },
})
</script>
