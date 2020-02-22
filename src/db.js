import {connect, disconnect} from 'mongoose';

const db = {
    connect: () => {
        return new Promise(((resolve, reject) => {
            connect(process.env.DB_HOST, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }).then(() => {
                console.log("Connected to mongodb");
                return resolve();
            }).catch((error) => {
                console.log(error);
                return reject(error);
            })
        }))
    },

    disconnect: () => {
        return new Promise(((resolve, reject) => {
            disconnect().then(() => {
                console.log('Disconnected to mongodb');
                return resolve();
            }).catch((error) => {
                console.log(error);
                return reject(error);
            })
        }))
    }
};

export { db };
