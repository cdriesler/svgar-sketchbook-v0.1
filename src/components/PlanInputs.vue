<template>
    <div>
        <div class="reset" @click="reset">
            reset
        </div>
    </div>
</template>

<style>
.reset {
    width: calc(100% - 10px);
    box-shadow: 6px 6px 0 0 black;
    height: 40px;
    text-align: center;
    line-height: 40px;
    vertical-align: middle;
    border: 2px solid black;
    outline: 1px solid white;
}

.reset:hover {
    background: black;
    color: white;
    outline: 1px solid white;
    outline-offset: -3px;
    cursor: pointer;
}

</style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "plan-inputs",
    methods: {
        reset() : void {
            this.$emit('reset');
        }
    }
})
</script>
