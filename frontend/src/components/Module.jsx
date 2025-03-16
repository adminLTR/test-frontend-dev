import {
    ListGroup,
    Badge,
  } from "react-bootstrap";

export default function Module({modulo, claseActual, setClaseActual}) {
    return (
        <div className="mb-4">
            <h6>{modulo.titulo}</h6>
            <p className="small text-muted">{modulo.descripcion}</p>
            <ListGroup>
                {modulo.clases.map((clase, claseIdx) => (
                    <ListGroup.Item
                    key={claseIdx}
                    action
                    active={claseActual.titulo === clase.titulo}
                    onClick={() => {
                        setClaseActual(clase);
                        handleClose(); // Cierra el Offcanvas al seleccionar
                    }}
                    className="d-flex justify-content-between align-items-center"
                    >
                    {clase.titulo}
                    <Badge bg={clase.completado ? "success" : "secondary"}>
                        {clase.completado ? "✓" : "•"}
                    </Badge>
                </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
}