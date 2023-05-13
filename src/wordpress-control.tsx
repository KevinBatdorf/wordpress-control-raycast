import { List } from "@raycast/api";
import { AddSite } from "./sites/AddSite";
import { useSQL } from "@raycast/utils";
import { DB_FILE_PATH } from "./constants";
import { Site } from "./types";
import { useDatabase } from "./hooks/useDatabase";
import { SiteListItem } from "./sites/SiteListItem";
import { useState } from "react";

const WordPressControl = () => {
  const { ready } = useDatabase();
  const [search, setSearch] = useState<string>();
  const {
    data: sites,
    isLoading,
    permissionView,
    revalidate,
  } = useSQL<Site>(DB_FILE_PATH, "SELECT * FROM sites", {
    permissionPriming: "Sites are stored locally in a SQLite database along with event logs.",
    execute: ready,
  });

  if (permissionView) return permissionView;

  return (
    <List searchBarPlaceholder="Search sites..." isLoading={isLoading} onSearchTextChange={setSearch}>
      {search ? null : (
        <List.Section title="Commands">
          <AddSite callback={() => revalidate()} />
        </List.Section>
      )}
      <List.Section title="Local sites">
        {sites?.map((site) => (
          <SiteListItem key={site.id} site={site} />
        ))}
      </List.Section>
    </List>
  );
};

export default WordPressControl;
