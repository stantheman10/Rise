import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'

import FocusScreen from '../screens/FocusScreen'
import HistoryScreen from '../screens/HistoryScreen'
import GoalsScreen from '../screens/GoalsScreen'
import BadgesScreen from '../screens/BadgesScreen'

import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Tab = createBottomTabNavigator()

// ✅ Clean animated icon
function AnimatedIcon({ name, color, focused }: any) {
  const scale = useSharedValue(1)

  React.useEffect(() => {
    scale.value = withSpring(focused ? 1.2 : 1)
  }, [focused])

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <Animated.View style={style}>
      <Ionicons name={name} size={22} color={color} />
    </Animated.View>
  )
}

export default function BottomTabs() {
  const insets = useSafeAreaInsets() // ✅ correct placement

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ color, focused }) => {
          let iconName: any = 'ellipse'

          if (route.name === 'Focus') iconName = 'flash'
          if (route.name === 'History') iconName = 'bar-chart'
          if (route.name === 'Goals') iconName = 'settings'
          if (route.name === 'Badges') iconName = 'trophy'

          return (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
                width: 40,
                borderRadius: 12,
                backgroundColor: focused
                  ? 'rgba(0,229,255,0.15)'
                  : 'transparent',
              }}
            >
              <AnimatedIcon
                name={iconName}
                color={color}
                focused={focused}
              />
            </View>
          )
        },

        tabBarStyle: {
          position: 'absolute',
          left: 20,
          right: 20,
          bottom: insets.bottom + 10,

          height: 75,
          borderRadius: 20,
          backgroundColor: 'rgba(22,30,49,0.9)',
          borderTopWidth: 0,

          paddingBottom: 12,
          paddingTop: 8,

          elevation: 10,
        },

        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },

        tabBarActiveTintColor: '#00E5FF',
        tabBarInactiveTintColor: '#7DD3FC',

        tabBarLabelStyle: {
          fontSize: 11,
          marginTop: 2,
        },
      })}
    >
      <Tab.Screen name="Focus" component={FocusScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Goals" component={GoalsScreen} />
      <Tab.Screen name="Badges" component={BadgesScreen} />
    </Tab.Navigator>
  )
}