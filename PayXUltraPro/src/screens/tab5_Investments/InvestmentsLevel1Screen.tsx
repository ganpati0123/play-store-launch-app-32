// Tab 5 - Investments Level 1: Investment Categories
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, RefreshControl, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../context/ThemeContext';
import { mockInvestmentCategories, mockGoldPrice, mockPortfolio, mockMutualFunds, formatCurrency, generateChartData } from '../../data/mockData';
import { InvestmentType } from '../../types';
import { SkeletonLoader } from '../../components/UI';

interface Props { navigation: any; }

export const InvestmentsLevel1Screen: React.FC<Props> = ({ navigation }) => {
  const { isDark, colors } = useTheme();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [goldPrice, setGoldPrice] = useState(mockGoldPrice);
  const [portfolio, setPortfolio] = useState(mockPortfolio);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const chartAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setGoldPrice(mockGoldPrice);
    setPortfolio(mockPortfolio);
    setIsLoading(false);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadData();
    setIsRefreshing(false);
  };

  const handleCategoryPress = async (category: { type: InvestmentType; name: string }) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('InvestmentsLevel2_Details', { type: category.type });
  };

  const handleInvestNow = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('InvestmentsLevel2_Details', { type: 'GOLD' });
  };

  const renderChart = () => (
    <View style={styles.chartContainer}>
      <View style={styles.chartArea}>
        {generateChartData(30, 60000).map((point, i) => (
          <View key={i} style={[styles.chartBar, { height: (point.value / 62000) * 100 }]} />
        ))}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Investments</Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} tintColor={colors.primary} />}
      >
        {/* Portfolio Summary Card */}
        <View style={[styles.portfolioCard, { backgroundColor: colors.surface }]}>
          <LinearGradient
            colors={isDark ? ['#6C5CE7', '#A29BFE'] : ['#6C5CE7', '#00CEC9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.portfolioGradient}
          >
            <Text style={styles.portfolioLabel}>Total Portfolio Value</Text>
            <Text style={styles.portfolioAmount}>{formatCurrency(portfolio.totalValue)}</Text>
            <View style={styles.portfolioChange}>
              <Text style={styles.portfolioChangeText}>
                {portfolio.todaysChange >= 0 ? '+' : ''}{formatCurrency(portfolio.todaysChange)} ({portfolio.todaysChangePercent.toFixed(2)}%)
              </Text>
              <Text style={styles.portfolioChangeLabel}>Today</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Gold Quick View */}
        <View style={[styles.goldCard, { backgroundColor: colors.card }]}>
          <View style={styles.goldHeader}>
            <Text style={styles.goldIcon}>🥇</Text>
            <View style={styles.goldInfo}>
              <Text style={[styles.goldTitle, { color: colors.text }]}>Digital Gold</Text>
              <Text style={[styles.goldSubtitle, { color: colors.textSecondary }]}>24K Gold</Text>
            </View>
            <TouchableOpacity style={[styles.goldButton, { backgroundColor: colors.primary }]} onPress={handleInvestNow}>
              <Text style={styles.goldButtonText}>Invest</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.goldPrices}>
            <View style={styles.goldPriceItem}>
              <Text style={[styles.goldPriceLabel, { color: colors.textSecondary }]}>Current Price</Text>
              <Text style={[styles.goldPriceValue, { color: colors.text }]}>{formatCurrency(goldPrice.currentPrice)}/10g</Text>
            </View>
            <View style={styles.goldPriceItem}>
              <Text style={[styles.goldPriceLabel, { color: colors.textSecondary }]}>Today's Change</Text>
              <Text style={[styles.goldPriceValue, { color: goldPrice.priceChange >= 0 ? colors.success : colors.error }]}>
                {goldPrice.priceChange >= 0 ? '+' : ''}{goldPrice.priceChange} ({goldPrice.priceChangePercent.toFixed(2)}%)
              </Text>
            </View>
          </View>
        </View>

        {/* Investment Categories */}
        <View style={styles.categoriesSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Investment Options</Text>
          <View style={styles.categoriesGrid}>
            {mockInvestmentCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryCard, { backgroundColor: colors.card }]}
                onPress={() => handleCategoryPress(category)}
              >
                <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                  <Text style={styles.categoryEmoji}>{category.icon}</Text>
                </View>
                <Text style={[styles.categoryName, { color: colors.text }]}>{category.name}</Text>
                <Text style={[styles.categoryDesc, { color: colors.textSecondary }]}>{category.description}</Text>
                <Text style={styles.categoryArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Popular Mutual Funds */}
        <View style={styles.fundsSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Popular Funds</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAll, { color: colors.primary }]}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.fundsScroll}>
            {mockMutualFunds.slice(0, 5).map((fund) => (
              <TouchableOpacity 
                key={fund.id} 
                style={[styles.fundCard, { backgroundColor: colors.card }]}
                onPress={() => handleCategoryPress({ type: 'MUTUAL_FUND' as InvestmentType })}
              >
                <Text style={[styles.fundName, { color: colors.text }]} numberOfLines={1}>{fund.name}</Text>
                <Text style={[styles.fundHouse, { color: colors.textSecondary }]}>{fund.fundHouse}</Text>
                <Text style={[styles.fundNav, { color: colors.text }]}>NAV: ₹{fund.nav.toFixed(2)}</Text>
                <Text style={[
                  styles.fundReturn,
                  { color: fund.return1Y >= 0 ? colors.success : colors.error }
                ]}>
                  {fund.return1Y >= 0 ? '+' : ''}{fund.return1Y}% 1Y
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
  portfolioCard: { marginHorizontal: 20, marginTop: 16, borderRadius: 20, overflow: 'hidden' },
  portfolioGradient: { padding: 20 },
  portfolioLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 14, marginBottom: 4 },
  portfolioAmount: { color: '#FFFFFF', fontSize: 32, fontWeight: '700' },
  portfolioChange: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  portfolioChangeText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  portfolioChangeLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginLeft: 8 },
  goldCard: { marginHorizontal: 20, marginTop: 16, borderRadius: 16, padding: 16 },
  goldHeader: { flexDirection: 'row', alignItems: 'center' },
  goldIcon: { fontSize: 36, marginRight: 12 },
  goldInfo: { flex: 1 },
  goldTitle: { fontSize: 18, fontWeight: '600' },
  goldSubtitle: { fontSize: 13 },
  goldButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  goldButtonText: { color: '#FFF', fontSize: 13, fontWeight: '600' },
  goldPrices: { flexDirection: 'row', marginTop: 16 },
  goldPriceItem: { flex: 1 },
  goldPriceLabel: { fontSize: 12 },
  goldPriceValue: { fontSize: 16, fontWeight: '600', marginTop: 2 },
  categoriesSection: { paddingHorizontal: 20, paddingTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16 },
  categoriesGrid: {},
  categoryCard: { padding: 16, borderRadius: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center' },
  categoryIcon: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  categoryEmoji: { fontSize: 24 },
  categoryName: { fontSize: 16, fontWeight: '600', flex: 1 },
  categoryDesc: { fontSize: 13 },
  categoryArrow: { fontSize: 20, color: '#636E72' },
  fundsSection: { paddingTop: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },
  seeAll: { fontSize: 14, fontWeight: '600' },
  fundsScroll: { paddingLeft: 20 },
  fundCard: { width: 160, padding: 12, borderRadius: 12, marginRight: 12 },
  fundName: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  fundHouse: { fontSize: 12, marginBottom: 8 },
  fundNav: { fontSize: 13, fontWeight: '500' },
  fundReturn: { fontSize: 13, fontWeight: '600', marginTop: 4 },
  chartContainer: { height: 60, flexDirection: 'row', alignItems: 'flex-end', marginTop: 16 },
  chartArea: { flex: 1, flexDirection: 'row', alignItems: 'flex-end' },
  chartBar: { width: 8, backgroundColor: '#6C5CE7', marginHorizontal: 1, borderRadius: 4 },
});

export default InvestmentsLevel1Screen;
