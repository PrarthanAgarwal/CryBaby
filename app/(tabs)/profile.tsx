import React from "react"
import { View, Text, StyleSheet, ScrollView, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/Card"
import { useTheme } from "@/hooks/useTheme"

type Achievement = {
  name: string
  description: string
  tier: 'bronze' | 'silver' | 'gold'
  unlockedAt: string
}

const recentAchievements: Achievement[] = [
  { name: "First Tear", description: "Log your first cry", tier: "bronze", unlockedAt: "2023-06-15T14:30:00Z" },
  {
    name: "Consistent Crier",
    description: "Log cries for 7 days in a row",
    tier: "silver",
    unlockedAt: "2023-07-01T09:15:00Z",
  },
  {
    name: "Emotion Master",
    description: "Experience all types of emotions",
    tier: "gold",
    unlockedAt: "2023-07-10T18:45:00Z",
  },
]

export default function Profile() {
  const router = useRouter()
  const theme = useTheme()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <Button 
            variant="ghost"
            onPress={() => router.push("settings" as any)} 
            accessibilityLabel="Open settings"
          >
            <Ionicons name="settings-outline" size={24} color={theme.colors.primary.DEFAULT} />
          </Button>
        </View>

        <View style={styles.profileInfo}>
          <Image source={{ uri: "https://via.placeholder.com/150" }} style={styles.avatar} />
          <View>
            <Text style={styles.name}>Jane Doe</Text>
            <Text style={styles.joinDate}>Joined June 2023</Text>
          </View>
        </View>

        <Card style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>42</Text>
              <Text style={styles.statLabel}>Total Sessions</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>7</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.achievementsCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="trophy-outline" size={24} color={theme.colors.primary.DEFAULT} />
            <Text style={styles.cardTitle}>Recent Achievements</Text>
            <Button 
              variant="ghost"
              onPress={() => router.push("achievements" as any)}
              accessibilityLabel="View all achievements"
            >
              <Ionicons name="chevron-forward-outline" size={24} color={theme.colors.primary.DEFAULT} />
            </Button>
          </View>
          {recentAchievements.map((achievement, index) => (
            <View key={index} style={styles.achievement}>
              <Text style={styles.achievementName}>{achievement.name}</Text>
              <Text style={styles.achievementDescription}>{achievement.description}</Text>
              <Text style={styles.achievementDate}>Unlocked: {formatDate(achievement.unlockedAt)}</Text>
              <View style={styles.achievementProgress}>
                <View
                  style={[
                    styles.achievementProgressBar,
                    styles[achievement.tier],
                    { width: achievement.tier === "gold" ? "100%" : achievement.tier === "silver" ? "66%" : "33%" },
                  ]}
                />
              </View>
            </View>
          ))}
        </Card>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfbf1",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3b82f6",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  joinDate: {
    fontSize: 14,
    color: "#6b7280",
  },
  statsCard: {
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
    color: "#6b7280",
  },
  achievementsCard: {
    marginBottom: 24,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
    flex: 1,
  },
  achievement: {
    marginBottom: 16,
  },
  achievementName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  achievementDescription: {
    fontSize: 14,
    color: "#6b7280",
  },
  achievementDate: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 4,
  },
  achievementProgress: {
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
    marginTop: 8,
    overflow: 'hidden',
  },
  achievementProgressBar: {
    height: "100%",
    borderRadius: 4,
  },
  bronze: {
    backgroundColor: "#d97706",
  },
  silver: {
    backgroundColor: "#9ca3af",
  },
  gold: {
    backgroundColor: "#fbbf24",
  },
})

