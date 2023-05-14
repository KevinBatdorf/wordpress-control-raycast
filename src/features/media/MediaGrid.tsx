import { Grid } from "@raycast/api";
import { MediaItemSimple, Site } from "../../types";
import { useMedia } from "../../hooks/useMedia";
import { useImageDataUrl } from "../../hooks/useImageDataUrl";

export const MediaGrid = ({ site }: { site: Site }) => {
  const { media, isLoading } = useMedia(site);

  return (
    <Grid
      navigationTitle={`${site.name} -> Media`}
      isLoading={isLoading}
      columns={3}
      searchBarPlaceholder="Search media..."
    >
      {media?.map((item) => (
        <MediaGridItem key={item.id} {...item} />
      ))}
    </Grid>
  );
};

const MediaGridItem = ({ id, url, alt }: MediaItemSimple) => {
  const { dataString } = useImageDataUrl(url);
  return (
    <Grid.Item
      id={id}
      title={alt}
      keywords={[alt, url]}
      content={{
        value: dataString ?? "",
        tooltip: alt,
      }}
    />
  );
};
