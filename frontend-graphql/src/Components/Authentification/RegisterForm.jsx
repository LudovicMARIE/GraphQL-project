import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
// import { getApiRoute } from '../../Utils/Route/ApiRoute';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useContext(UserContext);

  return (
    <>
      <Formik
        initialValues={{
          nom: "",
          prenom: "",
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          try {
            const response = await fetch(getApiRoute(`auth/register`), {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            });

            if (response.ok) {
              const data = await response.json();
              register(data);
              navigate("/login", { replace: true });
            } else {
              // setFlashMessage("Nom de compte ou mot de passe incorrect.");
            }
          } catch (error) {
            // setFlashMessage("Erreur : " + error.message);
            console.error(error);
          }
        }}
        validationSchema={Yup.object({
          nom: Yup.string().required("Required"),
          prenom: Yup.string().required("Required"),
          email: Yup.string().required("Required"),
          password: Yup.string().required("Required"),
        })}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group mb-3">
              <label htmlFor="register">Nom :</label>
              <Field className="form-control" type="text" name="nom" placeholder="Nom" required />
              {/* <ErrorMessage style={{ color: "red" }} name="nom" component="div" /> */}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="register">Prénom :</label>
              <Field className="form-control" type="text" name="prenom" placeholder="Prénom" required />
              {/* <ErrorMessage style={{ color: "red" }} name="prenom" component="div" /> */}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="register">Email :</label>
              <Field className="form-control" type="email" name="email" placeholder="Email" required />
              {/* <ErrorMessage style={{ color: "red" }} name="email" component="div" /> */}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="register">Mot de passe :</label>
              <Field className="form-control" type="password" name="password" placeholder="Mot de passe" required />
              {/* <ErrorMessage style={{ color: "red" }} name="password" component="div" /> */}
            </div>
            <div className=" d-flex flex-column gap-3 align-items-center text-center mt-3">
              <Button variant="contained" type="submit" disabled={isSubmitting}>
                Inscription
              </Button>
              <p className='mb-0'>
                Déjà un compte ? Pas de problème ! <Link to="/register">Connectez-vous maintenant !</Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )

}

export default RegisterForm;