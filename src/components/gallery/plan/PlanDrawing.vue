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
            :class="tagsToClasses(geo.tags)"
            @mousedown="onMouseDown($event, geo.tags)"
            @mousemove="onMouseMove($event, geo.tags)"
            @mouseleave="onMouseUp($event, geo.tags)"
            @mouseup="onMouseUp($event, geo.tags)"
            @touchstart="onMouseDown($event, geo.tags)"
            @touchend="onMouseUp($event, geo.tags)"
            @touchmove="onMouseMove($event, geo.tags)">
            </path>
        </g>
    </svg>
</template>

<style>
.arrow:hover {
    fill: black !important;
    cursor: pointer;
}

.interior:hover {
    fill: grey !important;
}

</style>

<script lang="ts">
import Vue from 'vue'
import PlanBuilder from './PlanBuilder';
import { SvgarDrawing, Drawing } from 'svgar/dist/models/schema/drawing/Drawing';

export default Vue.extend({
    name: "plan-drawing",
    props: ["size", "state", "outerCorners", "innerCorners"],
    data() {
        return {
            drawing: {} as Drawing,
        }
    },
    computed: {
        svgar() : SvgarDrawing {
            let dwg = new PlanBuilder(this.outerCorners, this.innerCorners).Build();
            this.drawing = dwg;
            return dwg.ToSvg(this.state, this.size, this.size);
        }
    },
    methods: {
        onMouseDown(event: any, tags: string[]) : void {
            this.$emit('startmove', event, tags);
        },
        onMouseMove(event: any, tags: string[]) : void {
            this.$emit('move', event, tags);
        },
        onMouseUp(event: any, tags: string[]) : void {
            this.$emit('endmove', event, tags);
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


