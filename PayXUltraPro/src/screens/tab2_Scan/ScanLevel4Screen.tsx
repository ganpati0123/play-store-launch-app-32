// Tab 2 - Scan Level 1: Camera Viewfinder with Gallery Option
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../context/ThemeContext';

interface ScanLevel4Props { navigation: any; }

export const ScanLevel4Screen: React.FC<ScanLevel4Props> = ({ navigation }) => {
  const { isDark, colors } = useTheme();
  const [flashMode, setFlashMode] = useState<'on' | 'off'>('off');
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleScan = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Navigate to mock scan result
    navigation.navigate('ScanLevel2_MerchantDetails', { 
      scanResult: {
        qrCode: { id: '1', type: 'MERCHANT', data: '', merchantId: 'm1', merchantName: 'Swiggy', merchantLogo: '', upiId: 'swiggy@restaurant', amount: 0, note: '', createdAt: '' },
        isValid: true,
        merchantName: 'Swiggy',
        merchantCategory: 'Food Delivery',
        upiId: 'swiggy@restaurant',
        riskLevel: 'LOW',
        verificationStatus: 'VERIFIED'
      }
    });
  };

  const handleGallery = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert('Gallery', 'Gallery picker would open here');
  };

  const handleFlashToggle = async () => {
    await Haptics.selectionAsync();
    setFlashMode(prev => prev === 'on' ? 'off' : 'on');
  };

  const renderScanFrame = () => (
    <View style={styles.scanFrameContainer}>
      <View style={[styles.scanFrame, { borderColor: colors.primary }]}>
        <View style={[styles.cornerTL, { borderColor: colors.primary }]} />
        <View style={[styles.cornerTR, { borderColor: colors.primary }]} />
        <View style={[styles.cornerBL, { borderColor: colors.primary }]} />
        <View style={[styles.cornerBR, { borderColor: colors.primary }]} />
        
        <Animated.View style={[styles.scanLine, { backgroundColor: colors.primary, transform: [{ scale: scaleAnim }]} />
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={isDark ? ['#0D1117', '#161B22'] : ['#2D3436', '#1A1A2E']}
        style={styles.gradientContainer}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Scan QR Code</Text>
          <TouchableOpacity style={styles.flashButton} onPress={handleFlashToggle}>
            <Text style={styles.flashText}>{flashMode === 'on' ? '⚡' : '⚡'}</Text>
          </TouchableOpacity>
        </View>

        {/* Camera Viewfinder */}
        <View style={styles.viewfinder}>
          {renderScanFrame()}
          <Text style={styles.scanHint}>Point camera at QR code</Text>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.card }]} onPress={handleGallery}>
            <Text style={styles.actionIcon}>🖼️</Text>
            <Text style={[styles.actionLabel, { color: colors.text }]}>Gallery</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.scanButton, { backgroundColor: colors.primary }]} 
            onPress={handleScan}
          >
            <View style={styles.scanButtonInner} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.card }]} onPress={() => {}}>
            <Text style={styles.actionIcon}>💡</Text>
            <Text style={[styles.actionLabel, { color: colors.text }]}>Flash</Text>
          </TouchableOpacity>
        </View>

        {/* Safety Tips */}
        <View style={styles.tips}>
          <Text style={styles.tipText}>🔒 Secure payments via UPI</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradientContainer: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20 },
  closeButton: { padding: 8 },
  closeText: { fontSize: 24, color: '#FFFFFF' },
  title: { fontSize: 18, fontWeight: '600', color: '#FFFFFF' },
  flashButton: { padding: 8 },
  flashText: { fontSize: 24 },
  viewfinder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scanFrameContainer: { width: 250, height: 250, justifyContent: 'center', alignItems: 'center' },
  scanFrame: { width: 250, height: 250, borderWidth: 3, borderRadius: 20, position: 'relative' },
  cornerTL: { position: 'absolute', top: -2, left: -2, width: 40, height: 40, borderTopWidth: 4, borderLeftWidth: 4, borderTopLeftRadius: 20 },
  cornerTR: { position: 'absolute', top: -2, right: -2, width: 40, height: 40, borderTopWidth: 4, borderRightWidth: 4, borderTopRightRadius: 20 },
  cornerBL: { position: 'absolute', bottom: -2, left: -2, width: 40, height: 40, borderBottomWidth: 4, borderLeftWidth: 4, borderBottomLeftRadius: 20 },
  cornerBR: { position: 'absolute', bottom: -2, right: -2, width: 40, height: 40, borderBottomWidth: 4, borderRightWidth: 4, borderBottomRightRadius: 20 },
  scanLine: { width: 200, height: 2, marginTop: 100, opacity: 0.7 },
  scanHint: { color: 'rgba(255,255,255,0.7)', fontSize: 14, marginTop: 24 },
  actions: { flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', paddingBottom: 60, paddingHorizontal: 20 },
  actionButton: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center' },
  actionIcon: { fontSize: 24, marginBottom: 4 },
  actionLabel: { fontSize: 11, fontWeight: '500' },
  scanButton: { width: 72, height: 72, borderRadius: 36, justifyContent: 'center', alignItems: 'center', borderWidth: 4, borderColor: 'rgba(255,255,255,0.3)' },
  scanButtonInner: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#FFFFFF' },
  tips: { alignItems: 'center', paddingBottom: 40 },
  tipText: { color: 'rgba(255,255,255,0.5)', fontSize: 12 },
});

export default ScanLevel4Screen;
