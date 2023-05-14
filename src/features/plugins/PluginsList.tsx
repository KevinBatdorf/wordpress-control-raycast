import { ActionPanel, Action, Color, List, showToast, Toast, useNavigation } from "@raycast/api";
import { usePlugins } from "../../hooks/usePlugins";
import { Site, Plugin } from "../../types";
import { tag } from "../../lib/helpers";
import { activatePlugin, deactivatePlugin, updatePlugin } from "../../lib/wp";
import { flashErrorDetails } from "../../lib/errors";

export const PluginsList = ({ site }: { site: Site }) => {
  const { plugins, isLoading, revalidate } = usePlugins(site);
  const { push } = useNavigation();

  const sortedByStatus = [...(plugins ?? [])]?.sort((a, b) => {
    if (a.status === "active" && b.status !== "active") return -1;
    if (a.status !== "active" && b.status === "active") return 1;
    return 0;
  });

  type RunCommandProps = { title: string; successTitle: string; command: () => unknown };
  const runCommand = async ({ title, successTitle, command }: RunCommandProps) => {
    try {
      showToast({ title, style: Toast.Style.Animated });
      await command();
      showToast({ title: successTitle, style: Toast.Style.Success });
    } catch (error: unknown) {
      await flashErrorDetails(error, push);
    }
    revalidate();
  };

  const handleUpdate = (name: Plugin["name"]) =>
    runCommand({
      title: "Updating plugin",
      successTitle: "Plugin updated!",
      command: () => updatePlugin({ path: site.location, plugin: name }),
    });

  const handleActivate = async (name: Plugin["name"]) =>
    runCommand({
      title: "Activating plugin",
      successTitle: "Plugin activated!",
      command: () => activatePlugin({ path: site.location, plugin: name }),
    });

  const handleDeactivate = async (name: Plugin["name"]) =>
    runCommand({
      title: "Deactivating plugin",
      successTitle: "Plugin deactivated",
      command: () => deactivatePlugin({ path: site.location, plugin: name }),
    });

  return (
    <List isLoading={isLoading} navigationTitle={`${site.name} -> Plugins`} searchBarPlaceholder="Search plugins...">
      {sortedByStatus?.map(({ name, title, status, update, version }) => (
        <List.Item
          key={name}
          title={title || name}
          subtitle={version}
          keywords={[name, status]}
          accessories={
            [
              update === "available" ? tag("update available", Color.Orange) : undefined,
              tag(status, status === "active" ? Color.Green : Color.SecondaryText),
            ].filter(Boolean) as []
          }
          actions={
            <ActionPanel>
              {update === "available" && <Action title="Update Plugin" onAction={() => handleUpdate(name)} />}
              {status === "active" ? (
                <Action title="Deactivate Plugin" onAction={() => handleDeactivate(name)} />
              ) : (
                <Action title="Activate Plugin" onAction={() => handleActivate(name)} />
              )}
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
};
