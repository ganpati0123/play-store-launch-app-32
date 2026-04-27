// PayX Ultra Pro - Additional Screen Components
// More tabs and features to extend the app

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Animated, TextInput, Platform, Modal, Alert, ActivityIndicator, RefreshControl, Share, Linking, Image, KeyboardAvoidingView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { mockContacts, mockTransactions, mockOperators, mockQuickActions, mockInvestmentCategories, mockMutualFunds, mockGoldPrice, mockPortfolio, mockBills, mockMerchants, mockServiceTypes, formatCurrency, formatDate, formatRelativeTime, generateId, generateUTR, simulateDelay, generateChartData } from '../data/mockData';
import { Transaction, Contact, Operator, Plan, ServiceType } from '../types';

// ================================
// AI Assistant Component
// ================================
export const AIAssistant: React.FC<{ visible: boolean; onClose: () => void }> = ({ visible, onClose }) => {
  const { colors } = useTheme();
  const [messages, setMessages] = useState([
    { id: '1', type: 'assistant', text: 'Hello! I am your PayX Assistant. How can I help?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const mockResponses = [
    'I can help you send money, recharge, or check your balance.',
    'Your balance is ₹25,432.50',
    'Your last transaction was ₹500 to Amit Kumar.',
    'Would you like me to show you some plans?',
    'I can help you with multiple payment options.'
  ];

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now().toString(), type: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    
    await simulateDelay(1500);
    const response = mockResponses[Math.floor(Math.random() * mockResponses.length)];
    setMessages(prev => [...prev, { id: Date.now().toString(), type: 'assistant', text: response }]);
    setLoading(false);
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.aiOverlay}>
        <View style={[styles.aiContainer, { backgroundColor: colors.surface }]}>
          <View style={styles.aiHeader}>
            <Text style={styles.aiTitle}>🤖 PayX Assistant</Text>
            <TouchableOpacity onPress={onClose}><Text style={styles.aiClose}>✕</Text></TouchableOpacity>
          </View>
          <ScrollView style={styles.aiMessages}>
            {messages.map(msg => (
              <View key={msg.id} style={[styles.aiMessage, msg.type === 'user' && styles.aiUserMessage]}>
                <Text style={styles.aiMessageText}>{msg.text}</Text>
              </View>
            ))}
            {loading && <ActivityIndicator size="small" color={colors.primary} />}
          </ScrollView>
          <View style={styles.aiInput}>
            <TextInput value={input} onChangeText={setInput} placeholder="Type a message..." style={styles.aiTextInput} />
            <TouchableOpacity onPress={handleSend} style={[styles.aiSendBtn, { backgroundColor: colors.primary }]}><Text style={styles.aiSendText}>Send</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// ================================
// Settings Screen
// ================================
export const SettingsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors, isDark, setTheme } = useTheme();
  const { user, settings, updateSettings } = useUser();

  const settingsItems = [
    { id: 'theme', label: 'Theme', icon: '🎨', sublabel: isDark ? 'Dark' : 'Light', action: () => setTheme(isDark ? 'light' : 'dark') },
    { id: 'haptic', label: 'Haptic Feedback', icon: '📳', sublabel: settings?.hapticEnabled ? 'On' : 'Off', action: () => updateSettings({ hapticEnabled: !settings?.hapticEnabled }) },
    { id: 'security', label: 'Security', icon: '🔒', sublabel: 'PIN, Biometrics', action: () => {} },
    { id: 'notifications', label: 'Notifications', icon: '🔔', sublabel: 'On', action: () => {} },
    { id: 'privacy', label: 'Privacy', icon: '👁️', sublabel: '', action: () => {} },
    { id: 'help', label: 'Help & Support', icon: '❓', sublabel: '', action: () => {} },
    { id: 'about', label: 'About', icon: 'ℹ️', sublabel: 'v1.0.0', action: () => {} },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        data={settingsItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={item.action} style={styles.settingsItem}>
            <Text style={styles.settingsIcon}>{item.icon}</Text>
            <View style={styles.settingsContent}>
              <Text style={styles.settingsLabel}>{item.label}</Text>
              {item.sublabel && <Text style={styles.settingsSub}>{item.sublabel}</Text>}
            </View>
            <Text style={styles.settingsArrow}>›</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// ================================
// Profile Screen
// ================================
export const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors } = useTheme();
  const { user } = useUser();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.profileHeader, { backgroundColor: colors.primary }]}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileAvatarText}>{user?.name?.slice(0, 2) || 'U'}</Text>
        </View>
        <Text style={styles.profileName}>{user?.name || 'User'}</Text>
        <Text style={styles.profileEmail}>{user?.email}</Text>
        <View style={styles.profileUpi}>
          <Text style={styles.profileUpiLabel}>UPI ID:</Text>
          <Text style={styles.profileUpiId}>{user?.upiId}</Text>
        </View>
      </View>
      <View style={styles.profileStats}>
        <View style={styles.profileStat}>
          <Text style={styles.profileStatValue}>45</Text>
          <Text style={styles.profileStatLabel}>Transactions</Text>
        </View>
        <View style={styles.profileStat}>
          <Text style={styles.profileStatValue}>8</Text>
          <Text style={styles.profileStatLabel}>Contacts</Text>
        </View>
        <View style={styles.profileStat}>
          <Text style={styles.profileStatValue}>3</Text>
          <Text style={styles.profileStatLabel}>Favorites</Text>
        </View>
      </View>
    </View>
  );
};

// ================================
// Notifications Screen
// ================================
export const NotificationsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors } = useTheme();
  const notifications = [
    { id: '1', title: 'Payment Received', text: 'Received ₹500 from Priya Singh', time: '2 hours ago', icon: '💰' },
    { id: '2', title: 'Recharge Successful', text: 'Mobile recharge of ₹299 successful', time: 'Yesterday', icon: '📱' },
    { id: '3', title: 'Balance Low', text: 'Your balance is below ₹1000', time: '2 days ago', icon: '⚠️' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={styles.notificationIcon}>{item.icon}</Text>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.notificationText}>{item.text}</Text>
              <Text style={styles.notificationTime}>{item.time}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

// ================================
// Help Screen
// ================================
export const HelpScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors } = useTheme();
  const faqs = [
    { q: 'How to send money?', a: 'Go to Home tab, select a contact, enter amount, and confirm with PIN.' },
    { q: 'What is UPI?', a: 'Unified Payments Interface - a real-time payment system.' },
    { q: 'Is it safe?', a: 'Yes, with PIN and biometric authentication.' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView>
        <Text style={styles.helpTitle}>Frequently Asked Questions</Text>
        {faqs.map((faq, i) => (
          <View key={i} style={styles.faqItem}>
            <Text style={styles.faqQuestion}>{faq.q}</Text>
            <Text style={styles.faqAnswer}>{faq.a}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  // AI Assistant
  aiOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  aiContainer: { height: '70%', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 16 },
  aiHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  aiTitle: { fontSize: 20, fontWeight: '700' },
  aiClose: { fontSize: 20, padding: 8 },
  aiMessages: { flex: 1 },
  aiMessage: { backgroundColor: '#F1F3F5', padding: 12, borderRadius: 12, marginBottom: 8, maxWidth: '80%' },
  aiUserMessage: { backgroundColor: '#6C5CE7', alignSelf: 'flex-end' },
  aiMessageText: { color: '#2D3436', fontSize: 14 },
  aiInput: { flexDirection: 'row', marginTop: 16 },
  aiTextInput: { flex: 1, backgroundColor: '#F1F3F5', borderRadius: 12, padding: 12, marginRight: 8 },
  aiSendBtn: { padding: 12, borderRadius: 12, justifyContent: 'center' },
  aiSendText: { color: '#FFF', fontWeight: '600' },
  // Settings
  settingsItem: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#E8ECEF' },
  settingsIcon: { fontSize: 24, marginRight: 12 },
  settingsContent: { flex: 1 },
  settingsLabel: { fontSize: 16, fontWeight: '500' },
  settingsSub: { fontSize: 13, color: '#636E72', marginTop: 2 },
  settingsArrow: { fontSize: 20, color: '#636E72' },
  // Profile
  profileHeader: { padding: 40, alignItems: 'center', borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
  profileAvatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center' },
  profileAvatarText: { fontSize: 32, color: '#FFF', fontWeight: '700' },
  profileName: { fontSize: 24, fontWeight: '700', color: '#FFF', marginTop: 16 },
  profileEmail: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  profileUpi: { flexDirection: 'row', marginTop: 12 },
  profileUpiLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  profileUpiId: { color: '#FFF', fontSize: 14, fontWeight: '600', marginLeft: 4 },
  profileStats: { flexDirection: 'row', justifyContent: 'space-around', padding: 24 },
  profileStat: { alignItems: 'center' },
  profileStatValue: { fontSize: 24, fontWeight: '700' },
  profileStatLabel: { fontSize: 13, color: '#636E72', marginTop: 4 },
  // Notifications
  notificationItem: { flexDirection: 'row', padding: 16, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#E8ECEF' },
  notificationIcon: { fontSize: 24, marginRight: 12 },
  notificationContent: { flex: 1 },
  notificationTitle: { fontSize: 16, fontWeight: '600' },
  notificationText: { fontSize: 14, color: '#636E72', marginTop: 2 },
  notificationTime: { fontSize: 12, color: '#B2BEC3', marginTop: 4 },
  // Help
  helpTitle: { fontSize: 20, fontWeight: '700', margin: 20 },
  faqItem: { padding: 16, backgroundColor: '#FFF', marginHorizontal: 16, marginBottom: 12, borderRadius: 12 },
  faqQuestion: { fontSize: 16, fontWeight: '600' },
  faqAnswer: { fontSize: 14, color: '#636E72', marginTop: 8 },
});

export default { AIAssistant, SettingsScreen, ProfileScreen, NotificationsScreen, HelpScreen };