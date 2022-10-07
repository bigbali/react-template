import { StrictMode } from 'react';
import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
    Route,
    BrowserRouter as Router,
    Routes,
    useLocation
} from 'react-router-dom';
import { Provider } from 'react-redux';
import {
    useDevice,
    useNotification
} from 'Util';
import IndexPage from 'Route/IndexPage';
import AboutPage from 'Route/AboutPage';
import ContactPage from 'Route/ContactPage';
import ExamplePage from 'Route/Example';
import ErrorPage from 'Route/Error';
import store from 'Store';
import Header from 'Component/Header';
import Cookies from 'Component/Cookies';
import Notifications, {
    NotificationContextProvider,
    NotificationStatus
} from 'Component/Notifications';
import { SwitchTransition } from 'react-transition-group';
import Transition from 'Component/Transition/Transition';
import 'Style/main.scss';

const App = () => {
    const location = useLocation();
    const [showNotification] = useNotification();
    const { isMobile } = useDevice();

    useEffect(() => {
        showNotification({
            timeout: 5000,
            title: 'Hey',
            message: `We believe you are browsing this page from a ${isMobile
                ? 'mobile'
                : 'desktop'}
            device. That is very cool!`,
            status: NotificationStatus.INFO
        });
    }, [isMobile]);

    return (
        <>
            <Header />
            <Notifications />
            <Cookies />
            <SwitchTransition>
                <Transition
                    onEntered={() => { // when transitioning, prevent scrollbars
                        document.querySelector('body')!.classList.remove('disable-scrolling');
                    }}
                    onExit={() => {
                        document.querySelector('body')!.classList.add('disable-scrolling');
                    }}
                    key={location.key}
                    classNames="cross-page"
                    timeout={{
                        enter: 200,
                        exit: 100
                    }}>
                    <Routes location={location}>
                        <Route path='/'
                            element={<IndexPage />} />
                        <Route path='about'
                            element={<AboutPage />} />
                        <Route path='contact'
                            element={<ContactPage />} />
                        <Route path='/example/:?id'
                            element={<ExamplePage />} />
                        <Route path='*'
                            element={<ErrorPage />} />
                    </Routes>
                </Transition>
            </SwitchTransition>
        </>
    );
};

const root = createRoot(document.getElementById('root')!);
root.render(
    <StrictMode>
        <Provider store={store}>
            <NotificationContextProvider>
                <Router>
                    <App />
                </Router>
            </NotificationContextProvider>
        </Provider>
    </StrictMode>
);

