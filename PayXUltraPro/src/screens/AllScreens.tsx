// PayX Ultra Pro - All Screens and Pages
// Complete set of screen components for all tabs and levels
// This file adds 300+ lines of screen code

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, RefreshControl, Animated, TextInput, Platform, Modal, Share, Alert, ActivityIndicator, KeyboardAvoidingView, Keyboard, Dimensions, Image, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { mockContacts, mockTransactions, mockOperators, mockQuickActions, mockInvestmentCategories, mockMutualFunds, mockGoldPrice, mockPortfolio, mockBills, mockMerchants, formatCurrency, formatDate, formatRelativeTime, generateId, generateUTR, simulateDelay, generateChartData } from '../data/mockData';
import { Transaction, Contact, Operator, Plan, ServiceType } from '../types';

// ==================== TAB 1 HOME LEVELS ====================
// Home Screen Level 1
export const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors } = useTheme();
  const { user, contacts, transactions, getRecentContacts } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await simulateDelay(500);
    setIsLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>₹{user?.balance?.toLocaleString('en-IN') || '0'}</Text>
        </View>
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {mockQuickActions.map(action => (
              <TouchableOpacity key={action.id} style={styles.quickAction} onPress={() => {}}>
                <Text style={styles.quickActionIcon}>{action.icon}</Text>
                <Text style={styles.quickActionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.recentContacts}>
          <Text style={styles.sectionTitle}>Recent Contacts</Text>
          {getRecentContacts(8).map(contact => (
            <TouchableOpacity key={contact.id} style={styles.contactItem} onPress={() => navigation.navigate('Level2', { contact })}>
              <View style={styles.contactAvatar}><Text>{contact.name[0]}</Text></View>
              <Text style={styles.contactName}>{contact.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

// Level 2 Enter Amount Screen
export const EnterAmountScreen: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const { colors } = useTheme();
  const { contact, amount, note } = route.params || {};
  const [amountVal, setAmountVal] = useState('');
  const [noteVal, setNoteVal] = useState('');

  const handleContinue = async () => {
    if (!amountVal || parseFloat(amountVal) <= 0) { Alert.alert('Invalid Amount'); return; }
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('Level3', { contact, amount: parseFloat(amountVal), note: noteVal });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text>←</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>Send Money</Text>
        <View style={{ width: 40 }} />
      </View>
      <View style={styles.amountInputContainer}>
        <Text style={styles.currencySymbol}>₹</Text>
        <TextInput value={amountVal} onChangeText={setAmountVal} keyboardType="decimal-pad" placeholder="0" style={styles.amountInput} />
      </View>
      <TextInput value={noteVal} onChangeText={setNoteVal} placeholder="Add a note..." style={styles.noteInput} />
      <View style={styles.continueButton}>
        <TouchableOpacity onPress={handleContinue} disabled={!amountVal} style={[styles.button, !amountVal && styles.buttonDisabled]}><Text style={styles.buttonText}>Continue</Text></TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

// Level 3 PIN Screen
export const PINScreen: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const { colors } = useTheme();
  const { contact, amount, note } = route.params;
  const [pin, setPin] = useState('');
  
  const handleKeyPress = async (key: string) => {
    if (pin.length >= 4) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const newPin = pin + key;
    setPin(newPin);
    if (newPin.length === 4) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      navigation.navigate('Level4', { contact, amount, note, pin: newPin });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <Text style={styles.pinAmount}>₹{amount?.toLocaleString('en-IN')}</Text>
        <Text style={styles.pinTo}>to {contact?.name}</Text>
      </View>
      <View style={styles.pinDots}>
        {[0, 1, 2, 3].map(i => <View key={i} style={[styles.pinDot, i < pin.length && styles.pinDotFilled]} />)}
      </View>
      <View style={styles.keypad}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'].map((key, i) => (
          <TouchableOpacity key={i} onPress={() => key === 'del' ? setPin(p => p.slice(0, -1)) : key && handleKeyPress(key)} disabled={!key} style={styles.keypadKey}>
            <Text style={styles.keypadText}>{key === 'del' ? '⌫' : key}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// Level 4 Success Screen
export const SuccessScreen: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const { colors } = useTheme();
  const { contact, amount, note } = route.params;
  const [anim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.spring(anim, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }).start();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View style={[styles.successCircle, { transform: [{ scale: anim }] }]}>
        <Text style={styles.checkmark}>✓</Text>
      </Animated.View>
      <Text style={styles.successText}>Payment Successful!</Text>
      <Text style={styles.successAmount}>₹{amount?.toLocaleString('en-IN')}</Text>
      <Text style={styles.successSentTo}>sent to {contact?.name}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Level5')} style={styles.viewReceiptBtn}>
        <Text style={styles.viewReceiptText}>View Receipt</Text>
      </TouchableOpacity>
    </View>
  );
};

// Level 5 Receipt Screen
export const ReceiptScreen: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const { colors } = useTheme();
  const { contact, amount, note } = route.params;
  const utr = generateUTR();

  const handleShare = async () => {
    await Share.share({ message: `Sent ₹${amount} to ${contact?.name}. UTR: ${utr}` });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.receiptCard}>
        <Text style={styles.receiptTitle}>Payment Receipt</Text>
        <Text style={styles.receiptAmount}>₹{amount?.toLocaleString('en-IN')}</Text>
        <Text style={styles.receiptTo}>To: {contact?.name}</Text>
        <Text style={styles.receiptNote}>Note: {note || '-'}</Text>
        <Text style={styles.receiptUTR}>UTR: {utr}</Text>
      </View>
      <View style={styles.receiptActions}>
        <TouchableOpacity onPress={handleShare} style={styles.shareBtn}><Text style={styles.shareBtnText}>Share</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.popToTop()} style={styles.doneBtn}><Text style={styles.doneBtnText}>Done</Text></TouchableOpacity>
      </View>
    </View>
  );
};

// ==================== TAB 2 SCAN LEVELS ====================
export const ScanScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors } = useTheme();
  
  const handleScan = () => {
    navigation.navigate('MerchantDetails', { result: { merchantName: 'Test', category: 'Food' } } });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#1A1A2E' }}>
      <View style={styles.scanFrameContainer}>
        <View style={styles.scanFrame} />
      </View>
      <View style={styles.scanActions}>
        <TouchableOpacity style={styles.galleryBtn}><Text>🖼️</Text></TouchableOpacity>
        <TouchableOpacity onPress={handleScan} style={styles.scanBtn} />
        <TouchableOpacity style={styles.flashBtn}><Text>💡</Text></TouchableOpacity>
      </View>
    </View>
  );
};

export const MerchantDetailsScreen: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const { result } = route.params;
  const [amount, setAmount] = useState('');
  
  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      <TouchableOpacity onPress={() => navigation.goBack()}><Text>←</Text></TouchableOpacity>
      <Text>{result?.merchantName}</Text>
      <TextInput value={amount} onChangeText={setAmount} keyboardType="decimal-pad" placeholder="Enter amount" />
      <TouchableOpacity onPress={() => navigation.navigate('Confirm', { amount, result })}><Text>Continue</Text></TouchableOpacity>
    </View>
  );
};

// ==================== TAB 3 TRANSACTION LEVELS ====================
export const TransactionListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors } = useTheme();
  const [transactions, setTransactions] = useState(mockTransactions);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Details', { transaction: item })} style={styles.txnItem}>
            <View style={styles.txnIcon}><Text>{item.type === 'SENT' ? '↑' : '↓'}</Text></View>
            <View style={styles.txnInfo}>
              <Text>{item.type === 'SENT' ? item.recipientName : item.senderName}</Text>
              <Text>{formatRelativeTime(item.createdAt)}</Text>
            </View>
            <Text style={{ color: item.type === 'SENT' ? colors.error : colors.success }}>
              {item.type === 'SENT' ? '-' : '+'}₹{item.amount}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export const TransactionDetailsScreen: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const { transaction } = route.params;
  
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Transaction Details</Text>
      <Text>Amount: ₹{transaction.amount}</Text>
      <Text>Status: {transaction.status}</Text>
      <Text>UTR: {transaction.utr}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Download')}><Text>Download Statement</Text></TouchableOpacity>
    </View>
  );
};

// ==================== TAB 4 RECHARGE LEVELS ====================
export const RechargeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors } = useTheme();
  
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        data={mockQuickActions}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('EnterDetails', { type: item.id })} style={styles.serviceCard}>
            <Text style={styles.serviceIcon}>{item.icon}</Text>
            <Text style={styles.serviceLabel}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export const PlansScreen: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const { type, operator } = route.params;
  const plans = mockJioPlans;
  
  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      <FlatList
        data={plans}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Payment', { plan: item })} style={styles.planItem}>
            <Text>{item.name}</Text>
            <Text>₹{item.price}</Text>
            <Text>{item.validity} days</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// ==================== TAB 5 INVESTMENT LEVELS ====================
export const InvestmentsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors } = useTheme();
  
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <LinearGradient colors={['#6C5CE7', '#A29BFE']} style={styles.portfolioCard}>
        <Text style={styles.portfolioLabel}>Total Value</Text>
        <Text style={styles.portfolioValue}>₹{mockPortfolio.totalValue.toLocaleString()}</Text>
        <Text>+₹{mockPortfolio.todaysChange} Today</Text>
      </LinearGradient>
      <Text style={styles.categoryTitle}>Investment Options</Text>
      {mockInvestmentCategories.map(cat => (
        <TouchableOpacity key={cat.id} onPress={() => navigation.navigate('InvestDetails', { type: cat.type })} style={styles.categoryItem}>
          <Text>{cat.icon}</Text>
          <Text>{cat.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  balanceCard: { padding: 20, margin: 20, backgroundColor: '#6C5CE7', borderRadius: 20 },
  balanceLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  balanceAmount: { color: '#FFF', fontSize: 36, fontWeight: '700', marginTop: 8 },
  sectionTitle: { fontSize: 18, fontWeight: '700', margin: 16 },
  quickActions: { padding: 16 },
  quickActionsGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  quickAction: { width: '25%', alignItems: 'center', padding: 12 },
  quickActionIcon: { fontSize: 28, marginBottom: 4 },
  quickActionLabel: { fontSize: 12, textAlign: 'center' },
  recentContacts: { padding: 16 },
  contactItem: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  contactAvatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#6C5CE7', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  contactName: { fontSize: 16, fontWeight: '500' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  headerTitle: { fontSize: 18, fontWeight: '600' },
  amountInputContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 40 },
  currencySymbol: { fontSize: 36, fontWeight: '600' },
  amountInput: { fontSize: 48, fontWeight: '700', minWidth: 100 },
  noteInput: { margin: 20, padding: 16, borderRadius: 12, backgroundColor: '#F1F3F5', fontSize: 16 },
  continueButton: { padding: 20 },
  button: { backgroundColor: '#6C5CE7', padding: 16, borderRadius: 12, alignItems: 'center' },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  pinAmount: { fontSize: 36, fontWeight: '700', textAlign: 'center' },
  pinTo: { fontSize: 16, textAlign: 'center', marginTop: 8 },
  pinDots: { flexDirection: 'row', justifyContent: 'center', marginVertical: 40 },
  pinDot: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#DFE6E9', marginHorizontal: 8 },
  pinDotFilled: { backgroundColor: '#6C5CE7' },
  keypad: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 280 },
  keypadKey: { width: 80, height: 60, justifyContent: 'center', alignItems: 'center', margin: 4 },
  keypadText: { fontSize: 24 },
  successCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#55EFC4', justifyContent: 'center', alignItems: 'center' },
  checkmark: { fontSize: 48, color: '#FFF' },
  successText: { fontSize: 24, fontWeight: '700', marginTop: 20 },
  successAmount: { fontSize: 36, fontWeight: '700', marginTop: 8 },
  successSentTo: { fontSize: 16, color: '#636E72', marginTop: 8 },
  viewReceiptBtn: { marginTop: 40, padding: 16, backgroundColor: '#6C5CE7', borderRadius: 12 },
  viewReceiptText: { color: '#FFF', fontWeight: '600' },
  receiptCard: { margin: 20, padding: 24, backgroundColor: '#FFF', borderRadius: 20 },
  receiptTitle: { fontSize: 20, fontWeight: '700', marginBottom: 16 },
  receiptAmount: { fontSize: 32, fontWeight: '700' },
  receiptTo: { fontSize: 16, marginTop: 16 },
  receiptNote: { fontSize: 14, marginTop: 8 },
  receiptUTR: { fontSize: 12, color: '#636E72', marginTop: 16 },
  receiptActions: { padding: 20 },
  shareBtn: { padding: 16, borderWidth: 2, borderColor: '#6C5CE7', borderRadius: 12, alignItems: 'center', marginBottom: 12 },
  shareBtnText: { color: '#6C5CE7', fontWeight: '600' },
  doneBtn: { padding: 16, backgroundColor: '#6C5CE7', borderRadius: 12, alignItems: 'center' },
  doneBtnText: { color: '#FFF', fontWeight: '600' },
  scanFrameContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scanFrame: { width: 250, height: 250, borderWidth: 3, borderColor: '#6C5CE7', borderRadius: 20 },
  scanActions: { flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: 60 },
  galleryBtn: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#F1F3F5', justifyContent: 'center', alignItems: 'center' },
  scanBtn: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#6C5CE7', borderWidth: 4, borderColor: 'rgba(255,255,255,0.3)' },
  flashBtn: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#F1F3F5', justifyContent: 'center', alignItems: 'center' },
  txnItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#E8ECEF' },
  txnIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#F1F3F5', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  txnInfo: { flex: 1 },
  serviceCard: { width: '48%', margin: 8, padding: 20, backgroundColor: '#FFF', borderRadius: 16, alignItems: 'center' },
  serviceIcon: { fontSize: 32 },
  serviceLabel: { marginTop: 8, fontSize: 14 },
  planItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#FFF', margin: 8, borderRadius: 12 },
  portfolioCard: { padding: 24, margin: 20, borderRadius: 20 },
  portfolioLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  portfolioValue: { color: '#FFF', fontSize: 32, fontWeight: '700', marginVertical: 8 },
  categoryTitle: { fontSize: 18, fontWeight: '700', margin: 16 },
  categoryItem: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#FFF', marginHorizontal: 16, marginBottom: 12, borderRadius: 12 },
});

// Export all screens
export const screens = {
  HomeScreen,
  EnterAmountScreen,
  PINScreen,
  SuccessScreen,
  ReceiptScreen,
  ScanScreen,
  MerchantDetailsScreen,
  TransactionListScreen,
  TransactionDetailsScreen,
  RechargeScreen,
  PlansScreen,
  InvestmentsScreen,
};