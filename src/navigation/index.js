import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import { enableScreens } from 'react-native-screens';

enableScreens();

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* ANOTHER WAY TO SHOW SLIDE SCREEN FROM BOTTOM TO TOP */}
      {/* <Stack.Screen
        name="RatingAndReview"
        component={RatingAndReview}
        options={{
          headerShown: false,
          presentation: 'fullScreenModal', // full screen
          animation: 'slide_from_bottom', // top-to-bottom effect on go back
        }}
      /> */}
    </Stack.Navigator>
  );
}
