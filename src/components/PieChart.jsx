import React from 'react'
import { View, Dimensions } from 'react-native'
import { PieChart } from 'react-native-chart-kit'

const screenWidth = Dimensions.get('window').width

function AnalyticsChart({ transactions, year, month }) {
  let income = 0
  let expense = 0

  transactions.forEach(transaction => 
    {
      const date = new Date(transaction.date);
      if (date.getFullYear() === year && date.getMonth() === month) 
      {
        const amount = transaction.amount
        if (amount >= 0)
        {
          income += amount
        } 
        else 
        {
          expense += Math.abs(amount)
        }
      }
    }
  )

  let data = []
  if (income === 0 && expense === 0) 
  {
    data.push(
      {
        name: 'NO DATA',
        population: 1,
        color: 'gray'
      }
    )
  } 
  else 
  {
    data.push(
      {
        name: 'Expenses',
        population: expense,
        color: 'red'
      },
      {
        name: 'Income',
        population: income,
        color: 'green'
      }
    )
  }

  const chartConfig = {
    color: () => 'black'
  }

  return (
    <View>
      <PieChart
        data={data}
        width={screenWidth}
        height={200}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
      />
    </View>
  )
}


export default AnalyticsChart;