import type { Component, Text } from "../types";

export const TextTemplate: Component<Text> = {
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
        x: 215,
        y: 145,
      },
    },

    zIndex: {
      fieldType: "Number",
      fieldName: "Render Priority",
      fieldValue: 0,
    },
  },
  type: "text",
  name: "Text",
  loaded: true,
  effects: {
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
      color: {
        fieldName: "Color",
        fieldType: "Color",
        fieldValue: "#000000",
      },
      opacity: {
        fieldName: "Opacity",
        fieldType: "Number",
        fieldValue: 0,
        fieldOptions: [0, 100],
      },
    },

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
  },
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
  propertiesSortOrder: [
    "text",
    "fontFamily",
    "fontSize",
    "lineHeight",
    "opacity",
    "alignment",
    "color",
    "bold",
    "underline",
  ],
  properties: {
    text: {
      fieldType: "TextArea",
      fieldName: "Text",
      fieldValue: "Text",
    },
    fontFamily: {
      fieldType: "FontEnum",
      fieldName: "Font",
      fieldValue: "Poppins",
    },

    fontSize: { fieldType: "Number", fieldName: "Size", fieldValue: 100 },

    lineHeight: {
      fieldType: "Number",
      fieldName: "Line Height",
      fieldValue: 0,
    },
    opacity: {
      fieldType: "Number",
      fieldName: "Opacity",
      fieldValue: 100,
      fieldOptions: [0, 100],
    },
    alignment: {
      fieldType: "Enum",
      fieldName: "Align",
      fieldOptions: ["Left", "Right", "Center"],
      fieldValue: "Left",
    },

    color: {
      fieldType: "Color",
      fieldName: "Color",
      fieldValue: "#000000",
    },
    bold: { fieldType: "Boolean", fieldName: "Bold", fieldValue: false },
    underline: {
      fieldType: "Boolean",
      fieldName: "Underline",
      fieldValue: false,
    },
  },
};
