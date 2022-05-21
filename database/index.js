const { connect, connection } = require("mongoose");

class ConnectDb {
    static MONGODB_URI = 'mongodb+srv://yagnesh:1W0T1NGOXvgEgxJD@khcluster.2joef.mongodb.net/?retryWrites=true&w=majority'

    static mongo = async () => {
        try {
            connection.on('connected', () => {
                console.log('Mongo Connection Established');
            });

            connection.on('reconnected', () => {
                console.log('Mongo Connection Reestablished');
            });

            connection.on('disconnected', () => {
                console.log('Mongo Connection Disconnected');
                console.log('Trying to reconnect to Mongo ...');
                setTimeout(() => {
                    connect(ConnectDb.MONGODB_URI || '', {
                        keepAlive: true,
                        socketTimeoutMS: 3000,
                        connectTimeoutMS: 3000,
                    });
                }, 3000);
            });

            connection.on('close', () => {
                console.log('Mongo Connection Closed');
            });
            connection.on('error', (error) => {
                console.log(`Mongo Connection ERROR: ${error}`);
            });
            await connect(ConnectDb.MONGODB_URI, {
                keepAlive: true
            })
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = ConnectDb;