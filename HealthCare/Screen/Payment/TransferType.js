import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { firebaseConfig } from './firebaseConfig'; // Import your Firebase config
import { firebase } from '@react-native-firebase/app'; // Import Firebase

// Initialize Firebase (this could be elsewhere in your app depending on structure)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const SelectTransferType = ({ navigation }) => {
  const handlePayNow = () => {
    // Navigate to the card payment page
    Alert.alert("Redirecting to Payment");
    navigation.navigate('Payment Option Screen'); // Navigate to CardPayment screen
  };

  const handleClaimInsurance = () => {
    // Navigate to insurance claim page
    Alert.alert("Redirecting to Claim Insurance");
    navigation.navigate('Insurance Claim'); // Navigate to InsuranceClaim screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Transfer Type</Text>

      <TouchableOpacity style={styles.option} onPress={handlePayNow}>
        <Text style={styles.optionTitle}>Pay Now</Text>
        <Text style={styles.optionDescription}>
          Pay immediately using your credit or debit card for instant confirmation.
        </Text>
        <Text style={styles.smallDescription}>
          Confirm your appointment and process your payment securely.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={handleClaimInsurance}>
        <Text style={styles.optionTitle}>Claim Insurance</Text>
        <Text style={styles.optionDescription}>
          Submit your payment to your insurance provider and defer payment until it's processed.
        </Text>
        <Text style={styles.smallDescription}>
          Ensure your insurance details are valid to avoid delays.
        </Text>
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
  option: {
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionDescription: {
    fontSize: 14,
    color: '#555',
  },
  smallDescription: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },
});

export default SelectTransferType;