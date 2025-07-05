import { useStorageState } from '@/hooks/useStorageState'
import { createContext, useContext, useEffect, useState } from 'react'
import { Appearance, useColorScheme } from 'react-native'

type ThemeType = 'light' | 'dark' | 'system'

export type ThemeContextType = {
  theme: ThemeType
  currentTheme: 'light' | 'dark'
  setTheme: (theme: ThemeType) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  currentTheme: 'dark',
  setTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme() as 'light' | 'dark'
  const [[, storedTheme], setStoredTheme] = useStorageState('theme')
  const [theme, setThemeState] = useState<ThemeType>('system')
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('dark')
  // initialize theme based on stored value or system color scheme
  useEffect(() => {
    if (storedTheme) {
      setThemeState(storedTheme as ThemeType)
    } else {
      setThemeState('system')
    }
  }, [storedTheme])
  // update current theme based on theme choice and system color scheme
  useEffect(() => {
    if (theme === 'system') {
      setCurrentTheme(systemColorScheme || 'dark')
    } else {
      setCurrentTheme(theme as 'dark' | 'light')
    }
  }, [theme, systemColorScheme])
  // update stored theme when it changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (theme === 'system') {
        setCurrentTheme((colorScheme as 'light' | 'dark') || 'dark')
      }
    })
    return () => subscription.remove()
  }, [theme])

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme)
    setStoredTheme(newTheme)
  }
  return (
    <ThemeContext.Provider value={{ theme, currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
