import { Container, Navbar, Nav, Dropdown, Image, Badge } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { BellFill } from "react-bootstrap-icons"; 

export default function Layout() {
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        window.location.href = "/";
    }
  return (
    <Container fluid className="h-100 d-flex flex-column p-0">
      <header className="w-100 position-sticky top-0 left-0 z-1">
        <Navbar bg="primary" expand="lg" className="shadow-sm px-5">
          <Container fluid>
            <Navbar.Brand href="/">
              <img
                src="/logo.png"
                alt="ParisCorp"
                height="80"
                className="d-inline-block align-middle rounded-circle"
              />
            </Navbar.Brand>

            <Nav className="ms-auto align-items-center gap-3">
              <div role="button" className="position-relative">
                <BellFill size={22} />
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
    </Container>
  );
}
