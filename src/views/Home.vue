<template>
  <div class="home">
    <div class="svgar" v-html="svg">
    </div>  
  </div>
</template>

<style>
.home {
  width: 100%;

  line-height: 25px;

  color: black;

  text-align: center;
}

.svgar {
  width: 200px;
  height: 200px;
}
</style>

<script lang="ts">
import Vue from 'vue';
import Svgar from 'svgar';
import SvgarCube from 'svgar/dist/models/SvgarCube';

export default Vue.extend({
  name: 'home',
  components: {
    
  },
  data() {
    return {
      state: "default",
      svgar: {} as SvgarCube,
    }
  },
  computed: {
    svg(): string {
      let cube = new Svgar.Cube();

      let slab = new Svgar.Slab("test");

      let circle = new Svgar.Builder.Circle(0.5, 0.5, 0.2).build();
      circle.attach("mousedown", this.onClick);
      circle.setTag("circle");

      slab.addPath(circle);

      cube.slabs.push(slab);

      slab.setAllStyles([
        {
          name: "default",
          attributes: {
            "stroke": "black",
            "fill": "gainsboro",
            "stroke-width": "1px",
          }
        }
      ])

      this.svgar = cube;
      return cube.compile(200, 200);
    }
  },
  watch: {
    svgar: function() {
      this.svgar.listen();
    }
  },
  methods: {
    onClick(): void {
      console.log("Clicked!");
    }
  }
});
</script>
