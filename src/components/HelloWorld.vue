<template>
<div class="container">
  <div class="row">
    <div class="col">
     <div class="card">
    <div class="gradient-button gradient-button-1 gradient-button-font" @click="addATask(MyTasks)">
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
        :class=" validateTheTaskAndWriteItsText(task)"
        type="text"
        placeholder="ma tache"
        @change="addEventOnTasks(task, 'modif')"
      />

      <span id="iconpomo" style="font-size: 1.8rem;">
 <i class="far fa-trash-alt"  @click="deleteATask(task)">&nbsp;</i>
 <i class="far fa-play-circle" v-if="!task.timer" @click="startTimer(task)" >&nbsp;  </i>
<i class="far fa-pause-circle" v-if="task.timer" @click="stopTimer(task)">&nbsp;  </i>
 <i class="fas fa-undo" v-if="resetButton" @click="resetTimer(task)">&nbsp;  </i>

</span>

     
    </div>
  </div>
    </div>
       <div class="col">
      <div class="card">
 
  
  <h2 >{{title}}</h2>
  


  
  <radial-progress-bar :diameter="250"
                       :completed-steps="completedSteps"
                       :total-steps="totalSteps">
   <div id="timer">
      <div class="btn-group">
<span id="minutes">
 
<button class="btn btn-secondary dropdown-toggle gradient-button gradient-button-1 gradient-button-font2"  type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
   {{ minutes() }}
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
     <a class="dropdown-item" href="#" @click="changeMinute(0)">0</a>
<a class="dropdown-item" href="#" @click="changeMinute(5)">5</a>
    <a class="dropdown-item" href="#" @click="changeMinute(15)" >15</a>
    <a class="dropdown-item" href="#" @click="changeMinute(25)">25</a>
  </div>
</span>
    <span id="middle">&nbsp;:&nbsp;</span>
    <span id="seconds"><div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle gradient-button gradient-button-1 gradient-button-font2"  type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
   {{ seconds() }}
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="#"@click="changesecond(5)">5</a>
    <a class="dropdown-item" href="#"@click="changesecond(15)">15</a>
    <a class="dropdown-item" href="#"@click="changesecond(30)">30</a>
    <a class="dropdown-item" href="#"@click="changesecond(45)">45</a>
    <a class="dropdown-item" href="#"@click="changesecond(60)">60</a>
  </div>
</div></span>
</div>

</div>
   </radial-progress-bar>
</div>

</div>



  
 
  </div>
  
</div>

  
   
 
 
  

</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";

import RadialProgressBar from "vue-radial-progress";

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
  timer: any;
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
@Component({
 components: { RadialProgressBar}
})
export default class HelloWorld extends Vue {
  MyTasks: Array<task> = [];
  userid = 0;
  message = "";
  timer = 0;
  totalTime = 25 * 60;
  completedSteps = 0;
  totalSteps = 25 * 60;
  resetButton = false;
  title = "Pomodoro à lancer";
  changeMinute(min: number) {
    this.totalTime = min * 60;
    this.completedSteps = 0;
    if (min!=0){
    this.totalSteps = min * 60;}
    else this.totalSteps=1
  }
  changesecond(min: number) {
    this.totalTime = this.totalTime + min;
    this.completedSteps = 0;
    this.totalSteps = this.totalTime ;
  }
  startTimer(task: task) {
  
    this.MyTasks.map(task1 => {
      if (task1.timer !=0) {
      clearInterval(task1.timer);
    task1.timer = 0;
     this.totalTime = 25 * 60;
    this.completedSteps = 0;
      }
    });
   
    task.timer = setInterval(() => this.countdown(task), 1000);
    this.resetButton = true;
    this.title = "Travail en cour:" + "\n" + task.tache_nom;
  }
  testaudio() {
    const audio = new Audio(
      "http://soundbible.com/mp3/cartoon-birds-2_daniel-simion.mp3"
    );

    audio.play();
  }
  stopTimer(task: task) {
    clearInterval(task.timer);
    task.timer = 0;
    this.resetButton = true;
    this.title = "N'abandonner pas , continuez";
  }
  resetTimer(task: task) {
   this.totalTime = 25 * 60;
    this.completedSteps = 0;
    this.MyTasks.map(task =>{ clearInterval(task.timer); task.timer = 0;});
    
   
    this.resetButton = false;
    this.title = "Pomodoro à lancer";
  }
  
  padTime(time: number) {
    return (time < 10 ? "0" : "") + time;
  }
  countdown(task: task) {
    if (this.totalTime >= 1) {
      this.completedSteps++;
      this.totalTime--;
    } else {
      this.totalTime = 0;
      this.testaudio();
      this.resetTimer(task);
    }
  }
  minutes(): any {
    const minutes = Math.floor(this.totalTime / 60);
    return this.padTime(minutes);
  }
  seconds() {
    const seconds = this.totalTime - this.minutes() * 60;
    return this.padTime(seconds);
  }
  mounted() {
    axios
      .get("https://valorisetonweb.fr:3001/maliste")
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
      return "essai1";
    } else {
      return "essai";
    }
  }
  addEventOnTasks(evenOnTask: task, event: string) {
    axios
      .post("https://valorisetonweb.fr:3001/addmaliste/", {
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
    axios.get("https://valorisetonweb.fr:3001/userid/").then(response => {
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
        .post("https://valorisetonweb.fr:3001/addmaliste/", {
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
  identifiesTheTimerAndTextOfTheTask(index: task): string {
    var idenTimer: string = "timerencour" + index.id;
    return idenTimer;
  }
  deleteATask(index: task) {
    axios
      .get("https://valorisetonweb.fr:3001/DeleteTask/" + index.id)
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
@import url("https://fonts.googleapis.com/css?family=Merriweather&display=swap");
@import "/home/specialjcg/site web/progfonctionnelle/src/components/fontawesome-free-5.9.0-web/css/all.css";

$color1: #fcf9ec;
$color5: #fcf9ec;
//boutons
$color4: #b0f4e6;

//cards
$color2: #12d3cf;
$color3: #67eaca;

#message {
  color: $color2;
  font-size: 50px;
  margin-bottom: 20px;
}
#iconpomo {
  color: $color2;
}
#middle {
  margin-top: 1vh;
}
#timer {
  font-size: 2rem;
  line-height: 1;
  margin-bottom: 1vh;
}
.stroke-1 {
  stroke: $color2;
  stroke-width: 5;
  stroke-linecap: butt;
  fill: none;
  stroke-linejoin: miter;
}
h2 {
  font-family: "Merriweather", serif;
  font-size: 2rem;
  color: $color1;
}
.gradient-button-font {
  font-family: "Merriweather", serif;
  font-size: 2rem;
}
.gradient-button-font2 {
  font-family: "Merriweather", serif;
  font-size: 1.5rem;
}
.gradient-button {
  padding: 10px;
  text-align: center;

  transition: 0.5s;
  background-size: 200% auto;
  color: black;
  box-shadow: 0 0 20px $color4;

  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  display: inline-block;
  border-radius: 5px;
}
.gradient-button:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  margin: 8px 10px 12px;
}
.gradient-button-1 {
  background-image: linear-gradient(
    to right,
    $color1 0%,
    $color4 51%,
    $color1 100%
  );
}
.gradient-button-1:hover {
  background-position: right center;
}
.gradient-button-pomo {
  font-family: "Merriweather", serif;
  font-size: 2rem;
  padding: 15px;
  text-align: center;

  transition: 0.5s;
  background-size: 200% auto;
  color: black;
  box-shadow: 0 0 20px $color4;

  width: auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  display: inline-block;
  border-radius: 5px;
}
.gradient-button-pomo:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  margin: 8px 10px 12px;
}
.gradient-button-1-pomo {
  background-image: linear-gradient(
    to right,
    $color1 0%,
    $color4 51%,
    $color1 100%
  );
}
.gradient-button-1-pomo:hover {
  background-position: right center;
}
.card {
  width: auto;
  height: auto;

  margin: auto;
  border-radius: 1em;
  text-align: center;

  position: relative;
  max-width: 50vw;

  background: linear-gradient(-45deg, $color2, $color3);

  padding: 40px 20px;
  -webkit-box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  -webkit-transition: 0.5s;
  transition: 0.5s;
}

.col:nth-child(1) .card,
.col:nth-child(1) .card .title .fa {
  background: linear-gradient(-45deg, $color2, $color3);
}
.col:nth-child(2) .card,
.col:nth-child(2) .card .title .fa {
  background: linear-gradient(-45deg, $color2, $color3);
}
.col:nth-child(3) .card,
.col:nth-child(3) .card .title .fa {
  background: linear-gradient(-45deg, $color2, $color3);
}
.card::before
  .gradient-button::before
  .gradient-button-1::before
  .gradient-button-pomo::before
  .gradient-button-1-pomo::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40%;
  background: rgba(255, 255, 255, 0.1);
  z-index: 1;
  -webkit-transform: skewY(-5deg) scale(1.5);
  transform: skewY(-5deg) scale(1.5);
}

.essai {
  display: inline-block;
  background: transparent;
  border: none;
  margin-top: 0;
  color: black;
  outline: none;
  width: auto;
  font-family: "Merriweather", serif;
  font-size: 1.2rem;
  width: 60%;
}
.essai1 {
  display: inline-block;
  background: transparent;
  border: none;
  margin-top: 0;
  color: black;
  text-decoration: line-through;
  outline: none;
  width: auto;
  font-family: "Merriweather", serif;
  font-size: 1.2rem;
  width: 60%;
}

.fondcheckbox {
  height: 5%;
  background: $color1; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    $color1,
    $color5
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    $color1,
    $color5
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  margin-left: auto;
  margin-right: auto;
  margin-top: 1vh;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  width: auto;
  //border: 1px solid $color1;
  border-radius: 1vh;
}
input[type="checkbox"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
}
input[type="checkbox"] {
  top: 0;
  left: 0;
  border-radius: 4px;
  height: 2vh;
  width: 2vh;
  background: $color1;
  border: 2px solid $color4;
  margin-top: 1.5vh;
  margin-left: 1vw;

  float: left;
  outline: none;
}
input[type="checkbox"]:hover {
  background: $color4;
}

input[type="checkbox"]:checked {
  background: $color5;

  position: relative;
  &:before {
    font-family: FontAwesome;
    content: "\f00c";
    display: inline-block;
    color: $color2;
    font-size: auto;
    position: absolute;
  }

  input[type="text"] {
    outline: none;
  }
}
</style>
