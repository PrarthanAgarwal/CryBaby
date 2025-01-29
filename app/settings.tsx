import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Switch, Pressable, Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card } from '@/components/Card'
import { useTheme } from '@/hooks/useTheme'
import Icon from 'react-native-vector-icons/Feather'

export default function Settings() {
  const theme = useTheme()
  const [showAboutModal, setShowAboutModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light')
  const [language, setLanguage] = useState('en')
  const [notifications, setNotifications] = useState(true)

  const handleThemeChange = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    // TODO: Implement actual theme change logic
  }

  const handleLanguageChange = (value: string) => {
    setLanguage(value)
    // TODO: Implement actual language change logic
  }

  const handleNotificationChange = () => {
    setNotifications(!notifications)
    // TODO: Implement actual notification settings change
  }

  const handleLogout = () => {
    // TODO: Implement logout logic
  }

  const handleDeleteAccount = () => {
    setShowDeleteModal(false)
    // TODO: Implement account deletion logic
  }

  const renderAboutModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showAboutModal}
      onRequestClose={() => setShowAboutModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>About Cry Tracker</Text>
          <Text style={styles.modalText}>
            Cry Tracker is an innovative app designed to help you understand and manage your emotional well-being. By tracking your crying sessions, you can gain insights into your emotional patterns and work towards better mental health.
          </Text>
          <Text style={styles.versionText}>Version: 1.0.0</Text>
          <Text style={styles.copyrightText}>© 2025 Cry Tracker Team. All rights reserved.</Text>
          <Pressable
            style={styles.modalCloseButton}
            onPress={() => setShowAboutModal(false)}
          >
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )

  const renderDeleteModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showDeleteModal}
      onRequestClose={() => setShowDeleteModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Delete Account</Text>
          <Text style={styles.modalText}>
            Are you sure you want to delete your account? This action cannot be undone. This will permanently delete your account and remove your data from our servers.
          </Text>
          <View style={styles.modalButtons}>
            <Pressable
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setShowDeleteModal(false)}
            >
              <Text style={[styles.modalButtonText, { color: theme.colors.text.secondary }]}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.modalButton, styles.deleteModalButton]}
              onPress={handleDeleteAccount}
            >
              <Text style={[styles.modalButtonText, { color: theme.colors.semantic.error }]}>Delete Account</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.section}>
          <Card style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Icon name={themeMode === 'light' ? "sun" : "moon"} size={20} color={theme.colors.text.primary} />
                <Text style={styles.settingLabel}>Theme</Text>
              </View>
              <Switch
                value={themeMode === 'dark'}
                onValueChange={handleThemeChange}
              />
            </View>
          </Card>

          <Card style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Icon name="globe" size={20} color={theme.colors.text.primary} />
                <Text style={styles.settingLabel}>Language</Text>
              </View>
              <Pressable
                style={styles.languageSelector}
                onPress={() => {
                  // TODO: Show language picker
                }}
              >
                <Text style={styles.languageText}>
                  {language === 'en' ? 'English' :
                   language === 'es' ? 'Español' :
                   language === 'fr' ? 'Français' :
                   language === 'de' ? 'Deutsch' : 'English'}
                </Text>
                <Icon name="chevron-right" size={20} color={theme.colors.text.secondary} />
              </Pressable>
            </View>
          </Card>

          <Card style={styles.settingCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Icon name="bell" size={20} color={theme.colors.text.primary} />
                <Text style={styles.settingLabel}>Notifications</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={handleNotificationChange}
              />
            </View>
          </Card>

          <Card style={styles.settingCard}>
            <Pressable
              style={styles.settingRow}
              onPress={() => setShowAboutModal(true)}
            >
              <View style={styles.settingLeft}>
                <Icon name="info" size={20} color={theme.colors.text.primary} />
                <Text style={styles.settingLabel}>About Us</Text>
              </View>
              <Icon name="chevron-right" size={20} color={theme.colors.text.secondary} />
            </Pressable>
          </Card>

          <Card style={styles.settingCard}>
            <Pressable
              style={[styles.settingRow, styles.logoutButton]}
              onPress={handleLogout}
            >
              <Icon name="log-out" size={20} color={theme.colors.text.primary} />
              <Text style={styles.buttonText}>Log Out</Text>
            </Pressable>
          </Card>

          <Card style={styles.settingCard}>
            <Pressable
              style={[styles.settingRow, styles.deleteButton]}
              onPress={() => setShowDeleteModal(true)}
            >
              <View style={styles.settingLeft}>
                <Icon name="trash-2" size={20} color={theme.colors.semantic.error} />
                <Text style={[styles.buttonText, { color: theme.colors.semantic.error }]}>Delete Account</Text>
              </View>
            </Pressable>
          </Card>
        </View>
      </ScrollView>

      {renderAboutModal()}
      {renderDeleteModal()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfbf1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b82f6',
    textAlign: 'center',
    marginVertical: 16,
  },
  section: {
    padding: 16,
  },
  settingCard: {
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  settingLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    marginLeft: 12,
  },
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageText: {
    fontSize: 16,
    marginRight: 8,
    color: '#6B7280',
  },
  logoutButton: {
    justifyContent: 'center',
  },
  deleteButton: {
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 16,
    lineHeight: 24,
  },
  versionText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  copyrightText: {
    fontSize: 14,
    color: '#6B7280',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 24,
  },
  modalButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 12,
  },
  modalCloseButton: {
    marginTop: 24,
    alignSelf: 'flex-end',
  },
  modalCloseButtonText: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: '500',
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
  },
  deleteModalButton: {
    backgroundColor: '#FEE2E2',
  },
  modalButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
}) 