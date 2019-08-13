<template>
    <div id="donut-view">
        <div class="donut__box" :style="{ 'min-width': boxSize + 'px', 'min-height': boxSize + 'px' }">
            <donut-drawing
            v-if="boxSize > 0"
            :size="boxSize - 4"
            :values="values"
            :labels="labels"
            :colors="colors"
            :selected="selected"
            @selection="onUpdateSelection">
            </donut-drawing>
        </div>
        <div class="donut__inputs" :style="{ 'max-width': ((boxSize + 4) * 1.5) + 'px' }">
            <donut-inputs
            :selected="selected"
            @update="onInputUpdate">
            </donut-inputs>
        </div>       
    </div>
</template>

<style>
#donut-view {
    width: 100%;
    height: 100%;

    overflow-x: hidden;
    overflow-y: auto;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
}

.donut__box {
    border: 2px solid black;
    
    box-shadow: 4px 4px 0 0 black;

    outline: 1px solid white;

    margin-bottom: 10px;
    margin-right: 10px;
}

.donut__inputs {
    flex-grow: 1;
}
</style>


<script lang="ts">
import Vue from 'vue'
import DonutInputs from './DonutInputs.vue';
import DonutDrawing from './DonutDrawing.vue';

export default Vue.extend({
    name: "donut-view",
    props: ['size'],
    components: {
        DonutInputs,
        DonutDrawing
    },
    data() {
        //'size', 'values', 'labels', 'colors', 'selected'
        return {
            values: [ 16, 54, 21, 10 ],
            labels: [ "first", "second", "third", "fourth" ],
            colors: [],
            selected: -1
        }
    },
    computed: {
        boxSize() : number {
            return Math.max(this.size - 8, 250);
        }
    },
    methods: {
        onInputUpdate(data:any) : void {
            this.values = data;
        },
        onUpdateSelection(tags:string[]) : void {
            let valid = tags.filter(x => this.labels.includes(x));
            
            if (valid.length <= 0) {
                this.selected = -1;
                return;
            }

            let i = this.labels.indexOf(valid[0]) + 1;

            this.selected = i == this.labels.length ? 0 : i;
        }
    }
})
</script>



