import LoginForm from "../components/Authentification/LoginForm";
import React from "react";

const LoginCard: React.FC = () => {
  return (
    <div className="card shadow-lg rounded-lg overflow-hidden border-0" style={{ maxWidth: "400px" }}>
      <div className="card-header text-center bg-primary text-white py-3">
        <h4 className="mb-0">Connexion</h4>
      </div>
      <div className="card-body p-4">
        <LoginForm />
      </div>
    </div>
  );
};

const LoginPage: React.FC = () => {
  return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100" 
      style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-11 col-sm-10 col-md-8 col-lg-6 d-flex justify-content-center">
            <LoginCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;