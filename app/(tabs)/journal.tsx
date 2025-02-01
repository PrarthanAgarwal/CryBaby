import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/Card';
import { useTheme } from '@/hooks/useTheme';
import Icon from 'react-native-vector-icons/Feather';
import { Calendar, DateData } from 'react-native-calendars';
import { format } from 'date-fns';

// Mock data for cry sessions
interface CrySession {
  id: string;
  date: string;
  time: string;
  duration: string;
  emotion: string;
  volume: 'Glass' | 'Pint' | 'Bucket';
  satisfaction: number;
  notes: string;
  keywords: string[];
}

const mockSessions: Record<string, CrySession> = {
  '2024-03-20': {
    id: '1',
    date: '2024-03-20',
    time: '15:30',
    duration: '00:25',
    emotion: 'Happy tears',
    volume: 'Glass',
    satisfaction: 4,
    notes: 'Watched a heartwarming movie that made me cry tears of joy. It was a beautiful experience.',
    keywords: ['movie', 'joy', 'heartwarming'],
  },
  '2024-03-18': {
    id: '2',
    date: '2024-03-18',
    time: '20:15',
    duration: '00:15',
    emotion: 'Stress relief',
    volume: 'Pint',
    satisfaction: 3,
    notes: 'Had a tough day at work. Crying helped release some tension.',
    keywords: ['work', 'stress', 'relief'],
  },
};

export default function Journal() {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<CrySession | null>(null);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedSession(mockSessions[date] || null);
  };

  const getMarkedDates = () => {
    const marked: any = {};
    Object.keys(mockSessions).forEach((date) => {
      marked[date] = {
        marked: true,
        dotColor: theme.colors.primary[500],
      };
    });
    if (selectedDate) {
      marked[selectedDate] = {
        ...marked[selectedDate],
        selected: true,
        selectedColor: theme.colors.primary[500],
      };
    }
    return marked;
  };

  const getSatisfactionText = (satisfaction: number) => {
    switch (satisfaction) {
      case 1: return 'Not helpful';
      case 2: return 'A little better';
      case 3: return 'Better';
      case 4: return 'Much better';
      case 5: return 'Great relief';
      default: return 'Not rated';
    }
  };

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
    calendarContainer: {
      marginBottom: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
    },
    sessionCard: {
      margin: theme.spacing.md,
      padding: theme.spacing.md,
    },
    noSessionCard: {
      margin: theme.spacing.md,
      padding: theme.spacing.md,
      alignItems: 'center',
    },
    noSessionText: {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.text.secondary,
      textAlign: 'center',
      fontFamily: theme.typography.fonts.regular,
    },
    sessionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.sm,
    },
    sessionDate: {
      flex: 1,
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.semibold,
      color: theme.colors.text.primary,
      fontFamily: theme.typography.fonts.semibold,
    },
    sessionTime: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      fontFamily: theme.typography.fonts.regular,
    },
    detailRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.xs,
    },
    detailLabel: {
      width: 80,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      fontFamily: theme.typography.fonts.medium,
    },
    detailValue: {
      flex: 1,
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.primary,
      fontFamily: theme.typography.fonts.regular,
    },
    notes: {
      marginTop: theme.spacing.sm,
      padding: theme.spacing.md,
      backgroundColor: theme.colors.secondary[50],
      borderRadius: theme.borderRadius.md,
    },
    notesLabel: {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing.sm,
      fontFamily: theme.typography.fonts.medium,
    },
    notesText: {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.text.primary,
      lineHeight: 24,
      fontFamily: theme.typography.fonts.regular,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Journal</Text>
        </View>

        <View style={styles.calendarContainer}>
          <Calendar
            theme={{
              calendarBackground: theme.colors.background.primary,
              textSectionTitleColor: theme.colors.text.primary,
              selectedDayBackgroundColor: theme.colors.primary[500],
              selectedDayTextColor: theme.colors.text.inverse,
              todayTextColor: theme.colors.primary[500],
              dayTextColor: theme.colors.text.primary,
              textDisabledColor: theme.colors.text.tertiary,
              dotColor: theme.colors.primary[500],
              monthTextColor: theme.colors.text.primary,
              textDayFontFamily: theme.typography.fonts.regular,
              textMonthFontFamily: theme.typography.fonts.semibold,
              textDayHeaderFontFamily: theme.typography.fonts.medium,
              textDayFontSize: 14,
              textMonthFontSize: 14,
              textDayHeaderFontSize: 12,
            }}
            markedDates={getMarkedDates()}
            onDayPress={(day: DateData) => handleDateSelect(day.dateString)}
          />
        </View>

        {selectedDate && (
          selectedSession ? (
            <Card style={styles.sessionCard}>
              <View style={styles.sessionHeader}>
                <Text style={styles.sessionDate}>
                  {format(new Date(selectedSession.date), 'MMMM d, yyyy')}
                </Text>
                <Text style={styles.sessionTime}>{selectedSession.time}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Duration</Text>
                <Text style={styles.detailValue}>{selectedSession.duration}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Emotion</Text>
                <Text style={styles.detailValue}>{selectedSession.emotion}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Volume</Text>
                <Text style={styles.detailValue}>{selectedSession.volume}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Satisfaction</Text>
                <Text style={styles.detailValue}>
                  {getSatisfactionText(selectedSession.satisfaction)}
                </Text>
              </View>

              <View style={styles.notes}>
                <Text style={styles.notesLabel}>Notes</Text>
                <Text style={styles.notesText}>{selectedSession.notes}</Text>
              </View>
            </Card>
          ) : (
            <Card style={styles.noSessionCard}>
              <Icon
                name="calendar"
                size={32}
                color={theme.colors.text.secondary}
                style={{ marginBottom: theme.spacing.sm }}
              />
              <Text style={styles.noSessionText}>
                No cry session recorded for this date.
              </Text>
            </Card>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

