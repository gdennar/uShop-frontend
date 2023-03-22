import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase/config";

const useFetchDocument = (collectionName, documentID) => {
	const [document, setDocument] = useState(null);

	useEffect(() => {
		const getDocument = async () => {
			try {
				const docRef = doc(db, collectionName, documentID);
				const docSnap = await getDoc(docRef);

				if (docSnap.exists()) {
					const obj = {
						id: documentID,
						...docSnap.data(),
					};

					setDocument(obj);
				} else {
					toast.error("No product found");
				}
			} catch (error) {
				toast.error("Error fetching document");
			}
		};
		getDocument();
	}, [collectionName, documentID]);

	return { document };
};

export default useFetchDocument;
