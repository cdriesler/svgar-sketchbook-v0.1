<template>
    <div class="plan_inputs">
        <div class="states">
            <div @click="onDeclareState('view')" class="states__view button" :class="{ 'button--active' : activeState == 'view' }">
                view
            </div>
            <div @click="onDeclareState('edit')" class="states__edit button" :class="{ 'button--active' : activeState == 'edit' }">
                edit
            </div>
        </div>
        <div class="reset button" @click="reset">
            reset
        </div>
    </div>
</template>

<style>
.plan_inputs {
    width: 100%;

    display: flex;
    flex-direction: column;
}

.states {
    width: calc(100% - 6px);
    height: 40px;
    margin-bottom: 15px;

    display: flex;
    flex-direction: row;
}

.states__view {
    flex-grow: 1;
    margin-right: 10px;
}

.states__edit {
    flex-grow: 1;
}

.reset {
    width: calc(100% - 10px);
}

.button {
    box-shadow: 4px 4px 0 0 black;
    height: 40px;
    text-align: center;
    line-height: 40px;
    vertical-align: middle;
    border: 2px solid black;
    outline: 1px solid white;
}

.button:hover {
    background: black;
    color: white;
    outline: 1px solid white;
    outline-offset: -3px;
    cursor: pointer;
}

.button--active {
    transform: translate(4px, 4px);
    box-shadow: none;

    background: black;
    color: white;
    outline: 1px solid white;
    outline-offset: -3px;

    animation-name: press;
    animation-duration: 0.4s;
    animation-fill-mode: forwards;
}

@keyframes press {
    from {
        transform: translate(0px, 0px);
        box-shadow: 4px 4px 0 0 black;
        border: 2px solid black;
        outline: 1px solid white;
    }
    to {
        transform: translate(4px, 4px);
        box-shadow: none;
        background: black;
        color: white;
        outline: 1px solid white;
        outline-offset: -3px;
    }
}

</style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "plan-inputs",
    data() {
        return {
            activeState: "view",
        }
    },
    mounted() {
        this.$emit('updateState', 'view');
    },
    methods: {
        reset() : void {
            this.$emit('reset');
        },
        onDeclareState(state: string) : void {
            this.activeState = state;
            this.$emit('updateState', state);
        }
    }
})
</script>
