import {
    Text,
    View
} from 'react-native'


function Activity({transactions}){

    return (
        <View>
            <Text>Recent Activity:</Text>
            {
                transactions.map((t) => (
                    <View key={t.id}>
                        <Text>{t.amount}</Text>

                    </View>
                ))
            }
        </View>
    )
}

export default Activity;