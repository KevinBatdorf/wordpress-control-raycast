import { environment } from "@raycast/api";
import initSqlJs, { Database } from "sql.js";
import { existsSync, writeFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { DB_FILE_PATH } from "../constants";

export const createTables = `
CREATE TABLE sites (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'active'
);
CREATE TABLE events (
  id INTEGER PRIMARY KEY,
  directory_id INTEGER NOT NULL,
  event_name TEXT NOT NULL,
  payload TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (directory_id) REFERENCES directories(id)
);
`;

if (!existsSync(DB_FILE_PATH)) {
  writeFileSync(DB_FILE_PATH, "", "utf8");
}

export const initDb = async () => {
  const SQL = await initSqlJs({
    locateFile: () => resolve(environment.assetsPath, "sql-wasm.wasm"),
  });
  const file = await readFile(DB_FILE_PATH);
  const db = new SQL.Database(file);
  try {
    db.exec("SELECT * FROM sites");
  } catch (err) {
    db.run(createTables);
    const buffer = Buffer.from(db.export());
    writeFileSync(DB_FILE_PATH, buffer, "binary");
  }
  return db;
};

export const dumpDb = async (db: Database) => {
  writeFileSync(DB_FILE_PATH, Buffer.from(db.export()), "binary");
};
