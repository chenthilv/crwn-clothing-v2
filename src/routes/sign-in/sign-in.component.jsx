import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';


const SignIn = () => {

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        createUserDocumentFromAuth(user);
        console.log(user);

    }


    return (
        <div>
            <button onClick={logGoogleUser} >
               Sign In With Google
            </button>
        </div>
    );
};

export default SignIn;