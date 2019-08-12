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
import * as rhino3dm from 'rhino3dm';

export default Vue.extend({
    name: "lines-view",
    data() {
        return {
            uri: "http://localhost:8081/"
        }
    },
    methods: {
        onClick() : void {

            console.log(Object.keys(rhino3dm()));
            
            rhino3dm().then((rh:any) => {

                console.log(Object.keys(rh));

                let sphere = rh.Sphere([0,0,0], 5);

                console.log(sphere);
            })
            .catch((e:any) => {
                console.log(e);
            });
        }
    }
})
</script>
