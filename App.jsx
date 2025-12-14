import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen'
import AnalyticsScreen from './src/screens/AnalyticsScreen'

function App(){

    const Stack = createNativeStackNavigator();

    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Analytics" component={AnalyticsScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;