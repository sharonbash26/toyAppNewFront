import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup";
import { useEffect, useState } from "react"

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});

export function MyForm() {
    const [isFormVisible, setFormVisible] = useState(false); 


    return (
        <div className='my-form'>
            <button 
                className="signin-btn"
                onClick={() => setFormVisible(!isFormVisible)}  // Toggle form visibility
            >
                Sign In
            </button>

            {isFormVisible &&  // Added curly braces for conditional rendering
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={values => {
                        console.log(values);
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <Field name="firstName" />
                            {errors.firstName && touched.firstName ? (
                                <div>{errors.firstName}</div>
                            ) : null}
                            <Field name="lastName" />
                            {errors.lastName && touched.lastName ? (
                                <div>{errors.lastName}</div>
                            ) : null}
                            <Field name="email" type="email" />
                            {errors.email && touched.email ? <div>{errors.email}</div> : null}
                            <button type="submit">Submit</button>
                        </Form>
                    )}
                </Formik>
            }
        </div>
    );
}





