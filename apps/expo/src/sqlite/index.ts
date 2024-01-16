import { useEffect } from "react";
import * as FileSystem from "expo-file-system";

export async function getDatabase(dbName: string) {
  if (
    !(await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite`))
      .exists
  ) {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
    );
  }

  if (
    !(
      await FileSystem.getInfoAsync(
        `${FileSystem.documentDirectory}SQLite/${dbName}.db`,
      )
    ).exists
  ) {
    await FileSystem.writeAsStringAsync(
      `${FileSystem.documentDirectory}SQLite/${dbName}.db`,
      "",
      {
        encoding: FileSystem.EncodingType.UTF8,
      },
    );
  }

  return `${FileSystem.documentDirectory}SQLite/${dbName}.db`;
}

export const useDatabase = (dbPath: string) => {
  useEffect(() => {
    const initDatabase = async () => {
      const db = await getDatabase(dbPath);
      console.log("db", db);
    };
    void initDatabase();
  }, [dbPath]);
};
