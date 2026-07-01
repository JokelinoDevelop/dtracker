import Storage from "expo-sqlite/kv-store";

export const storage = {
  getBoolean(key: string, defaultValue = false) {
    const value = Storage.getItemSync(key);

    if (value === null) {
      return defaultValue;
    }

    return value === "true";
  },

  setBoolean(key: string, value: boolean): void {
    Storage.setItem(key, String(value));
  },
};
