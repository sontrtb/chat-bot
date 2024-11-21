import Routers from './routers/routers'
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react';
import Theme from './theme';

function App() {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Theme>
          <Routers />
        </Theme>
      </PersistGate>
    </Provider>
  )
}

export default App
