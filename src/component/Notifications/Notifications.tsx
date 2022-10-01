import {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useContext,
    useRef,
    useState
} from 'react';
import { useNotification } from 'Util';
import { CloseIcon } from 'Component/Icon';
import Transition from 'Component/Transition/Transition';
import './Notifications.style.scss';

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
    }: {
        notification: INotification,
        hideNotification: (id: string) => void
    }
) => {
    const { title, message, status, id } = notification;
    const notificationRef = useRef(null);

    // INVESTIGATE
    // if this block is moved into Transition below, BEM attribute processing breaks
    const element = (
        <div
            ref={notificationRef}
            block="Notification"
            mods={{
                INFO: status === NotificationStatus.INFO,
                SUCCESS: status === NotificationStatus.SUCCESS,
                WARNING: status === NotificationStatus.WARNING,
                ERROR: status === NotificationStatus.ERROR
            }}
        >
            <div elem="Content">
                {title &&
                    <h3 elem="Title">
                        {title}
                    </h3>
                }
                {message &&
                    <p elem="Message">
                        {message}
                    </p>
                }
            </div>
            <button
                elem="Close"
                onClick={() => {
                    hideNotification(id);
                }}>
                <CloseIcon />
            </button>
        </div>
    );

    return (
        <Transition nodeRef={notificationRef} classNames="Notification" timeout={5000}>
            {element}
        </Transition>
    );
};

export const NotificationContainer = () => {
    const [notificationContext] = useContext(NotificationContext);
    const [, hideNotification] = useNotification();

    if (!notificationContext.length) return null;

    const notifications = notificationContext.map((notification, index) => (
        <Notification
            notification={notification}
            hideNotification={hideNotification}
            key={index} />
    ));

    return (
        <div block="NotificationContainer">
            {notifications}
        </div>
    );
};

export default NotificationContainer;