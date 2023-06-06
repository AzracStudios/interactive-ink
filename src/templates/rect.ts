import type { Component, Rect } from "../types";

export const RectTemplate: Component<Rect> = {
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
  type: "rect",
  name: "Rect",
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
  propertiesSortOrder: ["color", "borderRadius", "opacity"],
  properties: {
    color: {
      fieldType: "Color",
      fieldName: "Color",
      fieldValue: "#000000",
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
  },
};
