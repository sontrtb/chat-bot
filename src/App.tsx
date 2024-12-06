import Routers from './routers/routers'
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react';
import Theme from './theme';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Theme>
            <Routers />
            <ToastContainer autoClose={2000} />
          </Theme>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  )
}

export default App
