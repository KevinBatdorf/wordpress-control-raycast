import { Action, ActionPanel, List } from "@raycast/api";
import { SiteSingle } from "./SiteSingle";
import { Site } from "../types";
import { useCachedPromise } from "@raycast/utils";
import { siteIcon } from "../lib/wp";
import { fetch } from "zx";

const fallback = "🌐";

export const SiteListItem = ({ site }: { site: Site }) => {
  const { id, name, location } = site;
  const { data: logo } = useCachedPromise(
    async ({ path }) => {
      const data = await siteIcon({ path });
      const buffer = await (await fetch(data)).arrayBuffer();
      const base64String = Buffer.from(buffer).toString("base64");
      return `data:image/png;base64,${base64String}`;
    },
    [{ path: location }]
  );

  return (
    <List.Item
      id={`site-${id}`}
      icon={{ source: logo ?? fallback, fallback }}
      title={name}
      subtitle={location}
      actions={
        <ActionPanel>
          <Action.Push title="View Site" target={<SiteSingle site={site} />} />
        </ActionPanel>
      }
    />
  );
};
