const currency = new Intl.NumberFormat("en-US", {
  style: "currency", currency: "USD", maximumFractionDigits: 2
});
const body = document.querySelector("#table-body");

function normalize(value) {
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Corregido: Agregamos http://localhost:3001 para que apunte al backend
const path = "http://localhost:3001/api/v1/resumen/ventas-diarias?desde=2026-10-28&hasta=2026-11-02";

async function api(path, options = {}) {
  const response = await fetch(`${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  const payload = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(payload?.error?.message || 'No fue posible completar la operación.');
  }
  return payload?.data;
}

async function render(){
  const filteredBD = await api(path);
  console.log(filteredBD);

  let filtered = filteredBD || [];
  body.replaceChildren();

  filtered.forEach(resumen => {
    const row = document.createElement("tr");
    [
      resumen.fecha, 
      resumen.cantidadVentas, 
      resumen.unidadesVendidas, 
      currency.format(resumen.ingresos), 
      currency.format(resumen.ticketPromedio), 
      resumen.ultimaActualizacion
    ].forEach(value => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.append(cell);
    });
    body.append(row);
  });
}

render();