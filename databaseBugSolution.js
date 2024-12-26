This solution uses async/await to ensure the database is initialized before accessing it. The `initializeApp` function returns a Promise; async/await handles the asynchronous nature gracefully.

```javascript
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, onValue } from "firebase/database";
//Import your Firebase config
import { firebaseConfig } from './firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const fetchData = async () => {
  try {
    const snapshot = await get(ref(db, 'your/path/in/database'));
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log('No data available');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

//In a React component's useEffect hook:
useEffect(() => {
  fetchData();
}, []);
```