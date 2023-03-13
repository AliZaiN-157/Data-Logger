// import { InfluxDB, Point } from "@influxdata/influxdb-client";

const { InfluxDB, Point } = require("@influxdata/influxdb-client");

// import env
require("dotenv").config();

const url = process.env.INFLUX_URL || "";
const token = process.env.INFLUX_TOKEN;
const org = process.env.INFLUX_ORG || "";
const bucket = process.env.INFLUX_BUCKET || "";

const queryApi = new InfluxDB({ url, token }).getQueryApi(org);

class BackendConnector {
  constructor(mainWindow) {
    this.mainWindow = mainWindow;
  }

  getAllData = async () => {
    const fluxQuery = `from(bucket: "${bucket}")
                    |> range(start: -1h, stop: now())
                    |> filter(fn: (r) => r["_measurement"] == "SENSOR_DATA")
                    |> filter(fn: (r) => r["DATA"] == "BME")
                    |> filter(fn: (r) => r["device"] == "STAB_1")
                    |> filter(fn: (r) => r["_field"] == "Humidity" or r["_field"] == "Temperature")`;

    queryApi.queryRows(fluxQuery, {
      next: (row, tableMeta) => {
        const o = tableMeta.toObject(row);
        console.log(`${o._time} ${o._measurement}: ${o._field}=${o._value}`);
      },
      error: (error) => {
        console.error(error);
        console.log("Finished ERROR");
      },
      complete: () => {
        console.log("Finished SUCCESS");
      },
    });
  };

  getTemperature = async () => {
    const fluxQuery = `from(bucket: "${bucket}")
                    |> range(start: -1h, stop: now())
                    |> filter(fn: (r) => r["_measurement"] == "SENSOR_DATA")
                    |> filter(fn: (r) => r["DATA"] == "BME")
                    |> filter(fn: (r) => r["device"] == "STAB_1")
                    |> filter(fn: (r) => r["_field"] == "Temperature")`;

    queryApi.queryRows(fluxQuery, {
      next: (row, tableMeta) => {
        const o = tableMeta.toObject(row);
        console.log(`${o._time} ${o._measurement}: ${o._field}=${o._value}`);
      },
      error: (error) => {
        console.error(error);
        console.log("Finished ERROR");
      },
      complete: () => {
        console.log("Finished SUCCESS");
      },
    });
  };

  get_Temperature_of_every_Stab = async (Stabno) => {
    const fluxQuery = `from(bucket: "${bucket}")
                    |> range(start: -1h, stop: now())
                    |> filter(fn: (r) => r["_measurement"] == "SENSOR_DATA")
                    |> filter(fn: (r) => r["DATA"] == "BME")
                    |> filter(fn: (r) => r["device"] == "STAB_${Stabno}")
                    |> filter(fn: (r) => r["_field"] == "Temperature")`;

    queryApi.queryRows(fluxQuery, {
      next: (row, tableMeta) => {
        const o = tableMeta.toObject(row);
        console.log(`${o._time} ${o._measurement}: ${o._field}=${o._value}`);
      },
      error: (error) => {
        console.error(error);
        console.log("Finished ERROR");
      },
      complete: () => {
        console.log("Finished SUCCESS");
      },
    });
  };
}

module.exports = BackendConnector;
