import mongoose from 'mongoose';

const URI = 'mongodb+srv://ppo:1234@cluster0.hqcd6pw.mongodb.net/?retryWrites=true&w=majority';

async function connect() {

    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Database successfully connected!');
    }
    catch {
        console.log('Error connecting to the database!');
    }

}

export default connect;