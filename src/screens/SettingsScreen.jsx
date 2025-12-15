import {Text} from 'react-native';
import {Header} from '../components/Header';
import {Footer} from '../components/Footer';
import { View } from 'react-native';

function SettingsScreen(){
    return (
        <View style={{flex : 1}}>
            <Header/>
            <Text>Settings</Text>
            <Footer/>
        </View>
        
    );
}

export default SettingsScreen;