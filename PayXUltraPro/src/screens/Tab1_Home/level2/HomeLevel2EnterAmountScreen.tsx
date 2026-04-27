// PayX Ultra Pro - Level 2 Enter Amount Screen
// Tab 1: Home Level 2 - Enter Amount

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Animated,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../../../context/ThemeContext';
import { useUser } from '../../../../context/UserContext';
import { Contact, mockContacts } from '../../../../data/mockData';
import { Button, Input, NumericKeypad } from '../../../../components/UI';

interface HomeLevel2Props {
  navigation: any;
  route: any;
}

// =====================
// HOME LEVEL 2 SCREEN
// =====================

export const HomeLevel2Screen: React.FC<HomeLevel2Props> = ({ navigation, route }) => {
  const { contact: initialContact } = route.params || {};
  const { isDark, colors } = useTheme();
  const { user,contacts,user:getUsercontacts } = useUser();
  
  const [selectedContact, setSelectedContact] = useState<Contact | null>(initialContact || null);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [showContactPicker, setShowContactPicker] = useState(!initialContact);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const amountAnim = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    if (showContactPicker) {
      setFilteredContacts(contacts);
    }
  }, [showContactPicker]);
  
  const handleContactSelect = async (contact: Contact) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedContact(contact);
    setShowContactPicker(false);
  };
  
  const handleAmountChange = (value: string) => {
    // Animation on amount change
    Animated.sequence([
      Animated.timing(amountAnim, {
        toValue: 1.05,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(amountAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    setAmount(value);
  };
  
  const handleKeyPress = async (key: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const newAmount = amount + key;
    setAmount(newAmount);
  };
  
  const handleDelete = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setAmount(amount.slice(0, -1));
  };
  
  const handleContinue = async () => {
    if (!selectedContact) {
      Alert.alert('Select Contact', 'Please select a contact to send money to');
      return;
    }
    
    const amountNum = parseFloat(amount);
    if (!amountNum || amountNum <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount');
      return;
    }
    
    if (amountNum > (user?.balance || 0)) {
      Alert.alert('Insufficient Balance', 'You do not have enough balance for this transaction');
      return;
    }
    
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('HomeLevel3_PIN', {
      contact: selectedContact,
      amount: amountNum,
      note: note,
    });
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter(c => 
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.phone?.includes(query) ||
        c.upiId.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredContacts(filtered);
    }
  };
  
  const renderContactItem = ({ item }: { item: Contact }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => handleContactSelect(item)}
    >
      <View style={styles.contactAvatar}>
        <Text style={styles.contactInitials}>
          {item.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
        </Text>
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactPhone}>{item.phone || item.upiId}</Text>
      </View>
      {item.isFavorite && <Text style={styles.favoriteIcon}>★</Text>}
    </TouchableOpacity>
  );
  
  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Send Money</Text>
        <View style={styles.headerPlaceholder} />
      </View>
      
      {/* Contact Selection */}
      <TouchableOpacity
        style={[styles.contactSelector, { backgroundColor: colors.card }]}
        onPress={() => setShowContactPicker(true)}
      >
        {selectedContact ? (
          <View style={styles.selectedContactRow}>
            <View style={styles.contactAvatar}>
              <Text style={styles.contactInitials}>
                {selectedContact.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
              </Text>
            </View>
            <View style={styles.selectedContactInfo}>
              <Text style={[styles.selectedContactName, { color: colors.text }]}>
                {selectedContact.name}
              </Text>
              <Text style={[styles.selectedContactUpi, { color: colors.textSecondary }]}>
                {selectedContact.upiId}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.selectContactRow}>
            <Text style={[styles.selectContactText, { color: colors.textSecondary }]}>
              Select a contact
            </Text>
          </View>
        )}
        <Text style={styles.chevronRight}>›</Text>
      </TouchableOpacity>
      
      {/* Amount Input */}
      <View style={styles.amountContainer}>
        <View style={styles.amountRow}>
          <Text style={[styles.currencySymbol, { color: colors.text }]}>₹</Text>
          <Animated.Text 
            style={[
              styles.amountText, 
              { color: colors.text, transform: [{ scale: amountAnim }] }
            ]}
          >
            {amount || '0'}
          </Animated.Text>
        </View>
        
        {/* Balance Hint */}
        <Text style={[styles.balanceHint, { color: colors.textSecondary }]}>
          Available: ₹{user?.balance?.toLocaleString('en-IN') || '0'}
        </Text>
      </View>
      
      {/* Note Input */}
      <View style={styles.noteContainer}>
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="Add a note (optional)"
          placeholderTextColor={colors.textTertiary}
          style={[styles.noteInput, { color: colors.text }]}
          maxLength={50}
        />
      </View>
      
      {/* Numeric Keypad */}
      <View style={styles.keypadContainer}>
        <NumericKeypad
          onKeyPress={handleKeyPress}
          onDelete={handleDelete}
        />
      </View>
      
      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <Button
          title="Continue"
          onPress={handleContinue}
          disabled={!amount || !selectedContact}
          fullWidth
        />
      </View>
      
      {/* Contact picker modal */}
      {showContactPicker && (
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Select Contact</Text>
              <TouchableOpacity onPress={() => setShowContactPicker(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <TextInput
              value={searchQuery}
              onChangeText={handleSearch}
              placeholder="Search contacts..."
              placeholderTextColor={colors.textTertiary}
              style={[styles.searchInput, { backgroundColor: colors.card, color: colors.text }]}
            />
            
            <FlatList
              data={filteredContacts}
              renderItem={renderContactItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              style={styles.contactsList}
            />
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E8ECEF',
  },
  backButton: {
    padding: 8,
  },
  backText: {
    fontSize: 24,
    color: '#6C5CE7',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerPlaceholder: {
    width: 40,
  },
  contactSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
    borderRadius: 16,
  },
  selectedContactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  selectContactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6C5CE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactInitials: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  contactInfo: {
    flex: 1,
  },
  selectedContactInfo: {
    flex: 1,
  },
  selectedContactName: {
    fontSize: 16,
    fontWeight: '500',
  },
  selectedContactUpi: {
    fontSize: 13,
    marginTop: 2,
  },
  contactName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#2D3436',
  },
  contactPhone: {
    fontSize: 13,
    color: '#636E72',
    marginTop: 2,
  },
  selectContactText: {
    fontSize: 15,
  },
  favoriteIcon: {
    fontSize: 16,
    color: '#FDCB6E',
  },
  chevronRight: {
    fontSize: 24,
    color: '#636E72',
  },
  amountContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    fontSize: 36,
    fontWeight: '600',
    marginRight: 4,
  },
  amountText: {
    fontSize: 48,
    fontWeight: '700',
  },
  balanceHint: {
    fontSize: 14,
    marginTop: 8,
  },
  noteContainer: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  noteInput: {
    fontSize: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
  },
  keypadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingVertical: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  closeButton: {
    fontSize: 20,
    color: '#636E72',
    padding: 8,
  },
  searchInput: {
    fontSize: 16,
    padding: 16,
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  contactsList: {
    paddingHorizontal: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E8ECEF',
  },
  searchContactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E8ECEF',
  },
});

// For Level 2 Contact picker
interface ContactPickerItemProps {
  contact: Contact;
  onSelect: (contact: Contact) => void;
}

const ContactPickerItem = ({ contact, onSelect }: ContactPickerItemProps) => (
  <TouchableOpacity
    style={styles.searchContactRow}
    onPress={() => onSelect(contact)}
  >
    <View style={styles.contactAvatar}>
      <Text style={styles.contactInitials}>
        {contact.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
      </Text>
    </View>
    <View style={styles.contactInfo}>
      <Text style={styles.contactName}>{contact.name}</Text>
      <Text style={styles.contactPhone}>{contact.phone || contact.upiId}</Text>
    </View>
    {contact.isFavorite && <Text style={styles.favoriteIcon}>★</Text>}
  </TouchableOpacity>
);

export default HomeLevel2Screen;