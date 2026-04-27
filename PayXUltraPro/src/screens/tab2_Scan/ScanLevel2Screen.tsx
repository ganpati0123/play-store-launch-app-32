// Scan Level 2 - Merchant Details
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../context/ThemeContext';
import { Button, Input } from '../../components/UI';

interface Props { navigation: any; route: any; }

export const ScanLevel2Screen: React.FC<Props> = ({ navigation, route }) => {
  const { scanResult } = route.params;
  const { colors } = useTheme();
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const handleContinue = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Enter Amount', 'Please enter an amount');
      return;
    }
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('ScanLevel3_ConfirmAmount', { scanResult, amount: parseFloat(amount), note });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Merchant Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={[styles.merchantCard, { backgroundColor: colors.card }]}>
        <View style={styles.merchantLogo}>
          <Text style={styles.merchantLogoText}>🏪</Text>
        </View>
        <Text style={[styles.merchantName, { color: colors.text }]}>{scanResult.merchantName}</Text>
        <Text style={[styles.merchantCategory, { color: colors.textSecondary }]}>{scanResult.merchantCategory}</Text>
        
        <View style={[styles.verifiedBadge, { backgroundColor: colors.success + '20' }]}>
          <Text style={styles.verifiedText}>✓ Verified Merchant</Text>
        </View>
      </View>

      <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
        <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Amount</Text>
        <View style={styles.amountRow}>
          <Text style={[styles.currencySymbol, { color: colors.text }]}>₹</Text>
          <Input value={amount} onChangeText={setAmount} keyboardType="decimal-pad" placeholder="0" style={styles.amountInput} />
        </View>
      </View>

      <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
        <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Note (optional)</Text>
        <Input value={note} onChangeText={setNote} placeholder="Add a note..." />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Proceed to Pay" onPress={handleContinue} fullWidth disabled={!amount} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#E8ECEF' },
  backText: { fontSize: 24, color: '#6C5CE7' },
  title: { fontSize: 18, fontWeight: '600' },
  merchantCard: { margin: 20, padding: 24, borderRadius: 20, alignItems: 'center' },
  merchantLogo: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#F1F3F5', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  merchantLogoText: { fontSize: 40 },
  merchantName: { fontSize: 20, fontWeight: '700', marginBottom: 4 },
  merchantCategory: { fontSize: 14, marginBottom: 12 },
  verifiedBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  verifiedText: { color: '#00B894', fontSize: 12, fontWeight: '600' },
  inputContainer: { marginHorizontal: 20, marginBottom: 16, padding: 16, borderRadius: 16 },
  inputLabel: { fontSize: 12, marginBottom: 8 },
  amountRow: { flexDirection: 'row', alignItems: 'center' },
  currencySymbol: { fontSize: 32, fontWeight: '600', marginRight: 4 },
  amountInput: { fontSize: 32, fontWeight: '600', flex: 1 },
  buttonContainer: { padding: 20, paddingBottom: 40 },
});

export default ScanLevel2Screen;
