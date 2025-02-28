import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { gql, useMutation } from "@apollo/client";
import { User } from '../../gql/graphql';

const SIGN_IN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      code
      success
      message
      token
      user {
        id
        email
        username
        bio
      }
    }
  }
`;

interface SignInResponse {
  signIn: {
    code: string;
    success: boolean;
    message: string;
    token: string;
    user: User
    userId: string;
  }
}

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  
  // Utiliser useRef au lieu de variables simples pour éviter les problèmes de typage
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  
  const [signIn, { data, loading, error }] = useMutation<SignInResponse>(SIGN_IN_MUTATION);

  // Ces lignes vont empêcher le rendu du formulaire - il faut les déplacer
  // if (loading) return "Submitting...";
  // if (error) return `Submission error! ${error.message}`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (inputEmailRef.current && inputPasswordRef.current) {
      try {
        const { data } = await signIn({
          variables: { 
            email: inputEmailRef.current.value, 
            password: inputPasswordRef.current.value 
          },
        });

        // Traitement de la réponse
        if (data?.signIn?.token) {
          login(data.signIn); // Enregistre les données utilisateur
          console.log("data")
          console.log(data);
          localStorage.setItem('userId', data?.signIn.user.id ?? "")
          
          navigate("/articles", { replace: true });
        }
        
        // Réinitialiser les champs
        inputEmailRef.current.value = "";
        inputPasswordRef.current.value = "";
      } catch (err) {
        // L'erreur sera capturée par Apollo et disponible via la variable error
        console.error("Erreur de connexion :", err);
      }
    }
  };

  return (
    <>
      {loading ? (
        <div>Connexion en cours...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            ref={inputEmailRef}
            type="email"
            placeholder="Email"
            required
          />
          <input
            ref={inputPasswordRef}
            type="password"
            placeholder="Mot de passe"
            required
          />
          {error && <p style={{ color: "red" }}>Erreur : {error.message}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Connexion..." : "Connexion"}
          </button>
        </form>
      )}
    </>
  );
};

export default LoginForm;