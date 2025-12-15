import {Text, Button, View, StyleSheet} from 'react-native'
import { useState } from 'react';

import transactionsData from '../data/transactions.json'
import Activity from '../components/Activity';

function HomeScreen({navigation}){

    const [transactions, setTransactions] = useState(transactionsData);
    console.log(transactions);

    return (
        <View style={styles.container}>
            <Activity transactions={transactions}/>
            {/* <Button
                title='Analytics'
                onPress={() => navigation.navigate('Analytics')}
            /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
    },
    item: {
        paddingVertical: 2,
        paddingHorizontal: 20,
        margin: 4,
        backgroundColor: '#b3b3b3ff'
    }
})

export default HomeScreen;