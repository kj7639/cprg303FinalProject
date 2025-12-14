import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen'
import AnalyticsScreen from './src/screens/AnalyticsScreen'
import SettingScreen from './src/screens/SettingsScreen'

function App(){

    const Stack = createNativeStackNavigator();

    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{headerShown : false}}/>
                <Stack.Screen name="Analytics" component={AnalyticsScreen} options={{headerShown : false}}/>
                <Stack.Screen name="Settings" component={SettingScreen} options={{headerShown : false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;