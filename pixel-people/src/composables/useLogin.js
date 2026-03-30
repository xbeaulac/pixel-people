import { ref } from "vue";
import { auth } from "../firebase/config";
import { signInWithCustomToken } from "firebase/auth";

const error = ref(null);
const isPending = ref(false);

const login = async (customToken) => {
  error.value = null;
  isPending.value = true;

  try {
    const res = await signInWithCustomToken(auth, customToken);
    if (!res) {
      throw new Error("Could not complete log in.");
    }
    error.value = null;
    isPending.value = false;
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
    isPending.value = false;
  }
};

const useLogin = () => {
  return { login, error, isPending };
};

export default useLogin
