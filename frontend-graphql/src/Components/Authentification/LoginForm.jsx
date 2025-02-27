import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { getApiRoute } from '../../Utils/Route/ApiRoute';
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
  let inputEmail, inputPassword;
  const [signIn, { data, loading, error }] = useMutation(SIGN_IN_MUTATION);

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signIn({
            variables: { email: inputEmail.value, password: inputPassword.value },
          });
          inputEmail.value = "";
          inputPassword.value = "";
        }}
      >
        <input
          ref={(node) => {
            inputEmail = node;
          }}
          placeholder="Email"
        />
        <input
          ref={(node) => {
            inputPassword = node;
          }}
          placeholder="password"
        />
        {error && <p style={{ color: "red" }}>Erreur : {error.message}</p>}
        <button type="submit">{loading ? "Connexion..." : "Connexion"}</button>
      </form>
      {/* <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const { data } = await signIn({
              variables: {
                data: {
                  email: values.email,
                  password: values.password,
                },
              },
            });

            if (data?.signIn?.token) {
              login(data.signIn); // Enregistre les données utilisateur
              navigate("/", { replace: true });
            }
          } catch (err) {
            console.error("Erreur de connexion :", err.message);
          }
          setSubmitting(false);
        }}
        validationSchema={Yup.object({
          email: Yup.string().email("Email invalide").required("Requis"),
          password: Yup.string().required("Requis"),
        })}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group mb-3">
              <label htmlFor="email">Email :</label>
              <Field className="form-control" type="email" name="email" placeholder="Email" required />
              <ErrorMessage style={{ color: "red" }} name="email" component="div" />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="password">Mot de passe :</label>
              <Field className="form-control" type="password" name="password" placeholder="Mot de passe" required />
              <ErrorMessage style={{ color: "red" }} name="password" component="div" />
            </div>

            {error && <p style={{ color: "red" }}>Erreur : {error.message}</p>}

            <div className="d-flex flex-column gap-3 align-items-center text-center">
              <Button variant="contained" type="submit" disabled={isSubmitting || loading}>
                {loading ? "Connexion..." : "Connexion"}
              </Button>
              <p className='mb-0'>
                Pas de compte ? Pas de problème ! <Link to="/register">Inscrivez-vous maintenant !</Link>
              </p>
            </div>
          </Form>

        )}
      </Formik> */}


    </>
  )

}

export default LoginForm;