import { gql, useMutation } from "@apollo/client";
import { Button } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { graphql } from "../../gql/gql";


const CREATE_ARTICLE = graphql(`
  mutation CreateArticle($title: String!, $content: String!) {
    createArticle(title: $title, content: $content) {
      code
      success
      message
      article {
        id
        title
        content
        published
        authorId
        author {
          id
          email
          username
          bio
        }
      }
    }
  }
`)

export const CreateArticleForm = () => {
  const navigate = useNavigate();
  const { getUserInfos } = useContext(UserContext);
  const user = getUserInfos();
  const [createArticle, { loading }] = useMutation(CREATE_ARTICLE, {
    context: {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    },
  })

  console.log('user', user);

  return (
    <Formik
      initialValues={{ title: "", content: "" }}
      validationSchema={Yup.object({
        title: Yup.string().required("Le titre est requis"),
        content: Yup.string().required("Le contenu est requis"),
      })}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        try {
          const { data } = await createArticle({
            variables: {
              title: values.title,
              content: values.content,
            },
          });

          if (data?.createArticle?.success) {
            navigate("/articles", { replace: true });
          } else {
            setStatus(data?.createArticle?.message || "Une erreur est survenue.");
          }
        } catch (err) {
          if (err instanceof Error) {
            console.error("Erreur lors de la création de l'article :", err.message);
            setStatus("Erreur lors de la création de l'article. Veuillez réessayer.");
          }
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, status }) => (
        <Form>
          <div className="form-group mb-3">
            <label htmlFor="title">Titre :</label>
            <Field className="form-control" type="text" name="title" placeholder="Titre de l'article" required />
            <ErrorMessage name="title" component="div" style={{ color: "red" }} />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="content">Contenu :</label>
            <Field as="textarea" className="form-control" name="content" placeholder="Contenu de l'article" required />
            <ErrorMessage name="content" component="div" style={{ color: "red" }} />
          </div>

          {status && <p style={{ color: "red" }}>{status}</p>}

          <div className="d-flex justify-content-center">
            <Button variant="contained" type="submit" disabled={isSubmitting || loading}>
              {loading ? "Publication..." : "Publier"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
