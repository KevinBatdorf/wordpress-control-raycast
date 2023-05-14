import { List } from "@raycast/api";
import { AddSite } from "./sites/AddSite";
import { SiteListItem } from "./sites/SiteListItem";
import { useState } from "react";
import { useSites } from "./hooks/useSites";

const WordPressControl = () => {
  const [search, setSearch] = useState<string>();
  const { sites, isLoading, revalidate } = useSites();

  return (
    <List
      navigationTitle="WordPress Control"
      searchBarPlaceholder="Search sites..."
      isLoading={isLoading}
      onSearchTextChange={setSearch}
    >
      {search ? null : (
        <List.Section title="Commands">
          <AddSite callback={revalidate} />
        </List.Section>
      )}
      <List.Section title="Local sites">
        {sites?.map((site) => (
          <SiteListItem key={site.id} site={site} revalidate={revalidate} />
        ))}
      </List.Section>
    </List>
  );
};

export default WordPressControl;
