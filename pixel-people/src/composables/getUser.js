import { ref } from "vue";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

// user ref
const user = ref(auth.currentUser);

// detects auth changes
onAuthStateChanged(auth, (_user) => {
  console.log("Current user is:", _user);
  user.value = _user;
});

const getUser = () => {
  return { user };
};

export default getUser
