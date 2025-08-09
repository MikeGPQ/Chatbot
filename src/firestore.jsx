import { collection, getDocs, doc} from "firebase/firestore";
import { db } from './firebase';

export async function getData(collectionName) {
    try {
        const newCollection = await getDocs(collection(db, collectionName));
        console.log("Collection loaded");
        return newCollection.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
    } catch (error) {
        console.error("Error fetching documents: ", error);
        return [];
    }
}