// PayX Ultra Pro - Navigation Configuration
// Tab Navigator with Nested Stack Navigators

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../context/ThemeContext';

// =====================
// TAB ICONS
// =====================

interface TabIconProps {
  focused: boolean;
  icon: string;
  label: string;
}

const TabIcon: React.FC<TabIconProps> = ({ focused, icon, label }) => {
  const { colors } = useTheme();
  
  return (
    <View style={styles.tabIconContainer}>
      <Text style={{
        fontSize: 24,
        opacity: focused ? 1 : 0.6,
      }}>
        {icon}
      </Text>
      <Text style={{
        color: focused ? colors.primary : colors.textTertiary,
        fontSize: 10,
        fontWeight: '600',
        marginTop: 2,
      }}>
        {label}
      </Text>
    </View>
  );
};

// =====================
// STACK NAVIGATORS
// =====================

export const HomeStack = createNativeStackNavigator();
export const ScanStack = createNativeStackNavigator();
export const TransactionStack = createNativeStackNavigator();
export const RechargeStack = createNativeStackNavigator();
export const InvestmentStack = createNativeStackNavigator();

// =====================
// TAB NAVIGATOR
// =====================

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { isDark, colors } = useTheme();
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? colors.surface : colors.surface,
          borderTopColor: colors.divider,
          borderTopWidth: 1,
          height: 80,
          paddingBottom: 16,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Tab1_Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="🏠" label="Home" />
          ),
        }}
      />
      <Tab.Screen
        name="Tab2_Scan"
        component={ScanStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="📷" label="Scan" />
          ),
        }}
      />
      <Tab.Screen
        name="Tab3_Transactions"
        component={TransactionStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="💳" label="History" />
          ),
        }}
      />
      <Tab.Screen
        name="Tab4_Recharge"
        component={RechargeStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="📱" label="Recharge" />
          ),
        }}
      />
      <Tab.Screen
        name="Tab5_Investments"
        component={InvestmentStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="📈" label="Invest" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// =====================
// PLACEHOLDER SCREENS (Will be replaced with actual implementations)
// =====================

import { TouchableOpacity } from 'react-native';

// Placeholder screen component
const PlaceholderScreen = ({ title, navigation, componentName }: { title: string; navigation?: any; componentName: string }) => {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.placeholderContainer, { backgroundColor: colors.background }]}>
      <Text style={{ fontSize: 48, marginBottom: 16 }}>📱</Text>
      <Text style={{ color: colors.text, fontSize: 20, fontWeight: '600' }}>{title}</Text>
      <Text style={{ color: colors.textSecondary, fontSize: 14, marginTop: 8 }}>Screen: {componentName}</Text>
    </View>
  );
};

// Stack Screen Wrappers
const HomeStackScreen = () => {
  const { colors } = useTheme();
  
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeLevel1">
        {({ navigation }) => (
          <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={{ color: colors.text, fontSize: 24, fontWeight: '700' }}>PayX Ultra Pro</Text>
            <Text style={{ color: colors.textSecondary, marginTop: 8 }}>Home Tab - Level 1</Text>
          </View>
        )}
      </HomeStack.Screen>
    </HomeStack.Navigator>
  );
};

const ScanStackScreen = () => {
  const { colors } = useTheme();
  
  return (
    <ScanStack.Navigator screenOptions={{ headerShown: false }}>
      <ScanStack.Screen name="ScanLevel1">
        {({ navigation }) => (
          <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={{ color: colors.text, fontSize: 24, fontWeight: '700' }}>Scan & Pay</Text>
            <Text style={{ color: colors.textSecondary, marginTop: 8 }}>Scan Tab - Level 1</Text>
          </View>
        )}
      </ScanStack.Screen>
    </ScanStack.Navigator>
  );
};

const TransactionStackScreen = () => {
  const { colors } = useTheme();
  
  return (
    <TransactionStack.Navigator screenOptions={{ headerShown: false }}>
      <TransactionStack.Screen name="TransactionsLevel1">
        {({ navigation }) => (
          <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={{ color: colors.text, fontSize: 24, fontWeight: '700' }}>Transactions</Text>
            <Text style={{ color: colors.textSecondary, marginTop: 8 }}>Transactions Tab - Level 1</Text>
          </View>
        )}
      </TransactionStack.Screen>
    </TransactionStack.Navigator>
  );
};

const RechargeStackScreen = () => {
  const { colors } = useTheme();
  
  return (
    <RechargeStack.Navigator screenOptions={{ headerShown: false }}>
      <RechargeStack.Screen name="RechargeLevel1">
        {({ navigation }) => (
          <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={{ color: colors.text, fontSize: 24, fontWeight: '700' }}>Recharge & Bills</Text>
            <Text style={{ color: colors.textSecondary, marginTop: 8 }}>Recharge Tab - Level 1</Text>
          </View>
        )}
      </RechargeStack.Screen>
    </RechargeStack.Navigator>
  );
};

const InvestmentStackScreen = () => {
  const { colors } = useTheme();
  
  return (
    <InvestmentStack.Navigator screenOptions={{ headerShown: false }}>
      <InvestmentStack.Screen name="InvestmentsLevel1">
        {({ navigation }) => (
          <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={{ color: colors.text, fontSize: 24, fontWeight: '700' }}>Investments</Text>
            <Text style={{ color: colors.textSecondary, marginTop: 8 }}>Investments Tab - Level 1</Text>
          </View>
        )}
      </InvestmentStack.Screen>
    </InvestmentStack.Navigator>
  );
};

// =====================
// MAIN NAVIGATOR
// =====================

export const AppNavigator = () => {
  const { isDark, colors } = useTheme();
  
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppNavigator;