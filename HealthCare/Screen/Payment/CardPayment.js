import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Picker } from 'react-native';
import { firebase } from '@react-native-firebase/firestore'; // Firebase Firestore
import { firebaseConfig } from './firebaseConfig'; // Import firebaseConfig

// Initialize Firebase (this could be elsewhere in your app depending on structure)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const CardPayment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardType, setCardType] = useState('');

  const handlePayment = async () => {
    // Form validation
    if (!cardNumber || !expiryDate || !cvv || !cardType) {
      Alert.alert('Payment Failed', 'Please fill in all the card details and select a card type.');
      return;
    }

    try {
      // Example: Save payment details to Firebase
      await firebase.firestore().collection('payments').add({
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        cvv: cvv,
        cardType: cardType,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert('Payment Success', 'Your payment has been processed successfully.');
    } catch (error) {
      Alert.alert('Payment Failed', 'There was an error processing your payment.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Card Payment</Text>

      <TextInput
        style={styles.input}
        placeholder="Card Number"
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={setCardNumber}
      />

      <TextInput
        style={styles.input}
        placeholder="Expiry Date (MM/YY)"
        value={expiryDate}
        onChangeText={setExpiryDate}
      />

      <TextInput
        style={styles.input}
        placeholder="CVV"
        keyboardType="numeric"
        secureTextEntry
        value={cvv}
        onChangeText={setCvv}
      />

      {/* Card Type Picker */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={cardType}
          style={styles.picker}
          onValueChange={(itemValue) => setCardType(itemValue)}
        >
          <Picker.Item label="Select Card Type" value="" />
          <Picker.Item label="Visa" value="Visa" />
          <Picker.Item label="MasterCard" value="MasterCard" />
          <Picker.Item label="American Express" value="AmEx" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Submit Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  button: {
    backgroundColor: '#FFC107',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CardPayment;