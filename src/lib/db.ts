import { LocalStorage } from "@raycast/api";
import { Site } from "../types";

const siteKey = (location: string, name: string) => `site:${location}:${name}`;
type SiteQueryParams = Omit<Site, "addedAt" | "id">;

export const addSite = async ({ location, name }: SiteQueryParams) => {
  const id = siteKey(location, name);
  await LocalStorage.setItem(id, JSON.stringify({ id, location, name, addedAt: new Date() }));
  return await getSite(id);
};
export const getSite = async (id: Site["id"]): Promise<Site> => JSON.parse((await LocalStorage.getItem(id)) || "{}");

export const removeSite = async (id: Site["id"]) => await LocalStorage.removeItem(id);

export const hasSite = async (id: Site["id"]) => Boolean(await getSite(id));

export const getSites = async () => {
  const sites = await LocalStorage.allItems();
  return Object.values(sites).map((site) => JSON.parse(site) as Site);
};
