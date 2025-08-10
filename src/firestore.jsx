import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export async function getProperties(area,budget,propertyType) {
    try {
        const propertiesCollection = collection(db, "Properties");

        const condoSubTypes = ["Condo con Jardín", "Condo", "Penthouse", "Casa", "Loft", "Estudio", "Espacio"];
        const lotSubTypes = ["Lote Residencial", "Lote Comercial"]

        let subTypeArray = [];
        if(propertyType.toLowerCase() === "condo"){
            subTypeArray = condoSubTypes;
        }else if(propertyType.toLowerCase() === "Lot"){
            subTypeArray = lotSubTypes;
        }else{
            return[];
        }

        const q = query(
        propertiesCollection,
            where("Area", "==", area),
            where("Price", "<=", budget),
            where("SubType", "in", subTypeArray)
        );
        const querySnapshot = await getDocs(q);
        
        const properties = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
        }));
        
        return properties;
        
    } catch (error) {
        console.error("Error fetching documents: ", error);
        return [];
    }
}