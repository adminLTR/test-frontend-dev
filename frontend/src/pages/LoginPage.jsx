import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { loginUser } from "../js/api";
import "../css/animations.css"; // Importa tu archivo CSS

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = (await loginUser(username, password));      
      localStorage.setItem('token', res.data.access_token);
      window.location.href = "/";
    } catch (error) {
      withReactContent(Swal).fire({
        title: "Error al logearse",
        text: "Credenciales incorrectas",
        icon: "error"
      });
      setUsername("");
      setPassword("");
    }
  }

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center fade-in">
      <Row className="w-100 shadow-lg rounded overflow-hidden bg-white zoom-in" style={{ maxWidth: 900 }}>
        <Col md={6} className="p-0 d-none d-md-block">
          <img
            src="/login-img.png"
            alt="Logo Empresa"
            className="img-fluid h-100 w-100 object-fit-cover"
          />
        </Col>

        <Col md={6} className="bg-white p-5 d-flex flex-column justify-content-center">
          <h3 className="text-center mb-4 text-primary slide-in-top">Iniciar Sesión</h3>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                className="input-animated"
                type="text"
                placeholder="Ingresa tu usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                className="input-animated"
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 btn-animated">
              Ingresar
            </Button>
            <Button type="button" className="w-100 link-primary bg-white border-0 mt-2 btn-animated">
              ¿No tienes cuenta? Crear cuenta
            </Button>
          </Form>

          {error && <p className="text-danger mt-3 text-center">{error}</p>}
        </Col>
      </Row>
    </Container>
  );
}
