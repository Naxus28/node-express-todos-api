import colors from 'colors';

export default (app) => {
  app.use((err, req, res, next) => {
    if (res.headersSent) return next(err);
    
    console.log('Error'.red + ' ' + err.toString());

    res.json({
      status: 500,
      message: err.toString()
    }); 
  })
};