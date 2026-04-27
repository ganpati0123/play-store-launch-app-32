// Tab 4 - Recharge & Bills Level 1: Service Type Selection
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../context/ThemeContext';
import { mockServiceTypes, mockBills, mockOperators } from '../../data/mockData';
import { ServiceType, Operator } from '../../types';

interface Props { navigation: any; }

export const RechargeLevel1Screen: React.FC<Props> = ({ navigation }) => {
  const { isDark, colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleServicePress = async (service: { id: ServiceType; name: string }, operators: Operator[]) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedService(service.id);
    
    navigation.navigate('RechargeLevel2_EnterDetails', { 
      serviceType: service.id,
      operators: operators,
    });
  };

  const pendingBills = mockBills.filter(b => b.status === 'PENDING');

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Recharge & Bills</Text>
      </View>

      {/* Search */}
      <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search mobile number, biller..."
          placeholderTextColor={colors.textTertiary}
          style={[styles.searchInput, { color: colors.text }]}
        />
      </View>

      {/* Pending Bills Alert */}
      {pendingBills.length > 0 && (
        <TouchableOpacity style={[styles.billsAlert, { backgroundColor: colors.warning + '20' }]}>
          <Text style={styles.billsAlertIcon}>⚠️</Text>
          <Text style={[styles.billsAlertText, { color: colors.text }]}>
            You have {pendingBills.length} pending {pendingBills[0].type} bill{pendingBills.length > 1 ? 's' : ''}
          </Text>
          <Text style={styles.billsAlertArrow}>›</Text>
        </TouchableOpacity>
      )}

      {/* Service Types */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.servicesContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Mobile & DTH</Text>
        <View style={styles.servicesGrid}>
          {mockServiceTypes.slice(0, 2).map((service) => (
            <TouchableOpacity
              key={service.id}
              style={[styles.serviceCard, { backgroundColor: colors.card }]}
              onPress={() => handleServicePress(service, mockOperators.filter(o => o.type === service.id))}
            >
              <View style={[styles.serviceIcon, { backgroundColor: service.color + '20' }]}>
                <Text style={styles.serviceEmoji}>{service.icon}</Text>
              </View>
              <Text style={[styles.serviceName, { color: colors.text }]}>{service.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Utilities</Text>
        <View style={styles.servicesGrid}>
          {mockServiceTypes.slice(2, 7).map((service) => (
            <TouchableOpacity
              key={service.id}
              style={[styles.serviceCard, { backgroundColor: colors.card }]}
              onPress={() => handleServicePress(service, mockOperators.filter(o => o.type === service.id))}
            >
              <View style={[styles.serviceIcon, { backgroundColor: service.color + '20' }]}>
                <Text style={styles.serviceEmoji}>{service.icon}</Text>
              </View>
              <Text style={[styles.serviceName, { color: colors.text }]}>{service.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Financial</Text>
        <View style={styles.servicesGrid}>
          {mockServiceTypes.slice(7).map((service) => (
            <TouchableOpacity
              key={service.id}
              style={[styles.serviceCard, { backgroundColor: colors.card }]}
              onPress={() => handleServicePress(service, mockOperators.filter(o => o.type === service.id))}
            >
              <View style={[styles.serviceIcon, { backgroundColor: service.color + '20' }]}>
                <Text style={styles.serviceEmoji}>{service.icon}</Text>
              </View>
              <Text style={[styles.serviceName, { color: colors.text }]}>{service.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E8ECEF' },
  headerTitle: { fontSize: 24, fontWeight: '700' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginTop: 16, borderRadius: 12, paddingHorizontal: 16 },
  searchIcon: { fontSize: 18, marginRight: 12 },
  searchInput: { flex: 1, fontSize: 16, paddingVertical: 14 },
  billsAlert: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginTop: 16, padding: 16, borderRadius: 12 },
  billsAlertIcon: { fontSize: 18, marginRight: 12 },
  billsAlertText: { flex: 1, fontSize: 14, fontWeight: '500' },
  billsAlertArrow: { fontSize: 20, color: '#636E72' },
  servicesContainer: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16, marginTop: 8 },
  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  serviceCard: { width: '48%', padding: 16, borderRadius: 16, marginBottom: 16, alignItems: 'center' },
  serviceIcon: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  serviceEmoji: { fontSize: 28 },
  serviceName: { fontSize: 14, fontWeight: '600' },
});

export default RechargeLevel1Screen;
