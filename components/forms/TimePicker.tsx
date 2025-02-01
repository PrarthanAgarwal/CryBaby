import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback, Platform, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import * as Haptics from 'expo-haptics';
import { format } from 'date-fns';

interface TimePickerProps {
  selectedDate: Date;
  onTimeChange: (date: Date) => void;
  disabled?: boolean;
}

const ITEM_HEIGHT = 50; // Increased for better touch area
const VISIBLE_ITEMS = 5;
const SCROLL_PADDING = ITEM_HEIGHT * 2;

export function TimePicker({ selectedDate, onTimeChange, disabled = false }: TimePickerProps) {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const hoursScrollRef = useRef<ScrollView>(null);
  const minutesScrollRef = useRef<ScrollView>(null);
  const ampmScrollRef = useRef<ScrollView>(null);

  // Initialize scroll positions
  useEffect(() => {
    if (isVisible) {
      const hours = selectedDate.getHours() % 12;
      const minutes = selectedDate.getMinutes();
      const isPM = selectedDate.getHours() >= 12;

      requestAnimationFrame(() => {
        hoursScrollRef.current?.scrollTo({
          y: hours * ITEM_HEIGHT + SCROLL_PADDING,
          animated: false
        });
        minutesScrollRef.current?.scrollTo({
          y: minutes * ITEM_HEIGHT + SCROLL_PADDING,
          animated: false
        });
        ampmScrollRef.current?.scrollTo({
          y: (isPM ? 1 : 0) * ITEM_HEIGHT + SCROLL_PADDING,
          animated: false
        });
      });
    }
  }, [isVisible, selectedDate]);

  const handleTimeChange = (hours: number, minutes: number, isPM: boolean) => {
    const newDate = new Date(selectedDate);
    newDate.setHours(isPM ? hours + 12 : hours);
    newDate.setMinutes(minutes);
    onTimeChange(newDate);
  };

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>, type: 'hours' | 'minutes' | 'ampm') => {
    const y = Math.max(0, e.nativeEvent.contentOffset.y - SCROLL_PADDING);
    const value = Math.round(y / ITEM_HEIGHT);
    
    let hours = selectedDate.getHours() % 12;
    let minutes = selectedDate.getMinutes();
    let isPM = selectedDate.getHours() >= 12;

    if (type === 'hours') {
      hours = value === 0 ? 12 : value;
    } else if (type === 'minutes') {
      minutes = Math.min(59, value);
    } else if (type === 'ampm') {
      isPM = value >= 1;
    }

    // Snap to the correct position
    const snapY = value * ITEM_HEIGHT + SCROLL_PADDING;
    if (type === 'hours') hoursScrollRef.current?.scrollTo({ y: snapY, animated: true });
    if (type === 'minutes') minutesScrollRef.current?.scrollTo({ y: snapY, animated: true });
    if (type === 'ampm') ampmScrollRef.current?.scrollTo({ y: snapY, animated: true });

    handleTimeChange(hours, minutes, isPM);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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
    timePickerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: ITEM_HEIGHT * VISIBLE_ITEMS,
      marginTop: theme.spacing.lg,
    },
    column: {
      flex: 1,
      height: ITEM_HEIGHT * VISIBLE_ITEMS,
      position: 'relative',
    },
    columnDivider: {
      width: 1,
      height: ITEM_HEIGHT * VISIBLE_ITEMS,
      backgroundColor: theme.colors.secondary[200],
      opacity: 0.2,
      marginHorizontal: theme.spacing.sm,
    },
    scrollContent: {
      paddingVertical: SCROLL_PADDING,
    },
    item: {
      height: ITEM_HEIGHT,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: theme.typography.fontSize.xl,
      fontFamily: theme.typography.fonts.regular,
      color: theme.colors.text.secondary,
    },
    textSelected: {
      fontSize: theme.typography.fontSize['2xl'],
      fontFamily: theme.typography.fonts.medium,
      color: theme.colors.text.primary,
    },
    selectionOverlay: {
      position: 'absolute',
      top: (VISIBLE_ITEMS * ITEM_HEIGHT - ITEM_HEIGHT) / 2,
      left: 0,
      right: 0,
      height: ITEM_HEIGHT,
      backgroundColor: theme.colors.primary[50],
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.colors.primary[200],
    },
    ampmColumn: {
      flex: 0.7,
    },
    sectionTitle: {
      fontSize: theme.typography.fontSize.base,
      fontFamily: theme.typography.fonts.medium,
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing.lg,
    },
  });

  const renderScrollColumn = (
    type: 'hours' | 'minutes' | 'ampm',
    data: Array<{ label: string; selected: boolean }>,
    ref: React.RefObject<ScrollView>
  ) => (
    <View style={[styles.column, type === 'ampm' && styles.ampmColumn]}>
      <View style={styles.selectionOverlay} pointerEvents="none" />
      <ScrollView
        ref={ref}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        scrollEventThrottle={16}
        onMomentumScrollEnd={(e) => handleScrollEnd(e, type)}
        onScrollEndDrag={(e) => handleScrollEnd(e, type)}
        contentContainerStyle={styles.scrollContent}
      >
        {data.map(({ label, selected }, index) => (
          <View key={index} style={styles.item}>
            <Text style={[styles.text, selected && styles.textSelected]}>
              {label}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const hours = Array.from({ length: 12 }, (_, i) => ({
    label: ((i + 1)).toString().padStart(2, '0'),
    selected: (selectedDate.getHours() % 12 || 12) === i + 1
  }));

  const minutes = Array.from({ length: 60 }, (_, i) => ({
    label: i.toString().padStart(2, '0'),
    selected: selectedDate.getMinutes() === i
  }));

  const ampm = ['AM', 'PM'].map(period => ({
    label: period,
    selected: (selectedDate.getHours() >= 12 ? 'PM' : 'AM') === period
  }));

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={() => setIsVisible(true)}
        disabled={disabled}
        style={[
          styles.badge,
          disabled && styles.buttonDisabled
        ]}
      >
        <Text style={styles.badgeText}>
          {format(selectedDate, 'h:mm a')}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.pickerModal}>
                <Text style={styles.sectionTitle}>Select Time</Text>
                <View style={styles.timePickerContainer}>
                  {renderScrollColumn('hours', hours, hoursScrollRef)}
                  <View style={styles.columnDivider} />
                  {renderScrollColumn('minutes', minutes, minutesScrollRef)}
                  <View style={styles.columnDivider} />
                  {renderScrollColumn('ampm', ampm, ampmScrollRef)}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
} 