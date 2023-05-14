# WordPress Control

Work in progress Raycast extension to manage your WordPress sites.

The api could break and change at any time. Currently no multi-site support

## Initial wishlist of features

Just some brainstorming features. The list can change at any time and is not in any particular order.

### Onboarding
- [ ] Discover / debug missing dependencies (wp-cli)
- [ ] Recommend additional wp-cli packages
- [ ] Check server resources and recommend changes

### Site discovery
- [ ] Connect to sites locally
- [ ] Connect to sites remotely
- [ ] Accept a global directory to monitor for sites
- [ ] Accept blueprints for creating new sites with pre-configured plugins, themes, etc

### Site management
- [ ] Create a new site
- [ ] Delete a site
- [ ] Update a site to a specific wp version
- [ ] Interact with env tools like docker, wp-env, Local, etc
- [ ] Interact with Remote tools like WP Engine, Pantheon, etc to deploy a new site

### Plugin management
- [ ] Search for and install a plugin
- [x] Update, delete, activate, deactivate a plugin
- [ ] Keep a list of the user's favorite plugins to auto install
- [ ] Update all plugins in one place (not per site)
- [ ] Recommend plugins (gpt powered?)

### Theme management
- [ ] Search for and install a theme
- [ ] Update, delete, activate, deactivate a theme
- [ ] Keep a list of the user's favorite themes to auto install

### Database management
- [ ] Simple database searches
- [ ] Database backups, exports, imports
- [ ] Database optimizations ?
- [ ] Seed database with dummy data
- [ ] Search and replace in database
- [ ] Reset database to default

### User management
- [ ] Create a new user
- [ ] Delete a user
- [ ] Update a user's password
- [ ] Update a user's other info (email, name, role, etc)

### Site info
- [ ] Get site info (url, version, etc)
- [ ] Get site health info
- [ ] Get site php info
- [ ] Get site wp-config info
- [ ] Get site wp-cli info

### Site debugging
- [ ] Enable / disable wp-debug and other debugging tools
- [ ] Enable / disable query monitor
- [ ] Enable / disable wp-cron
- etc

### Site security
- [ ] Enable / disable auto updates
- [ ] Enable / disable auto plugin updates
- [ ] Enable / disable auto theme updates
- [ ] Enable / disable auto core updates
- [ ] Enable / disable auto minor updates
- etc

### Content management
- [ ] Create, edit, delete, etc a new POST TYPE
- [ ] gpt content recommendations (title, content, etc)
- [ ] gpt image generation - alt tags, etc
