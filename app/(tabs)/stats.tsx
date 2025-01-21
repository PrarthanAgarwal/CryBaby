import React from "react"
import { View, Text, StyleSheet, ScrollView, ViewStyle, TextStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Card } from "@/components/Card"
import { useTheme } from "@/hooks/useTheme"

export default function Stats() {
  const theme = useTheme()

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Your Cry Stats</Text>

        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>48</Text>
            <Text style={styles.statLabel}>Total Sessions</Text>
          </Card>
          
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>7</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </Card>

          <Card style={styles.statCard}>
            <Text style={styles.statValue}>2.5h</Text>
            <Text style={styles.statLabel}>Avg Duration</Text>
          </Card>

          <Card style={styles.statCard}>
            <Text style={styles.statValue}>85%</Text>
            <Text style={styles.statLabel}>Satisfaction</Text>
          </Card>

          <Card style={styles.statCard}>
            <Text style={styles.statValue}>Sad</Text>
            <Text style={styles.statLabel}>Most Common Emotion</Text>
          </Card>

          <Card style={styles.statCard}>
            <Text style={styles.statValue}>Glass</Text>
            <Text style={styles.statLabel}>Typical Volume</Text>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfbf1",
  } as ViewStyle,
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16,
    textAlign: "center",
    color: "#3b82f6",
  } as TextStyle,
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 16,
    gap: 16,
  } as ViewStyle,
  statCard: {
    width: "48%",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 100,
  } as ViewStyle,
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3b82f6",
    marginBottom: 4,
  } as TextStyle,
  statLabel: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  } as TextStyle,
})

