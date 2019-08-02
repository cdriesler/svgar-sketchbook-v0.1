<template>
<div class="gallery">
    <div class="canvas">
    <div class="svgar">
        
    </div>

    <div class="selectors">
        <div class="selectors__nib nav">
            <svg viewbox="0 0 10px 10px" width="10px" height="10px">
                <path class="arrow" stroke-width="2px" stroke="black" fill="white" d="M 8 2 C 5.5 3.5 5.5 3.5 3 5 C 5.5 6.5 5.5 6.5 8 8 Z" />
            </svg>
        </div>
        <div v-for="drawing of drawings" v-bind:key="drawing" class="selectors__nib"></div>
        <div class="selectors__nib nav">
            <svg viewbox="0 0 10px 10px" width="10px" height="10px">
                <path class="arrow" stroke-width="2px" stroke="black" fill="white" d="M 2 2 C 4.5 3.5 4.5 3.5 7 5 C 4.5 6.5 4.5 6.5 2 8 Z" />
            </svg>
        </div>   
    </div>
    </div>

    <div class="inputs">
        <div class="inputs__header">
            INPUTS
        </div>
    </div>
</div>
</template>

<style>
.gallery {
    width: 100%;
    height: 100%;

    margin: 0;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
    justify-content: space-around;
}

.canvas {
    width: calc(100vw - 60px);
    max-width: 500px;
}

.svgar {
    width: 100%;
    height: calc(100vw - 60px);
    max-height: 500px;

    border: 2px solid black;
    outline: 1px solid white;

    box-shadow: 5px 5px 0 0 black;
}

.selectors {
    width: 100%;

    margin-top: 20px;
    margin-bottom: 20px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
}

.selectors__nib {
    width: 10px;
    height: 10px;

    margin-left: 10px;
    margin-right: 10px;

    outline: 2px solid black;
    outline-offset: -2px;
}

.selectors__nib:hover:not(.nav) {
    cursor: pointer;
    background: black;
}

.nav {
    outline: none;
    transform: translateY(-3px);
}

.arrow:hover {
    cursor: pointer;
    fill: black;
}

.inputs {
    flex-grow: 1;
    padding-left: 20px;
    max-width: calc(100vw - 30px);
    min-width: 150px;
}

@media screen and (max-width: 500px) {
    .inputs {
        padding-left: 15px;
        padding-right: 15px;
    }

}

.inputs__header {
    border-top: 2px solid black;
    width: 100%;
}
</style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            drawings: ["pie", "other", "third"]
        }
    }
    
})
</script>



