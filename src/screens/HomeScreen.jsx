import {Text, Button, View} from 'react-native'
import { useState } from 'react';

import transactionsData from '../data/transactions.json'
import Activity from '../components/Activity';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

function HomeScreen({navigation}){

    const [transactions, setTransactions] = useState(transactionsData);
    console.log(transactions);

    return (
        <View style={{flex : 1}}>
            <Header/>
            <Text>Home</Text>
            <Activity transactions={transactions}/>
            <Footer/>
        </View>
    );
}

export default HomeScreen;