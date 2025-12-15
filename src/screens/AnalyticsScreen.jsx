import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useState } from "react";
import { PieChart } from "react-native-chart-kit";

import transactionsData from "../data/transactions.json";
import { computeAnalytics, MONTH_NAMES } from "../data/Analytics";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const screenWidth = Dimensions.get("window").width;

function AnalyticsScreen() {
  const [mode, setMode] = useState("year");
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(11);

  const analytics = computeAnalytics(transactionsData, mode, year, month);

  const periodTitle =
    mode === "year" ? year : MONTH_NAMES[month] + " " + year;

  const pieData =
    analytics.incomeTotal === 0 && analytics.expenseTotal === 0
      ? [
          {
            name: "NO DATA",
            population: 1,
            color: "#cccccc",
          },
        ]
      : [
          {
            name: "EXPENSES",
            population: analytics.expenseTotal,
            color: "#e74c3c",
          },
          {
            name: "INCOME",
            population: analytics.incomeTotal,
            color: "#2ecc71",
          },
        ];

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.content}>
        <Text style={styles.title}>ANALYTICS</Text>

        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggleButton, mode === "year" && styles.toggleActive]}
            onPress={() => setMode("year")}
          >
            <Text style={[styles.toggleText, mode === "year" && styles.toggleTextActive]}>
              YEAR
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleButton, mode === "month" && styles.toggleActive]}
            onPress={() => setMode("month")}
          >
            <Text style={[styles.toggleText, mode === "month" && styles.toggleTextActive]}>
              MONTH
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.nav}>
          <TouchableOpacity
            onPress={() => {
              if (mode === "year") setYear(year - 1);
              else if (month === 0) {
                setMonth(11);
                setYear(year - 1);
              } else setMonth(month - 1);
            }}
          >
            <Text style={styles.arrow}>{"<"}</Text>
          </TouchableOpacity>

          <Text style={styles.period}>{periodTitle}</Text>

          <TouchableOpacity
            onPress={() => {
              if (mode === "year") setYear(year + 1);
              else if (month === 11) {
                setMonth(0);
                setYear(year + 1);
              } else setMonth(month + 1);
            }}
          >
            <Text style={styles.arrow}>{">"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <PieChart
            data={pieData}
            width={screenWidth * 0.8}
            height={180}
            accessor="population"
            backgroundColor="transparent"
            hasLegend={false}
            chartConfig={{
              backgroundColor: "transparent",
              color: () => "#000",
            }}
          />

          <Text style={styles.percent}>
            {analytics.pie.expensePct.toFixed(0)}% EXPENSES |{" "}
            {analytics.pie.incomePct.toFixed(0)}% INCOME
          </Text>
        </View>

        <View style={styles.list}>
          {analytics.rows.map((item) => (
            <View key={item.key} style={styles.row}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={item.type === "income" ? styles.green : styles.red}>
                {item.type === "income" ? "+" : "-"}${item.amount.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f0f0" },
  content: { flex: 1, alignItems: "center" },
  title: { fontSize: 18, fontWeight: "bold", marginVertical: 15 },

  toggleRow: { flexDirection: "row", marginBottom: 10 },
  toggleButton: {
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 8,
    paddingHorizontal: 35,
    backgroundColor: "#fff",
  },
  toggleActive: { backgroundColor: "#000" },
  toggleText: { fontWeight: "bold", color: "#000" },
  toggleTextActive: { color: "#fff" },

  nav: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  arrow: { fontSize: 20, fontWeight: "bold", paddingHorizontal: 15 },
  period: {
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 6,
    paddingHorizontal: 20,
    fontWeight: "bold",
    backgroundColor: "#fff",
  },

  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    padding: 10,
    marginBottom: 15,
  },

  percent: { marginTop: 8, fontWeight: "bold" },

  list: { width: "90%" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#fff",
  },
  label: { fontWeight: "bold" },
  green: { color: "#2ecc71", fontWeight: "bold" },
  red: { color: "#e74c3c", fontWeight: "bold" },
});

export default AnalyticsScreen;
