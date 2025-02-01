import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card } from '@/components/Card'
import { useTheme } from '@/hooks/useTheme'
import Icon from 'react-native-vector-icons/Feather'

type Achievement = {
  id: string
  name: string
  description: string
  tier: 'bronze' | 'silver' | 'gold'
  unlockedAt: string | null
  progress?: {
    current: number
    total: number
  }
}

const achievements: Achievement[] = [
  // Ordered by tier and then by complexity
  { id: 'g1', name: 'Cry Millennium', description: 'Log 1000 crying sessions', tier: 'gold', unlockedAt: null, progress: { current: 42, total: 1000 } },
  { id: 'g2', name: 'Emotion Sage', description: 'Use every type of emotion', tier: 'gold', unlockedAt: null, progress: { current: 4, total: 6 } },
  { id: 'g3', name: 'Tear Tsunami', description: 'Experience every volume level', tier: 'gold', unlockedAt: null, progress: { current: 3, total: 6 } },
  { id: 's1', name: 'Cry Centurion', description: 'Log 100 crying sessions', tier: 'silver', unlockedAt: null, progress: { current: 42, total: 100 } },
  { id: 's2', name: 'One Week Wonder', description: 'Maintain a 7-day cry streak', tier: 'silver', unlockedAt: null, progress: { current: 3, total: 7 } },
  { id: 's3', name: 'Midnight Sobber', description: 'Log a cry between 12 AM and 4 AM', tier: 'silver', unlockedAt: null },
  { id: 'b1', name: 'First Tear', description: 'Log your first cry', tier: 'bronze', unlockedAt: '2023-06-15T14:30:00Z' },
  { id: 'b2', name: 'Triple Threat', description: 'Maintain a 3-day cry streak', tier: 'bronze', unlockedAt: null, progress: { current: 1, total: 3 } },
  { id: 'b3', name: 'Dirty Dozen', description: 'Log 12 total cries', tier: 'bronze', unlockedAt: null, progress: { current: 1, total: 12 } },
]

export default function Achievements() {
  const theme = useTheme()
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all')

  const tierCounts = {
    gold: {
      unlocked: achievements.filter(a => a.tier === 'gold' && a.unlockedAt).length,
      total: achievements.filter(a => a.tier === 'gold').length
    },
    silver: {
      unlocked: achievements.filter(a => a.tier === 'silver' && a.unlockedAt).length,
      total: achievements.filter(a => a.tier === 'silver').length
    },
    bronze: {
      unlocked: achievements.filter(a => a.tier === 'bronze' && a.unlockedAt).length,
      total: achievements.filter(a => a.tier === 'bronze').length
    }
  }

  const totalProgress = {
    unlocked: achievements.filter(a => a.unlockedAt).length,
    total: achievements.length
  }

  const filteredAchievements = achievements.filter(achievement => {
    if (filter === 'all') return true
    if (filter === 'unlocked') return achievement.unlockedAt !== null
    if (filter === 'locked') return achievement.unlockedAt === null
    return true
  })

  const ProgressBar = ({ progress }: { progress: number }) => (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, { width: `${progress}%` }]} />
    </View>
  )

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.primary,
    },
    scrollView: {
      flex: 1,
    },
    header: {
      padding: theme.spacing.md,
    },
    title: {
      fontSize: theme.typography.fontSize['2xl'],
      fontWeight: theme.typography.fontWeight.bold,
      color: theme.colors.primary[500],
      marginBottom: theme.spacing.sm,
      fontFamily: theme.typography.fonts.bold,
    },
    subtitle: {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing.lg,
      fontFamily: theme.typography.fonts.regular,
    },
    filterContainer: {
      flexDirection: 'row',
      marginBottom: theme.spacing.md,
      padding: theme.spacing.sm,
      backgroundColor: theme.colors.secondary[100],
      borderRadius: theme.borderRadius.full,
    },
    filterButton: {
      flex: 1,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.borderRadius.full,
    },
    filterButtonActive: {
      backgroundColor: theme.colors.background.primary,
    },
    filterText: {
      color: theme.colors.text.secondary,
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.medium,
      fontFamily: theme.typography.fonts.medium,
    },
    filterTextActive: {
      color: theme.colors.primary[500],
    },
    achievementsList: {
      padding: theme.spacing.md,
    },
    achievementCard: {
      marginBottom: theme.spacing.sm,
      padding: theme.spacing.md,
    },
    achievementHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    achievementIcon: {
      width: 40,
      height: 40,
      borderRadius: theme.borderRadius.full,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: theme.spacing.sm,
    },
    achievementInfo: {
      flex: 1,
    },
    achievementName: {
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.semibold,
      marginBottom: theme.spacing.xs,
      fontFamily: theme.typography.fonts.semibold,
    },
    achievementDescription: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing.sm,
      fontFamily: theme.typography.fonts.regular,
    },
    achievementProgress: {
      marginTop: theme.spacing.sm,
    },
    progressCount: {
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.text.secondary,
      textAlign: 'right',
      marginTop: theme.spacing.xs,
      fontFamily: theme.typography.fonts.regular,
    },
    unlockedDate: {
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.text.secondary,
      fontFamily: theme.typography.fonts.regular,
    },
    progressBarContainer: {
      height: 8,
      backgroundColor: theme.colors.secondary[200],
      borderRadius: theme.borderRadius.full,
      overflow: 'hidden',
    },
    progressBar: {
      height: '100%',
      backgroundColor: theme.colors.primary[500],
      borderRadius: theme.borderRadius.full,
    },
    overallCard: {
      margin: theme.spacing.md,
      padding: theme.spacing.md,
    },
    cardTitle: {
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.semibold,
      marginBottom: theme.spacing.md,
      color: theme.colors.text.primary,
      fontFamily: theme.typography.fonts.semibold,
    },
    trophyGrid: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: theme.spacing.md,
    },
    trophyItem: {
      alignItems: 'center',
    },
    trophyCount: {
      marginTop: theme.spacing.sm,
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.medium,
      color: theme.colors.text.primary,
      fontFamily: theme.typography.fonts.medium,
    },
    progressText: {
      textAlign: 'center',
      color: theme.colors.text.secondary,
      fontSize: theme.typography.fontSize.sm,
      marginTop: theme.spacing.sm,
      fontFamily: theme.typography.fonts.regular,
    },
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Achievements</Text>
        <Text style={styles.subtitle}>Track your emotional journey milestones</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.overallCard}>
          <Text style={styles.cardTitle}>Overall Progress</Text>
          <View style={styles.trophyGrid}>
            <View style={styles.trophyItem}>
              <Icon name="award" size={32} color="#FFD700" />
              <Text style={styles.trophyCount}>{tierCounts.gold.unlocked}/{tierCounts.gold.total}</Text>
            </View>
            <View style={styles.trophyItem}>
              <Icon name="award" size={32} color="#C0C0C0" />
              <Text style={styles.trophyCount}>{tierCounts.silver.unlocked}/{tierCounts.silver.total}</Text>
            </View>
            <View style={styles.trophyItem}>
              <Icon name="award" size={32} color="#CD7F32" />
              <Text style={styles.trophyCount}>{tierCounts.bronze.unlocked}/{tierCounts.bronze.total}</Text>
            </View>
          </View>
          <ProgressBar progress={(totalProgress.unlocked / totalProgress.total) * 100} />
          <Text style={styles.progressText}>
            {totalProgress.unlocked} of {totalProgress.total} achievements
          </Text>
        </Card>

        <View style={styles.filterContainer}>
          <Pressable
            style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
            onPress={() => setFilter('all')}
          >
            <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>All</Text>
          </Pressable>
          <Pressable
            style={[styles.filterButton, filter === 'unlocked' && styles.filterButtonActive]}
            onPress={() => setFilter('unlocked')}
          >
            <Text style={[styles.filterText, filter === 'unlocked' && styles.filterTextActive]}>Unlocked</Text>
          </Pressable>
          <Pressable
            style={[styles.filterButton, filter === 'locked' && styles.filterButtonActive]}
            onPress={() => setFilter('locked')}
          >
            <Text style={[styles.filterText, filter === 'locked' && styles.filterTextActive]}>Locked</Text>
          </Pressable>
        </View>

        <View style={styles.achievementsList}>
          {filteredAchievements.map((achievement) => (
            <Card key={achievement.id} style={styles.achievementCard}>
              <View style={styles.achievementHeader}>
                <View style={[
                  styles.achievementIcon,
                  {
                    backgroundColor: achievement.tier === 'gold' ? '#FFF7E6' :
                      achievement.tier === 'silver' ? '#F5F5F5' : '#FFF1E6'
                  }
                ]}>
                  <Icon
                    name={achievement.unlockedAt ? "check" : "lock"}
                    size={24}
                    color={achievement.tier === 'gold' ? '#FFD700' :
                      achievement.tier === 'silver' ? '#C0C0C0' : '#CD7F32'}
                  />
                </View>
                <View style={styles.achievementInfo}>
                  <Text style={styles.achievementName}>{achievement.name}</Text>
                  <Text style={styles.achievementDescription}>{achievement.description}</Text>
                  {achievement.progress && !achievement.unlockedAt && (
                    <View style={styles.achievementProgress}>
                      <ProgressBar progress={(achievement.progress.current / achievement.progress.total) * 100} />
                      <Text style={styles.progressCount}>
                        {achievement.progress.current}/{achievement.progress.total}
                      </Text>
                    </View>
                  )}
                  {achievement.unlockedAt && (
                    <Text style={styles.unlockedDate}>
                      Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </Text>
                  )}
                </View>
                <Icon
                  name="award"
                  size={20}
                  color={achievement.tier === 'gold' ? '#FFD700' :
                    achievement.tier === 'silver' ? '#C0C0C0' : '#CD7F32'}
                />
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
} 