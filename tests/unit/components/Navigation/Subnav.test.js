import { mount } from "@vue/test-utils";
import Subnav from "@/components/Navigation/Subnav";
import useConfirmRoute from "@/composables/useConfirmRoute";
import { ref } from "vue";
import { useFilteredJobs } from "@/store/composables";

jest.mock("@/composables/useConfirmRoute");
jest.mock("@/store/composables");

describe("Subnav", () => {
  const createConfig = () => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  describe("when user is on job page", () => {
    it("displays job count", () => {
      useConfirmRoute.mockReturnValue(ref(true));
      useFilteredJobs.mockReturnValue([{ id: 1 }, { id: 2 }]);
      const wrapper = mount(Subnav, createConfig());
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.text()).toMatch("2 jobs matched");
    });
  });

  describe("when user is not on jobs page", () => {
    it("does NOT display job count", () => {
      useConfirmRoute.mockReturnValue(ref(false));
      useFilteredJobs.mockReturnValue([]);
      const wrapper = mount(Subnav, createConfig());
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(false);
    });
  });
});
