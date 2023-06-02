import type { ProjectConfig } from "../../types";

export let page = {
  id: "sample-id",
  index: 0,
  background: {
    fieldName: "Background",
    fieldType: "Color",
    fieldValue: "#FFFFFF"
  },
  components: {},

  loaded: true,
};

export let projconf: ProjectConfig = {
  name: "First Project",
  dimensions: { x: 2480, y: 3508 },
  author: "Azrac Studios",
  aspectRatio: 1 / Math.sqrt(2),
  scaleBehaviour: "height",
  created: {
    day: 30,
    month: 5,
    year: 2023,
    hours: 14,
    minutes: 38,
    seconds: 23,
  },
  lastModified: undefined,
};
