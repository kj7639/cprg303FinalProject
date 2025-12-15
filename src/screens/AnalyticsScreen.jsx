import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; 

import transactionsData from "../data/transactions.json";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import AnalyticsChart from "../components/PieChart";

const VIEW_MODES = {
  YEAR: "year",
  MONTH: "month",
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function AnalyticsScreen() {
  const [viewMode, setViewMode] = useState(VIEW_MODES.YEAR);
  const [currentYear, setCurrentYear] = useState(2025);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(10); 

  const Prev = () => {
    if (viewMode === VIEW_MODES.YEAR) {
      setCurrentYear(currentYear => currentYear - 1);
    } else {
      if (currentMonthIndex === 0) {
        setCurrentMonthIndex(11);
        setCurrentYear(currentYear => currentYear - 1);
      } else {
        setCurrentMonthIndex(currentMonthIndex => currentMonthIndex - 1);
      }
    }
  };

  const Next = () => {
    if (viewMode === VIEW_MODES.YEAR) {
      setCurrentYear(currentYear => currentYear + 1);
    } else {
      if (currentMonthIndex === 11) {
        setCurrentMonthIndex(0);
        setCurrentYear(currentYear => currentYear + 1);
      } else {
        setCurrentMonthIndex(currentMonthIndex => currentMonthIndex + 1);
      }
    }
  };

  const periodTitle = useMemo(() => {
    return viewMode === VIEW_MODES.YEAR 
      ? String(currentYear)
      : ${MONTH_NAMES[currentMonthIndex]} ${currentYear};
  }, [currentYear, currentMonthIndex, viewMode]);
  
  const transactions = useMemo(() => transactionsData, []); 

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>ANALYTICS</Text>

        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === VIEW_MODES.YEAR && styles.activeToggle]}
            onPress={() => setViewMode(VIEW_MODES.YEAR)}
          >
            <Text style={viewMode === VIEW_MODES.YEAR ? styles.activeText : styles.inactiveText}>
              YEAR
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleButton, viewMode === VIEW_MODES.MONTH && styles.activeToggle]}
            onPress={() => setViewMode(VIEW_MODES.MONTH)}
          >
            <Text style={viewMode === VIEW_MODES.MONTH ? styles.activeText : styles.inactiveText}>
              MONTH
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.nav}>
          <TouchableOpacity onPress={Prev} style={styles.navButton}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>

          <Text style={styles.period}>{periodTitle}</Text>

          <TouchableOpacity onPress={Next} style={styles.navButton}>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <AnalyticsChart
          transactions={transactions}
          year={currentYear}
          month={viewMode === VIEW_MODES.YEAR ? null : currentMonthIndex}
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
    backgroundColor: "white",
  },
  scrollView: { 
    flex: 1, 
    width: '100%' 
  },
  scrollContent: { 
    paddingBottom: 100,
    alignItems: 'center', 
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
  navButton: {
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
