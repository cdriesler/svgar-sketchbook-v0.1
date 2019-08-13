<template>
    <div id="square-plan-view">
        <div class="plan__box" :style="{ 'min-width': boxSize + 'px', 'min-height': boxSize + 'px' }">
            <plan-drawing
            v-if="boxSize > 0"
            :size="boxSize - 4"
            :state="state" 
            :outerCorners="outerCornerPts" 
            :innerCorners="innerCornerPts"
            @startmove="onStartMove"
            @move="onMove"
            @endmove="onEndMove">
            </plan-drawing>
        </div>
        <div class="donut__inputs" :style="{ 'max-width': (boxSize + 4) + 'px' }">
            <plan-inputs
            @updateState="onUpdateState"
            @reset="onReset">
            </plan-inputs>
        </div>
    </div>
</template>

<style>
#square-plan-view {
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

.plan__box {
    border: 2px solid black;
    
    box-shadow: 4px 4px 0 0 black;

    outline: 1px solid white;

    margin-bottom: 10px;
    margin-right: 10px;
}

.plan__inputs {
    flex-grow: 1;
}
</style>

<script lang="ts">
import Vue from 'vue'
import PlanDrawing from './PlanDrawing.vue';
import PlanInputs from './PlanInputs.vue';

export default Vue.extend({
    name: "plan-view",
    props: ['size'],
    components: {
        PlanDrawing,
        PlanInputs
    },
    data() {
        return {
            state: "view",
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
    computed: {
        boxSize() : number {
            return Math.max(this.size - 8, 250);
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
        onUpdateState(state:string) : void {
            this.state = state;
        },
        onReset() : void {
            this.moving = false;
            this.outer = [.7, .9, .3, .9, .3, .1, .7, .1];
            this.inner = [.55, .7, .45, .7, .45, .3, .55, .3];
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
            ? (this.moveStart / this.size) - (y / this.size)
            : (x / this.size) - (this.moveStart / this.size);
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
    }

})
</script>

