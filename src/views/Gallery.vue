<template>
<div class="gallery">
    <div class="selectors">
        <div class="search" id="first">
            search
        </div>
        <div 
        v-for="drawing of drawings" 
        v-bind:key="drawing"
        @click="currentTab = drawing"
        :class="{'selectors--active' : currentTab === drawing }" >
            <div class="selectors__nib" :class="{'selectors__nib--active' : currentTab === drawing }">
                <div class="component" ref="svgar" v-if="currentTab === drawing">

                    <div class="fill">{{drawing}}</div>   
                    <div v-if="settingsOn" class="settings"> </div>     
                </div>
            </div>
        </div>
    </div>


    <!--
        @click="currentTab = drawing"
    <div class="canvas" @resize="onResize()">
    <div 
    ref="svgar" 
    class="svgar"
    >

    </div>
    -->


</div>
</template>

<!-- old structure
        <component
        v-if="w > 0"
        
        class="svgar--enter"

        :is="currentDrawingComponent"
        :size="+w"
        :state="state" 
        :planState="planState"
        :selected="selectedTags"     
        @selection="onDrawingSelection"

        :values="valueNumbers" 
        :labels="labels" 
        :colors="[]"

        :outerCorners="outerCornerPts"
        :innerCorners="innerCornerPts"
        @startmove="onStartMove"
        @endmove="onEndMove"
        @move="onMove"
        

        ></component>

            <div class="inputs">
        <div class="inputs__header">
            <span class="inputs__header__title">{{currentTab}}</span>
            <span class="inputs__header__description">&nbsp;:&nbsp;{{descriptions[currentTab]}}</span>
        </div>
        <component
        :is="currentInputComponent"
        :selected="selectedIndex"
        @update="onInputUpdate"
        @reset="onReset"
        @updateState="onUpdatePlanState"
        > </component>
    </div>
-->

<style>
.gallery {
    width: 100%;
    height: 100%;

    padding-top: 10px;
}

.search {
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    border-radius: 30px;
    border: 2px solid black;
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
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
    grid-auto-rows: 1fr;
    grid-gap: 10px;
    grid-auto-flow: dense;
}

.selectors::before {
    content: '';
    width: 0;
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
}

.selectors > *:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
}

.selectors--active {
    grid-row: span 4;
    grid-column: span 4;
}

@keyframes grow_grid {
    0% {
        grid-row: span 2;
        grid-column: span 2;
    }
    50% {
        grid-row: span 3;
        grid-column: span 3;
    }
    100% {
        grid-row: span 4;
        grid-column: span 4;       
    }
}

@media screen and (min-width: 900px) {
    .selectors--active {
        grid-row: span 8;
        grid-column: span 8;
    }   

    @keyframes grow_grid {
        0% {
            grid-row: span 2;
            grid-column: span 2;
        }
        33% {
            grid-row: span 4;
            grid-column: span 4;
        }
        66% {
            grid-row: span 6;
            grid-column: span 6;
        }
        100% {
            grid-row: span 8;
            grid-column: span 8;       
        }
    }
}

.selectors::-webkit-scrollbar {
  display: none;
}

.selectors__nib {
    width: calc(100% - 4px);
    height: calc(100% - 4px);

    border: 2px solid black;
}

.selectors__nib:hover:not(.selectors__nib--active) {
    cursor: pointer;
}

.selectors__nib--active {
    z-index: 10;
    background: white;
}

.settings {
    width: calc(100% - 4px);
    height: 20px;
    border-bottom: 2px solid black;
    border-right: 2px solid black;
    border-left: 2px solid black;
    background: white;

    animation-name: open_settings;
    animation-duration: 0.75s;
    animation-timing-function: linear;
}

@keyframes open_settings {
    from {
        height: 0;
    }
    to {
        
    }
}

.component {
    width: 100%;
    height: 100%;
}

.fill {
    height: 100%;
}

@keyframes grow_nib {
    from {
        width: 50px;
        height: 50px;
    }
    to {
        width: 100%;
        height: 100%;
    }
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

.inputs {
    flex-grow: 1;
    padding-left: 20px;
    padding-right: -10px;
    max-width: calc(100vw - 30px);
    min-width: 150px;

    overflow-x: visible;
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
import DonutView from '../components/gallery/donut/DonutView.vue';
import PlanView from '../components/gallery/plan/PlanView.vue';

export default Vue.extend({
    components: {
        DonutView,
        PlanView
    },
    data() {
        return {
            drawings: ["donut", "plan", "third", "fourth"],       
            currentTab: "",
            w: 0, 
            touchStart: 0,
            touchDelta: 0,
            settingsOn: false,
            state: "bw",
            values: [
                10,
                20
            ],
            titles: {
                donut: "donut",
                plan: "square plan",
                third: "third",
                fourth: "fourth"
            },
            descriptions: {
                donut: "two color states"
            },
            labels: [
                'WORK',     
                'MEET',     
                'WE',       
                'OPERATE',  
                'CIRCULATE'
            ],
            selectedTags: [] as string[],
            outer: [.7, .9, .3, .9, .3, .1, .7, .1],
            inner: [.55, .7, .45, .7, .45, .3, .55, .3],
            planState: "edit",
            moveIndex: [] as number[],
            moveStart: 0,
            moveDelta: 0,
            moveDirection: "",
            moveTarget: "",
            moving: false,
        }
    },
    mounted() {
        let canvas = <Element>this.$refs.svgar;
        this.w = canvas.clientWidth;

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
        },
        selectedIndex() : number {
            let valid = this.selectedTags.filter(x => this.labels.includes(x));

            if (valid.length <= 0) {
                return -1;
            }

            let i = this.labels.indexOf(valid[0]) + 1;

            return i == this.labels.length - 1 ? 0 : i;
        },
        outerCornerPts() : number[] {
            if(this.moving) {
                if (this.moveTarget == "outer") {
                    let modifiedOuter:number[] = [];

                    for (let i = 0; i < 8; i++) {
                        if(this.moveIndex.includes(i)) {
                            modifiedOuter.push(this.outer[i] + this.moveDelta);
                        }
                        else {
                            modifiedOuter.push(this.outer[i])
                        }
                    }

                    return modifiedOuter;
                }
            }

            return this.outer;      
        },
        innerCornerPts() : number[] {
            if(this.moving) {
                if(this.moveTarget == "inner") {
                    let modifiedInner:number[] = [];

                    for (let i = 0; i < 8; i++) {
                        if(this.moveIndex.includes(i)) {
                            modifiedInner.push(this.inner[i] + this.moveDelta);
                        }
                        else {
                            modifiedInner.push(this.inner[i]);
                        }
                    }

                    return modifiedInner;
                }
            }

            return this.inner;
        }
    },
    methods: {
        onResize() : void {
            this.w = (<Element>this.$refs.svgar).clientWidth;
            console.log("Resize!");
        },
        onGetSettings() : void {
            this.settingsOn = !this.settingsOn;
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
        },
        onDrawingSelection(tags: string[]) : void {
            this.selectedTags = tags;
        },
        onCancel() : void {
            console.log("PLEASE STOP");
            this.moving = false;
        },
        onReset() : void {
            this.moving = false;
            this.outer = [.7, .9, .3, .9, .3, .1, .7, .1];
            this.inner = [.55, .7, .45, .7, .45, .3, .55, .3];
        },
        onUpdatePlanState(state: string) : void {
            this.planState = state;
        },
        onStartMove(event: MouseEvent | TouchEvent, tags: string[]) : void {
            let x: number = 0;
            let y: number = 0;
            
            if(event instanceof MouseEvent) {
                x = event.pageX;
                y = event.pageY;
            }
            else {
                x = event.targetTouches[0].pageX;
                y = event.targetTouches[0].pageY;
            }

            // Identify coordinates to modify.
            if(tags.includes("first")) {
                this.moveIndex = [1, 3];
            }
            if(tags.includes("third")) {
                this.moveIndex = [5, 7];
            }
            if(tags.includes("second")) {
                this.moveIndex = [2, 4];
            }
            if(tags.includes("fourth")) {
                this.moveIndex = [0, 6];
            }

            this.moveDirection = tags.includes("first") || tags.includes("third") ? "Y" : "X";
            this.moveTarget = tags.includes("outer") ? "outer" : "inner";

            this.moveDelta = 0;
            this.moveStart = this.moveDirection == "Y" ? y : x;

            this.moving = true;
        },
        onEndMove(event: any, tags: string[]) : void {
            // Commit move to data and clear delta;
            if(this.moveTarget == "outer") {
                this.moveIndex.forEach(x => {
                    this.outer[x] = this.outer[x] + this.moveDelta;
                });
            }

            if(this.moveTarget == "inner") {
                this.moveIndex.forEach(x => {
                    this.inner[x] = this.inner[x] + this.moveDelta;
                })
            }

            this.moveIndex = [];
            this.moveDelta = 0;
            this.moving = false;
        },
        onMove(event: MouseEvent | TouchEvent) : void {
            let x:number = 0;
            let y:number = 0;

            if(event instanceof MouseEvent) {
                x = event.pageX;
                y = event.pageY;
            }
            else {
                x = event.targetTouches[0].pageX;
                y = event.targetTouches[0].pageY;
            }

            this.moveDelta = this.moveDirection == "Y" 
            ? (this.moveStart / this.w) - (y / this.w)
            : (x / this.w) - (this.moveStart / this.w);
        }
    },
    beforeDestroy: function () {
        window.removeEventListener('resize', this.onResize)
    },  
})
</script>



