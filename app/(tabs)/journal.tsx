import React, { useState, useMemo } from "react"
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Card } from "@/components/Card"
import { useTheme } from "@/hooks/useTheme"
import Icon from 'react-native-vector-icons/Feather'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// Mock data for sessions
const mockSessions = [
  { date: '2024-01-15', emotion: 'Sad', volume: 'Glass' },
  { date: '2024-01-18', emotion: 'Happy', volume: 'Spoonful' },
  { date: '2024-01-20', emotion: 'Anxious', volume: 'Bucket' },
]

export default function Journal() {
  const theme = useTheme()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedSession, setSelectedSession] = useState<typeof mockSessions[0] | null>(null)

  const calendarDays = useMemo(() => {
    const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
    const lastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0)
    const days = []
    
    // Add empty spaces for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i))
    }
    
    return days
  }, [selectedDate])

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    const dateString = date.toISOString().split('T')[0]
    const session = mockSessions.find(s => s.date === dateString)
    setSelectedSession(session || null)
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.primary,
    },
    title: {
      fontSize: theme.typography.fontSize['2xl'],
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.primary[500],
      textAlign: 'center',
      marginVertical: theme.spacing.md,
    },
    calendarCard: {
      margin: theme.spacing.md,
      padding: theme.spacing.md,
    },
    monthHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.md,
    },
    monthButton: {
      padding: theme.spacing.sm,
    },
    monthText: {
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.semibold,
      color: theme.colors.text.primary,
    },
    weekDays: {
      flexDirection: 'row',
      marginBottom: theme.spacing.sm,
    },
    weekDayText: {
      flex: 1,
      textAlign: 'center',
      color: theme.colors.text.secondary,
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.medium,
    },
    daysGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    dayCell: {
      width: `${100 / 7}%`,
      aspectRatio: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing.xs,
    },
    dayText: {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.text.primary,
    },
    selectedDay: {
      backgroundColor: theme.colors.primary[500],
      borderRadius: theme.borderRadius.md,
    },
    selectedDayText: {
      color: theme.colors.background.primary,
      fontWeight: theme.typography.fontWeight.semibold,
    },
    sessionDot: {
      width: 6,
      height: 6,
      borderRadius: theme.borderRadius.full,
      backgroundColor: theme.colors.primary[500],
      marginTop: theme.spacing['2xs'],
    },
    selectedSessionDot: {
      backgroundColor: theme.colors.background.primary,
    },
    sessionInfo: {
      marginTop: theme.spacing.md,
      paddingTop: theme.spacing.md,
      borderTopWidth: 1,
      borderTopColor: theme.colors.secondary[200],
    },
    sessionDate: {
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.semibold,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.sm,
    },
    sessionDetails: {
      flexDirection: 'row',
      gap: theme.spacing.md,
    },
    sessionDetail: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
    },
    sessionDetailText: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
    },
  })

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Journal</Text>
        
        <Card style={styles.calendarCard}>
          <View style={styles.monthHeader}>
            <Pressable
              onPress={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}
              style={styles.monthButton}
            >
              <Icon name="chevron-left" size={24} color={theme.colors.text.primary} />
            </Pressable>
            
            <Text style={styles.monthText}>
              {MONTHS[selectedDate.getMonth()]} {selectedDate.getFullYear()}
            </Text>
            
            <Pressable
              onPress={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}
              style={styles.monthButton}
            >
              <Icon name="chevron-right" size={24} color={theme.colors.text.primary} />
            </Pressable>
          </View>

          <View style={styles.weekDays}>
            {DAYS.map(day => (
              <Text key={day} style={styles.weekDayText}>{day}</Text>
            ))}
          </View>

          <View style={styles.daysGrid}>
            {calendarDays.map((date, index) => {
              if (!date) return <View key={`empty-${index}`} style={styles.dayCell} />

              const dateString = date.toISOString().split('T')[0]
              const hasSession = mockSessions.some(s => s.date === dateString)
              const isSelected = date.toDateString() === selectedDate.toDateString()

              return (
                <Pressable
                  key={date.toDateString()}
                  style={[
                    styles.dayCell,
                    isSelected && styles.selectedDay
                  ]}
                  onPress={() => handleDateSelect(date)}
                >
                  <Text style={[
                    styles.dayText,
                    isSelected && styles.selectedDayText
                  ]}>
                    {date.getDate()}
                  </Text>
                  {hasSession && (
                    <View style={[
                      styles.sessionDot,
                      isSelected && styles.selectedSessionDot
                    ]} />
                  )}
                </Pressable>
              )
            })}
          </View>

          {selectedSession && (
            <View style={styles.sessionInfo}>
              <Text style={styles.sessionDate}>
                {new Date(selectedSession.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>
              <View style={styles.sessionDetails}>
                <View style={styles.sessionDetail}>
                  <Icon name="heart" size={16} color={theme.colors.text.secondary} />
                  <Text style={styles.sessionDetailText}>{selectedSession.emotion}</Text>
                </View>
                <View style={styles.sessionDetail}>
                  <Icon name="droplet" size={16} color={theme.colors.text.secondary} />
                  <Text style={styles.sessionDetailText}>{selectedSession.volume}</Text>
                </View>
              </View>
            </View>
          )}
        </Card>
      </ScrollView>
    </SafeAreaView>
  )
}

