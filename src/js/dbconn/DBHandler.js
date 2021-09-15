import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useAsync } from 'react-async';

// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field

export function initiateDBConnection() {
    const firebaseConfig = {
        apiKey: process.env.API_KEY,
        authDomain: process.env.PROJECT_ID + ".firebaseapp.com",
        databaseURL: "https://" + process.env.PROJECT_ID + ".firebaseio.com",
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.PROJECT_ID + ".appspot.com",
        messagingSenderId: process.env.SENDER_ID,
        appId: process.env.APP_ID,
        measurementId: process.env.MEASUREMENT_ID,
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(firebaseApp);

    onAuthStateChanged(auth, user => {
        //check for user status
    })

    const db = getFirestore(app);

    // Get list of accounts from DB
    useEffect(() =>  {
        try {
            await function getAccounts(db) {
                const accountsCol = collection(db, 'accounts');
                const accountsSnapshot = await getDocs(accountsCol);
                const accountList = accountsSnapshot.docs.map(doc => doc.data());
            }
        } catch (error) {
            console.log(error);
        }
    })

}
