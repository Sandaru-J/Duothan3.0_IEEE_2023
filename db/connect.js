import mongoose from 'mongoose';

const connect = async () => {
  mongoose.set('strictQuery', false);
  const dbUrl = process.env.MONGO_URL;
  return mongoose.connect(dbUrl);
};

export default connect;
