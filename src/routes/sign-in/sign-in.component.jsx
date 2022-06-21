import {
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
  auth,
} from "../../utils/firebase/firebase.utils";
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
    // below useEffect is to load the page again after redirect by fetching result using firebase api method getRedirectResult.
    // if useEffect not used, state can't be maintained 
  useEffect(() => {
      async function fetchData() {
        const response = await getRedirectResult(auth);
        console.log(response);    
        if (response) {
            createUserDocumentFromAuth(response.user);
        }
      }
      fetchData();
  }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    createUserDocumentFromAuth(user);
    console.log(user);
  };

  return (
    <div>
      <button onClick={logGoogleUser}>Sign In With Google</button>
      <button onClick={signInWithGoogleRedirect}>
        Sign In With Google Redirect
      </button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
