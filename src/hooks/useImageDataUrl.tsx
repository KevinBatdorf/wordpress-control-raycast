import { useCachedPromise } from "@raycast/utils";
import { fetch } from "zx";

export const useImageDataUrl = (url?: string) => {
  const { data: dataString, isLoading } = useCachedPromise(
    async ({ url }) => {
      if (!url) return;
      const buffer = await (await fetch(url)).arrayBuffer();
      const base64String = Buffer.from(buffer).toString("base64");
      return `data:image/png;base64,${base64String}`;
    },
    [{ url }]
  );
  return { dataString, isLoading };
};
