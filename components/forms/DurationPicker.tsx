import React, { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView, NativeScrollEvent, NativeSyntheticEvent, Modal, TouchableWithoutFeedback } from "react-native"
import * as Haptics from 'expo-haptics'
import { useTheme } from '@/hooks/useTheme'

interface DurationPickerProps {
  minutes: string
  onChangeMinutes: (value: string) => void
  disabled?: boolean
}

const ITEM_HEIGHT = 40
const VISIBLE_ITEMS = 5

const formatBadgeDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}min`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  if (remainingMinutes === 0) {
    return `${hours}h`
  }
  return `${hours}h ${remainingMinutes}min`
}

export function DurationPicker({ 
  minutes,
  onChangeMinutes,
  disabled = false,
}: DurationPickerProps) {
  const theme = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isInitialScroll, setIsInitialScroll] = useState(true)
  const scrollViewRef = useRef<ScrollView>(null)

  useEffect(() => {
    if (isExpanded && scrollViewRef.current && isInitialScroll) {
      const minutesValue = parseInt(minutes)
      if (!isNaN(minutesValue) && minutesValue >= 0 && minutesValue <= 90) {
        scrollViewRef.current?.scrollTo({
          y: minutesValue * ITEM_HEIGHT,
          animated: false
        })
        setIsInitialScroll(false)
      }
    }
  }, [isExpanded, minutes, isInitialScroll])

  const togglePicker = () => {
    if (disabled) return
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setIsExpanded(!isExpanded)
    if (!isExpanded) {
      setIsInitialScroll(true)
    }
  }

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y
    const selectedIndex = Math.round(y / ITEM_HEIGHT)
    if (selectedIndex >= 0 && selectedIndex <= 90) {
      const value = selectedIndex.toString().padStart(2, '0')
      if (value !== minutes) {
        onChangeMinutes(value)
      }
    }
  }

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    handleScroll(event)
  }

  const styles = StyleSheet.create({
    container: {
      overflow: "hidden",
    },
    button: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
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
      maxHeight: ITEM_HEIGHT * VISIBLE_ITEMS,
      overflow: 'hidden',
      ...theme.shadows.lg,
    },
    pickerWrapper: {
      position: 'relative',
      height: ITEM_HEIGHT * VISIBLE_ITEMS,
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
      zIndex: 1,
    },
    scrollContent: {
      paddingHorizontal: theme.spacing.md,
    },
    pickerItem: {
      height: ITEM_HEIGHT,
      justifyContent: 'center',
      alignItems: 'center',
    },
    pickerItemText: {
      fontSize: theme.typography.fontSize.base,
      fontFamily: theme.typography.fonts.regular,
      color: theme.colors.text.secondary,
      zIndex: 2,
    },
    pickerItemTextSelected: {
      fontSize: theme.typography.fontSize.lg,
      fontFamily: theme.typography.fonts.medium,
      color: theme.colors.text.primary,
      zIndex: 2,
    },
    pickerItemHighlighted: {
      backgroundColor: 'rgba(200, 200, 255, 0.1)',
      zIndex: 2,
    },
  })

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={togglePicker}
        disabled={disabled}
        style={[
          styles.button,
          disabled && styles.buttonDisabled
        ]}
      >
        <Text style={styles.title}>Duration</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{formatBadgeDuration(parseInt(minutes))}</Text>
        </View>
      </TouchableOpacity>

      <Modal
        visible={isExpanded}
        transparent={true}
        animationType="fade"
        onRequestClose={togglePicker}
      >
        <TouchableWithoutFeedback onPress={togglePicker}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.pickerModal}>
                <View style={styles.pickerWrapper}>
                  <View style={styles.selectionOverlay} pointerEvents="none" />
                  <ScrollView
                    ref={scrollViewRef}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={ITEM_HEIGHT}
                    decelerationRate={0.992}
                    onMomentumScrollEnd={handleMomentumScrollEnd}
                    onScrollEndDrag={handleScroll}
                    scrollEventThrottle={16}
                    contentContainerStyle={styles.scrollContent}
                    snapToAlignment="center"
                    bounces={true}
                    bouncesZoom={false}
                    overScrollMode="auto"
                    nestedScrollEnabled={true}
                    pagingEnabled={false}
                    directionalLockEnabled={true}
                    alwaysBounceVertical={true}
                    scrollToOverflowEnabled={true}
                    onScroll={handleScroll}
                    scrollEnabled={true}
                  >
                    <View style={{ height: ITEM_HEIGHT * 2 }} />
                    {Array.from({ length: 91 }, (_, i) => (
                      <TouchableOpacity
                        key={i}
                        activeOpacity={1}
                        onPress={() => {
                          scrollViewRef.current?.scrollTo({
                            y: i * ITEM_HEIGHT,
                            animated: true
                          });
                          onChangeMinutes(i.toString().padStart(2, '0'));
                          togglePicker();
                        }}
                        style={[
                          styles.pickerItem,
                          minutes === i.toString().padStart(2, '0') && styles.pickerItemHighlighted
                        ]}
                      >
                        <Text style={[
                          styles.pickerItemText,
                          minutes === i.toString().padStart(2, '0') && styles.pickerItemTextSelected
                        ]}>
                          {i} min
                        </Text>
                      </TouchableOpacity>
                    ))}
                    <View style={{ height: ITEM_HEIGHT * 2 }} />
                  </ScrollView>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
} 