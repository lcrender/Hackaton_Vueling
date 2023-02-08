require('dotenv').config();
require('./db');
const app = require('./server');

app.listen(app.get('port'), (err) => {
    if (err) throw new Error(err);
    console.log('Server on port', app.get('port'))
});