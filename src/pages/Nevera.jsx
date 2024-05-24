import React, { useState, useEffect } from "react";
import SERVER_URL from "../Config/config";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../css/Nevera.css";
import removeAccents from "remove-accents";

const Nevera = () => {
  const [nevera, setNevera] = useState({});
  const [neveraId, setNeveraId] = useState("");
  const [nuevoProducto, setNuevoProducto] = useState("");
  const [nuevaCantidad, setNuevaCantidad] = useState("");
  const [tipoCantidad, setTipoCantidad] = useState("");
  const [unidadesCantidad, setUnidadesCantidad] = useState("KG");
  const [precioProducto, setPrecioProducto] = useState(0);
  const [error, setError] = useState("");
  const [productoEditando, setProductoEditando] = useState(null);
  const [nombreEditando, setNombreEditando] = useState("");
  const [cantidadEditando, setCantidadEditando] = useState("");
  const [tipoEditando, setTipoEditando] = useState("");
  const [unidadesEditando, setUnidadesEditando] = useState("");
  const [precioEditando, setPrecioEditando] = useState(0);
  const [nombreNeveraEditando, setNombreNeveraEditando] = useState("");
  const [imagenProducto, setImagenProducto] = useState(null);

  const normalizeName = (name) => {
    return removeAccents(name.toLowerCase());
  };

  const cargarnevera = async () => {
    if (neveraId) {
      try {
        const response = await fetch(`${SERVER_URL}/nevera/${neveraId}`);
        const data = await response.json();
        setNevera(data.nevera);
      } catch (error) {
        console.error("Error al cargar las nevera:", error);
      }
    }
  };

  const cambiarNombreNevera = async () => {
    setNombreNeveraEditando(nevera.nombre);
    const neveraActualizada = nevera;
    neveraActualizada.nombre = nombreNeveraEditando;
    setNevera(neveraActualizada);

    await fetch(`${SERVER_URL}/nevera/update/${nevera._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(neveraActualizada),
    });
  };

  const obtenerIdNeveraUsuario = async () => {
    try {
      const userEmail = localStorage.getItem("user");
      const response = await fetch(`${SERVER_URL}/cuenta/nevera`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      });

      const data = await response.json();
      setNeveraId(data.nevera);
    } catch (error) {
      console.error("Error al obtener el ID de la nevera del usuario:", error);
    }
  };

  const agregarProducto = async () => {
    try {
      if (!nuevoProducto || !nuevaCantidad || !tipoCantidad || !unidadesCantidad || precioProducto <= 0) {

        setError("Por favor, completa todos los campos correctamente.");
        return;
      }
      const nombreNormalizado = normalizeName(nuevoProducto);

      const nuevoProductoData = {
        nombre: nuevoProducto,
        imagen: imagenProducto || "",
        tipo: tipoCantidad,
        cantidad: nuevaCantidad,
        unidades: unidadesCantidad,
        precio: precioProducto,
      };
      console.log(nuevoProductoData)
      const productosExistente = nevera.productos || [];
      const productosActualizados = [...productosExistente, nuevoProductoData];
      console.log(productosActualizados)
      const requestData = {
        productos: productosActualizados,
      };

      await fetch(`${SERVER_URL}/nevera/update/${neveraId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      cargarnevera();
      setNuevoProducto("");
      setNuevaCantidad("");
      setTipoCantidad("");
      setUnidadesCantidad("");
      setPrecioProducto(0);
      setError("");
      setImagenProducto(null);
    } catch (error) {
      console.error("Error al agregar producto a la nevera:", error);
      setError("Error al agregar producto a la nevera");
    }
  };

  const editarProducto = (producto) => {
    setProductoEditando(producto);
    setNombreEditando(producto.nombre);
    setCantidadEditando(producto.cantidad);
    setTipoEditando(producto.tipo);
    setUnidadesEditando(producto.unidades);
    setPrecioEditando(producto.precio);
    setImagenProducto(producto.imagen || null);
  };

  const handleCancelarEdicion = () => {
    setProductoEditando(null);
  };

  const eliminarProducto = async (nombreProducto) => {
    try {
      const nuevaListaProductos = nevera.productos.filter((producto) => producto.nombre !== nombreProducto);
      const neveraActualizada = { ...nevera, productos: nuevaListaProductos };
      setNevera(neveraActualizada);

      await fetch(`${SERVER_URL}/nevera/update/${neveraId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(neveraActualizada),
      });
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const handleGuardarCambios = async () => {
    try {
      const neveraActualizada = {
        ...nevera,
        productos: nevera.productos.map((producto) => {
          if (producto.nombre === productoEditando.nombre) {
            return {
              ...producto,
              nombre: nombreEditando,
              cantidad: cantidadEditando !== "" ? cantidadEditando : producto.cantidad,
              tipo: tipoEditando !== "" ? tipoEditando : producto.tipo,
              unidades: unidadesEditando !== "" ? unidadesEditando : producto.unidades,
              precio: precioEditando !== 0 ? precioEditando : producto.precio,
              imagen: imagenProducto || producto.imagen,
            };
          }
          return producto;
        }),
      };
      setNevera(neveraActualizada);

      await fetch(`${SERVER_URL}/nevera/update/${neveraId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(neveraActualizada),
      });

      setProductoEditando(null);
      setNombreEditando("");
      setCantidadEditando("");
      setTipoEditando("");
      setUnidadesEditando("");
      setPrecioEditando(0);
      setImagenProducto(null);
    } catch (error) {
      console.error("Error al guardar los cambios del producto:", error);
    }
  };

  useEffect(() => {
    obtenerIdNeveraUsuario();
    cargarnevera();
  }, [neveraId]);

  return (
    <div className="container">
      <h1 className="title">
        {nombreNeveraEditando !== "" ? (
          <input
            type="text"
            value={nombreNeveraEditando}
            onChange={(e) => setNombreNeveraEditando(e.target.value)}
            className="input-edit"
          />
        ) : (
          nevera.nombre
        )}
        {nombreNeveraEditando !== "" && (
          <button onClick={cambiarNombreNevera} className="button-save">
            Guardar
          </button>
        )}
        <FaEdit
          onClick={cambiarNombreNevera}
          style={{ cursor: "pointer", marginLeft: "5px" }}
          className="edit-icon"
        />
      </h1>

      {nevera.productos && (
        <div className="productos-container">
          <h2 className="subtitle">Productos en la Nevera</h2>
          {error && <p className="error-message">{error}</p>}
          <ul className="productos-list">
            {nevera.productos.map((producto) => (
              <li key={producto.nombre} className="producto-item">
                {productoEditando === producto ? (
                  <div className="producto-editing">
                    <input
                      type="text"
                      value={nombreEditando}
                      onChange={(e) => setNombreEditando(e.target.value)}
                      className="input-edit"
                    />
                    <input
                      type="number"
                      placeholder="Cantidad"
                      value={cantidadEditando}
                      onChange={(e) => setCantidadEditando(e.target.value)}
                      className="input-edit"
                    />
                    <select
                      value={tipoEditando}
                      onChange={(e) => setTipoEditando(e.target.value)}
                      className="select-edit"
                    >
                      <option value="">Selecciona el tipo</option>
                      <option value="Granos">Granos</option>
                      <option value="Verduras">Verduras</option>
                      <option value="Frutas">Frutas</option>
                      <option value="Lacteos">Lácteos</option>
                      <option value="Carne">Carne</option>
                      <option value="Pescados">Pescados</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Unidades"
                      value={unidadesEditando}
                      onChange={(e) => setUnidadesEditando(e.target.value)}
                      className="input-edit"
                    />
                    <input
                      type="number"
                      placeholder="Precio"
                      value={precioEditando}
                      onChange={(e) => setPrecioEditando(e.target.value)}
                      className="input-edit"
                    />
                    <button onClick={handleCancelarEdicion} className="button-cancel">
                      Cancelar
                    </button>
                    <button onClick={handleGuardarCambios} className="button-save">
                      Guardar
                    </button>
                  </div>
                ) : (
                  <>
                    {producto.nombre} - {producto.cantidad} {producto.tipo} - {producto.unidades} - ${producto.precio}
                    <FaEdit
                      onClick={() => editarProducto(producto)}
                      style={{ cursor: "pointer", marginLeft: "5px" }}
                      className="edit-icon"
                    />
                    <FaTrash
                      onClick={() => eliminarProducto(producto.nombre)}
                      style={{ cursor: "pointer", marginLeft: "5px" }}
                      className="trash-icon"
                    />
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="añadir-container">
        <h2 className="subtitle">Añadir Nuevo Producto</h2>
        <div className="nuevo-producto-container">
          <input
            type="text"
            placeholder="Nombre del Producto"
            value={nuevoProducto}
            onChange={(e) => setNuevoProducto(e.target.value)}
            className="input-add"
          />
          <input
            type="file"
            onChange={(e) => setImagenProducto(e.target.files[0])}
            className="input-add"
          />
          <input
            type="number"
            placeholder="Cantidad"
            value={nuevaCantidad}
            onChange={(e) => setNuevaCantidad(e.target.value)}
            className="input-add"
          />
          <select
            value={tipoCantidad}
            onChange={(e) => setTipoCantidad(e.target.value)}
            className="select-add"
          >
            <option value="">Selecciona el tipo</option>
            <option value="Granos">Granos</option>
            <option value="Verduras">Verduras</option>
            <option value="Frutas">Frutas</option>
            <option value="Lacteos">Lácteos</option>
            <option value="Carne">Carne</option>
            <option value="Pescados">Pescados</option>
          </select>
          <select
            value={unidadesCantidad}
            onChange={(e) => setUnidadesCantidad(e.target.value)}
            className="input-add"
          >
            <option value="KG">KG</option>
            <option value="Litros">Litros</option>
            <option value="Unidades">Unidades</option>
          </select>
          <input
            type="number"
            placeholder="Precio en €"
            value={precioProducto}
            onChange={(e) => setPrecioProducto(e.target.value)}
            className="input-add"
          />
          <button onClick={agregarProducto} className="button-add">
            Agregar Producto
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nevera;
