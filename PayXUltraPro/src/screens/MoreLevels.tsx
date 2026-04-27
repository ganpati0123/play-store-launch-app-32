// PayX Ultra Pro - More Screens and Components
// Additional UI screens to extend the app

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Animated, TextInput, Platform, Modal, Alert, ActivityIndicator, RefreshControl, Share, Switch, WebView, Image, Dimensions, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { mockContacts, mockTransactions, mockOperators, mockQuickActions, mockInvestmentCategories, mockMutualFunds, mockGoldPrice, mockPortfolio, mockBills, mockMerchants, mockServiceTypes, formatCurrency, formatDate, formatRelativeTime, generateId, generateUTR, simulateDelay, generateChartData, mockUser, mockContacts as contacts, mockTransactions as transactions } from '../data/mockData';

// =================>
// Tab 1 More Levels
// ==================
export const HomeLevel3: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const { colors } = useTheme();
  const { contact, amount, note } = route.params || {};
  const [pin, setPin] = useState('');
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={styles.pinAmountTitle}>₹{amount}</Text>
      <Text style={styles.pinToText}>to {contact?.name}</Text>
      <View style={styles.pinDotsContainer}>
        {[0,1,2,3].map(i => <View key={i} style={[styles.pinDotView, i < pin.length && styles.pinDotFill]} />)}
      </View>
      <View style={styles.numpad}>
        {['1','2','3','4','5','6','7','8','9','','0','⌫'].map((k,i) => (
          <TouchableOpacity key={i} onPress={() => { if(k==='⌫') setPin(p => p.slice(0,-1)); else if(k && pin.length < 4) setPin(p => p+k); }} disabled={!k} style={styles.numpadKey}>
            <Text style={styles.numpadText}>{k}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export const HomeLevel4: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const { contact, amount } = route.params || {};
  const bounce = useRef(new Animated.Value(0)).current;
  useEffect(() => { Animated.spring(bounce, { toValue:1, useNativeDriver:true }).start(); Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); }, []);
  return (
    <View style={[styles.container, { backgroundColor: colors.background, justifyContent:'center', alignItems:'center' }]}>
      <Animated.View style={[styles.successCircle]}><Text style={styles.check}>✓</Text></Animated.View>
      <Text style={styles.successMsg}>Paid ₹{amount}</Text>
      <Text style={styles.sentTo}>to {contact?.name}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Tab3_Transactions')} style={styles.viewBtn}><Text style={styles.viewBtnText}>View Transaction</Text></TouchableOpacity>
    </View>
  );
};

export const HomeLevel5: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const { colors } = useTheme();
  const { contact, amount } = route.params || {};
  const utr = generateUTR();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.receiptCard,]}>
        <Text style={styles.receiptTitle}>Receipt</Text>
        <Text style={styles.receiptAmt}>₹{amount}</Text>
        <Text style={styles.receiptToUser}>To: {contact?.name}</Text>
        <Text style={styles.receiptUTR}>UTR: {utr}</Text>
      </View>
      <TouchableOpacity onPress={() => Share.share({ message: `Paid ₹${amount} to ${contact?.name}. UTR: ${utr}` })} style={styles.shareBtnNew}><Text style={styles.shareBtnLabel}>Share</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.popToTop()} style={styles.doneBtnNew}><Text style={styles.doneBtnLabel}>Done</Text></TouchableOpacity>
    </View>
  );
};

// =================>
// Scan Level 3-5
// ==================
export const ScanLevel3: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const { colors } = useTheme();
  const { scanResult, amount } = route.params || {};
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={styles.confirmTitle}>Confirm</Text>
      <Text style={styles.confirmAmt}>₹{amount}</Text>
      <Text style={styles.confirmMerch}>to {scanResult?.merchantName}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Payment')} style={styles.proceedBtn}><Text style={styles.proceedText}>Proceed</Text></TouchableOpacity>
    </View>
  );
};

export const ScanLevel4: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={styles.pinHeader}>Enter PIN</Text>
      <View style={styles.numpad}>
        {['1','2','3','4','5','6','7','8','9','','0','⌫'].map((k,i) => (
          <TouchableOpacity key={i} style={styles.numpadKey}><Text>{k}</Text></TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export const ScanLevel5: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background, justifyContent:'center' }]}>
      <Text style={styles.successMsg}>✓ Payment Successful</Text>
      <TouchableOpacity onPress={() => navigation.popToTop()}><Text>Done</Text></TouchableOpacity>
    </View>
  );
};

// =================>
// Transaction Levels 3-5
// ==================
export const TransactionLevel3: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const { transaction } = route.params || {};
  return (
    <View style={[styles.container, { backgroundColor: '#FFF' }]}>
      <Text>Download Statement</Text>
      <Text>UTR: {transaction?.utr}</Text>
    </View>
  );
};

export const TransactionLevel4: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const { transaction } = route.params || {};
  const [reason, setReason] = useState('');
  
  return (
    <View style={[styles.container, { backgroundColor: '#FFF' }]}>
      <Text>Dispute Transaction</Text>
      <TextInput value={reason} onChangeText={setReason} placeholder="Enter reason..." style={styles.reasonInput} />
      <TouchableOpacity onPress={()=>Alert.alert('Dispute raised')} style={styles.raiseBtn}><Text>Submit</Text></TouchableOpacity>
    </View>
  );
};

export const TransactionLevel5: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  return <View style={styles.container}><Text>Ticket Raised</Text><TouchableOpacity onPress={()=> navigation.popToTop()}><Text>Done</Text></TouchableOpacity></View>;
};

// =================
// Recharge Levels 3-5
// =================
export const RechargeLevel3: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const { serviceType, number: num, operator: op } = route.params || {};
  const plans = mockJioPlans;
  return (
    <View style={[styles.container, { backgroundColor: '#F8F9FA' }]}>
      <FlatList data={plans} keyExtractor={p=>p.id} renderItem={({ item })=>(
        <TouchableOpacity onPress={()=>navigation.navigate('Payment', { plan: item })} style={styles.planItemNew}>
          <Text>{item.name} - ₹{item.price}</Text>
          <Text>{item.validity} days</Text>
        </TouchableOpacity>
      )} />
    </View>
  );
};

export const RechargeLevel4: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const { plan, serviceType, number: num, operator: op } = route.params || {};
  return (
    <View style={[styles.container, { backgroundColor: '#FFF' }]}>
      <Text>Pay ₹{plan?.price} for {num}</Text>
      <TouchableOpacity onPress={()=> navigation.navigate('Success')} style={styles.payBtn}><Text>Pay Now</Text></TouchableOpacity>
    </View>
  );
};

export const RechargeLevel5: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  return (
    <View style={[styles.container, { backgroundColor: '#FFF', justifyContent:'center', alignItems:'center' }]}>
      <Text style={styles.successMsg}>✓ Recharge Successful!</Text>
      <TouchableOpacity onPress={()=> navigation.popToTop()}><Text>Done</Text></TouchableOpacity>
    </View>
  );
};

// =================
// Investment Levels 3-5
// =================
export const InvestmentsLevel3: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const [grams, setGrams] = useState('1');
  return (
    <View style={[styles.container, { backgroundColor: '#FFF' }]}>
      <Text>Buy Gold</Text>
      <View style={styles.gramsRow}>
        <TouchableOpacity onPress={()=>setGrams(g=>(parseFloat(g)-0.5).toString())}><Text>-</Text></TouchableOpacity>
        <Text style={styles.gramsText}>{grams} g</Text>
        <TouchableOpacity onPress={()=>setGrams(g=>(parseFloat(g)+0.5).toString())}><Text>+</Text></TouchableOpacity>
      </View>
      <Text>Total: ₹{parseFloat(grams) * 6235}</Text>
      <TouchableOpacity onPress={()=>navigation.navigate('Payment')} style={styles.buyBtn}><Text>Buy</Text></TouchableOpacity>
    </View>
  );
};

export const InvestmentsLevel4: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  return (
    <View style={[styles.container, { backgroundColor: '#FFF' }]}>
      <Text>Payment</Text>
      <TouchableOpacity onPress={()=>navigation.navigate('Success')} style={styles.confirmPayBtn}><Text>Confirm</Text></TouchableOpacity>
    </View>
  );
};

export const InvestmentsLevel5: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  return (
    <View style={[styles.container, { backgroundColor: '#FFF', justifyContent:'center', alignItems:'center' }]}>
      <Text style={styles.successMsg}>✓ Gold Purchased!</Text>
      <TouchableOpacity onPress={()=>navigation.popToTop()}><Text>Back</Text></TouchableOpacity>
    </View>
  );
};

// STYLES
const styles = StyleSheet.create({
  container: { flex: 1 },
  pinAmountTitle: { fontSize: 40, fontWeight: '700', textAlign: 'center', marginTop: 60 },
  pinToText: { fontSize: 16, textAlign: 'center', marginTop: 8 },
  pinDotsContainer: { flexDirection: 'row', justifyContent: 'center', marginVertical: 40 },
  pinDotView: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#DFE6E9', marginHorizontal: 8 },
  pinDotFill: { backgroundColor: '#6C5CE7' },
  numpad: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 280 },
  numpadKey: { width: 80, height: 60, justifyContent: 'center', alignItems: 'center' },
  numpadText: { fontSize: 24 },
  successCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#55EFC4', justifyContent:'center', alignItems:'center' },
  check: { fontSize: 48, color:'#FFF' },
  successMsg: { fontSize: 24, fontWeight: '700', marginTop: 20 },
  sentTo: { fontSize: 16, color:'#636E72', marginTop: 8 },
  viewBtn: { marginTop: 20, paddingVertical: 12, paddingHorizontal: 24, backgroundColor: '#6C5CE7', borderRadius: 24 },
  viewBtnText: { color: '#FFF', fontWeight: '600' },
  receiptCard: { margin: 20, padding: 24, backgroundColor: '#FFF', borderRadius: 20 },
  receiptTitle: { fontSize: 20, fontWeight: '700' },
  receiptAmt: { fontSize: 36, fontWeight: '700', marginVertical: 16 },
  receiptToUser: { fontSize: 14 },
  receiptUTR: { fontSize: 12, color:'#636E72', marginTop: 16 },
  shareBtnNew: { marginHorizontal: 20, marginTop: 20, padding: 16, borderWidth: 2, borderColor: '#6C5CE7', borderRadius: 12, alignItems:'center' },
  shareBtnLabel: { color: '#6C5CE7', fontWeight:'600' },
  doneBtnNew: { marginHorizontal: 20, marginTop: 12, padding: 16, backgroundColor: '#6C5CE7', borderRadius: 12, alignItems:'center' },
  doneBtnLabel: { color: '#FFF', fontWeight:'600' },
  confirmTitle: { fontSize: 20, fontWeight:'600', textAlign:'center', marginTop: 60 },
  confirmAmt: { fontSize: 40, fontWeight:'700', textAlign:'center' },
  confirmMerch: { fontSize: 16, textAlign:'center', marginTop: 8 },
  proceedBtn: { marginTop: 40, marginHorizontal: 20, padding: 16, backgroundColor:'#6C5CE7', borderRadius: 12, alignItems:'center' },
  proceedText: { color:'#FFF', fontWeight:'600' },
  pinHeader: { fontSize: 20, fontWeight:'600', textAlign:'center', marginTop: 60 },
  reasonInput: { margin: 20, padding: 16, backgroundColor:'#F1F3F5', borderRadius: 12, fontSize: 16 },
  raiseBtn: { margin: 20, padding: 16, backgroundColor:'#E84393', borderRadius: 12, alignItems:'center' },
  planItemNew: { flexDirection: 'row', justifyContent:'space-between', padding: 16, margin: 8, backgroundColor:'#FFF', borderRadius: 12 },
  payBtn: { margin: 20, padding: 16, backgroundColor:'#6C5CE7', borderRadius: 12, alignItems:'center' },
  gramsRow: { flexDirection: 'row', justifyContent:'center', alignItems:'center', margin: 20 },
  gramsText: { fontSize: 32, fontWeight:'700', marginHorizontal: 24 },
  buyBtn: { margin: 20, padding: 16, backgroundColor:'#FDCB6E', borderRadius: 12, alignItems:'center' },
  confirmPayBtn: { margin: 20, padding: 16, backgroundColor:'#6C5CE7', borderRadius: 12, alignItems:'center' },
});

export const additionalScreens = { HomeLevel3, HomeLevel4, HomeLevel5, ScanLevel3, ScanLevel4, ScanLevel5, TransactionLevel3, TransactionLevel4, TransactionLevel5, RechargeLevel3, RechargeLevel4, RechargeLevel5, InvestmentsLevel3, InvestmentsLevel4, InvestmentsLevel5 };