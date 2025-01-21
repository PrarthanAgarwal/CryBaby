import React, { useState } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Card } from "@/components/Card"
import { Button } from "@/components/ui/Button"
import { GridSelector, type GridOption } from "@/components/forms/GridSelector"
import { DurationPicker } from "@/components/forms/DurationPicker"
import { useTheme } from "@/hooks/useTheme"

type Emotion = "happy" | "sad" | "angry" | "anxious" | "relieved" | "overwhelmed"
type Volume = "spoonful" | "glass" | "bucket"

const emotionOptions: GridOption[] = [
  { emoji: "😊", text: "Happy", value: "happy" },
  { emoji: "😢", text: "Sad", value: "sad" },
  { emoji: "😠", text: "Angry", value: "angry" },
  { emoji: "😰", text: "Anxious", value: "anxious" },
  { emoji: "😌", text: "Relieved", value: "relieved" },
  { emoji: "😩", text: "Overwhelmed", value: "overwhelmed" },
]

const volumeOptions: GridOption[] = [
  { emoji: "🥄", text: "Spoonful", value: "spoonful" },
  { emoji: "🥛", text: "Glass", value: "glass" },
  { emoji: "🪣", text: "Bucket", value: "bucket" },
]

export default function Home() {
  const theme = useTheme()
  const [newSession, setNewSession] = useState({
    emotion: null as string | null,
    volume: null as string | null,
    hours: "0",
    minutes: "00",
    notes: "",
  })

  const handleSave = () => {
    // TODO: Implement save logic
    console.log('Saving session:', newSession)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Log Your Cry</Text>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>How are you feeling?</Text>
          <GridSelector
            options={emotionOptions}
            selected={newSession.emotion}
            onSelect={(value) => setNewSession({ ...newSession, emotion: value })}
            columns={2}
          />

          <Text style={styles.sectionTitle}>Volume of tears</Text>
          <GridSelector
            options={volumeOptions}
            selected={newSession.volume}
            onSelect={(value) => setNewSession({ ...newSession, volume: value })}
            columns={3}
          />

          <Text style={styles.sectionTitle}>Duration</Text>
          <DurationPicker
            hours={newSession.hours}
            minutes={newSession.minutes}
            onChangeHours={(value) => setNewSession({ ...newSession, hours: value })}
            onChangeMinutes={(value) => setNewSession({ ...newSession, minutes: value })}
            maxDuration={{ hours: 23, minutes: 59 }}
          />

          <Button 
            onPress={handleSave}
            style={styles.saveButton}
            disabled={!newSession.emotion || !newSession.volume}
            accessibilityLabel="Save cry session"
          >
            Save Session
          </Button>
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
    marginVertical: 16,
    textAlign: "center",
    color: "#3b82f6",
  },
  card: {
    margin: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    marginTop: 20,
    color: "#1f2937",
  },
  saveButton: {
    marginTop: 24,
  },
})

