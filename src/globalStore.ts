import { writable } from "svelte/store";
import type {
  ProjectConfig,
  ApplicationMode,
  Page,
  Component,
  Direction,
} from "./types";

export const Mode = writable<ApplicationMode>();
export const CurrentPage = writable<Page>();
export const SelectedElement = writable<Component<any>>();
export const MovingSelected = writable<boolean>();
export const ScalingSelectedX = writable<Direction | null>();
export const ScalingSelectedY = writable<Direction | null>();
export const ProjectConfiguration = writable<ProjectConfig>();
export const ProjectData = writable<Page[]>();
export const ViewScaleFactor = writable<number>();
export const Fonts = writable<string[]>(["Poppins"]);
export const Images = writable<{ id: string; src: string }[]>();
export const ProjectId = writable<string>();
