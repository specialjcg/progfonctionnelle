import HelloWorld from "@/components/HelloWorld.vue";
import { mount } from "@vue/test-utils";
import axios from "axios";
import { expect } from "chai";
const MockAdapter = require("axios-mock-adapter");
const mock = new MockAdapter(axios);

describe("HelloWorld.vue", () => {
  let wrapper: any;
  
  beforeEach(() => mock.reset());
  beforeEach(() => {
    // use this to check the state of anything in the view
    wrapper = mount(HelloWorld)
  });
  it("should my class task exist", () => {

    const g = wrapper.vm.MyTasks;
    expect(g).is.exist;
  });
  it("should my class task have a constructor", () => {

    const g = wrapper.vm.MyTasks;
    for (var i = 0; i < g.length; i++) {
      const my_task = g[i];
      expect(my_task.msg).is.equal(g[i].msg);
      expect(my_task.id).is.equal(g[i].id);
      expect(my_task.checked).is.equal(g[i].checked);

    }
  });
  it("should my server is on ", () => {

    expect(wrapper.vm.message).is.equal("");

  });
  it("should my text is write when task is validate ", () => {
     const g = wrapper.vm.MyTasks;
  
      wrapper.vm.mounted;

    

   


    expect(g).is.equal(25 * 60);


  });





});



