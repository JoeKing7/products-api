const MONGOOSE = require('mongoose');

MONGOOSE.connect('mongodb://localhost:27017/companydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
})
    .then( response => {
        console.log("DB is connected");
    })
    .catch((err) => {
        console.log(err)
    })