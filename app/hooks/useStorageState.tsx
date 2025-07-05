import * as SecureStore from 'expo-secure-store'
import { useCallback, useEffect, useState } from 'react'
import { Platform } from 'react-native'

const storage = {
  get: async (key: string): Promise<string | null> => {
    try {
      if (Platform.OS === 'web') {
        return localStorage.getItem(key)
      } else {
        return await SecureStore.getItemAsync(key)
      }
    } catch (error) {
      console.error(`Error getting item from storage: ${key}`, error)
      return null
    }
  },
  set: async (key: string, value: string): Promise<void> => {
    try {
      if (Platform.OS === 'web') {
        if (value === null) {
          localStorage.removeItem(key)
        } else {
          localStorage.setItem(key, value)
        }
      } else {
        if (value === null) {
          await SecureStore.deleteItemAsync(key)
        } else {
          await SecureStore.setItemAsync(key, value)
        }
      }
    } catch (error) {
      console.error(`Error setting item in storage: ${key}`, error)
    }
  },
}

type StorageState = [[boolean, string | null], (value: string | null) => void]
export function useStorageState(key: string): StorageState {
  const [isLoading, setIsLoading] = useState(true)
  const [value, setValue] = useState<string | null>(null)
  useEffect(() => {
    storage
      .get(key)
      .then((storedValue) => {
        setValue(storedValue)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(`Error loading storage state for key: ${key}`, error)
        setIsLoading(false)
      })
  }, [key])

  const updateValue = useCallback(
    (newValue: string | null) => {
      setValue(newValue)
      if (newValue != null) {
        storage.set(key, newValue).catch((error) => {
          console.error(`Error updating storage state for key: ${key}`, error)
        })
      }
    },
    [key]
  )
  return [[isLoading, value], updateValue]
}
