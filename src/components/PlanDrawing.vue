<template>
    <svg
    :xmlns="svgar.xmlns"
    :version="svgar.version"
    :viewBox="svgar.viewBox"
    :width="svgar.width + 'px'"
    :height="svgar.height + 'px'">
        <g
        v-for="layer in svgar.layers" 
        :key="'layer_' + svgar.layers.indexOf(layer)"
        :style="layer.styleInline"
        :svgar-tags="layer.tags">
            <path
            v-for="geo in layer.geometry"
            :key="'geo_' + layer.geometry.indexOf(geo)"
            :d="geo.d"
            :style="geo.styleInline"
            :svgar-tags="geo.tags"
            @mousedown="onMouseDown">
            </path>
        </g>
    </svg>
</template>

<style>

</style>

<script lang="ts">
import Vue from 'vue'
import PlanBuilder from './PlanBuilder';
import { SvgarDrawing } from 'svgar/dist/models/schema/drawing/Drawing';

export default Vue.extend({
    name: "plan-drawing",
    props: ["size", "outerCorners", "innerCorners"],
    computed: {
        svgar() : SvgarDrawing {
            return new PlanBuilder(this.outerCorners, this.innerCorners).Build().ToSvg(undefined, this.size, this.size);
        }
    },
    methods: {
        onMouseDown(event: any) : void {
            console.log(event);
        }
    }
})
</script>


