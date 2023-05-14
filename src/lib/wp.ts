import { $ } from "zx";
import { MediaItemSimple, Plugin, PostType } from "../types";

$.prefix += 'export PATH="/opt/homebrew/bin:$HOME/.composer/vendor/bin:$PATH"; ';

type CommandProps = { path: string };

export const version = async ({ path }: CommandProps) => {
  $.prefix += `export WPPATH="${path}"; `;
  const { stdout } = await $`cd $WPPATH && wp core version`;
  return stdout;
};

export const siteLogo = async ({ path }: CommandProps) => {
  $.prefix += `export WPPATH="${path}"; `;
  const { stdout } = await $`cd $WPPATH && wp eval 'echo wp_get_attachment_image_url(get_theme_mod("custom_logo"));'`;
  return stdout;
};
export const siteIcon = async ({ path }: CommandProps) => {
  $.prefix += `export WPPATH="${path}"; `;
  const { stdout } = await $`cd $WPPATH && wp eval 'echo esc_url(get_site_icon_url());'`;
  return stdout;
};

export const getMedia = async ({
  path,
  size = "thumbnail",
}: CommandProps & { size?: string }): Promise<MediaItemSimple[]> => {
  $.prefix += `WPPATH="${path}"; IMGSIZE="${size}"; `;
  const { stdout } =
    await $`cd $WPPATH && wp eval "global \\$wpdb; \\$results = \\$wpdb->get_results(\\"SELECT ID, post_mime_type FROM {\\$wpdb->prefix}posts WHERE post_type = 'attachment' AND post_status = 'inherit' AND post_mime_type LIKE 'image%' ORDER BY ID DESC\\"); echo json_encode(array_map(function(\\$result) { return ['id' => \\$result->ID, 'url' => wp_get_attachment_image_src(\\$result->ID, '$IMGSIZE')[0], 'alt' => get_post_meta(\\$result->ID, '_wp_attachment_image_alt', true)]; }, \\$results));"`;
  return JSON.parse(stdout || "[]");
};

export const getPlugins = async ({ path }: CommandProps): Promise<Plugin[]> => {
  $.prefix += `export WPPATH="${path}"; `;
  const { stdout } =
    await $`cd $WPPATH && wp plugin list --fields=name,title,description,status,update,version,update_version --format=json`;
  return JSON.parse(stdout || "[]");
};
export const updatePlugin = async ({ path, plugin }: CommandProps & { plugin: string }) => {
  $.prefix += `export WPPATH="${path}"; export PLUGIN="${plugin}"; `;
  const { stdout } = await $`cd $WPPATH && wp plugin update $PLUGIN`;
  return stdout;
};
export const activatePlugin = async ({ path, plugin }: CommandProps & { plugin: string }) => {
  $.prefix += `export WPPATH="${path}"; export PLUGIN="${plugin}"; `;
  const { stdout } = await $`cd $WPPATH && wp plugin activate $PLUGIN`;
  return stdout;
};
export const deactivatePlugin = async ({ path, plugin }: CommandProps & { plugin: string }) => {
  $.prefix += `export WPPATH="${path}"; export PLUGIN="${plugin}"; `;
  const { stdout } = await $`cd $WPPATH && wp plugin deactivate $PLUGIN`;
  return stdout;
};

export const postTypes = async ({ path }: CommandProps): Promise<PostType[]> => {
  $.prefix += `export WPPATH="${path}"; `;
  const { stdout } =
    await $`cd $WPPATH && wp post-type list --public=1 --fields=name,label,description,count --format=json`;
  return JSON.parse(stdout || "[]");
};
