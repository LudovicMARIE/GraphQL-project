import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { gql, useMutation } from "@apollo/client";

const SIGN_IN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      code
      success
      message
      token
    }
  }
`;

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [signIn, { loading }] = useMutation(SIGN_IN_MUTATION);

  return (
    <div className="login-container">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email('Email invalide').required('Requis'),
          password: Yup.string().required('Requis'),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            const { data } = await signIn({
              variables: {
                email: values.email,
                password: values.password,
              },
            });

            if (data?.signIn?.token) {
              login(data.signIn);
              console.log("Token après connexion :", data?.signIn?.token);
              navigate("/articles", { replace: true });
            } else {
              setErrors({ general: "Erreur lors de la connexion. Vérifiez vos identifiants." } as Record<string, string>);
            }
          } catch (err) {
            if (err instanceof Error) {
              console.error("Erreur d'inscription :", err.message);
              setErrors({ general: err.message } as Record<string, string>);
            }
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="email">Email :</label>
              <Field className="form-control" type="email" name="email" placeholder="Email" required />
              <ErrorMessage className="error-message" name="email" component="div" style={{ color: "red" }} />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de passe :</label>
              <Field className="form-control" type="password" name="password" placeholder="Mot de passe" required />
              <ErrorMessage className="error-message" name="password" component="div" style={{color: "red"}} />
            </div>

            {errors.general && <p className="error-message" style={{ color: "red" }}>Erreur : {errors.general}</p>}

            <div className="d-flex flex-column gap-3 align-items-center text-center">
              <Button variant="contained" type="submit" disabled={isSubmitting || loading}>
                {loading ? "Connexion..." : "Connexion"}
              </Button>
              <p className="footer-text">
                Pas de compte ? Pas de problème ! <Link to="/register">Inscrivez-vous maintenant !</Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;