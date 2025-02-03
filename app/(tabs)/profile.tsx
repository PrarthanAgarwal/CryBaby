import React from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Pressable } from "react-native"
import { Image } from 'expo-image'
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { Card } from "@/components/Card"
import { useTheme } from "@/hooks/useTheme"
import { format } from "date-fns"
import { useAuth } from '../../contexts/AuthContext'
import { ThemedText } from '../../components/ThemedText'
import { useThemeColor } from '../../hooks/useThemeColor'

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

const mockUser = {
  fullName: 'John Doe',
  joinDate: '2024-01-01T00:00:00Z',
  avatarUrl: null,
}

export default function ProfileScreen() {
  const router = useRouter()
  const theme = useTheme()
  const { user, signOut } = useAuth()
  const backgroundColor = useThemeColor({}, 'background')
  const textColor = useThemeColor({}, 'text')

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "MMM yyyy")
  }

  const getUserInitials = () => {
    if (!user?.user_metadata?.full_name) return "?"
    return user.user_metadata.full_name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: backgroundColor,
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
      fontFamily: theme.typography.fonts.bold,
    },
    profileInfo: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: theme.spacing.xl,
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: 16,
    },
    avatarFallback: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.colors.primary[100],
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme.spacing.md,
    },
    avatarText: {
      fontSize: theme.typography.fontSize.xl,
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.primary[500],
      fontFamily: theme.typography.fonts.bold,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    email: {
      fontSize: 16,
      opacity: 0.7,
    },
    joinDate: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      fontFamily: theme.typography.fonts.regular,
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
      fontFamily: theme.typography.fonts.bold,
    },
    statLabel: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      fontFamily: theme.typography.fonts.regular,
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
      fontFamily: theme.typography.fonts.bold,
    },
    achievement: {
      marginBottom: theme.spacing.md,
    },
    achievementName: {
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.text.primary,
      fontFamily: theme.typography.fonts.bold,
    },
    achievementDescription: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      fontFamily: theme.typography.fonts.regular,
    },
    achievementDate: {
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.text.tertiary,
      marginTop: theme.spacing.xs,
      fontFamily: theme.typography.fonts.regular,
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
      fontFamily: theme.typography.fonts.semibold,
    },
    profileHeader: {
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 40,
    },
    settingsContainer: {
      flex: 1,
    },
    signOutButton: {
      padding: 16,
      borderRadius: 8,
      borderWidth: 1,
      alignItems: 'center',
      marginTop: 20,
    },
    signOutText: {
      fontSize: 16,
      fontWeight: '600',
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

        <View style={styles.profileHeader}>
          <Image
            source={{ uri: user?.user_metadata?.avatar_url || 'https://via.placeholder.com/150' }}
            style={styles.avatar}
            contentFit="cover"
            transition={1000}
          />
          <ThemedText style={styles.name}>
            {user?.user_metadata?.full_name || 'User'}
          </ThemedText>
          <ThemedText style={styles.email}>
            {user?.email}
          </ThemedText>
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
              <Text style={styles.achievementDate}>
                Unlocked: {formatDate(achievement.unlockedAt)}
              </Text>
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
            <Text style={styles.achievementsText}>View All Achievements</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color={theme.colors.primary[500]} />
        </TouchableOpacity>

        <Pressable
          style={[styles.signOutButton, { borderColor: textColor }]}
          onPress={handleSignOut}
        >
          <ThemedText style={styles.signOutText}>
            Sign Out
          </ThemedText>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}

