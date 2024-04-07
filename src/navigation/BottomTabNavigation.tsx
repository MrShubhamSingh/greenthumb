import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Browser from '../screens/Browser';
import Favourites from '../screens/Favourites';
import Icon from 'react-native-vector-icons/Ionicons';
import PlantDetail from '../screens/Browser/PlantDetails';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Define types for header style
type HeaderStyle = {
  backgroundColor: string;
  headerTitleStyle: {
    fontWeight: string;
  };
  elevation?: number; // Only for Android
  shadowOpacity?: number; // Only for iOS
  shadowOffset?: {width: number; height: number}; // Only for iOS
  shadowColor?: string; // Only for iOS
};

const tabBarOptions = {
  showLabel: false, // Hide labels
};

const screenOptions = ({route}: {route: any}) => ({
  tabBarShowLabel: false,
  tabBarStyle: [
    {
      display: 'flex',
    },
    null,
  ],

  headerShown: false,
  tabBarIcon: ({color, size}: {color: string; size: number}) => {
    const {name} = route;
    let iconName = 'home-outline'; // Default icon name
    if (name === 'Browser') {
      iconName = 'home-outline';
    } else if (name === 'Favourites') {
      iconName = 'cart-outline';
    }
    return <Icon name={iconName} size={size} color={color} />;
  },
});

const headerStyle: HeaderStyle = {
  backgroundColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'normal',
  },
  elevation: 5, // Only for Android
  shadowOpacity: 0.5, // Only for iOS
  shadowOffset: {width: 0, height: 2}, // Only for iOS
  shadowColor: '#000', // Only for iOS
};

const BrowserStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {elevation: 0},
      cardStyle: {backgroundColor: '#fff'},
    }}>
    <Stack.Screen
      name="Browser"
      component={Browser}
      options={{
        headerTitle: 'Plant Browser',
        ...headerStyle,
      }}
    />
    <Stack.Screen
      name="PlantDetail"
      component={PlantDetail}
      options={{
        headerTitle: 'Plant Detail',
        ...headerStyle,
      }}
    />
  </Stack.Navigator>
);

const FavouritesStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Favourites"
      component={Favourites}
      options={{
        headerTitle: 'Favourites',
        ...headerStyle,
      }}
    />
  </Stack.Navigator>
);

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator tabBarOptions={tabBarOptions} screenOptions={screenOptions}>
      <Tab.Screen name="Browser" component={BrowserStack} />
      <Tab.Screen name="Favourites" component={FavouritesStack} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
