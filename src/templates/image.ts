import type { Component, Image } from "../types";

export const ImageTemplate: Component<Image> = {
  id: "sample-id",
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
        x: 800,
        y: 540,
      },
    },

    zIndex: {
      fieldType: "Number",
      fieldName: "Render Priority",
      fieldValue: 0,
    },
  },
  type: "image",
  name: "Image",
  loaded: true,
  effects: {
    blur: {
      blur: {
        fieldName: "Blur",
        fieldType: "Number",
        fieldValue: 0,
      },
    },

    outline: {
      width: {
        fieldName: "Width",
        fieldType: "Number",
        fieldValue: 0,
      },
      strokeStyle: {
        fieldName: "Stroke Style",
        fieldType: "Enum",
        fieldValue: "solid",
        fieldOptions: ["solid", "dashed"],
      },
      color: {
        fieldName: "Color",
        fieldType: "Color",
        fieldValue: "#000000",
      },
    },

    shadow: {
      offset: {
        fieldName: "Offset",
        fieldType: "Vector2",
        fieldValue: { x: 0, y: 0 },
      },
      blur: {
        fieldName: "Blur",
        fieldType: "Number",
        fieldValue: 0,
      },
      opacity: {
        fieldName: "Opacity",
        fieldType: "Number",
        fieldValue: 0,
        fieldOptions: [0, 100],
      },
      color: {
        fieldName: "Color",
        fieldType: "Color",
        fieldValue: "#000000",
      },
    },
  },
  propertiesSortOrder: [
    "src",
    "alt",
    "borderRadius",
    "opacity",
    "brightness",
    "contrast",
    "saturation",
    "hue",
    "sepia",
  ],
  animation: {
    from: { fieldType: "Component", fieldName: "From", fieldValue: null },
    to: { fieldType: "Component", fieldName: "To", fieldValue: null },
    delay: { fieldType: "Number", fieldName: "Delay", fieldValue: 0 },
    duration: { fieldType: "Number", fieldName: "Duration", fieldValue: 0 },
    timingFunction: {
      fieldType: "Enum",
      fieldName: "Timing Function",
      fieldValue: "ease",
      fieldOptions: ["ease", "ease-in", "ease-out", "ease-in-out", "linear"],
    },
  },

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
    borderRadius: {
      fieldType: "Number",
      fieldName: "Border Radius",
      fieldValue: 0,
    },
    opacity: {
      fieldType: "Number",
      fieldName: "Opacity",
      fieldValue: 100,
      fieldOptions: [0, 100]
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
