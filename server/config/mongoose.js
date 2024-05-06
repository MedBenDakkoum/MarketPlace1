// const mongoose = require('mongoose');
// const {DB_CONNECTION} = require('./config');


// mongoose.connect(DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
// const db = mongoose.connection;
// async function aa(){
//     const collectiontest = db.collection("ModelTest");
//     await collectiontest.dropIndex('createdAt_1');
//     await collectiontest.createIndex({ createdAt: 1 }, { expireAfterSeconds: 1200 });
//     const changeStream = collectiontest.watch();
//     changeStream.on('change', async (change) => {
//         if (change.operationType === 'invalidate') {
//             const expiredDocumentId = change.documentKey._id;
//             const expiredDocument = await collection.findOne({ _id: expiredDocumentId });
//             if (expiredDocument) {
//                 console.log('Callback executed for document:', expiredDocument);
//               }
        
//         }
//   });
// }
// aa();

// db.on('error', console.error.bind(console, 'DB connection error:'));
// db.once('open', console.log.bind(console, 'DB connected!'));

// module.exports = db;
const mongoose = require('mongoose');
const { DB_CONNECTION } = require('./config');
const ModelTest = require('../models/ModelTest'); // Import your Mongoose model

mongoose.connect(DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', async () => {
  console.log('DB connected!');

  // Get the collection
  const collectiontest = db.collection("ModelTest");

  // Check if the 'createdAt' index already exists
  const indexExists = await collectiontest.indexExists('createdAt_1');

  // If the index exists, drop it
  if (indexExists) {
    try {
      await collectiontest.dropIndex('createdAt_1');
    } catch (error) {
      console.error('Error dropping index:', error.message);
    }
  }

  // Create TTL index on 'createdAt' field
  try {
    await collectiontest.createIndex({ createdAt: 1 }, { expireAfterSeconds: 30 });
  } catch (error) {
    console.error('Error creating index:', error.message);
  }

  // Watch for changes in the collection
  const changeStream = ModelTest.watch();

  changeStream.on('change', async (change) => {
    console.log('Change detected:', change);
    // if (change.operationType === 'invalidate') {
    //   const expiredDocumentId = change.documentKey._id;
    //   const expiredDocument = await ModelTest.findOne({ _id: expiredDocumentId });
    //   if (expiredDocument) {
    //     console.log('Callback executed for document:', expiredDocument);
    //   }
    // }
  });
});

module.exports = db;
