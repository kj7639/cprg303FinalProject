import {Text, View, StyleSheet, Button, TextInput} from 'react-native'
import { useState } from 'react'

function AddTransaction({addTransaction, transactions}){

    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState("other")

    let today= new Date();
    let month = today.getMonth() + 1
    const [date, setDate] = useState(today.getFullYear() + "-" + month + "-" + today.getDate());

    const [id, setId] = useState(transactions.length + 1);

    const onAdd = () => {
        addTransaction({
            "id": id,
            "amount": parseInt(amount),
            "category": category,
            "date": date
        });
        setId(id + 1);
        setAmount(0);
        setCategory("other");
        setDate(today.getFullYear() + "-" + month + "-" + today.getDate());
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Transaction</Text>

            <View style={styles.inputRow}>
                <Text style={styles.inputText}>Amount:   </Text>
                <TextInput
                    placeholder='Enter amount'
                    style={styles.input}
                    value={amount}
                    onChangeText={(text) => setAmount(text)}
                />
            </View>
            <View style={styles.inputRow}>
                <Text style={styles.inputText}>Category:   </Text>
                <TextInput
                    placeholder='Enter category'
                    style={styles.input}
                    value={category}
                    onChangeText={(text) => setCategory(text)}
                />
            </View>
            <View style={styles.inputRow}>
                <Text style={styles.inputText}>Date:   </Text>
                <TextInput
                    placeholder='Enter date (YYYY-MM-DD)'
                    style={styles.input}
                    value={date}
                    onChangeText={(text) => setDate(text)}
                />
            </View>

            <Button title='Add Transaction' onPress={onAdd}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    title: {
        fontSize: 22,
        paddingTop: 20,
        paddingBottom: 7,
    },
    input: {
        borderWidth: 1,
        width: '50%',    
    },
    inputRow: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-start',
    }, 
    inputText: {
        marginHorizontal: 20,
    }
})

export default AddTransaction;