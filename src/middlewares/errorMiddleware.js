// src/middlewares/errorMiddleware.js
function notFound(req, res, next) {
  res.status(404).json({
    message: `Rota não encontrada: ${req.originalUrl}`,
  });
}

function errorHandler(err, req, res, next) {
  console.error(err);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || 'Erro interno do servidor',
  });
}

module.exports = {
  notFound,
  errorHandler,
};
