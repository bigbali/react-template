import { useContext } from 'react';
import { v4 as UUIDV4 } from 'uuid';
import {
    type INotification,
    NotificationContext,
    NotificationStatus
} from 'Component/Notification/Notification';

export const useNotification = () => {
    const [notificationContext, updateNotificationContext] = useContext(NotificationContext);

    /**
     * Creates a new notification and adds it to the existing ones.
     * @return the ID of the created notification.
     */
    const showNotification = ({ timeout = 5000, status = NotificationStatus.INFO, ...options }: INotification): string => {
        console.log('show', { timeout, status, ...options });
        const id = UUIDV4();

        updateNotificationContext([
            ...notificationContext,
            {
                timeout,
                status,
                id,
                ...options
            }
        ]);

        return id;
    };

    /**
     * Remove a notification.
     * @param notificationId the ID returned by `showNotification`.
     */
    const hideNotification = (notificationId: INotification['id']) => {
        updateNotificationContext(
            notificationContext.filter(({ id }) => notificationId !== id)
        );
    };

    return [
        showNotification,
        hideNotification
    ];
};

export default useNotification;