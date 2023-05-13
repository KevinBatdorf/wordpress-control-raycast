import { useMemo, useEffect, useState } from "react";
import { Site, Plugin } from "../types";
import { useDatabase } from "./useDatabase";
import { getPlugins } from "../lib/wp";
import { Color } from "@raycast/api";
import { tag } from "../lib/helpers";

export const usePlugins = ({ id }: Site) => {
  const { getSite, ready } = useDatabase();
  const [plugins, setPlugins] = useState<Plugin[]>();

  const active = plugins?.filter((plugin) => plugin.status === "active");
  const inactive = plugins?.filter((plugin) => plugin.status === "inactive");
  const accessories = useMemo(
    () =>
      [
        plugins ? tag(`${plugins.length} total`, Color.Blue) : undefined,
        active ? tag(`${active.length} active`, Color.Green) : undefined,
        inactive ? tag(`${inactive.length} inactive`, Color.SecondaryText) : undefined,
      ].filter(Boolean) as [],
    [plugins, active, inactive]
  );

  useEffect(() => {
    if (!ready) return;
    const { location: path } = getSite?.({ id }) ?? {};
    if (!path) return;
    getPlugins({ path }).then(setPlugins);
  }, [ready, id]);

  return { plugins, accessories, active, inactive, isLoading: !plugins };
};
