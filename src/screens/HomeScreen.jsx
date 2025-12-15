import {Text, Button, View, StyleSheet, ScrollView} from 'react-native'
import { useState } from 'react';

import transactionsData from '../data/transactions.json'
import Activity from '../components/Activity';
import AddTransaction from '../components/AddTransaction';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import AnalyticsChart from "../components/PieChart";
import { Picker } from '@react-native-picker/picker';

function HomeScreen({navigation}){
    const [chartYear, setChartYear] = useState(2025)
    const [chartMonth, setChartMonth] = useState(11)
    const [transactions, setTransactions] = useState(transactionsData);
    
    const months = [
        { label: "January", value: 0 },
        { label: "February", value: 1 },
        { label: "March", value: 2 },
        { label: "April", value: 3 },
        { label: "May", value: 4 },
        { label: "June", value: 5 },
        { label: "July", value: 6 },
        { label: "August", value: 7 },
        { label: "September", value: 8 },
        { label: "October", value: 9 },
        { label: "November", value: 10 },
        { label: "December", value: 11 },
    ];

    const years = [2023, 2024, 2025, 2026];

    const addTransaction = (transaction) => {
        setTransactions([...transactions, transaction]);
    }

    return (
        <View style={styles.container}>
            <Header/>
            <ScrollView style={{flex : 1}} contentContainerStyle={{paddingBottom: 100}}>
                <View style={{width: 200, borderColor: 'black', borderWidth: 1, alignSelf: 'center'}}>
                    <Picker selectedValue={chartYear} onValueChange={setChartYear}>
                        {years.map(year => <Picker.Item key={year} label={year.toString()} value={year} />)}
                    </Picker>

                    <Picker selectedValue={chartMonth} onValueChange={setChartMonth}>
                        {months.map(month => <Picker.Item key={month.value} label={month.label} value={month.value} />)}
                    </Picker>
                </View>
                <AnalyticsChart transactions={transactions} year={chartYear} month={chartMonth}/>
                <Activity transactions={transactions}/>
                <AddTransaction addTransaction={addTransaction}/> 
            </ScrollView>
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