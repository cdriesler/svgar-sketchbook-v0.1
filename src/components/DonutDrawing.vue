<template>
    <svg
    :xmlns="Svgar.xmlns"
    :version="Svgar.version"
    :viewBox="Svgar.viewBox"
    :width="Svgar.width + 'px'"
    :height="Svgar.height + 'px'">
        <g 
        v-for="layer in Svgar.layers" 
        :key="'layer_' + Svgar.layers.indexOf(layer)"
        :style="layer.styleInline"
        :svgar-tags="layer.tags"
        :clip-path="layer.clipPathUrl"
        :class="tagsToClasses(layer.tags)" >
            <clipPath v-if="layer.clipPath != ''" v-html="layer.clipPath"></clipPath>
            <path
            v-for="geo in layer.geometry"
            :key="'geo_' + layer.geometry.indexOf(geo)"
            :d="geo.d"
            :style="geo.styleInline"
            :svgar-tags="geo.tags"
            :class="[tagsToClasses(geo.tags), { 'slice--active' : selected[0] == geo.tags[0] && geo.tags.includes('slice') }]"
            @click="onClick($event, geo.tags)">
            </path>   
        </g>
    </svg>
</template>


<style>
.slice:hover {
    cursor: pointer;
    fill-opacity: 0.5;
}

.toggle:hover {
    cursor: pointer;
}

.slice--active {
    fill: black !important;
}
</style>

<script lang="ts">
import Vue from 'vue'
import DonutBuilder from "./DonutBuilder";
import { SvgarDrawing } from 'svgar/dist/models/schema/drawing/Drawing';

export default Vue.extend({
    props: ['size', 'values', 'labels', 'colors', 'selected'],
    name: "donut-drawing",
    data() {
        return {
            W: this.size,
            H: this.size,
            Values: [] as number[],
            Labels: [] as string[],
            Colors: [] as string[],
            Radius: 0.425,
            ValueTotal: 0,
            ValueParameters: [] as number[],
            CosCoordinates: [] as number[],
            SinCoordinates: [] as number[],
            Svg: "",
        }
    },
    mounted() {
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
            // let DonutGraph = new DonutBuilder(this.values, this.labels, this.colors);
            // this.Svg = DonutGraph.Build().Compile(undefined, this.size, this.size, "vue");

            this.Svg = "";

            return this.Svg;
        },
        vals() : number[] {
            return this.values;
        },
        liveSvg() : any {
            return Vue.compile(this.svg);
        },
        Svgar() : SvgarDrawing {
            let DonutGraph = new DonutBuilder(this.values, this.labels, this.colors);
            return DonutGraph.Build().ToSvg(undefined, this.size, this.size);
        }
    },
    methods: {
        svgarOnClick(event: any) : void {
            console.log(event);
        },
        onClick(event: any, tags: string[]) : void {
            this.$emit('selection', tags);
        },
        tagsToClasses(tags: string[]) : string {
            let classes = "";

            tags.forEach(x => {
                classes = classes + " " + x;
            });

            return classes;
        }
    }
})
</script>
