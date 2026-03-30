import { doc, collection, addDoc as addDocument, setDoc as setDocument } from "firebase/firestore";
import { ref } from "vue";
import { db } from "../firebase/config";

//c is collection
const useCollection = (c) => {
  const error = ref(null);
  const isPending = ref(false);

  const addDoc = async (data, docId) => {
    error.value = null;
    isPending.value = true;

    try {
      if (docId) {
        const res = await setDocument(doc(db, c, docId), data);
        isPending.value = false;
        return res;
      } else {
        const res = await addDocument(collection(db, c), data);
        isPending.value = false;
        return res;
      }
    } catch (err) {
      error.value = err;
      console.log(err.message);
      isPending.value = false;
    }
  };

  return { error, addDoc, isPending };
};

export default useCollection;
