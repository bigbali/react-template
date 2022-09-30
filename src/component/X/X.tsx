// import { useEffect } from 'react';
// import { NotificationStatus } from 'Store/notification';
// import { useDevice, useNotification, useTimer } from 'Util';

// const X = () => {
//     const { notification, update, hide } = useNotification();
//     const { isMobile } = useDevice();
//     const [createTimer, cleanupTimer] = useTimer();

//     useEffect(() => {
//         createTimer(() => {
//             hide();
//         }, 5000);

//         isMobile
//             ? update({
//                 ...notification,
//                 status: NotificationStatus.SUCCESS,
//                 message: 'Hey, it looks like you\'re from a mobile device. That\'s very cool!',
//                 visible: true
//             })
//             : update({
//                 ...notification,
//                 status: NotificationStatus.INFO,
//                 message: 'Hey, it looks like you\'re from a desktop device. That\'s very cool!',
//                 visible: true
//             });

//         return cleanupTimer;
//     }, [isMobile]);

//     return null;
// };

// export default X;