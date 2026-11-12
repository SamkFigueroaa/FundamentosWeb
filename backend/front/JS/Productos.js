const state = { page: 1, pageSize: 10, query: "", sortKey: "id", direction: 1 };

const body = document.querySelector("#table-body");

async function render() {
    const filteredBD = await api(path);
    body.replaceChildren();

    if (!filteredBD) return;

    filteredBD.sort((a, b) => a.id - b.id);

    filteredBD.forEach(producto => {
        console.log(producto);

        const row = document.createElement("tr");

        [producto.id, producto.nombre, producto.precioCatalogo].forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.append(cell);
        });

        body.append(row);
    });
}

const path = "http://localhost:3001/api/v1/productos";

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

render();