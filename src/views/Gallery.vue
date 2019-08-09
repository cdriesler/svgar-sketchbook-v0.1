<template>
<div id="gallery-wrapper">
    <div class="search">
        <div class="search__prompt">
            search: 
        </div>
        <input type="text" v-model="query" />
    </div>
    <div class="gallery">
        <div class="gallery__active_icon">
            <div class="gallery__active_icon__main">
            </div>

            <div class="gallery__active_icon__right_toggle" @click="onToggleTray">
                <div class="gallery__active_icon__right_toggle__button">
                    <div class="gallery__active_icon__right_toggle__button__text" >{{trayIcon}}</div>
                </div>
            </div>


            <div class="gallery__active_icon__bottom_toggle">
            </div>

            <div class="gallery__active_icon__elbow">
            </div>
        </div>
        <div class="gallery__layer_viewer">
            
        </div>
        <div class="gallery__body">
            <div class="gallery__body__tabs" v-if="trayOpen == true" >
                <div class="gallery__body__tabs__category" v-for="category in categories" :key="category.name">
                    <div class="gallery__body__tabs__category__icons">
                        <div 
                        class="gallery__body__tabs__category__icons__icon" 
                        v-for="drawing in category.drawings" 
                        :key="category + '_' + drawing"
                        @click="currentTab = drawing"
                        :class="{ 'gallery__body__tabs__category__icons__icon--active' : currentTab === drawing }">
                        </div>
                    </div>
                    <div class="gallery__body__tabs__category__label">
                        <!--
                        <div class="gallery__body__tabs__category__label__text">
                            {{category.name}}
                        </div> 
                        -->     
                    </div>
                </div>
            </div>
            <div ref="svgar" class="gallery__body__view">
                <component
                :is="currentDrawingView"
                :size="currentDrawingSize">
                </component>       
            </div>
        </div>
    </div>
</div>
</template>


<style>
#gallery-wrapper {
    width: 100%;
    height: 100%;

    overflow: hidden;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.search {
    width: 100%;
    height: 20px;

    border-bottom: 2px solid black;

    margin-bottom: 10px;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.search input {
    height: 20px;
    width: 100px;
    border: none;
    background: none;

    font-size: 10px;
}

.search input:focus {
    outline: none;
}

.search__prompt {
    line-height: 20px;
    margin-left: 10px;
    vertical-align: middle;
    font-size: 10px;
}

.gallery {
    width: 100%;
    flex-grow: 1;

    display: grid;
    grid-template-rows: 62px 1fr;
    grid-template-columns: 62px 1fr;

    overflow: hidden;
}

.gallery__active_icon {
    grid-row: 1 / span 1;
    grid-column: 1 / span 1;

    width: 62px;
    max-width: 62px;
    height: 62px;

    display: grid;
    grid-template-rows: 50px 12px;
    grid-template-columns: 50px 12px;
}

.gallery__active_icon__main {
    grid-row: 1 / span 1;
    grid-column: 1 / span 1;

    width: calc(100% - 4px);
    height: calc(100% - 4px);

    border: 2px solid black;
}

.gallery__active_icon__right_toggle {
    grid-row: 1 / span 1;
    grid-column: 2 / span 1;

    width: 12;
    max-width: 12;
    height: 100%;

    border-right: 2px solid black;
}

.gallery__active_icon__right_toggle:hover {
    cursor: pointer;
}

@keyframes hint {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(5px);
    }
}

.gallery__active_icon__right_toggle__button {
    grid-row: 1 / span 1;
    grid-column: 2 / span 1;
    width: 12px;
    height: 12px;
    line-height: 12px;
    font-size: 18px;
    vertical-align: middle;
    white-space: nowrap;
    text-align: left;
    text-indent: 0;

    transform: translateY(20px);

    font-weight: bold;

    background: white;
    z-index: 10;
}

.gallery__active_icon__right_toggle__button__text {
    transform: translate(5.5px, -1.5px); 
    font-size: 18px;
}

.gallery__active_icon__bottom_toggle {
    grid-row: 2 / span 1;
    grid-column: 1 / span 1;

    width: 100%;
    height: calc(100% - 2px);

    border-bottom: 2px solid black;
}

.gallery__active_icon__elbow {
    grid-row: 2 / span 1;
    grid-column: 2 / span 1;

    width: calc(100% - 3px);
    height: calc(100% - 3px);

    border-right: 2px solid black;
    border-bottom: 2px solid black;

    margin-left: 1px;
    margin-top: 1px;
}

.gallery__layer_viewer {
    grid-row: 2 / span 1;
    grid-column: 1 / span 1;

    width: calc(100% - 2px);
    height: calc(100% - 20px);

    border-right: 2px solid black;

    margin-top: 10px;
}

.gallery__body {
    grid-row: 1 / span 2;
    grid-column: 2 / span 1;
    width: 100%;
    height: 100%;
    
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    overflow: hidden;
}

.gallery__body__tabs {
    height: 62px;
    min-height: 62px;
    width: calc(100% - 10px);

    overflow-y: visible;
    overflow-x: auto;

    margin-left: 10px;
    margin-bottom: 10px;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

.gallery__body__tabs__category {
    display: grid;
    grid-template-rows: 50px 12px;
}

.gallery__body__tabs__category__icons {
    grid-row: 1 / span 1;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

.gallery__body__tabs__category__icons__icon {
    width: 48px;
    height: 48px;

    border: 2px solid black;

    margin-right: 10px;
}

.gallery__body__tabs__category__icons__icon:hover {
    cursor: pointer;

    background: gainsboro;
}

.gallery__body__tabs__category__icons__icon--active {
    outline: 1px solid white;
    outline-offset: -4px;

    background: black;
}

.gallery__body__tabs__category__label {
    grid-row: 2 / span 1;

    width: calc(100% - 10px);

    display: flex;
    flex-direction: row;

    height: calc(100% - 2px);
    border-bottom: 2px solid black;
}

.gallery__body__tabs__category__label__text {
    font-size: 10px;
    line-height: 12px;

    vertical-align: bottom;

    background: white;
    padding-right: 10px;
    
    transform: translate(-4px, 3px);
}

.gallery__body__view {
    width: calc(100% - 10px);
    margin-left: 10px;
    margin-bottom: 10px;

    flex-grow: 1;

    display: flex;
    flex-direction: column;
    float: left;

    overflow: hidden;
}

.comp {
    width: 100%;
    height: 100%;

    overflow-y: auto;
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
            categories: [
                {
                    name: "demo",
                    drawings: [
                        "donut",
                        "plan"
                    ]
                }, 
                {
                    name: "drafting",
                    drawings: [
                        "snap",
                        "align",
                        "split"
                    ]
                },
                {
                    name: "patterns",
                    drawings: [
                        "triangles",
                        "circles"
                    ]
                },
            ],      
            currentTab: "donut",
            currentDrawingSize: 0,
            w: 0, 
            h: 0,
            query: "",
            trayIcon: "+",
            trayOpen: true,

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
        this.h = canvas.clientHeight;

        this.setDrawingSize();

        window.addEventListener('resize', this.onResize);
        canvas.addEventListener('resize', this.onResize);
    },
    computed: {
        currentDrawingView() : string {
            return this.currentTab + "-view";
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
            this.setDrawingSize();
        },
        setDrawingSize() : void {
            this.currentDrawingSize = Math.min((<Element>this.$refs.svgar).clientWidth, (<Element>this.$refs.svgar).clientHeight);
        },
        onToggleTray() : void {
            this.trayOpen = !this.trayOpen;
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



