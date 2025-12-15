import {Text, View, StyleSheet, Button, TextInput} from 'react-native'
import { useState } from 'react'

function AddTransaction({addTransaction}){

    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState("other")

    let today= new Date();
    const [date, setDate] = useState(today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate());

    const onAdd = () => {
        addTransaction({
            "id": 5,
            "amount": amount,
            "category": category,
            "date": date
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Transaction</Text>

            <View style={styles.inputRow}>
                <Text>Amount:   </Text>
                <TextInput
                    placeholder='Enter amount'
                    style={styles.input}
                    value={amount}
                    onChangeText={(text) => setAmount(text)}
                />
            </View>
            <View style={styles.inputRow}>
                <Text>Category:   </Text>
                <TextInput
                    placeholder='Enter category'
                    style={styles.input}
                    value={category}
                    onChangeText={(text) => setCategory(text)}
                />
            </View>
            <View style={styles.inputRow}>
                <Text>Date:   </Text>
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
        // flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 22,
        paddingTop: 20,
        paddingBottom: 7,
    },
    item: {
        paddingVertical: 2,
        paddingHorizontal: 20,
        margin: 4,
        width: '75%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 18,
    },
    input: {
        borderWidth: 1,
     
    },
    inputRow: {
        flexDirection: 'row',
    }
})

export default AddTransaction;