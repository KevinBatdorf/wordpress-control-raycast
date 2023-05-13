import { Action, ActionPanel } from "@raycast/api";
import { AddSiteForm } from "../forms/AddSiteForm";

export const MainActions = () => {
  return (
    <ActionPanel.Section title="Global Commands">
      <Action.Push title="Add Site" target={<AddSiteForm />} />
    </ActionPanel.Section>
  );
};
