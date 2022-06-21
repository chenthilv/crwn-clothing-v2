import { useState } from "react";
import { createNewUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";

const initialValues = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(initialValues);
    const { displayName, email, password, confirmPassword } = formFields;

    console.log(formFields);

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value);
        setFormFields({ ...formFields, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password, confirmPassword } = event.target;
        console.log("handle submit : ")
        console.log(email, password, confirmPassword)
        if (password.value !== confirmPassword.value) {
            alert('Password do not match!');
            return;
        }

        try {
            const response = await createNewUserWithEmailAndPassword(email, password);
            console.log(response);
        } catch (error) {
            console.log('User creation has encountered an error : ', error);
        }
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>

            <form onSubmit={handleSubmit}>

                <FormInput label="Display Name" required name="displayName" type="text" onChange={handleChange} value={displayName} />
                <FormInput label="Email" name="email" type="email" required onChange={handleChange} value={email} />
                <FormInput label="Password" name="password" type="password" required onChange={handleChange} value={password} />
                <FormInput label="Confirm Password" name="confirmPassword" type="password" required onChange={handleChange} value={confirmPassword} />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUpForm;