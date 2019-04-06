<template>
  <div class="hello">
    <div class="gradient-button gradient-button-1" @click="addATask(cells)">
      Ajouter une tache
    </div>
    <div
      v-for="i in cells"
      :id="identifiesTheEntireBoxAndTextOfTheTask(i)"
      :key="i"
      class="fondcheckbox"
    >
      <input v-model="checked[i]" type="checkbox" />
      <input
        v-model="msg[i]"
        :class="validateTheTaskAndWriteItsText(i)"
        type="text"
        placeholder="ma tache"
      />
      <svg
        class="carroussel__nav"
        width="30"
        height="30"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        @click="deleteATask(i)"
      >
        <polyline points="0,0 15,15 0,30 30,0 15,15 30,30" class="stroke-1" />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class HelloWorld extends Vue {
  checked: boolean[] = [];
  cells: number = 0;
  msg: string[] = [];

  validateTheTaskAndWriteItsText(index: number): string {
    if (this.checked[index]) {
      return "label1";
    } else {
      return "label";
    }
  }

  addATask(cells: number) {
    return cells++;
  }

  identifiesTheEntireBoxAndTextOfTheTask(index: number): string {
    var identitédelatache: string = "tacheencour" + index;
    return identitédelatache;
  }
  deleteATask(index: number) {
    const cardinfo = document.getElementById("tacheencour" + index)!;
    if (cardinfo.parentNode) {
      cardinfo.parentNode.removeChild(cardinfo);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$color1: rgba(26, 126, 142, 1);
$color2: rgba(172, 195, 212, 1);
$color3: rgba(198, 217, 247, 1);
$color4: rgba(234, 230, 192, 1);
$color5: rgba(229, 235, 135, 1);
.stroke-1 {
  stroke: $color5;
  stroke-width: 5;
  stroke-linecap: butt;
  fill: none;
  stroke-linejoin: miter;
}
.hello {
  width: 50vw;
  height: 100vh;
  background-color: $color5;
  margin: auto;
  border-radius: 1em;
  text-align: center;
}
h3 {
  margin: 40px 0 0;
}

.gradient-button {
  margin: 10px;
  font: 2rem "Fira Sans", sans-serif;
  padding: 15px;
  text-align: center;

  transition: 0.5s;
  background-size: 200% auto;
  color: $color5;
  box-shadow: 0 0 20px $color4;
  border-radius: 10px;
  width: 200px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  display: inline-block;
  border-radius: 25px;
}
.gradient-button:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  margin: 8px 10px 12px;
}
.gradient-button-1 {
  background-image: linear-gradient(
    to right,
    $color3 0%,
    $color1 51%,
    $color3 100%
  );
}
.gradient-button-1:hover {
  background-position: right center;
}

svg {
  position: absolute;
  margin-left: -5vh;

  margin-top: 1.5vh;
}

.label {
  display: inline-block;
  font: 2rem "Fira Sans", sans-serif;
  margin-top: 1vh;
  color: black;
  background: transparent;
  border: none;
}
.label1 {
  display: inline-block;
  font: 2rem "Fira Sans", sans-serif;
  margin-top: 1vh;
  color: $color5;
  background: transparent;
  border: none;
  text-decoration: line-through;
}
.fondcheckbox {
  height: 7vh;
  background-image: linear-gradient(
    to right,
    $color3 0%,
    $color1 51%,
    $color3 100%
  );
  margin-left: auto;
  margin-right: auto;
  margin-top: 1vh;

  width: 30vw;
  border: 1px solid $color4;
  border-radius: 2vh;
}
input[type="checkbox"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
}
input[type="checkbox"] {
  border-radius: 4px;
  height: 30px;
  width: 30px;
  background: $color4;
  border: 1px solid $color4;
  margin-top: 1.5vh;
  margin-left: 2vw;
  font-size: 3em;
  float: left;
}

input[type="checkbox"]:checked {
  background: $color5;

  position: relative;
  &:before {
    font-family: FontAwesome;
    content: "\f00c";
    display: block;
    color: $color1;
    font-size: 0.6em;
    position: absolute;
  }
  input[type="text"] :focus {
    outline: none;
  }
  .label {
    text-decoration: underline;
  }
}
</style>
