// // import { useState, useEffect } from 'react';
// // import { getDatabase, ref, onValue, set, onDisconnect, push } from 'firebase/database';

// // const OnlineUsersCounter = () => {
// //   const [onlineUsers, setOnlineUsers] = useState(0);

// //   useEffect(() => {
// //     const database = getDatabase();
// //     const presenceRef = ref(database, '.info/connected');
// //     const usersRef = ref(database, 'presence');

// //     onValue(presenceRef, (snapshot) => {
// //       if (snapshot.exists() && snapshot.val() === true) {
// //         // User is connected
// //         const userRef = push(usersRef); // Generate a unique key for the user
// //         const userKey = userRef.key;

// //         // Remove the user when they disconnect
// //         const disconnectRef = ref(usersRef, userKey);
// //         onDisconnect(disconnectRef).remove();

// //         // Update online users count whenever the 'presence' data changes
// //         onValue(usersRef, (snapshot) => {
// //           if (snapshot.exists()) {
// //             const onlineUsersCount = Object.keys(snapshot.val()).length;
// //             setOnlineUsers(onlineUsersCount);
// //           }
// //         });

// //         // Increment the online users count for the newly connected user
// //         set(userRef, true);
// //       }
// //     });

// //     // Cleanup when component unmounts
// //     return () => {
// //       // Stop listening for changes
// //       // This is important to avoid memory leaks
// //       // For example, using the off() method
// //     };
// //   }, []); // Only run this effect once when the component mounts

// //   return (
// //     <div>
// //       <p>Number of online users: {onlineUsers}</p>
// //     </div>
// //   );
// // };

// // export default OnlineUsersCounter;

// import { useState, useEffect } from 'react';

// const OnlineUsersCounter = () => {
//   const [onlineUsers, setOnlineUsers] = useState(0);

//   useEffect(() => {
//     const handleOnline = () => {
//       setOnlineUsers((prevOnlineUsers) => prevOnlineUsers + 1);
//     };

//     const handleOffline = () => {
//       setOnlineUsers((prevOnlineUsers) => Math.max(prevOnlineUsers - 1, 0));
//     };

//     // Add event listeners for online and offline events
//     window.addEventListener('online', handleOnline);
//     window.addEventListener('offline', handleOffline);

//     // Initial count based on navigator's online status
//     setOnlineUsers(window.navigator.onLine ? 1 : 0);

//     // Cleanup when component unmounts
//     return () => {
//       window.removeEventListener('online', handleOnline);
//       window.removeEventListener('offline', handleOffline);
//     };
//   }, []); // Only run this effect once when the component mounts

//   return (
//     <div>
//       <p>Number of online users: {onlineUsers}</p>
//     </div>
//   );
// };

// export default OnlineUsersCounter;

