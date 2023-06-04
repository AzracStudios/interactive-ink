import type { Component, Image } from "../types";

export const ImageTemplate: Component<Image> = {
  id: "sample-id",
  renderPriority: 0,
  transform: {
    position: {
      fieldType: "Vector2",
      fieldName: "Position",
      fieldValue: {
        x: 50,
        y: 50,
      },
    },

    rotation: {
      fieldType: "Number",
      fieldName: "Rotation",
      fieldValue: 0,
    },

    scale: {
      fieldType: "Vector2",
      fieldName: "Scale",
      fieldValue: {
        x: 500,
        y: 500,
      },
    },
  },
  type: "image",
  name: "Image",
  loaded: true,
  propertiesSortOrder: [
    "src",
    "alt",
    "outlineColor",
    "outlineWidth",
    "brightness",
    "contrast",
    "saturation",
    "hue",
    "sepia",
  ],
  properties: {
    src: {
      fieldType: "Image",
      fieldName: "Source",
      fieldValue: null,
    },

    alt: {
      fieldType: "String",
      fieldName: "Alt",
      fieldValue: null,
    },

    outlineColor: {
      fieldType: "Color",
      fieldName: "Outline Color",
      fieldValue: "#000000",
    },

    outlineWidth: {
      fieldType: "Number",
      fieldName: "Outline Width",
      fieldValue: 0,
    },

    brightness: {
      fieldType: "Range",
      fieldOptions: [0, 150],
      fieldName: "Brightness",
      fieldValue: 100,
      fieldDefault: 100,
    },

    contrast: {
      fieldType: "Range",
      fieldOptions: [0, 150],
      fieldName: "Contrast",
      fieldValue: 100,
      fieldDefault: 100,
    },

    saturation: {
      fieldType: "Range",
      fieldOptions: [0, 150],
      fieldName: "Saturation",
      fieldDefault: 100,
      fieldValue: 100,
    },

    hue: {
      fieldType: "Range",
      fieldOptions: [0, 360],
      fieldName: "Hue",
      fieldDefault: 0,
      fieldValue: 0,
    },

    sepia: {
      fieldType: "Range",
      fieldOptions: [0, 100],
      fieldName: "Sepia",
      fieldDefault: 0,
      fieldValue: 0,
    },
  },
};
