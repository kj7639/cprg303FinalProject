import {
    Text,
    View,
    StyleSheet,
} from 'react-native'

import { useState, useEffect } from 'react';

function Activity({transactions}){
    const [posTotal, setPosTotal] = useState(0);
    const [negTotal, setNegTotal] = useState(0);

    const getMonthlyTotals = () => {
        const today = new Date();

        const filtered = transactions.filter(t =>{
            const d = new Date(t.date);
            return d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth();
        })

        let pos = 0;
        let neg = 0;

        for(let i = 0; i < filtered.length; i++){
            if(filtered[i].amount > 0){
                pos += filtered[i].amount;
            }else{
                neg += filtered[i].amount;
            }
        }

        setPosTotal(pos);
        setNegTotal(neg);
    }

    useEffect(() => {
        getMonthlyTotals()
    }, [transactions])

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.title}>Total Activity:</Text>
                <View style={styles.item}>
                    <Text style={styles.itemText}>Total in:</Text>
                    <Text style={[styles.itemText, {color: 'green'}]}>{posTotal}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemText}>Total out:</Text>
                    <Text style={[styles.itemText, {color: 'red'}]}>{negTotal}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemText}>Net:</Text>
                    <Text style={[styles.itemText, {color: (posTotal + negTotal) > 0 ? 'green' : 'red'}]}>{posTotal + negTotal}</Text>
                </View>
            </View>

            <View style={styles.container}>
                <Text style={styles.title}>Recent Activity:</Text>
                {
                    transactions.map((t) => (
                        <View style={styles.item} key={t.id}>
                            <Text style={styles.itemText}>{t.category}</Text>
                            <Text style={[styles.itemText, {color: t.amount > 0 ? 'green' : 'red'}]}>{t.amount}</Text>
                        </View>
                    ))
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        paddingBottom: 15,
    },
    title: {
        fontSize: 22,
        // paddingTop: 5,
        paddingBottom: 7,
    },
    item: {
        paddingVertical: 2,
        paddingHorizontal: 20,
        margin: 4,
        // backgroundColor: '#b3b3b3ff',
        // flex: 1,
        width: '75%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 18,
    }
})

export default Activity;