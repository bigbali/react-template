// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
    Route,
    BrowserRouter as Router,
    Routes
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'Store';
import ErrorPage from 'Route/Error';
import ExamplePage from 'Route/Example';
import IndexPage from 'Route/IndexPage';
import Header from 'Component/Header';
import Notifications from 'Component/Notifications';
import Cookies from 'Component/Cookies';
// import X from 'Component/X';
import 'Style/main.scss';
import { NotificationContext, NotificationContextProvider } from 'Component/Notifications/Notifications';
import { useNotification } from 'Util';
import { NotificationStatus } from 'Store/notification';
import { useEffect } from 'react';

const App = () => {
    const [showNotification, hideNotification] = useNotification();

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

        setTimeout(() => {
            // @ts-ignore
            hideNotification(id);
        }, 5000);
    }, []);


    return (
        <Router>
            {/* <X /> */}
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

