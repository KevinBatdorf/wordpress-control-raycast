import { useMemo, useEffect, useState } from "react";
import { Site, Plugin } from "../types";
import { useDatabase } from "./useDatabase";
import { getPlugins } from "../lib/wp";
import { Color } from "@raycast/api";
import { tag } from "../lib/helpers";

export const useMedia = ({ id }: Site) => {
  const { getSite, ready } = useDatabase();
  const [media, setMedia] = useState<Plugin[]>();

  const accessories = useMemo(
    () => [media ? tag(`${media.length} total`, Color.Blue) : undefined].filter(Boolean) as [],
    [media]
  );

  useEffect(() => {
    if (!ready) return;
    const { location: path } = getSite?.({ id }) ?? {};
    if (!path) return;
    getPlugins({ path }).then(setMedia);
  }, [ready, id]);

  return { media, accessories, isLoading: !media };
};
