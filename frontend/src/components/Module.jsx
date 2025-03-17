import {
    ListGroup,
    Accordion,
  } from "react-bootstrap";

export default function Module({modulo, claseActual, setClaseActual, index}) {
    return (
        <Accordion className="mb-4 p-0" defaultActiveKey="0">
            <Accordion.Item className="bg-white border-0 p-0" eventKey={index+""}>
                <Accordion.Header className="bg-white">
                    {modulo.titulo}
                </Accordion.Header>
                <Accordion.Body>
                    <p className="small text-black">{modulo.descripcion}</p>
                    <ListGroup>
                        {modulo.clases.map((clase, claseIdx) => (
                            <ListGroup.Item
                            key={claseIdx}
                            action
                            active={claseActual.titulo === clase.titulo}
                            onClick={() => {
                                setClaseActual(clase);
                                handleClose();
                            }}
                            className="d-flex justify-content-between align-items-center bg-white text-white border-0"
                            >
                            <div className={`d-flex align-items-center gap-2 w-100 ${claseActual.titulo === clase.titulo ? 'text-primary' : 'text-secondary'}`}>	
                                {/* {clase.completado ? <span className={"material-symbols-outlined " + (claseActual.titulo === clase.titulo ? 'text-primary' : 'text-success')}>
                                    check_circle
                                </span> : <span className={`material-symbols-outlined `}>
                                    expand_circle_right
                                </span>} */}

                                <div className={`${clase.completado && claseActual.titulo !== clase.titulo && 'text-black'} w-100`}>
                                    <p className="p-0 m-0 d-flex align-items-center justify-content-between fw-bold">
                                        {clase.titulo}
                                        {clase.completado && <span className={"material-symbols-outlined fs-4 " + (claseActual.titulo === clase.titulo ? 'text-primary' : 'text-success')}>
                                            check_circle
                                        </span>}
                                    </p>
                                    <p className="d-flex align-items-center gap-1 fs-6 p-0 m-0 fw-light">
                                        <span class="material-symbols-outlined fs-6 fw-light">
                                            schedule
                                        </span>
                                        {clase.duracion}
                                    </p>
                                </div>
                            </div>
                        </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}