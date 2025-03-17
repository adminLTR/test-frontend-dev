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
        <Navbar id="navbar" className="shadow-sm mb-2">
          <Container fluid>
            <Navbar.Brand href="/">
              <img
                src="/logo.png"
                alt="ParisCorp"
                height="40"
                className="d-inline-block align-middle rounded-circle me-3"
              />
              Paris Corp
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
                  className="p-0 border-0 text-black"
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

      <footer className="bg-dark text-white">
        <div className="w-100 bg-primary d-flex justify-content-center align-items-center gap-3 py-3">
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
        <div className="d-flex align-items-center justify-content-center flex-column gap-4 py-2 py-md-5">
          <img src="/logo.png" alt="" width={200}/>
          <p className="fs-3">
            Paris Corp
          </p>
        </div>
        <div className="container border-top border-primary border-2 text-center pt-3">
          <p>
            "El conocimiento es poder, y aquí está al alcance de todos."
          </p>
          <p>
            © {new Date().getFullYear()} ParisCorp. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </Container>
  );
}
