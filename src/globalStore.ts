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
export const SelectedElement = writable<Component>();
export const MovingSelected = writable<boolean>();
export const ScalingSelected = writable<Direction | null>();
export const ProjectConfiguration = writable<ProjectConfig>();
export const ViewScaleFactor = writable<number>();
