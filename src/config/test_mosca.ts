import mosca from 'mosca'

const configurar = {
  id: 'mymosca', // used to publish in the $SYS/<id> topicspace
  stats: false, // publish stats in the $SYS/<id> topicspace
  logger: {
    level: 'debug'
  },
  backend: {
    type: 'mongodb',
    url: "mongodb+srv://db:123@cluster0.c8bzq.mongodb.net/db?retryWrites=true&w=majority"
  },
  persistence: {
    factory: mosca.persistence.Mongo,
    url: "mongodb+srv://db:123@cluster0.c8bzq.mongodb.net/db?retryWrites=true&w=majority"
  }
};

export default configurar