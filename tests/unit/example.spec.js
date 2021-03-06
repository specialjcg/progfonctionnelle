import { expect } from "chai";
import { mount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
const wrapper = mount(HelloWorld);
describe("HelloWorld.vue", () => {
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
        //given
       
        const g = wrapper.vm.MyTasks;
        //when
        const my_task = g[0];
       
        //then
        expect(my_task.checked).is.equal(false);
    });
});
//# sourceMappingURL=example.spec.js.map