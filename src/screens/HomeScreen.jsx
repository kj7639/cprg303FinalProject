import {Text, Button, View} from 'react-native'

function HomeScreen({navigation}){
    return (
        <View>
            <Text>Home</Text>
            <Button
                title='Analytics'
                onPress={() => navigation.navigate('Analytics')}
            />
        </View>
    );
}

export default HomeScreen;