// App.js
import 'react-native-gesture-handler'; // Import at the top
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookAppointmentScreen from './screen/Appointment/BookAppointmentScreen';
import PatientDetailsScreen from './screen/Appointment/PatientDetailsScreen';
import BookedListScreen from './screen/Appointment/BookedListScreen';
import AppointHomeScreen from './screen/Appointment/AppointmentHomeScreen';
import LoginScreen from './screen/LoginScreen';
import SignUpScreen from './screen/SignUpScreen';
import Home from './Screen/HomeScreen';
import CardPayment from './Screen/Payment/CardPayment';
import PaymentListScreen from './Screen/Payment/PaymentList';
import SelectTransferType from './Screen/Payment/TransferType';
import PaymentOptionScreen from './Screen/Payment/Paymentoptionscreen';
import InsuranceSreen from './Screen/Payment/InsuranceScreen';
import { ToastProvider } from 'react-native-toast-notifications';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ToastProvider placement='top' offsetTop={100} animationType='zoom-in'>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Book Appointment" component={BookAppointmentScreen} />          
          <Stack.Screen name="Patient Details" component={PatientDetailsScreen} />
          <Stack.Screen name="Booked List" component={BookedListScreen} />
          <Stack.Screen name="Appoint Home Screen" component={AppointHomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Card Payment" component={CardPayment} />
          <Stack.Screen name="Payment List" component={PaymentListScreen} />
          <Stack.Screen name="Select Transfer Type" component={SelectTransferType} />
          <Stack.Screen name="Payment Option Screen" component={PaymentOptionScreen} />  
          <Stack.Screen name="Insurance Claim" component={InsuranceSreen} />                 

        </Stack.Navigator>
      </NavigationContainer>    
    </ToastProvider>
  );
}
