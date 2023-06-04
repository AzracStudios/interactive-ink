export const TextTemplate = {
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
        x: 215,
        y: 145,
      },
    },
  },
  type: "text",
  name: "Text",
  loaded: true,
  propertiesSortOrder: [
    "text",
    "fontFamily",
    "fontSize",
    "lineHeight",
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
