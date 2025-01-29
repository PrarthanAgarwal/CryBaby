import React from "react"
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native"
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.primary,
      padding: theme.spacing.md,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.lg,
    },
    title: {
      fontSize: theme.typography.fontSize['2xl'],
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.text.primary,
    },
    profileInfo: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: theme.spacing.xl,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginRight: theme.spacing.md,
    },
    name: {
      fontSize: theme.typography.fontSize.xl,
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.text.primary,
    },
    joinDate: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
    },
    statsCard: {
      marginBottom: theme.spacing.xl,
    },
    statsRow: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    statItem: {
      alignItems: "center",
    },
    statValue: {
      fontSize: theme.typography.fontSize['2xl'],
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.text.primary,
    },
    statLabel: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
    },
    achievementsCard: {
      marginBottom: theme.spacing.xl,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: theme.spacing.md,
    },
    cardTitle: {
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.bold,
      marginLeft: theme.spacing.sm,
      flex: 1,
      color: theme.colors.text.primary,
    },
    achievement: {
      marginBottom: theme.spacing.md,
    },
    achievementName: {
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.text.primary,
    },
    achievementDescription: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
    },
    achievementDate: {
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.text.tertiary,
      marginTop: theme.spacing.xs,
    },
    achievementProgress: {
      height: 8,
      backgroundColor: theme.colors.secondary[100],
      borderRadius: theme.borderRadius.full,
      marginTop: theme.spacing.sm,
      overflow: 'hidden',
    },
    achievementProgressBar: {
      height: "100%",
      borderRadius: theme.borderRadius.full,
    },
    bronze: {
      backgroundColor: theme.colors.accent.orange,
    },
    silver: {
      backgroundColor: theme.colors.secondary[400],
    },
    gold: {
      backgroundColor: theme.colors.accent.purple,
    },
    settingsButton: {
      padding: theme.spacing.sm,
    },
    achievementsButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.secondary[200],
      borderRadius: theme.borderRadius.md,
      marginTop: theme.spacing.md,
    },
    achievementsContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    achievementsText: {
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.semibold,
      color: theme.colors.text.primary,
      marginLeft: theme.spacing.sm,
    },
  })

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity onPress={() => router.push('/settings')} style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color={theme.colors.primary[500]} />
          </TouchableOpacity>
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
            <Ionicons name="trophy-outline" size={24} color={theme.colors.primary[500]} />
            <Text style={styles.cardTitle}>Recent Achievements</Text>
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

        <TouchableOpacity
          style={styles.achievementsButton}
          onPress={() => router.push('/achievements')}
        >
          <View style={styles.achievementsContent}>
            <Ionicons name="trophy-outline" size={24} color={theme.colors.primary[500]} />
            <Text style={styles.achievementsText}>Achievements</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color={theme.colors.primary[500]} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

