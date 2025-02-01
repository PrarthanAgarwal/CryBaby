import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/Card';
import { useTheme } from '@/hooks/useTheme';

interface ChartData {
  x: string;
  y: number;
}

type TimeRange = 'week' | 'month' | 'all';

// Mock data for the charts
const timeOfDayData = [
  { x: 'Morning', y: 35 },
  { x: 'Afternoon', y: 25 },
  { x: 'Evening', y: 25 },
  { x: 'Night', y: 15 },
];

const emotionsData = [
  { x: 'Happy', y: 40 },
  { x: 'Sad', y: 30 },
  { x: 'Anxious', y: 20 },
  { x: 'Other', y: 10 },
];

const volumesData = [
  { x: 'Glass', y: 45 },
  { x: 'Pint', y: 35 },
  { x: 'Bucket', y: 20 },
];

const commonKeywords = ['movie', 'work', 'family', 'love', 'stress'];

export default function Stats() {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  
  const chartColors = [
    theme.colors.primary[400],
    theme.colors.accent.teal,
    theme.colors.accent.orange,
    theme.colors.accent.purple,
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.primary,
    },
    header: {
      padding: theme.spacing.md,
    },
    title: {
      fontSize: theme.typography.fontSize['2xl'],
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.primary[500],
      marginBottom: theme.spacing.sm,
      fontFamily: theme.typography.fonts.bold,
    },
    timeRangeContainer: {
      flexDirection: 'row',
      marginBottom: theme.spacing.md,
      padding: theme.spacing.sm,
      backgroundColor: theme.colors.secondary[100],
      borderRadius: theme.borderRadius.full,
    },
    timeRangeButton: {
      flex: 1,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.borderRadius.full,
    },
    timeRangeButtonActive: {
      backgroundColor: theme.colors.background.primary,
    },
    timeRangeText: {
      color: theme.colors.text.secondary,
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.medium,
      fontFamily: theme.typography.fonts.medium,
      textAlign: 'center',
    },
    timeRangeTextActive: {
      color: theme.colors.primary[500],
    },
    content: {
      padding: theme.spacing.md,
    },
    row: {
      flexDirection: 'row',
      gap: theme.spacing.md,
      marginBottom: theme.spacing.md,
    },
    card: {
      flex: 1,
      padding: theme.spacing.md,
    },
    metricLabel: {
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.semibold,
      color: theme.colors.text.primary,
      textAlign: 'center',
      marginBottom: theme.spacing.xs,
      fontFamily: theme.typography.fonts.semibold,
    },
    metricValue: {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.text.secondary,
      textAlign: 'center',
      fontFamily: theme.typography.fonts.regular,
    },
    chartCard: {
      marginBottom: theme.spacing.md,
      padding: theme.spacing.md,
    },
    chartTitle: {
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.semibold,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.lg,
      fontFamily: theme.typography.fonts.semibold,
    },
    barChartContainer: {
      width: '100%',
      gap: theme.spacing.md,
    },
    barItem: {
      width: '100%',
    },
    barLabelContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.xs,
    },
    barLabel: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.primary,
      fontFamily: theme.typography.fonts.regular,
    },
    barValue: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      fontFamily: theme.typography.fonts.regular,
    },
    barBackground: {
      height: 8,
      backgroundColor: theme.colors.secondary[100],
      borderRadius: theme.borderRadius.full,
      overflow: 'hidden',
    },
    barFill: {
      height: '100%',
      borderRadius: theme.borderRadius.full,
    },
    keywordsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.sm,
    },
    keyword: {
      backgroundColor: theme.colors.primary[100],
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borderRadius.full,
    },
    keywordText: {
      color: theme.colors.primary[700],
      fontSize: theme.typography.fontSize.sm,
      fontFamily: theme.typography.fonts.medium,
    },
  });

  function BarChart({ data, colors }: { data: ChartData[]; colors: string[] }) {
    return (
      <View style={styles.barChartContainer}>
        {data.map((item, index) => (
          <View key={item.x} style={styles.barItem}>
            <View style={styles.barLabelContainer}>
              <Text style={styles.barLabel}>{item.x}</Text>
              <Text style={styles.barValue}>{item.y}%</Text>
            </View>
            <View style={styles.barBackground}>
              <View
                style={[
                  styles.barFill,
                  {
                    width: `${item.y}%`,
                    backgroundColor: colors[index % colors.length],
                  },
                ]}
              />
            </View>
          </View>
        ))}
      </View>
    );
  }

  const renderChart = (data: ChartData[], title: string) => (
    <Card style={styles.chartCard}>
      <Text style={styles.chartTitle}>{title}</Text>
      <BarChart data={data} colors={chartColors} />
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Cry Stats</Text>
          <View style={styles.timeRangeContainer}>
            <Pressable
              style={[
                styles.timeRangeButton,
                timeRange === 'week' && styles.timeRangeButtonActive,
              ]}
              onPress={() => setTimeRange('week')}
            >
              <Text
                style={[
                  styles.timeRangeText,
                  timeRange === 'week' && styles.timeRangeTextActive,
                ]}
              >
                This Week
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.timeRangeButton,
                timeRange === 'month' && styles.timeRangeButtonActive,
              ]}
              onPress={() => setTimeRange('month')}
            >
              <Text
                style={[
                  styles.timeRangeText,
                  timeRange === 'month' && styles.timeRangeTextActive,
                ]}
              >
                This Month
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.timeRangeButton,
                timeRange === 'all' && styles.timeRangeButtonActive,
              ]}
              onPress={() => setTimeRange('all')}
            >
              <Text
                style={[
                  styles.timeRangeText,
                  timeRange === 'all' && styles.timeRangeTextActive,
                ]}
              >
                All Time
              </Text>
            </Pressable>
          </View>
        </View>
        
        <View style={styles.content}>
          <View style={styles.row}>
            <Card style={styles.card}>
              <Text style={styles.metricLabel}>Cry Count</Text>
              <Text style={styles.metricValue}>42</Text>
            </Card>
            <Card style={styles.card}>
              <Text style={styles.metricLabel}>Avg Duration</Text>
              <Text style={styles.metricValue}>00:25</Text>
            </Card>
          </View>

          <View style={styles.row}>
            <Card style={styles.card}>
              <Text style={styles.metricLabel}>Avg Volume</Text>
              <Text style={styles.metricValue}>Glass 🥛</Text>
            </Card>
            <Card style={styles.card}>
              <Text style={styles.metricLabel}>Avg Satisfaction</Text>
              <Text style={styles.metricValue}>Pretty good 😊</Text>
            </Card>
          </View>

          {renderChart(timeOfDayData, 'Time of Day')}
          {renderChart(emotionsData, 'Emotions')}
          {renderChart(volumesData, 'Volumes')}

          <Card style={styles.chartCard}>
            <Text style={styles.chartTitle}>Common Keywords</Text>
            <View style={styles.keywordsContainer}>
              {commonKeywords.map((keyword, index) => (
                <View key={index} style={styles.keyword}>
                  <Text style={styles.keywordText}>{keyword}</Text>
                </View>
              ))}
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

