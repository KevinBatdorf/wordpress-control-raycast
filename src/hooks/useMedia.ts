import { useMemo } from "react";
import { Site } from "../types";
import { getMedia } from "../lib/wp";
import { Color } from "@raycast/api";
import { tag } from "../lib/helpers";
import { useCachedPromise } from "@raycast/utils";

export const useMedia = ({ location: path }: Site, options?: { size?: string }) => {
  const {
    data: media,
    isLoading,
    revalidate,
  } = useCachedPromise(() => getMedia({ path, size: options?.size ?? "thumbnail" }));
  console.log(media);
  const accessories = useMemo(
    () => [media ? tag(`${media.length} total`, Color.Blue) : undefined].filter(Boolean) as [],
    [media]
  );

  return { media, accessories, isLoading, revalidate };
};
