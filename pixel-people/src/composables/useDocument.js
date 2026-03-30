import {
  doc,
  updateDoc as updateDocument,
  deleteDoc as deleteDocument,
} from "firebase/firestore";
import { ref } from "vue";
import { db } from "../firebase/config";

const useDocument = (collection, id) => {
  const error = ref(null);
  const isPending = ref(false);

  let docRef = doc(db, collection, id);

  const deleteDoc = async () => {
    isPending.value = true;
    error.value = null;

    try {
      const res = await deleteDocument(docRef);
      isPending.value = false;
      return res;
    } catch (err) {
      console.log(err);
      error.value = err.message;
    }
  };

  const updateDoc = async (updates) => {
    isPending.value = true;
    error.value = null;

    try {
      const res = await updateDocument(docRef, updates);
      isPending.value = false;
      return res;
    } catch (err) {
      console.log(err);
      error.value = err.message;
    }
  };

  return { updateDoc, deleteDoc, error, isPending };
};

export default useDocument;
