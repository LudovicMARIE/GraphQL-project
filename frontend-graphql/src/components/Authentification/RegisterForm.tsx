import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { gql, useMutation } from "@apollo/client";
import { User } from '../../gql/graphql';

const CREATE_USER_MUTATION = gql`
  mutation createUser($email: String!, $password: String!, $username: String!, $bio: String) {
    createUser(email: $email, password: $password, username: $username, bio: $bio) {
      code
      success
      message
      user {
        id
        email
        username
        bio
      }
    }
  }
`;

interface createUserResponse {
  createUser: {
    code: string;
    success: boolean;
    message: string;
    user: User;
  };
}

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useContext(UserContext);
  
  const [createUser, { loading, error }] = useMutation<createUserResponse>(CREATE_USER_MUTATION);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        username: "",
        bio: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string().email("Email invalide").required("Champ obligatoire"),
        password: Yup.string().min(6, "Minimum 6 caractères").required("Champ obligatoire"),
        username: Yup.string().required("Champ obligatoire"),
        bio: Yup.string(),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          const { data } = await createUser({ variables: values });

          if (data?.createUser?.success) {
            register(data.createUser.user);
            navigate("/login", { replace: true });
            resetForm();
          }
        } catch (err) {
          console.error("Erreur d'inscription :", err);
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="form-group mb-3">
            <label>Email :</label>
            <Field className="form-control" type="email" name="email" placeholder="Email" />
          </div>
          <div className="form-group mb-3">
            <label>Mot de passe :</label>
            <Field className="form-control" type="password" name="password" placeholder="Mot de passe" />
          </div>
          <div className="form-group mb-3">
            <label>Username :</label>
            <Field className="form-control" type="text" name="username" placeholder="Username" />
          </div>
          <div className="form-group mb-3">
            <label>Bio :</label>
            <Field className="form-control" type="text" name="bio" placeholder="Bio (optionnel)" />
          </div>
          {error && <p style={{ color: "red" }}>Erreur : {error.message}</p>}
          <div className="d-flex flex-column gap-3 align-items-center text-center mt-3">
            <Button variant="contained" type="submit" disabled={loading || isSubmitting}>
              {loading ? "Inscription..." : "Inscription"}
            </Button>
            <p className='mb-0'>
              Déjà un compte ? <Link to="/login">Connectez-vous maintenant !</Link>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;