import { Action, ActionPanel, Icon, List } from "@raycast/api";
import { AddSiteForm } from "../forms/AddSiteForm";
export const AddSite = ({ callback }: { callback?: () => unknown }) => (
  <List.Item
    title="Add Site"
    icon={{ source: Icon.Plus }}
    actions={
      <ActionPanel>
        <Action.Push title="Add Site" target={<AddSiteForm callback={callback} />} />
      </ActionPanel>
    }
  />
);
