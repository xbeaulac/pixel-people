import { where, onSnapshot, collection, query } from "firebase/firestore";
import { ref, watchEffect } from "vue";
import { db } from "../firebase/config";

// c is collection and q is query
const getCollection = (c, q) => {
  const documents = ref(null);
  const error = ref(null);

  let colRef = collection(db, c)

  if (q) {
    colRef = query(collection(db, c), where(...q));
  }

  const unsubscribe = onSnapshot(
    colRef,
    (snap) => {
      let results = [];
      snap.forEach((doc) => {
        results.push({...doc.data()});
      });
      documents.value = results
      error.value = null
    },
    (err) => {
      console.log(err.message);
      documents.value = null;
      error.value = "could not fetch the data";
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsubscribe());
  });

  return { error, documents }
};

export default getCollection