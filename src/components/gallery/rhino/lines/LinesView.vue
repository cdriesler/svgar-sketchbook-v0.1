<template>
    <div>
        <button @click="onClick">Get Line</button>
    </div>
</template>

<style>

</style>


<script lang="ts">
import Vue from 'vue'
import Module from '@/assets/js/compute.rhino3d.js';

declare var rhino3dm : any;

export default Vue.extend({
    name: "lines-view",
    data() {
        return {
            uri: "http://localhost:8081/"
        }
    },
    methods: {
        onClick() : void {

            
            //let sphere = new rhino3dm.Sphere([1,2,3,], 12)

            let rhino:any;

            rhino3dm().then((m:any) => {
                console.log(m);
                //rhino = m; // global

                //console.log(new rhino.circle(2).diameter);
            });
        }
    }
})
</script>
