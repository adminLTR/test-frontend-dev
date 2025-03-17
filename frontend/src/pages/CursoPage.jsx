import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getModulos } from "../js/api";
import Module from "../components/Module";
import {
    Container,
    Row,
    Col,
    Button,
    Offcanvas,
    Badge,
    Card,
  } from "react-bootstrap";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

export async function loader() {
    const token = localStorage.getItem("token");
    try {
      const modulos = await getModulos(token);      
      return modulos.data;    
    } catch (error) {
      window.location.href = '/login'
      return null      
    }
}

export default function CursoPage() {
  const modulos = useLoaderData();
  const [claseActual, setClaseActual] = useState( modulos[0].clases[0]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <Container fluid className="h-100 bg-white">
      <Row className="h-100">
        {/* Video Principal */}
        <Col xs={12} lg={8} xl={9} className="mb-4 p-0">
          {claseActual ? (
            <Card className="border-0 bg-white">
              <Card.Body>
                <Card.Title className="text-primary fw-bold fs-4">
                  {claseActual.titulo}
                </Card.Title>
                <Card.Text className="text-black">{claseActual.descripcion}</Card.Text>
                <div className="ratio ratio-16x9 mb-3">
                  <video src={claseActual.video} controls className="rounded" />
                </div>
              </Card.Body>
            </Card>
          ) : (
            <p className="text-white">Cargando clase...</p>
          )}
        </Col>

        <Col xs={12} className="d-lg-none mb-3 text-center">
          <Button variant="primary" onClick={handleShow}>
            Ver Módulos y Clases
          </Button>
        </Col>

        {/* Sidebar */}
        <Col lg={4} xl={3} className="d-none d-lg-block p-0">
          <Card className="h-100 border-0 bg-white rounded-0">
            <Card.Header className="text-primary bg-white fs-3 mb-4 fw-bold">
              Contenido
            </Card.Header>
            <Card.Body className="overflow-auto text-white" style={{ maxHeight: "80vh" }}>
              {modulos.map((modulo, i) => (
                <Module 
                modulo={modulo} 
                claseActual={claseActual} 
                setClaseActual={setClaseActual}
                key={i}
                index={i}
                />
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Offcanvas */}
      <Offcanvas show={show} onHide={handleClose} placement="end" className="h-100 border-0 bg-white">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="text-primary text-center fs-3 mb-4 fw-bold">
            Contenido
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {modulos.map((modulo, i) => (
            <Module 
            modulo={modulo} 
            claseActual={claseActual} 
            setClaseActual={setClaseActual}
            key={i}
            index={i}
            />
          ))}
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
}
