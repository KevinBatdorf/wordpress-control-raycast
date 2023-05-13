export type Site = {
  id: string;
  name: string;
  location: string;
  createdAt: string;
  status: "active" | "inactive";
};

export type Plugin = {
  name: string;
  status: string;
  update: string;
  version: string;
};
