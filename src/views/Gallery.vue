<template>
<div class="gallery">
    <div class="canvas" @resize="onResize()">
    <div 
    ref="svgar" 
    class="svgar"
    v-touch:swipe.left="onSwipeLeft" 
    v-touch:swipe.right="onSwipeRight"
    v-touch:start="startHandler"
    v-touch:end="endHandler"
    v-touch:moving="movingHandler" 
    >
        <component
        v-if="w > 0"
        
        class="svgar--enter"

        :is="currentDrawingComponent"
        :size="+w"
        :state="state"

        :values="valueNumbers" 
        :labels="['WORK',     'MEET',     'WE',       'OPERATE',  'CIRCULATE']" 
        :colors="[]"

        ></component>
    </div>

    <div class="selectors">
        <div 
        v-for="drawing of drawings" 
        v-bind:key="drawing" 
        @click="currentTab = drawing"
        :class="{ 
            'selectors__nib--active' : currentTab === drawing,
            'selectors__nib--first' : drawing === drawings[0] }"
        class="selectors__nib">{{titles[drawing]}}
        </div>  
    </div>
    </div>

    <div class="inputs">
        <div class="inputs__header">
            <span class="inputs__header__title">{{currentTab}}</span>
            <span class="inputs__header__description">&nbsp;:&nbsp;{{descriptions[currentTab]}}</span>
        </div>
        <component
        :is="currentInputComponent"
        @update="onInputUpdate"
        > </component>
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

    overflow: hidden;
}

.svgar--enter {
    animation-name: enter;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
    animation-timing-function: ease;
}

@keyframes enter {
    from {
        transform: translate(500px, 0);
    }
    to {
        transform: translate(0, 0);
    }
}

.selectors {
    width: calc(100% + 3px);

    margin-top: 20px;
    margin-bottom: 20px;

    height: 30px;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;

    overflow-x: auto;
    overflow-y: visible;

    white-space: nowrap;
}

.selectors::-webkit-scrollbar {
  display: none;
}

.selectors__nib {
    font-size: 10px;
    line-height: 20px;
    
    vertical-align: middle;

    padding-left: 10px;
    padding-right: 10px;
    margin-left: 10px;
    margin-right: 10px;

    border: 2px solid black;
    outline: 1px solid white;
    box-shadow: 4px 4px 0 0 black;

    transform: translate(0, 0);

    transition: transform;
}

.selectors__nib--first {
    margin-left: 0px;
}

.selectors__nib--active {
    color: white;
    background: black;

    outline-offset: -3px;

    transform: translate(4px, 4px);
    box-shadow: none;
}

.selectors__nib:hover {
    cursor: pointer;

    animation-name: drop-button;
    animation-duration: 0.2s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-in;
}

@keyframes drop-button {
    from {
        transform: translate(0, 0);
        box-shadow: 4px 4px 0 0 black;
    }
    to {
        transform: translate(4px, 4px);
        box-shadow: 0px 0px 0 0 white;
    }
}

.arrow:hover {
    cursor: pointer;
    fill: black;
}

.toggle-click:hover {
    cursor: pointer;
}

.inputs {
    flex-grow: 1;
    padding-left: 20px;
    padding-right: -10px;
    max-width: calc(100vw - 30px);
    min-width: 150px;

    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: clip;
}

@media screen and (max-width: 500px) {
    .inputs {
        padding-left: 15px;
        padding-right: 15px;
    }

}

.inputs__header {
    border-top: 2px solid black;
    border-bottom: 2px solid black;
    font-size: 12px;
    line-height: 30px;
    width: 100%;

    margin-bottom: 10px;
}

.inputs__header__title {
    margin-left: 10px;
    font-size: 12px;
    font-weight: bold;
}

.inputs__header__description {
    font-size: 12px;
}
</style>

<script lang="ts">
import Vue from 'vue'
import DonutDrawing from '../components/DonutDrawing.vue';
import DonutInputs from '../components/DonutInputs.vue';

export default Vue.extend({
    components: {
        DonutDrawing,
        DonutInputs
    },
    data() {
        return {
            drawings: ["donut", "other", "third", "long", "longer"],       
            currentTab: "donut",
            w: 0, 
            touchStart: 0,
            touchDelta: 0,
            state: "bw",
            values: [
                10,
                20
            ],
            titles: {
                donut: "donut",
                other: "other",
                third: "third",
                long: "really long title",
                longer: "really really really really long title"
            },
            descriptions: {
                donut: "two color states"
            }
        }
    },
    mounted() {
        this.w = (<Element>this.$refs.svgar).clientWidth;

        window.addEventListener('resize', this.onResize);

    },
    computed: {
        currentDrawingComponent() : string {
            return this.currentTab + "-drawing";
        },
        currentInputComponent() : string {
            return this.currentTab + "-inputs";
        },
        valueNumbers() : number[] {
            return this.values as number[];
        }
    },
    methods: {
        onResize() : void {
            this.w = (<Element>this.$refs.svgar).clientWidth;
        },
        onSwipeLeft() : void {
            this.currentTab = this.drawings[(this.drawings.indexOf(this.currentTab) + 1) % this.drawings.length];
        },
        onSwipeRight() : void { 
            if (this.currentTab == this.drawings[0]) {
                this.currentTab = this.drawings[this.drawings.length - 1];
            }
            else {
                this.currentTab = this.drawings[(this.drawings.indexOf(this.currentTab) - 1) % this.drawings.length];
            }     
        },
        startHandler(event: any) : void {
            this.touchStart = event.touches[0].pageX;
        },
        endHandler() : void {
            this.touchStart = 0;
            this.touchDelta = 0;
        },
        movingHandler(event: any) : void {
            this.touchDelta = event.touches[0].pageX - this.touchStart;            
        },
        onInputUpdate(data: any) : void {
            this.values = data;
        }
    },
    beforeDestroy: function () {
        window.removeEventListener('resize', this.onResize)
    },  
})
</script>



