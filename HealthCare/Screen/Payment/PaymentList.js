import { collection, deleteDoc, doc, getDocs } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { db } from '../firebaseConfig';
import { useFocusEffect } from '@react-navigation/native';

const PaymentListScreen = ({ navigation }) => {

  const [payments, setPayments] = useState([]);  
  const [loading, setLoading] = useState(true);

  const getPaymentDetails = async () => {
    setLoading(true); // Set loading state to true before fetching
    try {
      const response = await getDocs(collection(db, "paid_payments")); 
      const paymentList = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPayments(paymentList);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false); // Set loading state to false after fetching
    }
  };  
  
  const handleDeletePayment = async (id) => {
    try {     
      await deleteDoc(doc(db, "paid_payments", id));
      getPaymentDetails(); // Refresh the list after deletion
    } catch (error) {
      console.error(error);        
    }
  };   

  const confirmDeletePayment = (id) => {
    Alert.alert(
      "Delete Payment Record",
      "Are you sure you want to delete this payment record?",
      [
        {
          text: "No",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => handleDeletePayment(id),
        }
      ],
      { cancelable: true }
    );
  };

  // Fetch details every time the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      getPaymentDetails();
    }, [])
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#39170C" />
          <Text>Loading Payments...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          
          <View style={{ marginTop: 30 }} />
          <Text style={styles.title}>Paid Payments List</Text>
          <View style={{alignItems:'center', }}>
            {payments.map(payment => (
              <View key={payment.id} >
                <View style={styles.cards}>                  
                  <Text style={styles.cardname}>Payment ID: {payment.paymentId}</Text>
                  <Text style={styles.cardlanguage}>Customer Name: {payment.customerName}</Text>                  
                  <Text style={styles.cardlanguage}>Amount: ${payment.amount}</Text>                  
                  <Text style={styles.cardlanguage}>Payment Date: {payment.paymentDate}</Text>                  
                  <Text style={styles.cardlanguage}>Payment Method: {payment.paymentMethod}</Text>                  

                  <View style={{ alignItems: 'center', marginTop: 20,}}>
                    <TouchableOpacity style={styles.typebtn} onPress={() => confirmDeletePayment(payment.id)} >
                      <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 19,}}>Delete</Text>
                    </TouchableOpacity>
                  </View>                 
                </View>                
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    padding: 20,
    backgroundColor: '#fff', 
    marginBottom: 100,
  },
  title: {
    fontSize: 24,
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: 20,   
    color: '#333333',      
    flexDirection: 'row',
  },
  cards:{
    backgroundColor: '#fff', 
    marginTop: 5,
    width: 350,
    height: 200,
    borderRadius: 8,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
    marginBottom: 10,
  },
  cardname: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,      
  },
  cardlanguage: {
    fontSize: 18,
    marginBottom: 5, 
    color: '#677294',      
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typebtn: {
    backgroundColor: '#39170C',
    color: '#fff',
    padding: 14,
    borderRadius: 7,
    width: 300,
    alignItems: 'center',
  },  
});

export default PaymentListScreen;
