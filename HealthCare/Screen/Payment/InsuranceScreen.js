import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';

const InsuranceDetailsScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [policyNumber, setPolicyNumber] = useState('');
    const [insuranceProvider, setInsuranceProvider] = useState('');
    const [insuredAmount, setInsuredAmount] = useState('');
    const [premiumAmount, setPremiumAmount] = useState('');
  
    const submitInsuranceDetails = async () => {
      try {
        const insuranceData = {
          policyNumber: policyNumber,
          insuranceProvider: insuranceProvider,
          insuredAmount: insuredAmount,
          premiumAmount: premiumAmount,
          date: new Date().toISOString(),
        };

        await firestore().collection('insurance_details').add(insuranceData);
        setModalVisible(true);
      } catch (error) {
        console.error('Error adding insurance details: ', error);
      }
    };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Policy Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Policy Number"
            value={policyNumber}
            onChangeText={setPolicyNumber}
          />

          <Text style={styles.title}>Insurance Provider</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Insurance Provider"
            value={insuranceProvider}
            onChangeText={setInsuranceProvider}
          />      
          
          <Text style={styles.title}>Insured Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Insured Amount"
            value={insuredAmount}
            onChangeText={setInsuredAmount}
            keyboardType="numeric"
          />

          <Text style={styles.title}>Premium Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Premium Amount"
            value={premiumAmount}
            onChangeText={setPremiumAmount}
            keyboardType="numeric"
          />

          <View style={{ marginTop: 40, alignItems:'center',}} >
            <TouchableOpacity style={styles.continuebtn} onPress={submitInsuranceDetails}>
              <Text style={{ color: '#fff', fontSize: 19, }}>Submit</Text>
            </TouchableOpacity>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Thank You!</Text>
                <Text style={styles.modalSubText}>Insurance Details Submitted Successfully</Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.modalButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    padding: 20,
    backgroundColor: '#fff', 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,  
    color: '#0891b2', 
  },  
  input: {
    height: 50,
    borderColor: '#164e63',
    borderWidth: 2,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff', 
    borderRadius: 8, 
    padding: 10,
    fontSize: 15,
  }, 
  continuebtn: {
    backgroundColor: '#164e63',    
    borderRadius: 15,
    shadowColor: '#000',   
    paddingRight: 20,
    paddingLeft: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: '50%',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#164e63',
  },
  modalSubText: {
    fontSize: 17,
    color: '#677294',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#164e63', 
    width: 200,
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default InsuranceDetailsScreen;
