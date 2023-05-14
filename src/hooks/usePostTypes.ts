import { useMemo } from "react";
import { Site } from "../types";
import { postTypes } from "../lib/wp";
import { useCachedPromise } from "@raycast/utils";

export const usePostTypes = ({ location: path }: Site) => {
  const { data, isLoading, revalidate } = useCachedPromise(() => postTypes({ path }));

  return { postTypes: data?.filter((p) => p?.name !== "attachment"), isLoading, revalidate };
};
