import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function Index() {
  const navigate = useNavigate()

  return (
    <div className="container d-flex justify-content-center align-items-center p-4">
      <div className="d-flex flex-column justify-content-center">
        <div className="d-flex flex-row gap-3 justify-content-center">
          <Button variant="contained" onClick={() => navigate("/login")}>
            Connexion
          </Button>
          <Button variant="outlined" onClick={() => navigate("/register")} sx={{ color: "white"}}>
            Inscription
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Index