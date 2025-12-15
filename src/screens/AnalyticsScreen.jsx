import {Text, View} from 'react-native'

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

function AnalyticsScreen(){
    return(
        <View style={{flex: 1}}>
            <Header/>
            <Text>Analytics</Text>
            <Footer/>
        </View>
    )
}

export default AnalyticsScreen;