<template>
    <div>
        <button @click="onClick">Get Line</button>
    </div>
</template>

<style>

</style>


<script lang="ts">
import Vue from 'vue'
//import Module from '@/assets/js/compute.rhino3d.js';

//declare var rhino3dm : any;

export default Vue.extend({
    name: "lines-view",
    data() {
        return {
            uri: "http://localhost:8081/"
        }
    },
    methods: {
        onClick() : void {

            const rhino3dm = require("rhino3dm");

            rhino3dm().then((rh:any) => {
                let sphere = rh.Sphere([0,0,0], 5);

                console.log(sphere);
            });
        }
    }
})
</script>
