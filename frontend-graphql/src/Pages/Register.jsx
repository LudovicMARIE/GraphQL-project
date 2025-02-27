import { Link } from "react-router-dom";
// import { useRequireOfflineUser } from "../Utils/Security/AuthorizationHelper";
import RegisterForm from '../Components/Authentification/RegisterForm.jsx';

function Register() {
  // useRequireOfflineUser();

  return (
    <div className="row justify-content-center">
      <div className="col-11 col-xs-11 col-sm-10 col-md-8 col-lg-6 form-login">
        <div className="card">
          <div className="card-header text-center">
            <h4>Inscription</h4>
          </div>
          <div className="card-body">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register