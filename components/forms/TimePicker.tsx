import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import * as Haptics from 'expo-haptics';

interface TimePickerProps {
  selectedDate: Date;
  onTimeChange: (date: Date) => void;
  disabled?: boolean;
}

const ITEM_HEIGHT = 40;
const VISIBLE_ITEMS = 5;

const formatTime = (date: Date): string => {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // Convert 0 to 12
  return `${hours}:${minutes} ${ampm}`;
};

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

      hoursScrollRef.current?.scrollTo({
        y: hours * ITEM_HEIGHT,
        animated: false
      });
      minutesScrollRef.current?.scrollTo({
        y: minutes * ITEM_HEIGHT,
        animated: false
      });
      ampmScrollRef.current?.scrollTo({
        y: (isPM ? 1 : 0) * ITEM_HEIGHT,
        animated: false
      });
    }
  }, [selectedDate, isVisible]);

  const handleTimeChange = (hours: number, minutes: number, isPM: boolean) => {
    const newDate = new Date(selectedDate);
    newDate.setHours(isPM ? hours + 12 : hours);
    newDate.setMinutes(minutes);
    onTimeChange(newDate);
  };

  const handleScroll = (e: any, type: 'hours' | 'minutes' | 'ampm') => {
    const y = e.nativeEvent.contentOffset.y;
    let hours = selectedDate.getHours() % 12;
    let minutes = selectedDate.getMinutes();
    let isPM = selectedDate.getHours() >= 12;

    if (type === 'hours') {
      hours = Math.round(y / ITEM_HEIGHT);
    } else if (type === 'minutes') {
      minutes = Math.round(y / ITEM_HEIGHT);
    } else if (type === 'ampm') {
      isPM = Math.round(y / ITEM_HEIGHT) === 1;
    }

    handleTimeChange(hours, minutes, isPM);
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
    item: {
      height: ITEM_HEIGHT,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: theme.typography.fontSize.base,
      fontFamily: theme.typography.fonts.regular,
      color: theme.colors.text.secondary,
    },
    textSelected: {
      fontSize: theme.typography.fontSize.lg,
      fontFamily: theme.typography.fonts.medium,
      color: theme.colors.text.primary,
    },
    selectionOverlay: {
      position: 'absolute',
      top: ITEM_HEIGHT * 2,
      left: 0,
      right: 0,
      height: ITEM_HEIGHT,
      backgroundColor: 'rgba(200, 200, 255, 0.15)',
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
        <Text style={styles.badgeText}>{formatTime(selectedDate)}</Text>
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
                  {/* Hours */}
                  <View style={styles.column}>
                    <View style={styles.selectionOverlay} pointerEvents="none" />
                    <ScrollView
                      ref={hoursScrollRef}
                      showsVerticalScrollIndicator={false}
                      snapToInterval={ITEM_HEIGHT}
                      decelerationRate="fast"
                      onMomentumScrollEnd={(e) => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        handleScroll(e, 'hours');
                      }}
                      onScrollEndDrag={(e) => handleScroll(e, 'hours')}
                      scrollEventThrottle={16}
                    >
                      {Array.from({ length: 12 }, (_, i) => (
                        <View key={i} style={styles.item}>
                          <Text style={[
                            styles.text,
                            (selectedDate.getHours() % 12 || 12) === i + 1 && styles.textSelected
                          ]}>
                            {(i + 1).toString().padStart(2, '0')}
                          </Text>
                        </View>
                      ))}
                    </ScrollView>
                  </View>

                  <View style={styles.columnDivider} />

                  {/* Minutes */}
                  <View style={styles.column}>
                    <View style={styles.selectionOverlay} pointerEvents="none" />
                    <ScrollView
                      ref={minutesScrollRef}
                      showsVerticalScrollIndicator={false}
                      snapToInterval={ITEM_HEIGHT}
                      decelerationRate="fast"
                      onMomentumScrollEnd={(e) => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        handleScroll(e, 'minutes');
                      }}
                      onScrollEndDrag={(e) => handleScroll(e, 'minutes')}
                      scrollEventThrottle={16}
                    >
                      {Array.from({ length: 60 }, (_, i) => (
                        <View key={i} style={styles.item}>
                          <Text style={[
                            styles.text,
                            selectedDate.getMinutes() === i && styles.textSelected
                          ]}>
                            {i.toString().padStart(2, '0')}
                          </Text>
                        </View>
                      ))}
                    </ScrollView>
                  </View>

                  <View style={styles.columnDivider} />

                  {/* AM/PM */}
                  <View style={[styles.column, styles.ampmColumn]}>
                    <View style={styles.selectionOverlay} pointerEvents="none" />
                    <ScrollView
                      ref={ampmScrollRef}
                      showsVerticalScrollIndicator={false}
                      snapToInterval={ITEM_HEIGHT}
                      decelerationRate="fast"
                      onMomentumScrollEnd={(e) => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        handleScroll(e, 'ampm');
                      }}
                      onScrollEndDrag={(e) => handleScroll(e, 'ampm')}
                      scrollEventThrottle={16}
                    >
                      {['AM', 'PM'].map((period, i) => (
                        <View key={period} style={styles.item}>
                          <Text style={[
                            styles.text,
                            (selectedDate.getHours() >= 12 ? 'PM' : 'AM') === period && styles.textSelected
                          ]}>
                            {period}
                          </Text>
                        </View>
                      ))}
                    </ScrollView>
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