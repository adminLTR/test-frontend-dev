import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getModulos } from "../js/api";
import Module from "../components/Module";
import {
    Container,
    Row,
    Col,
    Button,
    Offcanvas,
    ListGroup,
    Badge,
    Card,
  } from "react-bootstrap";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

export async function loader() {
    const modulos = await getModulos(localStorage.getItem("token"));
    return modulos.data;
}

export default function CursoPage() {
  const modulos = useLoaderData();
  const [claseActual, setClaseActual] = useState(modulos[0].clases[0]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container fluid className="py-3">
      <Row>
        {/* Video Principal */}
        <Col xs={12} md={9} className="mb-4">
          {claseActual ? (
            <Card className="shadow">
              <Card.Body>
                <Card.Title>{claseActual.titulo}</Card.Title>
                <Card.Text>{claseActual.descripcion}</Card.Text>
                <div className="ratio ratio-16x9 mb-3">
                  <video src={claseActual.video} controls className="rounded" />
                </div>
                <p>
                  <strong>Duración:</strong> {claseActual.duracion}
                </p>
                <p>
                  <strong>Estado:</strong>{" "}
                  {claseActual.completado ? (
                    <Badge bg="success">Completado</Badge>
                  ) : (
                    <Badge bg="warning" text="dark">
                      Pendiente
                    </Badge>
                  )}
                </p>
              </Card.Body>
            </Card>
          ) : (
            <p>Cargando clase...</p>
          )}
        </Col>

        <Col xs={12} className="d-md-none mb-3 text-center">
          <Button variant="primary" onClick={handleShow}>
            Ver Módulos y Clases
          </Button>
        </Col>

        {/* Sidebar */}
        <Col md={3} className="d-none d-md-block">
          <Card className="h-100 shadow">
            <Card.Header>Módulos y Clases</Card.Header>
            <Card.Body className="overflow-auto" style={{ maxHeight: "80vh" }}>
              {modulos.map((modulo, i) => (
                <Module 
                modulo={modulo} 
                claseActual={claseActual} 
                setClaseActual={setClaseActual}
                key={i}
                />
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Offcanvas para móviles */}
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Módulos y Clases</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {modulos.map((modulo, i) => (
            <Module 
            modulo={modulo} 
            claseActual={claseActual} 
            setClaseActual={setClaseActual}
            key={i}
            />
          ))}
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
}
