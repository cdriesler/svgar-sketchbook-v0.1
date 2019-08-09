<template>
    <div id="donut-view">
        <div class="donut__box" :style="{ 'min-width': boxSize + 'px', 'min-height': boxSize + 'px' }">
            <donut-drawing
            :size="boxSize"></donut-drawing>
        </div>
        <div class="donut__inputs" :style="{ 'max-width': (boxSize + 4) + 'px' }">
            <donut-inputs></donut-inputs>
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
    computed: {
        boxSize() : number {
            return this.size - 8;
        }
    }
})
</script>



