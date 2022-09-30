// import { hideNotification } from 'Store/Notification/Notification.action';
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react';
import './Notification.style.scss';
// import { useTimer } from 'Util/hook/useTimer';

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
    id?: string
};

export const NotificationContext = createContext<[INotification[], Dispatch<SetStateAction<INotification[]>>]>([[], () => { }]);
export const NotificationContextProvider = ({ children }: PropsWithChildren) => {
    return (
        <NotificationContext.Provider value={useState<INotification[]>([])}>
            {children}
        </NotificationContext.Provider>
    );
};

export const Notification = () => {
    const [notificationContext] = useContext(NotificationContext);

    if (!notificationContext.length) return null;

    // todo styling with scss
    // todo animation with reactcsstransitiongroup

    return (
        <div block="NotificationContainer" style={{ height: '500px', width: '100%' }}>
            {notificationContext.map((notification, index) => {
                return (
                    <div key={index} style={{
                        height: '60px',
                        width: '100%',
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        backgroundColor: 'dodgerblue'
                    }}>
                        {notification.message}
                    </div>
                );
            })}
        </div>
    );

    // const [keepRendered, setkeepRendered] = useState(false);
    // const [createTimer, clearTimer] = useTimer();
    // const ths = useRef<HTMLDivElement | null>(null);
    // const {
    //     notification: {
    //         message,
    //         status,
    //         visible
    //     },
    //     hide
    // } = useNotification();

    // useEffect(() => {
    //     createTimer(() => setkeepRendered(visible), 250);

    //     return () => { clearTimer(); };
    // }, [visible]);

    // useEffect(() => {
    //     const element = ths.current;

    //     if (element) {
    //         if (visible && keepRendered) {
    //             element.className = `${element.className} visible`;
    //         }
    //         if (!visible && keepRendered) {
    //             element.className = `${element.className} fading`;
    //         }
    //     }
    // }, [visible, keepRendered, ths.current]);

    // if (!visible && !keepRendered) {
    //     return null;
    // }

    // return (
    //     <div
    //         ref={ths}
    //         block="Notification"
    //         mods={{
    //             INFO: status === NotificationStatus.INFO,
    //             SUCCESS: status === NotificationStatus.SUCCESS,
    //             WARNING: status === NotificationStatus.WARNING,
    //             ERROR: status === NotificationStatus.ERROR
    //         }}
    //     >
    //         <p elem="Message">
    //             {message}
    //         </p>
    //         <button
    //             elem="CloseButton"
    //             onClick={() => {
    //                 hide();
    //             }}>
    //             <CloseIcon />
    //         </button>
    //     </div>
    // );
};

export default Notification;