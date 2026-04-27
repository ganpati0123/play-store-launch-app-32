// Tab 3 - Transaction History Level 1: All Transactions List
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl, Animated, TextInput, Platform } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import { mockTransactions, simulateDelay, formatCurrency, formatDate } from '../../data/mockData';
import { Transaction } from '../../types';
import { TransactionItem, SkeletonLoader } from '../../components/UI';

interface Props { navigation: any; }

export const TransactionsLevel1Screen: React.FC<Props> = ({ navigation }) => {
  const { isDark, colors } = useTheme();
  const { transactions: userTransactions, getTransactionsByType, searchTransactions } = useUser();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'SENT' | 'RECEIVED' | 'PENDING'>('ALL');
  const [showSearch, setShowSearch] = useState(false);
  
  useEffect(() => {
    loadTransactions();
  }, [filterType]);
  
  const loadTransactions = async () => {
    setIsLoading(true);
    await simulateDelay(800);
    let data = mockTransactions;
    if (filterType !== 'ALL') {
      data = data.filter(t => t.type === filterType);
    }
    setTransactions(data);
    setIsLoading(false);
  };
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadTransactions();
    setIsRefreshing(false);
  };
  
  const handleTransactionPress = (transaction: Transaction) => {
    navigation.navigate('TransactionsLevel2_Details', { transaction });
  };

  const renderFilterTab = (type: 'ALL' | 'SENT' | 'RECEIVED' | 'PENDING', label: string) => (
    <TouchableOpacity 
      style={[styles.filterTab, filterType === type && { backgroundColor: colors.primary }]}
      onPress={() => setFilterType(type)}
    >
      <Text style={[styles.filterTabText, filterType === type && { color: '#FFF' }]}>{label}</Text>
    </TouchableOpacity>
  );

  const renderTransactionItem = ({ item }: { item: Transaction }) => (
    <TouchableOpacity 
      style={[styles.transactionItem, { backgroundColor: colors.surface }]}
      onPress={() => handleTransactionPress(item)}
    >
      <View style={styles.transactionLeft}>
        <View style={[
          styles.transactionIcon, 
          { backgroundColor: item.type === 'SENT' ? colors.error + '20' : item.type === 'RECEIVED' ? colors.success + '20' : colors.warning + '20' }
        ]}>
          <Text style={styles.transactionIconText}>{item.type === 'SENT' ? '↑' : item.type === 'RECEIVED' ? '↓' : '⏳'}</Text>
        </View>
        <View style={styles.transactionInfo}>
          <Text style={[styles.transactionName, { color: colors.text }]}>
            {item.type === 'SENT' ? item.recipientName : item.senderName}
          </Text>
          <Text style={[styles.transactionNote, { color: colors.textSecondary }]} numberOfLines={1}>
            {item.note || (item.type === 'SENT' ? 'Sent to' : 'Received from')} • {formatDate(item.createdAt)}
          </Text>
        </View>
      </View>
      <View style={styles.transactionRight}>
        <Text style={[
          styles.transactionAmount,
          { color: item.type === 'SENT' ? colors.error : item.type === 'RECEIVED' ? colors.success : colors.warning }
        ]}>
          {item.type === 'SENT' ? '- ₹' : '+ ₹'}{item.amount.toLocaleString('en-IN')}
        </Text>
        <Text style={[styles.transactionStatus, { color: item.status === 'SUCCESS' ? colors.success : colors.textTertiary }]}>
          {item.status}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Transactions</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.filterIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Search Bar */}
      {showSearch && (
        <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search transactions..."
            placeholderTextColor={colors.textTertiary}
            style={[styles.searchInput, { color: colors.text }]}
          />
        </View>
      )}
      
      {/* Filter Tabs */}
      <View style={styles.filterTabs}>
        {renderFilterTab('ALL', 'All')}
        {renderFilterTab('SENT', 'Sent')}
        {renderFilterTab('RECEIVED', 'Received')}
        {renderFilterTab('PENDING', 'Pending')}
      </View>
      
      {/* Transaction List */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <SkeletonLoader height={70} count={6} />
        </View>
      ) : (
        <FlatList
          data={transactions}
          renderItem={renderTransactionItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor={colors.primary}
            />
          }
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E8ECEF' },
  headerTitle: { fontSize: 24, fontWeight: '700' },
  headerActions: { flexDirection: 'row' },
  searchIcon: { fontSize: 20, marginRight: 16 },
  filterIcon: { fontSize: 20 },
  searchContainer: { marginHorizontal: 20, marginTop: 12, borderRadius: 12, paddingHorizontal: 16 },
  searchInput: { fontSize: 16, paddingVertical: 12 },
  filterTabs: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
  filterTab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F1F3F5' },
  filterTabText: { fontSize: 13, fontWeight: '500', color: '#636E72' },
  loadingContainer: { padding: 20 },
  listContent: { paddingBottom: 100 },
  transactionItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#E8ECEF' },
  transactionLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  transactionIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  transactionIconText: { fontSize: 20 },
  transactionInfo: { flex: 1 },
  transactionName: { fontSize: 15, fontWeight: '500' },
  transactionNote: { fontSize: 12, marginTop: 2 },
  transactionRight: { alignItems: 'flex-end' },
  transactionAmount: { fontSize: 15, fontWeight: '600' },
  transactionStatus: { fontSize: 11, marginTop: 2 },
});

export default TransactionsLevel1Screen;
