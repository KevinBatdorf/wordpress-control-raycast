import { Action, ActionPanel, Color, Icon, List } from "@raycast/api";
import { Site } from "../types";
import { usePlugins } from "../hooks/usePlugins";
import { PluginsList } from "../features/plugins/PluginsList";
import { useMedia } from "../hooks/useMedia";
import { MediaGrid } from "../features/media/MediaGrid";
import { usePostTypes } from "../hooks/usePostTypes";
import { tag } from "../lib/helpers";

export const SiteSingle = ({ site }: { site: Site }) => {
  const { postTypes } = usePostTypes(site);
  const { accessories: pluginAccessories } = usePlugins(site);
  const { accessories: mediaAccessories } = useMedia(site);

  return (
    <List navigationTitle={site.name}>
      {postTypes?.map(({ name, label, count }) => (
        <List.Item
          key={`post-type-${name}`}
          title={label}
          icon={{ source: Icon.Document }}
          accessories={[tag(`${count} ${label}`, Color.PrimaryText)]}
        />
      ))}
      <List.Item
        title="Plugins"
        icon={{ source: Icon.Plug }}
        accessories={pluginAccessories?.length > 0 ? pluginAccessories : undefined}
        actions={
          <ActionPanel>
            <Action.Push title="View Plugins" target={<PluginsList site={site} />} />
          </ActionPanel>
        }
      />
      <List.Item
        title="Media"
        icon={{ source: Icon.Image }}
        accessories={mediaAccessories?.length > 0 ? mediaAccessories : undefined}
        actions={
          <ActionPanel>
            <Action.Push title="View Plugins" target={<MediaGrid site={site} />} />
          </ActionPanel>
        }
      />
    </List>
  );
};
