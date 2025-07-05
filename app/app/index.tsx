import { useTheme } from '@/context/ThemeContext'
import { useThemeColors } from '@/hooks/useThemeColors'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
type Feature = {
  icon: string
  text: string
  description: string
}
const features: Feature[] = [
  { icon: '🎨', text: 'Recolor Images', description: 'Choose Arbitrary Color' },
  { icon: '🖼️', text: 'Restore Photos', description: 'In Excellent Quality' },
  { icon: '✨', text: 'Generative Fill', description: 'Smart Expand' },
  { icon: '✂️', text: 'Remove Objects', description: 'Clean Removal' },
]

const WelcomeScreen = () => {
  const colors = useThemeColors()
  const { currentTheme } = useTheme()
  return (
    <SafeAreaView
      className={`flex-1 ${
        currentTheme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`}
    >
      <View className='items-center p-5 flex-1'>
        <Image
          source={require('../assets/images/landing.png')}
          className='w-40 h-40 mb-3'
          resizeMode='contain'
        />
        <Text
          className={`text-[28px] font-bold text-center mb-4 ${
            currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
        >
          Imaginary AI
        </Text>
        <Text
          className={`text-center text-lg mb-6 ${
            currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          Your AI-powered image editor
        </Text>
        <View className='flex-row flex-wrap justify-between px-1.5 mb-7'>
          {features.map((feature, index) => (
            <View
              key={index}
              className={`w-[48%] p-4 mb-4 rounded-2xl ${
                currentTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
              }`}
            >
              <Text className='text-4xl mb-3' style={{ color: colors.primary }}>
                {feature.icon}
              </Text>
              <View className='w-full'>
                <Text
                  className={`text-lg font-semibold ${
                    currentTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {feature.text}
                </Text>
                <Text
                  className={`text-sm ${
                    currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      <View className='w-full p-5'>
        <TouchableOpacity
          className='h-14 rounded-xl border-[1.5px] justify-center items-center mb-4'
          style={{
            borderColor: colors.primary,
          }}
          onPress={() => router.push('/sign-in')}
        >
          <Text
            className={`text-center text-white text-lg font-semibold ${
              currentTheme === 'dark' ? 'text-gray-900' : 'text-white'
            }`}
          >
            Get Started
          </Text>
        </TouchableOpacity>
        <LinearGradient
          colors={['#4f46e5', '#7c3aed']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            height: 54,
            borderRadius: 12,
            marginBottom: 16,
          }}
        >
          <TouchableOpacity
            className='h-full rounded-xl justify-center items-center'
            onPress={() => router.push('/sign-up')}
          >
            <Text
              className={`text-center text-white text-lg font-semibold ${
                currentTheme === 'dark' ? 'text-gray-900' : 'text-white'
              }`}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </LinearGradient>
        <Text
          className={`text-center text-sm mt-2 ${
            currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          Start Transforming your images with Imaginary AI today!
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default WelcomeScreen
