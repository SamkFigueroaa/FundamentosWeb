const state = { page: 1, pageSize: 10, query: "", sortKey: "id_detalle", direction: 1 };

const body = document.querySelector("#table-body");

async function render() {
    try {
        const filteredBD = await api(path);
        console.log("Datos finales recibidos para la tabla:", filteredBD);

        body.replaceChildren();

        if (!filteredBD) return;

        filteredBD.sort((a, b) => a.id_detalle - b.id_detalle);

        filteredBD.forEach(detalle => {
            console.log("Elemento individual:", detalle);

            const row = document.createElement("tr");

            [detalle.id_detalle, detalle.id_venta, detalle.id_producto, detalle.cantidad, detalle.precio_unitario].forEach(value => {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.append(cell);
            });

            body.append(row);
        });
    } catch (error) {
        console.error("Error capturado en render:", error.message);
    }
}

// Ruta corregida apuntando al endpoint de detalle de ventas
const path = "http://localhost:3001/api/v1/ventas/detalles";


async function api(path, options = {}) {
    const response = await fetch(`${path}`, {
        headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
        ...options,
    });

    const payload = response.status === 204 ? null : await response.json().catch(() => null);

    console.log("Respuesta completa del servidor (Payload):", payload);

    if (!response.ok) {
        throw new Error(payload?.error?.message || 'No fue posible completar la operación.');
    }

    return payload?.data;
}

render();