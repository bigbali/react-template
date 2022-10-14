import {
    StrictMode,
    useEffect,
    createRef
} from 'react';
import { createRoot } from 'react-dom/client';
import {
    useLocation,
    createBrowserRouter,
    RouterProvider,
    useOutlet,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { SwitchTransition } from 'react-transition-group';
import {
    useDevice,
    useNotification,
    useSettings
} from 'Util';
import store, { Theme } from 'Store';
import IndexPage from 'Route/IndexPage';
import AboutPage from 'Route/AboutPage';
import ContactPage from 'Route/ContactPage';
import ErrorPage from 'Route/ErrorPage';
import NotFoundPage from 'Route/NotFoundPage';
import ExamplePage from 'Route/ExamplePage';
import Header from 'Component/Header';
import Cookies from 'Component/Cookies';
import Notifications, {
    NotificationContextProvider,
    NotificationStatus
} from 'Component/Notifications';
import Transition from 'Component/Transition';
import 'Style/main.scss';

const rootElement = document.getElementById('root')!;
const routes = [
    {
        path: '/',
        element: <IndexPage />,
        nodeRef: createRef<any>()
    },
    {
        path: 'about',
        element: <AboutPage />,
        nodeRef: createRef<any>()
    },
    {
        path: 'contact',
        element: <ContactPage />,
        nodeRef: createRef<any>(),
    },
    {
        path: 'example/:id',
        element: < ExamplePage />,
        nodeRef: createRef<any>(),
    },
    {
        path: '*',
        element: <NotFoundPage />,
        nodeRef: createRef<any>(),
    }
];

const Layout = () => {
    const location = useLocation();
    const [showNotification] = useNotification();
    const { isMobile } = useDevice();
    const [{ theme, themeColorOverride, fontSizeOverride }] = useSettings();
    const currentOutlet = useOutlet();
    const { nodeRef } = routes.find(
        (route) => route.path === location.pathname
    ) ?? {};

    useEffect(() => {
        showNotification({
            timeout: 5000,
            title: 'Hey',
            message: `We believe you are browsing this page from a ${isMobile ? 'mobile' : 'desktop'} device. That is very cool!`,
            status: NotificationStatus.INFO
        });
    }, [isMobile]);

    useEffect(() => {
        const body = document.querySelector('body')!;
        const html = document.querySelector('html')!;

        if (theme === Theme.LIGHT) {
            body.classList.replace('theme-dark', 'theme-light') || body.classList.add('theme-light');
        }
        else {
            body.classList.replace('theme-light', 'theme-dark') || body.classList.add('theme-dark');
        }

        html.style.fontSize = `${16 * (fontSizeOverride || 1)}px`;

    }, [theme, themeColorOverride, fontSizeOverride]);

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
                    nodeRef={nodeRef}
                    classNames="cross-page"
                    timeout={{
                        enter: 300,
                        exit: 100
                    }}>
                    {() => (
                        <main ref={nodeRef} block="Page">
                            {currentOutlet}
                        </main>
                    )}
                </Transition>
            </SwitchTransition>
        </>
    );
};

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            { // this is our error boundary
                errorElement: <ErrorPage />,
                children: routes.map(
                    route => ({
                        index: route.path === '/',
                        path: route.path === '/' ? undefined : route.path,
                        element: route.element
                    })
                )
            }
        ]
    }
]);

const root = createRoot(rootElement);
root.render(
    <StrictMode>
        <Provider store={store}>
            <NotificationContextProvider>
                <RouterProvider router={router} />
            </NotificationContextProvider>
        </Provider>
    </StrictMode>
);

