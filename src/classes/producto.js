export class Producto {
    constructor(id, nombre, precio, categoria, foto) {
        this.id = id || null;
        this.nombre = nombre || null;
        this.precio = precio || null;
        this.categoria = categoria || null;
        this.foto = foto || null;
    }
}
