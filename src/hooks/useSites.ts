import { getSites } from "../lib/db";
import { useCachedPromise } from "@raycast/utils";

export const useSites = () => {
  const { data: sites, isLoading, revalidate } = useCachedPromise(getSites);
  return { sites, isLoading, revalidate };
};
