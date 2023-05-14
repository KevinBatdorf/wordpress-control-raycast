import { useMemo } from "react";
import { Site } from "../types";
import { getPlugins } from "../lib/wp";
import { Color } from "@raycast/api";
import { tag } from "../lib/helpers";
import { useCachedPromise } from "@raycast/utils";

export const usePlugins = ({ location: path }: Site) => {
  const { data: plugins, isLoading, revalidate } = useCachedPromise(() => getPlugins({ path }));

  const active = plugins?.filter((plugin) => plugin.status === "active") ?? [];
  const inactive = plugins?.filter((plugin) => plugin.status === "inactive") ?? [];
  const hasUpdates = plugins?.filter((plugin) => plugin.update === "available") ?? [];
  const accessories = useMemo(
    () =>
      [
        hasUpdates?.length > 0 ? tag(`${hasUpdates.length} updates`, Color.Orange) : undefined,
        active?.length > 0 ? tag(`${active.length} active`, Color.Green) : undefined,
        inactive?.length > 0 ? tag(`${inactive.length} inactive`, Color.SecondaryText) : undefined,
        plugins && plugins?.length > 0 ? tag(`${plugins.length} total`, Color.Blue) : undefined,
      ].filter(Boolean) as [],
    [plugins, active, inactive]
  );

  return { plugins, accessories, active, inactive, isLoading, revalidate };
};
