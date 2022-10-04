// import { StrictMode } from 'react';
import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
    Route,
    BrowserRouter as Router,
    Routes
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { useNotification } from 'Util';
import ErrorPage from 'Route/Error';
import ExamplePage from 'Route/Example';
import IndexPage from 'Route/IndexPage';
import store from 'Store';
import Header from 'Component/Header';
import Cookies from 'Component/Cookies';
import Notifications, {
    NotificationContextProvider,
    NotificationStatus
} from 'Component/Notifications';
import 'Style/main.scss';

const App = () => {
    const [showNotification, hideNotification] = useNotification();

    // DEBUG
    // @ts-ignore
    window.show = showNotification;
    // @ts-ignore
    window.hide = hideNotification;

    useEffect(() => {
        const id = showNotification({
            timeout: 10000,
            title: 'none',
            message: 'yes',
            status: NotificationStatus.INFO
        });
    }, []);


    return (
        <Router>
            <Header />
            <Notifications />
            <Cookies />
            <Routes>
                <Route path='/'
                    element={<IndexPage />} />
                <Route path='/example/:?id'
                    element={<ExamplePage />} />
                <Route path='*'
                    element={<ErrorPage />} />
            </Routes>
        </Router>
    );
};

const root = createRoot(document.getElementById('root')!);
root.render(
    // <StrictMode>
    <Provider store={store}>
        <NotificationContextProvider>
            <App />
        </NotificationContextProvider>
    </Provider>
    // </StrictMode>
);

