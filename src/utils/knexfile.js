// Configuro DB.
export const configuracionDb = {
    development: {
      client: "mysql",
      connection: {
        filename: "../../db/fincaonline.mysql",
        host: "127.0.0.1",
        user: "root",
        port: 3306,
        password: "",
        database: "fincaonline",
      },
    },
  };