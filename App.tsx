// App.tsx
import React from 'react';
import { View,Text } from 'react-native';
import { Provider } from 'react-redux';
import Login from './src/screens/Login';

import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
    return (
      <AppNavigator/>
    );
};

export default App;
