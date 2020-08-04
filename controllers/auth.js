const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Boom = require('@hapi/boom');
const database = require('../util/database');

exports.login = async (req, res, next) => {
  const id = req.body.id;
  const password = req.body.password.toString();

  try {
    const selUser = await database.query(
      'SELECT * FROM OperadoresAPP WHERE Id_Empleado=:id',
      {
        type: database.QueryTypes.SELECT,
        replacements: { id },
      }
    );
    const user=selUser[0];
    console.log(user,selUser);
    if (!user) {
      return next(Boom.unauthorized('No existe este correo'));
    }
    

    //const isEqual = await bcrypt.compare(password, user.password);
    const isEqual = password===user.Password;

    if (!isEqual) {
      return next(Boom.unauthorized('Contraseña incorrecta'));
    }

    const token = jwt.sign(
      {
        username: user.username,
        userId: user.Id_Empleado.toString(),
      },
      process.env.SECRET,
      { expiresIn: '12h' }
    );

    res.status(200).json({
      idToken: token,
      userId: user.Id_Empleado.toString(),
    });
  } catch (err) {
    return next(Boom.badImplementation('Something wrong happened server-side'));
  }
};
