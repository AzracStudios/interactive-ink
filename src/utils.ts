import type { Component } from "./types";

export function getWidth(): number {
  return document.documentElement.clientWidth;
}

export function getHeight(): number {
  return document.documentElement.clientHeight;
}

export function sleep(ms: number): Promise<() => void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function camelToSentence(camelText: string): string {
  const result = camelText.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export function invertHex(hex: any) {
  return (Number(`0x1${hex}`) ^ 0xffffff).toString(16).substr(1).toUpperCase();
}

export function generateFontString(fonts: string[]) {
  let res = "";

  for (let i = 0; i < fonts.length; i++) {
    const font = fonts[i];
    res += font.replaceAll(" ", "+");
    res += i < fonts.length - 1 ? "|" : "";
  }

  return res;
}

export function cssHexToRGBA(hex: string, alphaPercent: number) {
  let aRgbHex = hex.split("#")[1].match(/.{1,2}/g);
  return `rgba(${parseInt(aRgbHex[0], 16)}, ${parseInt(
    aRgbHex[1],
    16
  )}, ${parseInt(aRgbHex[2], 16)},${alphaPercent}%)`;
}

export function dateString(date) {
  return date
    ? `${date.day}/${date.month}/${date.year} - ${date.hours}:${date.minutes}`
    : null;
}

export class FileHistoryNode {
  prev: FileHistoryNode;
  node: Component<any>;
  next: FileHistoryNode;

  constructor(node?: Component<any>) {
    this.node = node;
  }

  push(node: Component<any>) {
    let n = new FileHistoryNode(node);
    n.prev = this;
    this.next = n;
    return this.next;
  }
}
