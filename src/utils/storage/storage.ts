import * as SecureStore from 'expo-secure-store';

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export async function loadString(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    // not sure why this would fail... even reading the RN docs I'm unclear
    return null;
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function saveString(key: string, value: string): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export async function load(key: string): Promise<any | null> {
  try {
    const almostThere = await AsyncStorage.getItem(key);
    if (almostThere) return JSON.parse(almostThere);
  } catch {
    return null;
  }
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function save(key: string, value: any): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export async function remove(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch {}
}

/**
 * Burn it all to the ground.
 */
export async function clear(): Promise<void> {
  try {
    await AsyncStorage.clear();
  } catch {}
}

export async function saveSecure(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function deleteSecure(key: string) {
  await SecureStore.deleteItemAsync(key);
}

export async function getSecureValue(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return;
  }
}

export async function storeDataWithExpiration(
  key: string,
  value: string,
  expiresInMinutes: number,
) {
  const expiration = new Date().getTime() + expiresInMinutes * 60 * 1000;
  const data = {
    value,
    expiration,
  };

  await AsyncStorage.setItem(key, JSON.stringify(data));
}

// Helper function to get data and check if it has expired
export async function getDataWithExpiration(key: string) {
  const dataString = await AsyncStorage.getItem(key);

  if (dataString) {
    const data = JSON.parse(dataString);
    if (data.expiration && new Date().getTime() < data.expiration) {
      return data.value;
    } else {
      await AsyncStorage.removeItem(key);
    }
  }
  return null;
}
