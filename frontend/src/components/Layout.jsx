import { Container, Navbar, Nav, Dropdown, Image, Badge, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { BellFill, Facebook, Instagram, Twitter, Linkedin } from "react-bootstrap-icons"; 

export default function Layout() {
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        window.location.href = "/";
    }
  return (
    <Container fluid className="h-100 d-flex flex-column p-0">
      <header className="w-100">
        <Navbar bg="info" className="shadow-sm px-5">
          <Container fluid>
            <Navbar.Brand href="/">
              <img
                src="/logo.png"
                alt="ParisCorp"
                height="60"
                className="d-inline-block align-middle rounded-circle"
              />
            </Navbar.Brand>

            <Nav className="ms-auto align-items-center gap-3">
              <div role="button" className="position-relative">
                <BellFill color="black" size={22} />
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: "0.6rem" }}
                >
                  3
                </Badge>
              </div>

              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="link"
                  id="dropdown-avatar"
                  className="p-0 border-0"
                >
                  <Image
                    src="/avatar.png" 
                    roundedCircle
                    height="40"
                    width="40"
                    className="border"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Header>Usuario</Dropdown.Header>
                  <Dropdown.Item href="#">Perfil</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#" onClick={handleLogout} className="text-danger">
                    Cerrar sesión
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Container>
        </Navbar>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow-1">
        <Outlet />
      </main>

      <footer className="bg-black text-white py-4 mt-auto">
        <Container>
            <Row className="align-items-center">
                <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
                    <h5 className="mb-3">Síguenos</h5>
                    <div className="d-flex justify-content-center justify-content-md-start gap-3">
                    <a href="#" className="text-white">
                        <Facebook size={24} />
                    </a>
                    <a href="#" className="text-white">
                        <Instagram size={24} />
                    </a>
                    <a href="#" className="text-white">
                        <Twitter size={24} />
                    </a>
                    <a href="#" className="text-white">
                        <Linkedin size={24} />
                    </a>
                    </div>
                </Col>

                <Col md={4} className="text-center mb-3 mb-md-0">
                    <h6>"El conocimiento es poder, y aquí está al alcance de todos."</h6>
                    <p className="small mb-0">© {new Date().getFullYear()} ParisCorp. Todos los derechos reservados.</p>
                </Col>

                <Col md={4} className="text-center text-md-end">
                    <h5 className="mb-3">Explora</h5>
                    <ul className="list-unstyled">
                    <li>
                        <a href="#" className="text-white text-decoration-none">
                        Cursos
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-white text-decoration-none">
                        Contacto
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-white text-decoration-none">
                        Soporte
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-white text-decoration-none">
                        Términos y Condiciones
                        </a>
                    </li>
                    </ul>
                </Col>
            </Row>
        </Container>
        </footer>
    </Container>
  );
}
