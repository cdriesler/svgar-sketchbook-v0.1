<template>
<div id="gallery-wrapper">
    <div class="search" v-if="false">
        <div class="search__prompt">
            search: 
        </div>
        <input type="text" v-model="query" />
    </div>
    <div class="gallery">
        <div class="gallery__active_icon" @click="onToggleTray" >
            <div class="gallery__active_icon__main">
                <img :src="activeIconSource">
            </div>

            <div class="gallery__active_icon__right_toggle" >
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
                        :key="category + '_' + drawing.name"
                        @click="currentTab = drawing.name" >
                        <img v-show="currentTab != drawing.name" width="47px" height="47px" :src="drawing.icon">
                        <img v-show="currentTab === drawing.name" width="47px" height="47px" :src="drawing.activeIcon">
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

    margin-top: 10px;

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
                        {
                            name: "donut",
                            icon: require('./../assets/svg/donut-icon.svg'),
                            activeIcon: require('./../assets/svg/donut-icon-active.svg')
                        },
                        {
                            name: "plan",
                            icon: require('./../assets/svg/plan-icon.svg'),
                            activeIcon: require('./../assets/svg/plan-icon-active.svg')
                        }
                    ]
                }, 
            ],      
            currentCategory: "demo",
            currentTab: "donut",
            currentDrawingSize: 0,
            w: 0, 
            h: 0,
            query: "",
            trayIcon: "+",
            trayOpen: true,
        }
    },
    mounted() {
        let canvas = <Element>this.$refs.svgar;
        this.w = canvas.clientWidth;
        this.h = canvas.clientHeight;

        this.setDrawingSize();

        window.addEventListener('resize', this.onResize);
    },
    computed: {
        currentDrawingView() : string {
            return this.currentTab + "-view";
        },
        activeIconSource() : any {
            let activeCategory = this.categories.find(x => x.name == this.currentCategory);

            if (activeCategory == undefined) {
                return undefined;
            }

            let activeDrawing = activeCategory.drawings.find(x => x.name == this.currentTab);

            if (activeDrawing == undefined) {
                return undefined;
            }

            return activeDrawing.activeIcon;
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

            this.$nextTick(this.setDrawingSize);
        },
        iconSource(name:string) : string {
            const path = '../../assets/svg/' + name + '-icon.svg'
            return require(path);
        }
    },
    beforeDestroy: function () {
        window.removeEventListener('resize', this.onResize)
    },  
})
</script>



