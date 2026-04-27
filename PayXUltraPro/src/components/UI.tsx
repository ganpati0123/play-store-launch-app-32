// PayX Ultra Pro - Reusable UI Components

import React, { useRef, useState, useCallback, ReactNode } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ViewStyle, 
  TextStyle,
  Animated,
  ScrollView,
  FlatList,
  RefreshControl,
  TextInput,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../context/ThemeContext';

// =====================
// BUTTON COMPONENTS
// =====================

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  style?: ViewStyle;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled,
  loading,
  icon,
  style,
  fullWidth,
}) => {
  const { isDark, colors, animationDuration } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
    setIsPressed(true);
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    setIsPressed(false);
  };

  const handlePress = async () => {
    if (disabled || loading) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  };

  const sizeStyles = {
    small: { paddingH: 12, paddingV: 8, fontSize: 12 },
    medium: { paddingH: 16, paddingV: 12, fontSize: 14 },
    large: { paddingH: 24, paddingV: 16, fontSize: 16 },
  };

  const s = sizeStyles[size];
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isOutline = variant === 'outline';
  const isGhost = variant === 'ghost';

  const buttonStyle: ViewStyle = {
    backgroundColor: disabled 
      ? colors.textTertiary
      : isPrimary 
        ? colors.primary
        : isSecondary 
          ? colors.secondary
          : isOutline 
            ? 'transparent'
            : 'transparent',
    borderWidth: isOutline ? 2 : 0,
    borderColor: isOutline ? colors.primary : 'transparent',
    paddingHorizontal: s.paddingH,
    paddingVertical: s.paddingV,
    borderRadius: 12,
    opacity: disabled ? 0.5 : 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: fullWidth ? '100%' : undefined,
  };

  const textColor = isPrimary || isSecondary 
    ? '#FFFFFF' 
    : isOutline 
      ? colors.primary 
      : colors.text;

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }], width: fullWidth ? '100%' : undefined }}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        disabled={disabled}
        style={[buttonStyle, style]}
      >
        {loading ? (
          <ActivityIndicator color={textColor} size="small" />
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {icon && <View style={{ marginRight: 8 }}>{icon}</View>}
            <Text style={{
              color: textColor,
              fontSize: s.fontSize,
              fontWeight: '600',
            }}>
              {title}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

// =====================
// INPUT COMPONENTS
// =====================

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  multiline?: boolean;
  numberOfLines?: number;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  disabled?: boolean;
  style?: ViewStyle;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  label,
  error,
  secureTextEntry,
  keyboardType = 'default',
  autoCapitalize = 'none',
  multiline,
  numberOfLines = 1,
  leftIcon,
  rightIcon,
  disabled,
  style,
  onFocus,
  onBlur,
}) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const inputContainerStyle: ViewStyle = {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: error 
      ? colors.error 
      : isFocused 
        ? colors.primary 
        : colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  };

  return (
    <View style={style}>
      {label && (
        <Text style={{
          color: colors.text,
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 8,
        }}>
          {label}
        </Text>
      )}
      <View style={inputContainerStyle}>
        {leftIcon && <View style={{ marginRight: 12 }}>{leftIcon}</View>}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textTertiary}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            flex: 1,
            color: colors.text,
            fontSize: 16,
            padding: 0,
          }}
        />
        {rightIcon && <View style={{ marginLeft: 12 }}>{rightIcon}</View>}
      </View>
      {error && (
        <Text style={{
          color: colors.error,
          fontSize: 12,
          marginTop: 4,
        }}>
          {error}
        </Text>
      )}
    </View>
  );
};

// =====================
// HEADER COMPONENT
// =====================

interface HeaderProps {
  title: string;
  subtitle?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  showBack?: boolean;
  onBackPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  showBack,
  onBackPress,
}) => {
  const { colors } = useTheme();

  const handleBack = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onBackPress?.();
  };

  return (
    <View style={{
      backgroundColor: colors.background,
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.divider,
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {showBack && (
          <TouchableOpacity
            onPress={handleBack}
            style={{ marginRight: 16 }}
          >
            <Text style={{ fontSize: 24, color: colors.primary }}>←</Text>
          </TouchableOpacity>
        )}
        {!showBack && leftIcon && (
          <TouchableOpacity onPress={onLeftPress} style={{ marginRight: 16 }}>
            {leftIcon}
          </TouchableOpacity>
        )}
        <View style={{ flex: 1 }}>
          <Text style={{
            color: colors.text,
            fontSize: 20,
            fontWeight: '700',
          }}>
            {title}
          </Text>
          {subtitle && (
            <Text style={{
              color: colors.textSecondary,
              fontSize: 14,
              marginTop: 2,
            }}>
              {subtitle}
            </Text>
          )}
        </View>
        {rightIcon && (
          <TouchableOpacity onPress={onRightPress}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// =====================
// LIST ITEM COMPONENT
// =====================

interface ListItemProps {
  title: string;
  subtitle?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  rightElement?: ReactNode;
  onPress?: () => void;
  showDivider?: boolean;
  disabled?: boolean;
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  rightElement,
  onPress,
  showDivider = true,
  disabled,
}) => {
  const { colors } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (onPress) {
      Animated.spring(scaleAnim, {
        toValue: 0.98,
        useNativeDriver: true,
      }).start();
    }
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
    onPress?.();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        activeOpacity={1}
        style={{
          backgroundColor: colors.surface,
          paddingHorizontal: 16,
          paddingVertical: 16,
          flexDirection: 'row',
          alignItems: 'center',
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {leftIcon && (
          <View style={{ marginRight: 16, width: 40, alignItems: 'center' }}>
            {leftIcon}
          </View>
        )}
        <View style={{ flex: 1 }}>
          <Text style={{
            color: colors.text,
            fontSize: 16,
            fontWeight: '500',
          }}>
            {title}
          </Text>
          {subtitle && (
            <Text style={{
              color: colors.textSecondary,
              fontSize: 14,
              marginTop: 2,
            }}>
              {subtitle}
            </Text>
          )}
        </View>
        {rightElement}
        {rightIcon && (
          <View style={{ marginLeft: 8 }}>
            {rightIcon}
          </View>
        )}
      </TouchableOpacity>
      {showDivider && (
        <View style={{
          height: 1,
          backgroundColor: colors.divider,
          marginLeft: 16,
        }} />
      )}
    </Animated.View>
  );
};

// =====================
// QUICK ACTION BUTTON
// =====================

interface QuickActionBtnProps {
  label: string;
  icon: string;
  color: string;
  onPress: () => void;
}

export const QuickActionBtn: React.FC<QuickActionBtnProps> = ({
  label,
  icon,
  color,
  onPress,
}) => {
  const { colors } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }], alignItems: 'center' }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={{
          alignItems: 'center',
          width: 70,
        }}
      >
        <View style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          backgroundColor: color + '20',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{ fontSize: 24 }}>{icon}</Text>
        </View>
        <Text style={{
          color: colors.text,
          fontSize: 11,
          fontWeight: '500',
          marginTop: 6,
          textAlign: 'center',
        }}>
          {label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// =====================
// AMOUNT INPUT COMPONENT
// =====================

interface AmountInputProps {
  amount: string;
  onChangeAmount: (amount: string) => void;
  placeholder?: string;
  error?: string;
  maxAmount?: number;
}

export const AmountInput: React.FC<AmountInputProps> = ({
  amount,
  onChangeAmount,
  placeholder = '0',
  error,
  maxAmount,
}) => {
  const { colors } = useTheme();
  
  const handleChange = (text: string) => {
    const cleaned = text.replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');
    if (parts.length > 2) return;
    if (parts[1] && parts[1].length > 2) return;
    onChangeAmount(cleaned);
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{
          color: colors.text,
          fontSize: 48,
          fontWeight: '700',
        }}>
          ₹
        </Text>
        <TextInput
          value={amount}
          onChangeText={handleChange}
          placeholder={placeholder}
          placeholderTextColor={colors.textTertiary}
          keyboardType="decimal-pad"
          style={{
            color: colors.text,
            fontSize: 48,
            fontWeight: '700',
            minWidth: 100,
          }}
        />
      </View>
      {error && (
        <Text style={{
          color: colors.error,
          fontSize: 12,
          marginTop: 8,
        }}>
          {error}
        </Text>
      )}
    </View>
  );
};

// =====================
// NUMERIC KEYPAD
// =====================

interface NumericKeypadProps {
  onKeyPress: (key: string) => void;
  onDelete: () => void;
  onSubmit?: () => void;
}

export const NumericKeypad: React.FC<NumericKeypadProps> = ({
  onKeyPress,
  onDelete,
  onSubmit,
}) => {
  const { colors } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['', '0', 'del'],
  ];

  const handleKeyPress = async (key: string) => {
    if (!key) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    if (key === 'del') {
      onDelete();
    } else if (key === 'submit' && onSubmit) {
      onSubmit();
    } else {
      onKeyPress(key);
    }
  };

  const renderKey = (key: string, rowIndex: number, keyIndex: number) => {
    const isDelete = key === 'del';
    const isEmpty = key === '';
    
    return (
      <TouchableOpacity
        key={`${rowIndex}-${keyIndex}`}
        onPress={() => handleKeyPress(key)}
        disabled={isEmpty}
        activeOpacity={0.7}
        style={{
          width: 80,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 4,
          borderRadius: 12,
          backgroundColor: isDelete 
            ? colors.error + '20' 
            : isEmpty 
              ? 'transparent' 
              : colors.card,
        }}
      >
        {isDelete ? (
          <Text style={{ fontSize: 24, color: colors.error }}>⌫</Text>
        ) : !isEmpty ? (
          <Text style={{
            color: colors.text,
            fontSize: 28,
            fontWeight: '500',
          }}>
            {key}
          </Text>
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      maxWidth: 280,
    }}>
      {keys.map((row, rowIndex) => 
        row.map((key, keyIndex) => renderKey(key, rowIndex, keyIndex))
      )}
    </View>
  );
};

// =====================
// TRANSACTION ITEM
// =====================

interface TransactionItemProps {
  transaction: {
    id: string;
    type: string;
    amount: number;
    recipientName?: string;
    senderName?: string;
    note?: string;
    createdAt: string;
    status: string;
  };
  onPress: () => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  onPress,
}) => {
  const { colors } = useTheme();
  const { formatCurrency, formatRelativeTime } = useFormatters();

  const isSent = transaction.type === 'SENT';
  const isReceived = transaction.type === 'RECEIVED';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        backgroundColor: colors.surface,
        paddingHorizontal: 16,
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <View style={{
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: isSent 
          ? colors.error + '20' 
          : isReceived 
            ? colors.success + '20' 
            : colors.warning + '20',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
      }}>
        <Text style={{ fontSize: 20 }}>
          {isSent ? '↑' : isReceived ? '↓' : '⏳'}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{
          color: colors.text,
          fontSize: 16,
          fontWeight: '500',
        }}>
          {isSent ? transaction.recipientName : transaction.senderName}
        </Text>
        <Text style={{
          color: colors.textSecondary,
          fontSize: 13,
          marginTop: 2,
        }}>
          {transaction.note || (isSent ? 'Sent to' : 'Received from')} • {formatRelativeTime(transaction.createdAt)}
        </Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={{
          color: isSent ? colors.error : isReceived ? colors.success : colors.warning,
          fontSize: 16,
          fontWeight: '600',
        }}>
          {isSent ? '-' : '+'}{formatCurrency(transaction.amount)}
        </Text>
        <Text style={{
          color: colors.textTertiary,
          fontSize: 12,
          marginTop: 2,
        }}>
          {transaction.status}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// =====================
// CONTACT ITEM
// =====================

interface ContactItemProps {
  contact: {
    id: string;
    name: string;
    phone?: string;
    upiId: string;
    avatar?: string;
    isFavorite: boolean;
  };
  onPress: () => void;
  showFavorite?: boolean;
}

export const ContactItem: React.FC<ContactItemProps> = ({
  contact,
  onPress,
  showFavorite = true,
}) => {
  const { colors } = useTheme();

  const getInitials = (name: string): string => {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  };

  const getColor = (name: string): string => {
    const colorPalette = [colors.primary, colors.secondary, colors.accent];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return colorPalette[Math.abs(hash) % colorPalette.length];
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        backgroundColor: colors.surface,
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <View style={{
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: getColor(contact.name),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
      }}>
        <Text style={{ color: '#FFF', fontSize: 18, fontWeight: '600' }}>
          {getInitials(contact.name)}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{
            color: colors.text,
            fontSize: 16,
            fontWeight: '500',
          }}>
            {contact.name}
          </Text>
          {showFavorite && contact.isFavorite && (
            <Text style={{ fontSize: 14, marginLeft: 6, color: colors.warning }}>★</Text>
          )}
        </View>
        <Text style={{
          color: colors.textSecondary,
          fontSize: 13,
          marginTop: 2,
        }}>
          {contact.phone || contact.upiId}
        </Text>
      </View>
      <Text style={{ fontSize: 20, color: colors.textTertiary }}>›</Text>
    </TouchableOpacity>
  );
};

// =====================
// SKELETON LOADER
// =====================

interface SkeletonLoaderProps {
  width?: number | string;
  height: number;
  borderRadius?: number;
  count?: number;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 8,
  count = 3,
}) => {
  const { isDark, colors } = useTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [items, setItems] = useState(Array.from({ length: count }));

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
    <View>
      {items.map((_, index) => (
        <Animated.View
          key={index}
          style={{
            width,
            height,
            borderRadius,
            backgroundColor: colors.neumorphShadow,
            opacity,
            marginBottom: 8,
          }}
        />
      ))}
    </View>
  );
};

// =====================
// EMPTY STATE
// =====================

interface EmptyStateProps {
  icon: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  subtitle,
  action,
}) => {
  const { colors } = useTheme();

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 32,
    }}>
      <Text style={{ fontSize: 64, marginBottom: 16 }}>{icon}</Text>
      <Text style={{
        color: colors.text,
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
      }}>
        {title}
      </Text>
      {subtitle && (
        <Text style={{
          color: colors.textSecondary,
          fontSize: 14,
          textAlign: 'center',
          marginTop: 8,
        }}>
          {subtitle}
        </Text>
      )}
      {action && <View style={{ marginTop: 24 }}>{action}</View>}
    </View>
  );
};

// =====================
// BOTTOM SHEET OPTION
// =====================

interface BottomSheetOptionProps {
  label: string;
  icon?: string;
  onPress: () => void;
  destructive?: boolean;
  disabled?: boolean;
}

export const BottomSheetOption: React.FC<BottomSheetOptionProps> = ({
  label,
  icon,
  onPress,
  destructive,
  disabled,
}) => {
  const { colors } = useTheme();

  const handlePress = async () => {
    if (disabled) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {icon && (
        <Text style={{ fontSize: 24, marginRight: 16 }}>{icon}</Text>
      )}
      <Text style={{
        color: destructive ? colors.error : colors.text,
        fontSize: 16,
        fontWeight: '500',
      }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

// Helper for formatters - needed by TransactionItem
import { useFormatters } from '../hooks/useCustom';