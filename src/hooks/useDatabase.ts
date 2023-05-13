import { Database } from "sql.js";
import { useEffect, useState } from "react";
import { dumpDb, initDb } from "../lib/db";
import { Site } from "../types";

export const useDatabase = () => {
  const [db, setDb] = useState<Database>();
  const addSite = ({ name, location }: { name: string; location: string }): Site["id"] | undefined => {
    if (!db) return;
    try {
      // Check if the database already has a site with the same name and location
      const [site] = db.exec("SELECT * FROM sites WHERE name = ? AND location = ?", [name, location]);
      if (site?.values?.[0]) {
        // If available, set to active
        db.run("UPDATE sites SET status = 'active' WHERE name = ? AND location = ?", [name, location]);
      } else {
        // If not available, add a new site
        db.run("INSERT INTO sites (name, location) VALUES (?, ?)", [name, location]);
      }
      const [newSite] = db.exec("SELECT id FROM sites WHERE name = ? AND location = ? LIMIT 1", [name, location]);
      dumpDb(db);
      return String(newSite?.values?.[0]?.[0] ?? 0);
    } catch (error) {
      console.error(error);
    }
  };

  const getSite = ({ id: siteId }: { id: string }): Site | undefined => {
    if (!db) return;
    try {
      const [site] = db.exec("SELECT * FROM sites WHERE id = ?", [siteId]);
      const [id, name, location, createdAt, status] = site.values?.[0] ?? [];
      return { id, name, location, createdAt, status } as Site;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    initDb().then((database) => {
      setDb(database);
    });
  }, []);

  return {
    db,
    addSite,
    getSite,
    ready: !!db,
  };
};
