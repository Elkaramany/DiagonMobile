import 'react-native-gesture-handler'
import React, {PureComponent} from 'react'
import {View, Platform, StyleSheet} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import {Provider} from 'react-redux'
import {createStore, compose, applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'
import {persistStore, persistReducer} from 'redux-persist'
import reducers from './reducers'
import {PersistGate} from 'redux-persist/lib/integration/react'
import {NavigationContainer} from '@react-navigation/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Colors} from './Components/Constants';
import StackNavigator from './navigation/StackNavigator'

//Redux setup
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['banana'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(
  persistedReducer,
  {},
  compose(applyMiddleware(ReduxThunk)),
)

export default class App extends PureComponent {
  render () {
    const persistor = persistStore(store)
    persistor.purge()
    return (
      <Provider store={store}>
        <View style={styles.Container}>
          <PersistGate persistor={persistor}>
            <NavigationContainer>
              <StackNavigator />
            </NavigationContainer>
          </PersistGate>
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  Container:{
    flex: 1,
    backgroundColor: Colors.mainBackground,
    paddingTop: Platform.OS == 'ios' ? getStatusBarHeight(): 0,
  }
})