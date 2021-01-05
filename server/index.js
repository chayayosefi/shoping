const exp = require('express')

require('./db')

const app = exp()

app.use(exp.json())
app.use(require('cors')())
app.use('/admin', require('./routes/admin'))
app.use('/user', require('./routes/user'))
app.use('/main', require('./routes/main'))
app.use('/actions', require('./routes/actions'))

app.listen(1000, () => console.log("The server is running on port 1000 "))