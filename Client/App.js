import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import StackNavigatorApp from './src/router/StackNavigatorApp'
import store,{ persistor } from './src/redux/store'

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StackNavigatorApp />
      </PersistGate>
    </Provider>
  );
}
