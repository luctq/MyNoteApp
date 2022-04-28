import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import Router from './src/router/Router'
import store,{ persistor } from './src/redux/store'

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
}
