const database = require('../util/database');
const Boom = require('@hapi/boom');
const jsonxml = require('jsontoxml');

exports.GetStatus = async (req, res, next) => {
  const IDEstatus = req.params.IDEstatus;

  const query = `SELECT Captura.Id_Folio AS FOLIO,
  Captura.No_Expediente AS EXPEDIENTE,
  Cat_Companias.Denominacion AS COMPAÑIA,
  Captura.Marca +' '+ Captura.Modelo +' '+ Captura.Year +' '+ Captura.Color AS VEHICULO,
  Captura.Origen,
  Captura.Destino,
  DATEDIFF(minute,Captura.Fecha_Captura, GETDATE()) AS MINUTOS,
  RIGHT( CONVERT(DATETIME, Captura.Fecha_Captura, 108),8) as HORACAPTURA
FROM Captura INNER JOIN Cat_Companias ON Captura.Id_Compania = Cat_Companias.Id_Compania
WHERE (Captura.Status_Captura =:IDEstatus)
ORDER BY DATEDIFF(minute, Captura.Fecha_Captura, GETDATE()) DESC`;
  try {
    const DatosGrid = await database.query(query, {
      replacements: { IDEstatus },
      type: database.QueryTypes.SELECT,
    });
    console.log(DatosGrid);
    res.status(200).json({ grid: DatosGrid });
  } catch (err) {
    next(Boom.serverUnavailable('Fallo en el servidor'));
  }
};

exports.getOperadores = async (req, res, next) => {
  const query = `SELECT VCA.Id_Empleado as id,VCA.NOMBRE as Empleado  FROM OperadoresAPP as Op
  JOIN VistaChoferesActivos as VCA ON Op.Id_Empleado=VCA.Id_Empleado`;
  try {
    const empleados = await database.query(query, {
      type: database.QueryTypes.SELECT,
    });
    res.status(200).json({ empleados });
  } catch (err) {
    next(Boom.serverUnavailable('Fallo en el servidor'));
  }
};
exports.getOperadoresXML = async (req, res, next) => {
  const query = `SELECT VCA.Id_Empleado as id,VCA.NOMBRE as Empleado  FROM OperadoresAPP as Op
  JOIN VistaChoferesActivos as VCA ON Op.Id_Empleado=VCA.Id_Empleado`;
  try {
    const empleados = await database.query(query, {
      type: database.QueryTypes.SELECT,
    });
    res.set('Content-Type', 'text/xml').status(200).send(jsonxml({empleados}))
  } catch (err) {
    next(Boom.serverUnavailable('Fallo en el servidor'));
  }
};
