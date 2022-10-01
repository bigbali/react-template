import {
    createContext,
    createRef,
    Dispatch,
    LegacyRef,
    PropsWithChildren,
    Ref,
    SetStateAction,
    useContext,
    useEffect,
    useRef,
    useState
} from 'react';
import { useNotification } from 'Util';
import { CloseIcon } from 'Component/Icon';
import Transition from 'Component/Transition/Transition';
import './Notifications.style.scss';
import { TransitionGroup } from 'react-transition-group';
import React from 'react';

export enum NotificationStatus {
    INFO = 'INFO',
    SUCCESS = 'SUCCESS',
    WARNING = 'WARNING',
    ERROR = 'ERROR'
};

export interface INotification {
    status?: NotificationStatus,
    title?: string,
    message?: string,
    timeout?: number,
    id: string
};

export const NotificationContext =
    createContext<[INotification[], Dispatch<SetStateAction<INotification[]>>]>([[], () => { }]);
export const NotificationContextProvider = ({ children }: PropsWithChildren) => {
    return (
        <NotificationContext.Provider value={useState<INotification[]>([])}>
            {children}
        </NotificationContext.Provider>
    );
};

const Notification = (
    {
        notification,
        hideNotification,
        forwardRef
    }: {
        notification: INotification,
        hideNotification: (id: string) => void
        forwardRef: LegacyRef<HTMLDivElement>
    }
) => {
    const { title, message, status, id } = notification;
    // const [state, setState] = useState(true);

    // useEffect(() => {
    //     return () => setState(false);
    // }, []);

    // INVESTIGATE
    // if this block is moved into Transition below, BEM attribute processing breaks
    return (
        <div
            ref={forwardRef}
            block="Notification"
            mods={{
                INFO: status === NotificationStatus.INFO,
                SUCCESS: status === NotificationStatus.SUCCESS,
                WARNING: status === NotificationStatus.WARNING,
                ERROR: status === NotificationStatus.ERROR
            }}
        >
            <div elem="Content">
                <h3 elem="Title">
                    {title}
                </h3>
                <p elem="Message">
                    {message}
                </p>
            </div>
            <button
                elem="Close"
                onClick={() => {
                    console.log(id);
                    hideNotification(id);
                }}>
                <CloseIcon />
            </button>
        </div>
    );
};

export const NotificationContainer = () => {
    const [notificationContext] = useContext(NotificationContext);
    const [, hideNotification] = useNotification();
    const [count, setCount] = useState(notificationContext.length);

    const decr = () => { // this shit actually is useless!
        if (notificationContext.length > 0) setCount(notificationContext.length - 1);
    };

    useEffect(() => {
        setCount(notificationContext.length);
    }, [notificationContext]);

    // if (!notificationContext.length) return null;
    // todo tell style when element got removed before ccstransition takes effect


    const notifications = notificationContext.map((notification, index) => {
        const ref = createRef<any>();
        return (
            <Transition
                nodeRef={ref}
                classNames="Notification"
                timeout={{
                    enter: 200,
                    exit: 200
                }}
                key={notification.id}
                in
                appear
                onExited={() => { decr(); console.log('exited'); }}>
                <Notification
                    notification={notification}
                    hideNotification={hideNotification}
                    key={index}
                    forwardRef={ref} />
            </Transition>
        );
    });

    return (
        <TransitionGroup
            block="NotificationContainer"
            style={{
                maxHeight: `calc(${(count * 70) + (count * 16)}px + 2rem)`,
                minHeight: `calc(${count * 70 + count * 16}px + 2rem)`
            }}
        >
            {notifications}
        </TransitionGroup>
    );
};

export default NotificationContainer;