import { db } from "../firebase/config";
import { ref, watchEffect } from "vue";
import { doc, onSnapshot } from "firebase/firestore";

const getDocument = (collection, id) => {
  const document = ref(null);
  const error = ref(null);

  let docRef = doc(db, collection, id);

  const unsub = onSnapshot(
    docRef,
    (doc) => {
      if (doc.data()) {
        document.value = { ...doc.data(), id: doc.id };
        error.value = null;
      } else {
        error.value = "That document does not exist.";
      }
    },
    (err) => {
      console.log(err);
      error.value = err.message;
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { error, document };
};

export default getDocument;
