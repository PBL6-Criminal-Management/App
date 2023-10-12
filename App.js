import React from 'react';
import {useFonts} from 'expo-font'
import { StatusBar } from 'expo-status-bar';

import { AuthProvider } from './Context/AuthContext.js';
import Navigation from './Pages/Components/Navigation.js'

function App() {
  let [fontsLoaded] = useFonts({
    'Inter': require('./Public/Fonts/Inter-Bold.ttf'),
    'Be Vietnam': require('./Public/Fonts/BeVietnamPro-Regular.ttf'),
    'Be Vietnam italic': require('./Public/Fonts/BeVietnamPro-Italic.ttf')
  })

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <StatusBar backgroundColor='#06bcee' />
      <Navigation />
    </AuthProvider>
  )
}

export default App