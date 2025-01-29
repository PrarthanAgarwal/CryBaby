import React, { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView, NativeScrollEvent, NativeSyntheticEvent, Modal, TouchableWithoutFeedback } from "react-native"
import * as Haptics from 'expo-haptics'

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
                          {i}min
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    overflow: "hidden",
    marginVertical: 8,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  title: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: "#1f2937",
  },
  badge: {
    backgroundColor: "#B17F4A",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "Inter_500Medium",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerModal: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    width: '80%',
    maxHeight: ITEM_HEIGHT * VISIBLE_ITEMS,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    backgroundColor: 'rgba(248, 250, 252, 0.8)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e2e8f0',
    zIndex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  pickerItem: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerItemText: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: "#6b7280",
  },
  pickerItemTextSelected: {
    fontSize: 18,
    fontFamily: "Inter_500Medium",
    color: "#1f2937",
  },
  pickerItemHighlighted: {
    backgroundColor: 'rgba(248, 250, 252, 0.3)',
  },
}) 