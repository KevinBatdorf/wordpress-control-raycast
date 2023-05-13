import { Action, ActionPanel, Icon, List } from "@raycast/api";
import { Site } from "../types";
import { usePlugins } from "../hooks/usePlugins";
import { Plugins } from "../features/plugins/Plugins";

export const SiteSingle = ({ site }: { site: Site }) => {
  const { accessories } = usePlugins(site);

  return (
    <List navigationTitle={site.name}>
      <List.Item
        title="Media"
        icon={{ source: Icon.Image }}
        accessories={accessories?.length > 0 ? accessories : undefined}
        actions={
          <ActionPanel>
            <Action.Push title="View Plugins" target={<Plugins site={site} />} />
          </ActionPanel>
        }
      />
      <List.Item
        title="Plugins"
        icon={{ source: Icon.Plug }}
        accessories={accessories?.length > 0 ? accessories : undefined}
        actions={
          <ActionPanel>
            <Action.Push title="View Plugins" target={<Plugins site={site} />} />
          </ActionPanel>
        }
      />
    </List>
  );
};
