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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfbf1",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3b82f6",
    textAlign: "center",
    marginVertical: 16,
  },
  calendarCard: {
    margin: 16,
    padding: 16,
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  monthButton: {
    padding: 8,
  },
  monthText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  weekDays: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDayText: {
    flex: 1,
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '500',
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
    padding: 4,
  },
  dayText: {
    fontSize: 16,
    color: '#1f2937',
  },
  selectedDay: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
  },
  selectedDayText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  sessionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3b82f6',
    marginTop: 2,
  },
  selectedSessionDot: {
    backgroundColor: '#ffffff',
  },
  sessionInfo: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  sessionDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  sessionDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  sessionDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sessionDetailText: {
    fontSize: 14,
    color: '#6b7280',
  },
})

