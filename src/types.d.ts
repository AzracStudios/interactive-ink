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

export interface ProjectConfig {
  name: string;
  author: string;
  aspectRatio: number;
  scaleBehaviour: "width" | "height";
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
}

export interface Field<T> {
  fieldType: string;
  fieldName: string;
  fieldValue: T;
  fieldOptions?: any[];
}

export interface Component<T> {
  id: string;
  transform: Transform;
  name: string;
  type: string;
  animation?: Animation;
  loaded: boolean;
  renderPriority: number;
  properties?: T;
}

export interface Animation {
  from: Component;
  to: Component;
  delay: number;
  duration: number;
  timingFunction: string;
  onBegin: () => {} | undefined;
  onUpdate: () => {} | undefined;
  onEnd: () => {} | undefined;
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
  outlineColor: Field<string>;
  outlineWidth: Field<number>;
  brightness: Field<number>;
  contrast: Field<number>;
  saturation: Field<number>;
  hue: Field<number>;
  sepia: Field<number>;
}

export interface Text {
  text: Field<string>;
  fontFamily: Field<string>;
  fontSize: Field<number>;
  color: Field<string>;
  lineHeight: Field<number>;
  bold?: Field<boolean>;
  underline?: Field<boolean>;
  autoWidth?: Field<boolean>;
  alignment: Field<string[]>;
}

export type ApplicationMode = "view" | "edit";
