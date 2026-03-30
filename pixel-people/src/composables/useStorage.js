import { getDownloadURL, ref as reference } from "firebase/storage";
import { st } from "../firebase/config";
import { ref } from "@vue/reactivity";

const useStorage = () => {
  const error = ref(null);

  const getURL = async (filePath) => {
    try {
      const res = await getDownloadURL(reference(st, `${filePath}`));
      return res;
    } catch (err) {
      console.log(err.message);
      error.value = err;
    }
  };

  return { error, getURL };
};

export default useStorage;
