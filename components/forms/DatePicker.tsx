import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface DatePickerProps {
  selectedDate?: Date;
  onDateChange: (date: Date) => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Simple date utilities
const formatDate = (date: Date): string => {
  const day = date.getDate();
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

const subDays = (date: Date, days: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() - days);
  return newDate;
};

const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.getDate() === date2.getDate() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getFullYear() === date2.getFullYear();
};

export function DatePicker({
  selectedDate: selectedDateProp,
  onDateChange,
  disabled = false,
  children,
}: DatePickerProps) {
  const theme = useTheme();
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(selectedDateProp || new Date());
  const today = new Date();
  const sevenDaysAgo = subDays(today, 7);

  // Update internal state when prop changes
  useEffect(() => {
    if (selectedDateProp) {
      setSelectedDate(selectedDateProp);
    }
  }, [selectedDateProp]);

  // Initialize with current date if no date provided
  useEffect(() => {
    if (!selectedDateProp) {
      const now = new Date();
      setSelectedDate(now);
      onDateChange(now);
    }
  }, []);

  const toggleDatePicker = () => {
    if (disabled) return;
    setDatePickerVisible(!isDatePickerVisible);
  };

  const handleDateChange = (date: Date) => {
    const newDate = new Date(date);
    setSelectedDate(newDate);
    onDateChange(newDate);
  };

  // Generate dates for the week view
  const getDates = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(today, i);
      dates.push({
        date,
        dayName: DAYS_OF_WEEK[date.getDay() === 0 ? 6 : date.getDay() - 1],
        dayNumber: date.getDate().toString(),
        isSelectable: date >= sevenDaysAgo && date <= today,
      });
    }
    return dates;
  };

  const styles = StyleSheet.create({
    container: {
      overflow: 'hidden',
    },
    button: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: theme.spacing.sm,
    },
    buttonDisabled: {
      opacity: 0.5,
    },
    title: {
      fontSize: theme.typography.fontSize.base,
      fontFamily: theme.typography.fonts.medium,
      color: theme.colors.text.primary,
    },
    badgeContainer: {
      flexDirection: 'row',
      gap: theme.spacing.xs,
    },
    badge: {
      backgroundColor: theme.colors.primary[500],
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borderRadius.full,
    },
    badgeText: {
      color: theme.colors.text.inverse,
      fontSize: theme.typography.fontSize.base,
      fontFamily: theme.typography.fonts.medium,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    pickerModal: {
      backgroundColor: theme.colors.background.primary,
      borderRadius: theme.borderRadius.lg,
      width: '80%',
      padding: theme.spacing.lg,
      ...theme.shadows.lg,
    },
    dateSection: {
      marginBottom: theme.spacing.md,
    },
    sectionTitle: {
      fontSize: theme.typography.fontSize.base,
      fontFamily: theme.typography.fonts.medium,
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing.sm,
    },
    dateDisplay: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
      gap: theme.spacing.sm,
    },
    selectedDate: {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.primary[500],
      backgroundColor: theme.colors.primary[50],
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.borderRadius.full,
    },
    calendar: {
      marginTop: theme.spacing.sm,
    },
    daysHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.sm,
    },
    dayHeaderText: {
      color: theme.colors.text.secondary,
      fontSize: theme.typography.fontSize.sm,
      width: 40,
      textAlign: 'center',
      fontFamily: theme.typography.fonts.medium,
    },
    daysRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dayButton: {
      width: 40,
      height: 40,
      borderRadius: theme.borderRadius.full,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dayButtonSelected: {
      backgroundColor: theme.colors.primary[500],
    },
    dayButtonDisabled: {
      opacity: 0.5,
    },
    dayNumber: {
      color: theme.colors.text.primary,
      fontSize: theme.typography.fontSize.base,
      fontFamily: theme.typography.fonts.regular,
    },
    dayTextSelected: {
      color: theme.colors.text.inverse,
      fontFamily: theme.typography.fonts.medium,
    },
    dayTextDisabled: {
      color: theme.colors.text.tertiary,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Text style={styles.title}>Started at</Text>
        <View style={styles.badgeContainer}>
          <TouchableOpacity 
            onPress={toggleDatePicker}
            disabled={disabled}
            style={[
              styles.badge,
              disabled && styles.buttonDisabled
            ]}
          >
            <Text style={styles.badgeText}>{formatDate(selectedDate)}</Text>
          </TouchableOpacity>
          {children}
        </View>
      </View>

      <Modal
        visible={isDatePickerVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleDatePicker}
      >
        <TouchableWithoutFeedback onPress={toggleDatePicker}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.pickerModal}>
                <View style={styles.dateSection}>
                  <Text style={styles.sectionTitle}>Select Date</Text>
                  <View style={styles.dateDisplay}>
                    <Text style={styles.selectedDate}>{formatDate(selectedDate)}</Text>
                  </View>

                  <View style={styles.calendar}>
                    <View style={styles.daysHeader}>
                      {DAYS_OF_WEEK.map((day) => (
                        <Text key={day} style={styles.dayHeaderText}>
                          {day}
                        </Text>
                      ))}
                    </View>

                    <View style={styles.daysRow}>
                      {getDates().map(({ date, dayName, dayNumber, isSelectable }) => (
                        <TouchableOpacity
                          key={dayNumber}
                          onPress={() => {
                            if (isSelectable) {
                              handleDateChange(date);
                              toggleDatePicker();
                            }
                          }}
                          disabled={!isSelectable}
                          style={[
                            styles.dayButton,
                            !isSelectable && styles.dayButtonDisabled,
                            isSameDay(selectedDate, date) && styles.dayButtonSelected,
                          ]}
                        >
                          <Text style={[
                            styles.dayNumber,
                            !isSelectable && styles.dayTextDisabled,
                            isSameDay(selectedDate, date) && styles.dayTextSelected,
                          ]}>
                            {dayNumber}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
} 