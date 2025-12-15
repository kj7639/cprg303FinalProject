import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";

import transactionsData from "../data/transactions.json";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import AnalyticsChart from "../components/PieChart";

function AnalyticsScreen() {
  const [mode, setMode] = useState("year");
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(11);
  const [transactions] = useState(transactionsData);

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const periodTitle =
    mode === "year" ? year : months[month] + " " + year;

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
        <Text style={styles.title}>ANALYTICS</Text>

        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggleButton, mode === "year" && styles.activeToggle]}
            onPress={() => setMode("year")}
          >
            <Text style={mode === "year" ? styles.activeText : styles.inactiveText}>
              YEAR
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleButton, mode === "month" && styles.activeToggle]}
            onPress={() => setMode("month")}
          >
            <Text style={mode === "month" ? styles.activeText : styles.inactiveText}>
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

        <AnalyticsChart
          transactions={transactions}
          year={year}
          month={mode === "year" ? null : month}
        />
      </ScrollView>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
  toggleRow: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 15,
  },
  toggleButton: {
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 35,
    backgroundColor: "white",
  },
  activeToggle: {
    backgroundColor: "black",
  },
  activeText: {
    color: "white",
    fontWeight: "bold",
  },
  inactiveText: {
    color: "black",
    fontWeight: "bold",
  },
  nav: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  arrow: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 15,
  },
  period: {
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 8,
    paddingHorizontal: 25,
    fontWeight: "bold",
    backgroundColor: "white",
  },
});

export default AnalyticsScreen;
