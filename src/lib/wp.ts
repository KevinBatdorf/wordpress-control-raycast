import { $ } from "zx";

$.prefix += 'export PATH="/opt/homebrew/bin:$HOME/.composer/vendor/bin:$PATH"; ';

type CommandProps = { path: string };

export const version = async ({ path }: CommandProps) => {
  $.prefix += `export WPPATH="${path}"; `;
  const { stdout } = await $`cd $WPPATH && wp core version`;
  return stdout;
};
export const getPlugins = async ({ path }: CommandProps) => {
  $.prefix += `export WPPATH="${path}"; `;
  const { stdout } = await $`cd $WPPATH && wp plugin list --format=json`;
  return JSON.parse(stdout || "[]");
};
export const siteLogo = async ({ path }: CommandProps) => {
  $.prefix += `export WPPATH="${path}"; `;
  const { stdout } = await $`cd $WPPATH && wp eval 'echo wp_get_attachment_image_url(get_theme_mod("custom_logo"));'`;
  return stdout;
};
export const siteIcon = async ({ path }: CommandProps) => {
  $.prefix += `export WPPATH="${path}"; `;
  const { stdout } = await $`cd $WPPATH && wp eval 'echo esc_url( get_site_icon_url() );'`;
  return stdout;
};
