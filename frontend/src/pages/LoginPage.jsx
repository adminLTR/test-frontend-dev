import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error("Usuario o contraseña incorrectos");

      const data = await response.json();
      const jwt = data.token;

      localStorage.setItem("jwt", jwt); // Guardar token

      // Redirigir (ajusta la ruta según tu proyecto)
      alert("LOGIN CORRECTO")
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center">
      <Row className="w-100 shadow-lg rounded overflow-hidden bg-white" style={{ maxWidth: 900 }}>
        <Col md={6} className="p-0 d-none d-md-block">
          <img
            src="/login-img.png"
            alt="Logo Empresa"
            className="img-fluid h-100 w-100 object-fit-cover"
          />
        </Col>

        <Col md={6} className="bg-white p-5 d-flex flex-column justify-content-center">
          <h3 className="text-center mb-4 text-primary">Iniciar Sesión</h3>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
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
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Ingresar
            </Button>
            <Button type="submit" className="w-100 link-primary bg-white border-0">
              ¿No tienes cuenta? Crear cuenta
            </Button>
          </Form>

          {error && <p className="text-danger mt-3 text-center">{error}</p>}
        </Col>
      </Row>
    </Container>
  );
}
