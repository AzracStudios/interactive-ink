import PocketBase from "pocketbase";
import type { Project } from "../types";
const url = "https://interactive-ink.pockethost.io";
const pb = new PocketBase(url);

export async function loadProject(id: string): Promise<Project> {
  const proj = await pb.collection("projects").getOne(id);
  return {
    config: proj.project.config,
    data: proj.project.data,
  };
}

export async function saveProject(data: Project): Promise<number> {
  const proj = await pb
    .collection("projects")
    .update(data.config.id, { project: data });
  return 0;
}

export async function uploadImage(data: FormData): Promise<boolean> {
  const createdRecord = await pb.collection("images").create(data);
  return createdRecord.code ? false : true;
}

export async function fetchImages(id: string): Promise<any> {
  const data = await pb.collection("images").getList(1, 10000, {
    filter: `project_id = "${id}"`,
  });

  let arr = [];

  for (let i = 0; i < data.items.length; i++) {
    const item = data.items[i];
    arr.push({
      id: item.id,
      src: `${url}/api/files/images/${item.id}/${item.image}`,
    });
  }

  return arr;
}

export async function deleteImage(id: string): Promise<any> {
  const data = await pb.collection("images").delete(id);
  return data;
}
