import knex from "knex";
import { configuracionDb } from "../utils/knexfile.js";
import { Producto } from "./producto.js";

class claseDB {
    constructor() {
      const environment = process.env.NODE_ENV || "development";
      console.log(`Configurando ${environment} DB`);
      const options = configuracionDb[environment];
      this.connection = knex(options);
    }
  
    async init() {
       this.connection.schema.hasTable("productos").then((exists) => {
         if (exists) return;
         console.log("Si no existe creamos la tabla productos!");
  
         return this.connection.schema.createTable(
           "productos",
           async (TablaProductos) => {
             TablaProductos.increments();
             TablaProductos.string("nombre", 100).notNullable();
             TablaProductos.decimal("precio", 10, 2).notNullable();
             TablaProductos.string("categoria", 100).notNullable();
             TablaProductos.string("foto", 500).notNullable();
           }
         );
        });
  
      this.connection.schema.hasTable("mensajes").then((exists) => {
        if (exists) return;
        console.log("Si no existe creamos la tabla mensajes!");
  
        return this.connection.schema.createTable(
          "mensajes",
          async (tablaMensajes) => {
            tablaMensajes.increments();
            tablaMensajes.string("email", 100).notNullable();
            tablaMensajes.string("hora", 50).notNullable();
            tablaMensajes.string("mensaje", 1000).notNullable();
          }
        );
      });
    }
  
    async getAll(nombreTabla) {
      try {
        return this.connection(nombreTabla).select("*");
      } catch (error) {
        throw error;
      }
    }
  
    async getById(nombreTabla, id) {
      try {
        if (id) return this.connection(nombreTabla).where("id", id);
        else return -1;
      } catch (error) {
        throw error;
      }
    }
  
    async create(nombreTabla, data) {
      try {
        return this.connection(nombreTabla).insert(data);
      } catch (error) {
        throw error;
      }
    }
  }
  
  export const DB = new claseDB();


