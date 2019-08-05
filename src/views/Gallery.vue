<template>
<div class="gallery">
    <div class="canvas" @resize="onResize()">
    <div 
    ref="svgar" 
    class="svgar"
    >
        <component
        v-if="w > 0"
        
        class="svgar--enter"

        :is="currentDrawingComponent"
        :size="+w"
        :state="state" 
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
        :selected="selectedIndex"
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
import DonutDrawing from '../components/DonutDrawing.vue';
import DonutInputs from '../components/DonutInputs.vue';
import PlanDrawing from '../components/PlanDrawing.vue';
import PlanInputs from '../components/PlanInputs.vue';

export default Vue.extend({
    components: {
        DonutDrawing,
        DonutInputs,
        PlanDrawing,
        PlanInputs
    },
    data() {
        return {
            drawings: ["donut", "plan"],       
            currentTab: "plan",
            w: 0, 
            offsetLeft: 0,
            offsetTop: 0,
            touchStart: 0,
            touchDelta: 0,
            state: "bw",
            values: [
                10,
                20
            ],
            titles: {
                donut: "donut",
                plan: "square plan",
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
        onStartMove(event: any, tags: string[]) : void {
            // Get extents of canvas in pixel dimensions so delta can be normalized
            this.offsetLeft = event.path[3].offsetLeft;
            this.offsetTop = event.path[3].offsetTop;

            this.moveDirection = tags.includes("bottom") || tags.includes("top") ? "Y" : "X";
            this.moveTarget = tags.includes("outer") ? "outer" : "inner";

            this.moveStart = this.moveDirection == "Y" ? event.pageY : event.pageX;
            this.moveDelta = 0;

            // Identify coordinates to modify.
            if(tags.includes("top")) {
                this.moveIndex = [1, 3];
            }
            if(tags.includes("bottom")) {
                this.moveIndex = [5, 7];
            }
            if(tags.includes("left")) {
                this.moveIndex = [2, 4];
            }
            if(tags.includes("right")) {
                this.moveIndex = [0, 6];
            }

            this.moving = true;
            
            console.log("START: " + this.moveStart);
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

            this.moving = false;
            this.moveDelta = 0;

            console.log("END: " + tags);
        },
        onMove(event: any) : void {
            //console.log(event);

            this.moveDelta = this.moveDirection == "Y" 
            ? (this.moveStart / this.w) - (event.pageY / this.w)
            : (this.moveStart / this.w) - (event.pageX / this.w);

            if(this.moving) {
                console.log(this.moveDelta);
            }
        }
    },
    beforeDestroy: function () {
        window.removeEventListener('resize', this.onResize)
    },  
})
</script>



