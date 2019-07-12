<template>
  <div class="hello">
    <div class="gradient-button gradient-button-1" @click="addATask(MyTasks)">
      Ajouter une tache {{ message }}
    </div>
    <div
      v-for="task in MyTasks"
      :id="identifiesTheEntireBoxAndTextOfTheTask(task)"
      :key="task.id"
      class="fondcheckbox"
    >
      <input
        v-model="task.checked"
        type="checkbox"
        @click="
          addEventOnTasks(task, task.checked === true ? 'uncheck' : 'check')
        "
      />
      <input
        v-model="task.tache_nom"
        :class="validateTheTaskAndWriteItsText(task)"
        type="text"
        placeholder="ma tache"
        @change="addEventOnTasks(task, 'modif')"
      />
      <svg
        class="carroussel__nav"
        width="30"
        height="30"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        @click="deleteATask(task)"
      >
        <polyline points="0,0 15,15 0,30 30,0 15,15 30,30" class="stroke-1" />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";

class task {
  id: number;
  checked: boolean;
  tache_nom: string;
  user_id: number;

  etat: string;
  type_de_tache: string;
  date_creation: Date;
  date_activation: Date;
  date_deactiver: Date;
  constructor(
    checked: boolean,
    msg: string,
    id: number,
    user_id: number,
    etat: string,
    type_de_tache: string,
    date_creation: Date,
    date_activation: Date,
    date_deactiver: Date
  ) {
    this.checked = checked;
    this.tache_nom = msg;
    this.id = id;
    this.user_id = user_id;
    (this.etat = etat),
      (this.type_de_tache = type_de_tache),
      (this.date_creation = date_creation),
      (this.date_activation = date_activation),
      (this.date_deactiver = date_deactiver);
  }
}
class listTasks<task> {}
@Component({})
export default class HelloWorld extends Vue {
  MyTasks: Array<task> = [];
  userid = 0;
  message = "";
  mounted() {
    axios
      .get("http://localhost:3000/maliste")
      .then(response => {
        for (var i = 0; i < response.data.length; i++) {
          Vue.set(
            this.MyTasks,
            i,
            new task(
              response.data[i].etat === "check",
              response.data[i].tache_nom,
              response.data[i].id,
              response.data[i].user_id,
              response.data[i].etat,
              response.data[i].type_de_tache,
              response.data[i].date_creation,
              response.data[i].date_activation,
              response.data[i].date_deactiver
            )
          );
        }
      })
      .catch(e => {
        this.message = e;
      });
  }

  validateTheTaskAndWriteItsText(index: task): string {
    if (index.checked) {
      return "label1";
    } else {
      return "label";
    }
  }
  addEventOnTasks(evenOnTask: task, event: string) {
    axios
      .post("http://localhost:3000/addmaliste/", {
        user_id: evenOnTask.user_id,
        tache_nom: evenOnTask.tache_nom,
        etat: event,
        type_de_tache: evenOnTask.type_de_tache,
        date_creation: evenOnTask.date_creation,
        date_activation: new Date(),
        date_deactiver: ""
      })
      .then(function(response) {
        console.log("saved successfully");
      });
  }
  addATask(cells: Array<task>) {
     
    axios.get("http://localhost:3000/userid/").then(response => {
      this.userid = ++response.data.user_id;
       Vue.set(
      this.MyTasks,
      this.MyTasks.length,
      new task(
        false,
        "",
        0,
        this.userid,
        "en cour",
        "",
        new Date(),
        new Date(),
        new Date()
      )
    );
  axios
      .post("http://localhost:3000/addmaliste/", {
        user_id: this.userid,
        tache_nom: "",
        etat: "en cour",
        type_de_tache: "",

        date_creation: new Date(),
        date_activation: new Date(),
        date_deactiver: ""
      })
      .then(function(response) {
        console.log("saved successfully");
      });


    });

  

  
  }

  identifiesTheEntireBoxAndTextOfTheTask(index: task): string {
    var identitédelatache: string = "tacheencour" + index.id;
    return identitédelatache;
  }
  deleteATask(index: task) {
 
      axios
        .get("http://localhost:3000/DeleteTask/" + index.id)
        .then(response => {
          for (var i = 0; i < response.data.length; i++) {
            Vue.set(
              this.MyTasks,
              i,
              new task(
                response.data[i].etat === "check",
                response.data[i].tache_nom,
                response.data[i].id,
                response.data[i].user_id,
                response.data[i].etat,
                response.data[i].type_de_tache,
                response.data[i].date_creation,
                response.data[i].date_activation,
                response.data[i].date_deactiver
              )
            );
          }
             const cardinfo = document.getElementById("tacheencour" + index.id)!;
      if (cardinfo.parentNode) {
        cardinfo.parentNode.removeChild(cardinfo);
      }
        })
        .catch(e => {
          this.message = e;
        });
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
  background-color: black;
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
  color: white;
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
