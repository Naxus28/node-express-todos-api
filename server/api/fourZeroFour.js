export default (app) => {
  app.get('*', (req, res) => {
    res.json({
      status: 404,
      message: 'resource not found'
    });
  });
};