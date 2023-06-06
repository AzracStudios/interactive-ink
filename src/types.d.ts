export interface Date {
  day: number;
  month: number;
  year: number;
}

export interface Time {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface Project {
  config: ProjectConfig;
  data: Page[];
}

export interface ProjectConfig {
  id: string;
  name: string;
  author: string;
  aspectRatio: number;
  scaleBehaviour: "width" | "height";
  fonts: string[];
  dimensions: Vector2;
  created: DateTime;
  lastModified: DateTime | undefined;
}

export interface Vector2 {
  x: number;
  y: number;
}

export interface Transform {
  position: Field<Vector2>;
  rotation: Field<number>;
  scale: Field<Vector2>;
  zIndex: Field<number>;
}

export interface Field<T> {
  fieldType: string;
  fieldName: string;
  fieldValue: T;
  fieldDefault?: T;
  fieldOptions?: T[];
}

export interface Component<T> {
  id: string;
  transform: Transform;
  name: string;
  type: string;
  animation?: Animation;
  loaded: boolean;
  propertiesSortOrder: string[];
  effects: { shadow: Shadow; blur: Blur; outline: Outline };
  properties: T;
}

export interface Animation<T> {
  property: Field<string>;
  from: Field<T>;
  to: Field<T>;
  delay: Field<number>;
  duration: Field<number>;
  timingFunction: Field<string>;
}

export interface Shadow {
  offset: Field<Vector2>;
  blur: Field<number>;
  opacity: Field<number>;
  color: Field<string>;
}

export interface Blur {
  blur: Field<number>;
}

export interface Outline {
  width: Field<number>;
  strokeStyle: Field<string>;
  color: Field<string>;
}

export interface Page {
  id: string;
  components: any;
  background: Field<string>;
  index: number;
  loaded: boolean;
}

export enum Direction {
  left,
  right,
  top,
  bottom,
}

export interface Image {
  src: Field<string>;
  alt: Field<string>;
  borderRadius: Field<number>;
  brightness: Field<number>;
  contrast: Field<number>;
  saturation: Field<number>;
  hue: Field<number>;
  sepia: Field<number>;
}

export interface Rect {
  color: Field<string>;
  borderRadius: Field<number>;
}

export interface Text {
  text: Field<string>;
  fontFamily: Field<string>;
  fontSize: Field<number>;
  color: Field<string>;
  lineHeight: Field<number>;
  bold?: Field<boolean>;
  underline?: Field<boolean>;
  alignment: Field<string>;
}

export type ApplicationMode = "view" | "edit";
