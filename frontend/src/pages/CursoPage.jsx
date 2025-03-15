import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function CursoPage() {
  const [modulos, setModulos] = useState([]);
  const [claseActual, setClaseActual] = useState(null);

  // Token simulado (debes traerlo desde contexto o props)
  const token = localStorage.getItem("token");

  // Fetch data de la API al cargar
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/modulos", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setModulos(res.data);
        // Establecer por defecto la primera clase
        if (res.data.length > 0 && res.data[0].clases.length > 0) {
          setClaseActual(res.data[0].clases[0]);
        }
      })
      .catch((err) => console.error(err));
  }, [token]);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Video Principal */}
        <div className="col-12 col-md-9 p-3">
          {claseActual ? (
            <>
              <h2>{claseActual.titulo}</h2>
              <p>{claseActual.descripcion}</p>
              <video
                src={claseActual.video}
                controls
                className="w-100 rounded shadow"
                style={{ maxHeight: "60vh", objectFit: "cover" }}
              />
              <p className="mt-3">
                <strong>Duración:</strong> {claseActual.duracion}
              </p>
              <p>
                <strong>Estado:</strong>{" "}
                {claseActual.completado ? (
                  <span className="badge bg-success">Completado</span>
                ) : (
                  <span className="badge bg-warning">Pendiente</span>
                )}
              </p>
            </>
          ) : (
            <p>Cargando clase...</p>
          )}
        </div>

        {/* Botón de Offcanvas (visible solo en móviles) */}
        <div className="col-12 d-md-none text-center mb-3">
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasModulos"
          >
            Ver Módulos y Clases
          </button>
        </div>

        {/* Sidebar u Offcanvas */}
        <div
          className="col-md-3 offcanvas-md offcanvas-end"
          tabIndex="-1"
          id="offcanvasModulos"
          aria-labelledby="offcanvasModulosLabel"
        >
          <div className="offcanvas-header">
            <h5 id="offcanvasModulosLabel">Módulos y Clases</h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body overflow-auto">
            {modulos.map((modulo, idx) => (
              <div key={idx} className="mb-4">
                <h6>{modulo.titulo}</h6>
                <p className="small text-muted">{modulo.descripcion}</p>
                <ul className="list-group">
                  {modulo.clases.map((clase, claseIdx) => (
                    <li
                      key={claseIdx}
                      className={`list-group-item list-group-item-action ${
                        claseActual && claseActual.titulo === clase.titulo
                          ? "active"
                          : ""
                      }`}
                      role="button"
                      onClick={() => setClaseActual(clase)}
                    >
                      {clase.titulo}
                      <span
                        className={`badge ms-2 ${
                          clase.completado ? "bg-success" : "bg-secondary"
                        }`}
                      >
                        {clase.completado ? "✓" : "•"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
