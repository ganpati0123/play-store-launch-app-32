// PayX Ultra Pro - UI Components
// Glassmorphism and Neumorphic Card Components

import React, { useRef, useImperativeHandle, forwardRef, ReactNode } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ViewStyle, 
  TextStyle,
  Animated,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../context/ThemeContext';

interface GlassCardProps {
  children: ReactNode;
  style?: ViewStyle;
  intensity?: 'low' | 'medium' | 'high';
  borderRadius?: number;
  padding?: number;
  onPress?: () => void;
  disabled?: boolean;
}

// Glassmorphism Card
export const GlassCard: React.FC<GlassCardProps> = forwardRef<View, GlassCardProps>(
  ({ children, style, intensity = 'medium', borderRadius = 16, padding = 16, onPress, disabled }, ref) => {
    const { isDark, colors } = useTheme();
    const scaleAnim = useRef(new Animated.Value(1)).current;
    
    const intensityValues = {
      low: 0.3,
      medium: 0.5,
      high: 0.7,
    };
    
    const handlePressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.98,
        useNativeDriver: true,
      }).start();
    };
    
    const handlePressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };
    
    const handlePress = async () => {
      if (disabled) return;
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      if (onPress) onPress();
    };
    
    const glassStyle: ViewStyle = {
      backgroundColor: isDark 
        ? `rgba(22, 27, 34, ${intensityValues[intensity]})`
        : `rgba(255, 255, 255, ${intensityValues[intensity]})`,
      borderWidth: 1,
      borderColor: isDark 
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(255, 255, 255, 0.5)',
      borderRadius,
      padding,
      overflow: 'hidden',
    };
    
    const content = (
      <View style={[glassStyle, style]}>
        {children}
      </View>
    );
    
    if (onPress) {
      return (
        <Animated.View ref={ref} style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            activeOpacity={1}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handlePress}
            disabled={disabled}
          >
            {content}
          </TouchableOpacity>
        </Animated.View>
      );
    }
    
    return <View ref={ref} style={content.style}>{content}</View>;
  }
);

// Neumorphic Card
export const NeumorphicCard: React.FC<GlassCardProps & { pressed?: boolean }> = ({
  children, style, borderRadius = 16, padding = 16, onPress, disabled, pressed = false
}) => {
  const { isDark, colors } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };
  
  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  
  const handlePress = async () => {
    if (disabled) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onPress) onPress();
  };
  
  const cardStyle: ViewStyle = pressed
    ? {
        backgroundColor: isDark ? colors.neumorphShadow : colors.neumorphShadow,
        borderRadius,
        padding,
        shadowOffset: { width: -2, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }
    : {
        backgroundColor: isDark ? colors.neumorphHighlight : colors.neumorphHighlight,
        borderRadius,
        padding,
        shadowColor: isDark ? '#000' : colors.neumorphShadow,
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      };
  
  const content = (
    <View style={[cardStyle, style]}>
      {children}
    </View>
  );
  
  if (onPress) {
    return (
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handlePress}
          disabled={disabled}
        >
          {content}
        </TouchableOpacity>
      </Animated.View>
    );
  }
  
  return content;
};

// Gradient Card
interface GradientCardProps extends GlassCardProps {
  gradientColors?: string[];
  gradientStart?: { x: number; y: number };
  gradientEnd?: { x: number; y: number };
}

export const GradientCard: React.FC<GradientCardProps> = ({
  children, 
  style, 
  borderRadius = 16, 
  padding = 16, 
  onPress, 
  disabled,
  gradientColors,
  gradientStart = { x: 0, y: 0 },
  gradientEnd = { x: 1, y: 1 },
}) => {
  const { isDark, colors } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const defaultGradientColors = gradientColors || (isDark ? colors.gradientPrimary : colors.gradientPrimary);
  
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };
  
  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  
  const handlePress = async () => {
    if (disabled) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onPress) onPress();
  };
  
  const content = (
    <LinearGradient
      colors={defaultGradientColors as [string, string, ...string[]]}
      start={gradientStart}
      end={gradientEnd}
      style={[{ borderRadius, padding, overflow: 'hidden' }, style]}
    >
      {children}
    </LinearGradient>
  );
  
  if (onPress) {
    return (
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handlePress}
          disabled={disabled}
        >
          {content}
        </TouchableOpacity>
      </Animated.View>
    );
  }
  
  return content;
};

// Elevated Card
interface ElevatedCardProps extends GlassCardProps {
  elevation?: 'low' | 'medium' | 'high';
}

export const ElevatedCard: React.FC<ElevatedCardProps> = ({
  children, 
  style, 
  borderRadius = 16, 
  padding = 16, 
  onPress, 
  disabled,
  elevation = 'medium',
}) => {
  const { isDark, colors } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  const elevationValues = {
    low: { shadowOpacity: 0.1, elevation: 2 },
    medium: { shadowOpacity: 0.15, elevation: 4 },
    high: { shadowOpacity: 0.2, elevation: 8 },
  };
  
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };
  
  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  
  const handlePress = async () => {
    if (disabled) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onPress) onPress();
  };
  
  const cardStyle: ViewStyle = {
    backgroundColor: colors.surface,
    borderRadius,
    padding,
    ...elevationValues[elevation],
  };
  
  const content = (
    <View style={[cardStyle, style]}>
      {children}
    </View>
  );
  
  if (onPress) {
    return (
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handlePress}
          disabled={disabled}
        >
          {content}
        </TouchableOpacity>
      </Animated.View>
    );
  }
  
  return content;
};

// Avatar Component
interface AvatarProps {
  source?: string;
  name: string;
  size?: number;
  color?: string;
  onPress?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  source, 
  name, 
  size = 50, 
  color,
  onPress 
}) => {
  const { colors } = useTheme();
  
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  const getBackgroundColor = (name: string): string => {
    const colorsArray = [colors.primary, colors.secondary, colors.accent, colors.success, colors.warning];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colorsArray[Math.abs(hash) % colorsArray.length];
  };
  
  const backgroundColor = color || getBackgroundColor(name);
  
  const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onPress) onPress();
  };
  
  const containerStyle: ViewStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  };
  
  const textStyle: TextStyle = {
    fontSize: size / 2.5,
    fontWeight: '600',
    color: '#FFFFFF',
  };
  
  const content = (
    <View style={containerStyle}>
      <Text style={textStyle}>{getInitials(name)}</Text>
    </View>
  );
  
  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
        {content}
      </TouchableOpacity>
    );
  }
  
  return content;
};

// Status Badge
interface StatusBadgeProps {
  status: 'SUCCESS' | 'FAILED' | 'PENDING' | 'CANCELLED' | 'REFUNDED' | 'VERIFIED' | 'ACTIVE';
  size?: 'small' | 'medium' | 'large';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'medium' }) => {
  const { colors } = useTheme();
  
  const statusConfig = {
    SUCCESS: { color: colors.success, bg: colors.successLight, label: 'Success' },
    FAILED: { color: colors.error, bg: colors.errorLight, label: 'Failed' },
    PENDING: { color: colors.warning, bg: colors.warningLight, label: 'Pending' },
    CANCELLED: { color: colors.textTertiary, bg: colors.divider, label: 'Cancelled' },
    REFUNDED: { color: colors.info, bg: colors.infoLight, label: 'Refunded' },
    VERIFIED: { color: colors.success, bg: colors.successLight, label: 'Verified' },
    ACTIVE: { color: colors.success, bg: colors.successLight, label: 'Active' },
  };
  
  const config = statusConfig[status];
  
  const sizeConfig = {
    small: { paddingH: 6, paddingV: 2, fontSize: 10 },
    medium: { paddingH: 8, paddingV: 4, fontSize: 12 },
    large: { paddingH: 12, paddingV: 6, fontSize: 14 },
  };
  
  const s = sizeConfig[size];
  
  return (
    <View style={[
      {
        backgroundColor: config.bg,
        paddingHorizontal: s.paddingH,
        paddingVertical: s.paddingV,
        borderRadius: s.fontSize,
      }
    ]}>
      <Text style={{
        color: config.color,
        fontSize: s.fontSize,
        fontWeight: '600',
      }}>
        {config.label}
      </Text>
    </View>
  );
};

// Amount Display
interface AmountDisplayProps {
  amount: number;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  showSign?: boolean;
  color?: string;
}

export const AmountDisplay: React.FC<AmountDisplayProps> = ({
  amount,
  size = 'medium',
  showSign = false,
  color,
}) => {
  const { colors } = useTheme();
  
  const sizeConfig = {
    small: { amount: 14, sign: 10 },
    medium: { amount: 18, sign: 12 },
    large: { amount: 24, sign: 16 },
    xlarge: { amount: 32, sign: 20 },
  };
  
  const s = sizeConfig[size];
  const isPositive = amount >= 0;
  const displayColor = color || (isPositive ? colors.success : colors.error);
  
  const formatAmount = (num: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(Math.abs(num));
  };
  
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
      {showSign && (
        <Text style={{
          color: displayColor,
          fontSize: s.sign,
          fontWeight: '600',
          marginRight: 2,
        }}>
          {isPositive ? '+' : '-'}
        </Text>
      )}
      <Text style={{
        color: color || colors.text,
        fontSize: s.amount,
        fontWeight: '700',
      }}>
        {showSign ? formatAmount(amount) : `₹${amount.toLocaleString('en-IN')}`}
      </Text>
    </View>
  );
};

// Skeleton Loader
interface SkeletonProps {
  width?: number | string;
  height: number;
  borderRadius?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 8,
}) => {
  const { colors } = useTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;
  
  React.useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);
  
  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });
  
  return (
    <Animated.View style={{
      width,
      height,
      borderRadius,
      backgroundColor: isDark ? colors.neumorphShadow : colors.neumorphShadow,
      opacity,
    }} />
  );
};

// Divider
interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  color?: string;
  thickness?: number;
  spacing?: number;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  color,
  thickness = 1,
  spacing = 16,
}) => {
  const { colors } = useTheme();
  
  if (orientation === 'vertical') {
    return (
      <View style={{
        width: thickness,
        height: '100%',
        backgroundColor: color || colors.divider,
        marginHorizontal: spacing,
      }} />
    );
  }
  
  return (
    <View style={{
      height: thickness,
      backgroundColor: color || colors.divider,
      marginVertical: spacing,
    }} />
  );
};

// Spacer
interface SpacerProps {
  size?: number;
}

export const Spacer: React.FC<SpacerProps> = ({ size = 16 }) => {
  return <View style={{ height: size, width: size }} />;
};

// Icon Wrapper
interface IconWrapperProps {
  icon: ReactNode;
  size?: number;
  color?: string;
  backgroundColor?: string;
  onPress?: () => void;
}

export const IconWrapper: React.FC<IconWrapperProps> = ({
  icon,
  size = 40,
  color,
  backgroundColor,
  onPress,
}) => {
  const { colors } = useTheme();
  
  const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onPress) onPress();
  };
  
  const wrapperStyle: ViewStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: backgroundColor || (isDark ? colors.neumorphShadow : colors.neumorphShadow),
    justifyContent: 'center',
    alignItems: 'center',
  };
  
  const content = (
    <View style={wrapperStyle}>
      {icon}
    </View>
  );
  
  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
        {content}
      </TouchableOpacity>
    );
  }
  
  return content;
};

// Need to add isDark to useTheme destructuring
const useThemeWithDark = () => {
  const { isDark, colors } = useTheme();
  return { isDark, colors };
};

// Update components to use useThemeWithDark
import { useTheme as useThemeOriginal } from '../context/ThemeContext';