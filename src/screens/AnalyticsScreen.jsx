import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import { PieChart } from "react-native-chart-kit";

import transactions from "../data/transactions.json";
import { computeAnalytics, MONTH_NAMES, money } from "../data/analytics";

const screenWidth = Dimensions.get("window").width;

export default function AnalyticsScreen() {
  const [mode, setMode] = useState("year"); // "year" | "month"
  const [year, setYear] = useState(2025);
  const [monthIndex, setMonthIndex] = useState(11); // 0-11 (11 = DEC)

  // Compute totals + rows based on current mode/year/month
  const analytics = useMemo(
    () => computeAnalytics(transactions, mode, year, monthIndex),
    [mode, year, monthIndex]
  );

  const periodTitle =
    mode === "year" ? `${year}` : `${MONTH_NAMES[monthIndex]} ${year}`;

  // < button
  function prev() {
    if (mode === "year") {
      setYear((y) => y - 1);
      return;
    }

    // month mode
    setMonthIndex((m) => {
      if (m === 0) {
        setYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  }

  // > button
  function next() {
    if (mode === "year") {
      setYear((y) => y + 1);
      return;
    }

    setMonthIndex((m) => {
      if (m === 11) {
        setYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  }

  // Pie chart data (with safe fallback)
  const pieData = useMemo(() => {
    const income = analytics.incomeTotal;
    const expense = analytics.expenseTotal;

    // If no data in selected period, show placeholder slice
    if (income === 0 && expense === 0) {
      return [
        {
          name: "NO DATA",
          population: 1,
          color: "#cccccc",
          legendFontColor: "#111",
          legendFontSize: 12,
        },
      ];
    }

    return [
      {
        name: "EXPENSES",
        population: expense,
        color: "#e74c3c",
        legendFontColor: "#111",
        legendFontSize: 12,
      },
      {
        name: "INCOME",
        population: income,
        color: "#2ecc71",
        legendFontColor: "#111",
        legendFontSize: 12,
      },
    ];
  }, [analytics.expenseTotal, analytics.incomeTotal]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ANALYTICS</Text>

      {/* YEAR / MONTH toggle */}
      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[styles.toggleBtn, mode === "year" && styles.toggleBtnActive]}
          onPress={() => setMode("year")}
        >
          <Text
            style={[
              styles.toggleText,
              mode === "year" && styles.toggleTextActive,
            ]}
          >
            YEAR
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleBtn, mode === "month" && styles.toggleBtnActive]}
          onPress={() => setMode("month")}
        >
          <Text
            style={[
              styles.toggleText,
              mode === "month" && styles.toggleTextActive,
            ]}
          >
            MONTH
          </Text>
        </TouchableOpacity>
      </View>

      {/* Period selector */}
      <View style={styles.periodRow}>
        <TouchableOpacity onPress={prev} style={styles.arrowBtn}>
          <Text style={styles.arrowText}>{"<"}</Text>
        </TouchableOpacity>

        <View style={styles.periodBox}>
          <Text style={styles.periodText}>{periodTitle}</Text>
        </View>

        <TouchableOpacity onPress={next} style={styles.arrowBtn}>
          <Text style={styles.arrowText}>{">"}</Text>
        </TouchableOpacity>
      </View>

      {/* Pie chart */}
      <View style={styles.card}>
        <PieChart
          data={pieData}
          width={screenWidth - 40}
          height={180}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="0"
          hasLegend={true}
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            color: () => "#000",
            labelColor: () => "#000",
          }}
        />

        <View style={styles.percentRow}>
          <Text style={styles.percentText}>
            {analytics.pie.expensePct.toFixed(0)}% EXPENSES
          </Text>
          <Text style={styles.percentText}>
            {analytics.pie.incomePct.toFixed(0)}% INCOME
          </Text>
        </View>
      </View>

      {/* Category totals */}
      <FlatList
        style={styles.list}
        data={analytics.rows}
        keyExtractor={(item) => item.key}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.rowLabel}>{item.label}</Text>
            <Text
              style={[
                styles.rowAmount,
                item.type === "income" ? styles.green : styles.red,
              ]}
            >
              {item.type === "income" ? "+" : "-"}${money(item.amount)}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 12 }}>
            No transactions for this period.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 12,
  },

  toggleRow: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#111",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 12,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  toggleBtnActive: { backgroundColor: "#111" },
  toggleText: { fontWeight: "700", fontSize: 12, color: "#111" },
  toggleTextActive: { color: "#fff" },

  periodRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  arrowBtn: { paddingHorizontal: 12, paddingVertical: 6 },
  arrowText: { fontSize: 18, fontWeight: "700" },
  periodBox: {
    borderWidth: 1,
    borderColor: "#111",
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 4,
    minWidth: 140,
    alignItems: "center",
  },
  periodText: { fontWeight: "700" },

  card: {
    borderWidth: 1,
    borderColor: "#111",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  percentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  percentText: { fontSize: 12, fontWeight: "600" },

  list: { flex: 1, borderWidth: 1, borderColor: "#111", borderRadius: 6 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  rowLabel: { fontWeight: "700" },
  rowAmount: { fontWeight: "700" },
  green: { color: "#2ecc71" },
  red: { color: "#e74c3c" },
  sep: { height: 1, backgroundColor: "#111" },
});