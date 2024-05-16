import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./app/store.ts";
import {Provider} from "react-redux";
import {addInterceptors} from "./utils/constants.addInterceptors.ts";

addInterceptors(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </PersistGate>
    </Provider>
)