export type Site = {
  id: string;
  name: string;
  location: string;
  addedAt: Date;
};

export type Plugin = {
  name: string;
  title: string;
  description: string;
  status: string;
  update: string;
  update_version: string | null;
  version: string;
};

export type MediaItemSimple = {
  id: string;
  url: string;
  alt: string;
};

export type PostType = {
  name: string;
  label: string;
  description: string;
  count: string;
};
