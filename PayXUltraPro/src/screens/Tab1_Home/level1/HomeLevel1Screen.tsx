// PayX Ultra Pro - Tab 1 Home Deep Navigation Screens
// Level 1: Home/Payments Main Screen

import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  FlatList,
  RefreshControl,
  Animated,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import { mockContacts, mockTransactions, mockQuickActions, simulateDelay } from '../../data/mockData';
import { Contact, Transaction } from '../../types';
import { Button, Input, QuickActionBtn, ContactItem, TransactionItem, SkeletonLoader } from '../../components/UI';

interface HomeLevel1Props {
  navigation: any;
}

// =====================
// HOME LEVEL 1 SCREEN
// =====================

export const HomeLevel1Screen: React.FC<HomeLevel1Props> = ({ navigation }) => {
  const { isDark, colors } = useTheme();
  const { user, contacts, transactions, isLoading, getRecentContacts, getFavoriteContacts, searchContacts } = useUser();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    loadContacts();
  }, []);
  
  const loadContacts = async () => {
    const recent = getRecentContacts(10);
    setFilteredContacts(recent);
  };
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await simulateDelay(1500);
    loadContacts();
    setIsRefreshing(false);
  };
  
  const handleContactPress = async (contact: Contact) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('HomeLevel2_EnterAmount', { contact });
  };
  
  const handleQuickActionPress = async (action: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (action === 'recharge') {
      navigation.navigate('Tab4_Recharge');
    } else if (action === 'scan') {
      navigation.navigate('Tab2_Scan');
    } else if (action === 'investment') {
      navigation.navigate('Tab5_Investments');
    }
  };
  
  const handleSendMoney = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('HomeLevel2_EnterAmount', { contact: null });
  };
  
  const handleQrCode = () => {
    navigation.navigate('HomeLevel2_EnterAmount', { contact: null, showQR: true });
  };

  const recentContacts = getRecentContacts(8);
  const favoriteContacts = getFavoriteContacts();
  const recentTransactions = transactions.slice(0, 5);

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
      >
        {/* Header Section with Gradient */}
        <LinearGradient
          colors={isDark ? ['#2D3436', '#1A1A2E'] : ['#6C5CE7', '#A29BFE']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            {/* User Info Row */}
            <View style={styles.userInfoRow}>
              <View>
                <Text style={styles.greetingText}>Hello,</Text>
                <Text style={styles.userNameText}>{user?.name || 'User'}</Text>
              </View>
              <TouchableOpacity 
                style={styles.avatarButton}
                onPress={handleQrCode}
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{(user?.name || 'U').slice(0, 2).toUpperCase()}</Text>
                </View>
              </TouchableOpacity>
            </View>
            
            {/* Balance Card */}
            <View style={styles.balanceCard}>
              <View style={styles.balanceContent}>
                <Text style={styles.balanceLabel}>Available Balance</Text>
                <Text style={styles.balanceAmount}>₹{user?.balance?.toLocaleString('en-IN') || '0'}</Text>
              </View>
              <View style={styles.balanceActions}>
                <TouchableOpacity style={styles.balanceActionBtn} onPress={handleSendMoney}>
                  <Text style={styles.balanceActionText}>Send</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.balanceActionBtn, styles.balanceActionBtnSecondary]}
                  onPress={() => {}}
                >
                  <Text style={[styles.balanceActionText, styles.balanceActionTextSecondary]}>Request</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* UPI ID Display */}
            <View style={styles.upiIdRow}>
              <Text style={styles.upiIdLabel}>UPI ID</Text>
              <Text style={styles.upiIdText}>{user?.upiId || 'user@payx'}</Text>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.copyText}>Copy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
        
        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsRow}>
            {mockQuickActions.slice(0, 8).map((action) => (
              <QuickActionBtn
                key={action.id}
                label={action.label}
                icon={action.icon}
                color={action.color}
                onPress={() => handleQuickActionPress(action.action)}
              />
            ))}
          </View>
        </View>
        
        {/* Recent Contacts */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Contacts</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {isLoading ? (
            <SkeletonLoader height={60} count={4} />
          ) : (
            <View style={styles.contactsList}>
              {recentContacts.slice(0, 8).map((contact) => (
                <TouchableOpacity
                  key={contact.id}
                  style={styles.contactItem}
                  onPress={() => handleContactPress(contact)}
                >
                  <View style={styles.contactAvatar}>
                    <Text style={styles.contactInitials}>
                      {contact.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                    </Text>
                  </View>
                  <Text style={styles.contactName} numberOfLines={1}>{contact.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        
        {/* Recent Transactions */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Tab3_Transactions')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {isLoading ? (
            <SkeletonLoader height={70} count={3} />
          ) : (
            <View style={styles.transactionsList}>
              {recentTransactions.map((transaction) => (
                <TouchableOpacity
                  key={transaction.id}
                  style={styles.transactionItem}
                  onPress={() => {}}
                >
                  <View style={[
                    styles.transactionIcon,
                    { 
                      backgroundColor: transaction.type === 'SENT' 
                        ? colors.error + '20' 
                        : colors.success + '20' 
                    }
                  ]}>
                    <Text style={styles.transactionIconText}>
                      {transaction.type === 'SENT' ? '↑' : '↓'}
                    </Text>
                  </View>
                  <View style={styles.transactionInfo}>
                    <Text style={styles.transactionName}>
                      {transaction.type === 'SENT' ? transaction.recipientName : transaction.senderName}
                    </Text>
                    <Text style={styles.transactionNote} numberOfLines={1}>
                      {transaction.note || (transaction.type === 'SENT' ? 'Sent to' : 'Received from')}
                    </Text>
                  </View>
                  <View style={styles.transactionAmount}>
                    <Text style={[
                      styles.transactionAmountText,
                      { color: transaction.type === 'SENT' ? colors.error : colors.success }
                    ]}>
                      {transaction.type === 'SENT' ? '-' : '+'}₹{transaction.amount.toLocaleString('en-IN')}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        
        {/* Bottom Spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  headerGradient: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerContent: {},
  userInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
  },
  userNameText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  avatarButton: {},
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  balanceCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    backdropFilter: 'blur(10px)',
  },
  balanceContent: {
    marginBottom: 16,
  },
  balanceLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  balanceActions: {
    flexDirection: 'row',
  },
  balanceActionBtn: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginRight: 12,
  },
  balanceActionBtnSecondary: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  balanceActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6C5CE7',
  },
  balanceActionTextSecondary: {
    color: '#FFFFFF',
  },
  upiIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  upiIdLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginRight: 8,
  },
  upiIdText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
    flex: 1,
  },
  copyText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3436',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6C5CE7',
  },
  contactsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contactItem: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6C5CE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  contactInitials: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  contactName: {
    fontSize: 12,
    color: '#636E72',
    textAlign: 'center',
  },
  transactionsList: {},
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E8ECEF',
  },
  transactionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionIconText: {
    fontSize: 20,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2D3436',
  },
  transactionNote: {
    fontSize: 13,
    color: '#636E72',
    marginTop: 2,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  transactionAmountText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

// Export all levels
export default HomeLevel1Screen;