import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase.config";

export const signInWithGoogle = async () => {
  let googleProvider = new GoogleAuthProvider();
  let result = await signInWithPopup(auth, googleProvider);
  let credential = GoogleAuthProvider.credentialFromResult(result);
  let token = credential.accessToken;
  return token;
};
