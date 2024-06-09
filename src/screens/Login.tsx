// src/screens/Login.tsx
import React, { useState,useEffect   } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { login, token,userProfile } from '../services/api';
import { UserProfile } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const Login: React.FC<Props> = ({ navigation }) => {
//   const [email, setEmail] = useState('Sekhar@123');
//   const [password, setPassword] = useState('Chinn@123');

  const [email, setEmail] = useState('Sekhar@123');
  const [password, setPassword] = useState('Chinn@123');


  const handleLogin = async () => {
    try {
      const data = await token();    
      if (data.success) {
        const data2 = await login(email,password,data.request_token); 
        if (data2.success) {
            
           
            
            await AsyncStorage.setItem('session', data2.expires_at);
            navigation.navigate('Dashboard');
            
          } else {
            Alert.alert('Login failed', 'Please check your credentials and try again.');
          }
      } else {
        Alert.alert('Token failed', 'please try again.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Token failed', 'An error occurred during login. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 16 },
  input: { 
    height: 40, 
    borderRadius:5,
    borderColor: 'gray', 
    borderWidth: 1, 
    marginBottom: 12, 
    paddingHorizontal: 8 },
});

export default Login;
