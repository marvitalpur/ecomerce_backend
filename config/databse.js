const mongoose = require("mongoose");

const connectDataBase = () => {
    const uri = process.env.DB_URI || 'mongodb://127.0.0.1:27017/Ecommerce'; // Fallback URI
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true
    }).then((data) => {
        console.log(`MongoDB connected to server: ${data.connection.host}`);
    })


    // server.close(() => {
    //     process.exit(1);
    // })
}

module.exports = connectDataBase;
