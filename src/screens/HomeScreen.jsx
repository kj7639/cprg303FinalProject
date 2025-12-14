import {Text, Button, View} from 'react-native'
import { useState } from 'react';

import transactionsData from '../data/transactions.json'
import Activity from '../components/Activity';

function HomeScreen({navigation}){

    const [transactions, setTransactions] = useState(transactionsData);
    console.log(transactions);

    return (
        <View>
            <Text>Home</Text>
            <Activity transactions={transactions}/>
            <Button
                title='Analytics'
                onPress={() => navigation.navigate('Analytics')}
            />
        </View>
    );
}

export default HomeScreen;