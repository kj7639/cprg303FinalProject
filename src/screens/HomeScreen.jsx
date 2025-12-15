import {Text, Button, View, StyleSheet} from 'react-native'
import { useState } from 'react';

import transactionsData from '../data/transactions.json'
import Activity from '../components/Activity';
import AddTransaction from '../components/AddTransaction';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

function HomeScreen({navigation}){

    const [transactions, setTransactions] = useState(transactionsData);

    const addTransaction = (transaction) => {
        setTransactions([...transactions, transaction]);
    }

    return (
        <View style={styles.container}>
            <Activity transactions={transactions}/>
            <AddTransaction addTransaction={addTransaction}/>
        <View style={{flex : 1}}>
            <Header/>
            <Text>Home</Text>
            <Activity transactions={transactions}/>
            <Footer/>
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