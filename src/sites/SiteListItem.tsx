import { Action, ActionPanel, Color, Icon, List, Toast, confirmAlert, showToast } from "@raycast/api";
import { SiteSingle } from "./SiteSingle";
import { Site } from "../types";
import { siteIcon } from "../lib/wp";
import { removeSite } from "../lib/db";
import { useImageDataUrl } from "../hooks/useImageDataUrl";
import { useEffect, useState } from "react";

const fallback = "🌐";

export const SiteListItem = ({ site, revalidate }: { site: Site; revalidate: () => void }) => {
  const { name, location } = site;
  const [iconUrl, setIconUrl] = useState<string>();
  const { dataString: logo } = useImageDataUrl(iconUrl);
  const icon = { source: Icon.Trash, tintColor: Color.Red };

  useEffect(() => {
    siteIcon({ path: site.location }).then(setIconUrl);
  }, [site.location]);

  return (
    <List.Item
      id={`site-${name}-${location}`}
      icon={{ source: logo ?? fallback, fallback }}
      title={name}
      subtitle={location}
      actions={
        <ActionPanel>
          <Action.Push
            icon={{ source: logo ?? fallback, fallback }}
            title="View Site"
            target={<SiteSingle site={site} />}
          />
          <Action
            icon={icon}
            title="Remove Site"
            onAction={async () => {
              const confirm = await confirmAlert({
                icon,
                title: "Remove site from Raycast?",
              });
              if (!confirm) return;
              await removeSite(site.id);
              revalidate();
              showToast({
                title: "Site Removed",
                message: site.name,
                style: Toast.Style.Success,
              });
            }}
          />
        </ActionPanel>
      }
    />
  );
};
