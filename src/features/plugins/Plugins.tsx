import { Color, Icon, List } from "@raycast/api";
import { usePlugins } from "../../hooks/usePlugins";
import { Site } from "../../types";
import { tag } from "../../lib/helpers";

export const Plugins = ({ site }: { site: Site }) => {
  const { plugins, isLoading } = usePlugins(site);

  const sortedByStatus = [...(plugins ?? [])]?.sort((a, b) => {
    if (a.status === "active" && b.status !== "active") return -1;
    if (a.status !== "active" && b.status === "active") return 1;
    return 0;
  });

  return (
    <List isLoading={isLoading} navigationTitle="Plugins" searchBarPlaceholder="Search plugins...">
      {sortedByStatus?.map((plugin) => (
        <List.Item
          key={plugin.name}
          title={plugin.name}
          subtitle={plugin.status}
          accessories={[tag(plugin.status, plugin.status === "active" ? Color.Green : Color.SecondaryText)]}
        />
      ))}
    </List>
  );
};
