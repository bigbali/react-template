import { useContext } from 'react';
import { v4 as UUIDV4 } from 'uuid';
import {
    type INotification,
    NotificationContext,
    NotificationStatus,
} from 'Component/Notifications/Notifications';

type ShowNotificationPayload = Omit<INotification, 'id'>;

/**
 * @returns a tuple containing a function to create a notification, and one to delete it.
 */
export const useNotification = () => {
    const [notificationContext, updateNotificationContext] = useContext(NotificationContext);

    /**
     * Creates a new notification and adds it to the existing ones.
     * @return the ID of the created notification.
     */
    const showNotification = ({ timeout = 5000, status = NotificationStatus.INFO, ...options }: ShowNotificationPayload): string => {
        console.log('show', { timeout, status, ...options });
        const id = UUIDV4();

        updateNotificationContext([
            ...notificationContext,
            {
                ...options,
                timeout,
                status,
                id
            }
        ]);

        return id;
    };

    /**
     * Removes a notification by ID.
     * @param notificationId the ID returned by `showNotification`.
     */
    const hideNotification = (notificationId: string) => {
        updateNotificationContext(
            notificationContext.filter(({ id }) => notificationId !== id)
        );
    };

    return [
        showNotification,
        hideNotification
    ] as const;
};

export default useNotification;