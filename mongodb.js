const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionUrl = 'mongodb://127.0.0.1:27017'
const database = 'task-manager'

MongoClient.connect(connectionUrl,{useNewUrlParser: true}, (error,client) => {
    if(error) {
        console.log(error);
    } else {
        
        console.log('Connected Successfully')
        const db = client.db(database);
        // db.collection('users').insertOne({
        //     name : 'Aman', age : 21
        // },(error,result)=>{
        //     if ( error ){
        //         console.log('Error While Inserting the document')
        //     } else {
        //         console.log(result.ops);
        //     }
        // })

        //   db.collection('users').insertMany(
        //       [{
        //     name : 'Aman1', age : 21
        //         }, {
        //     name : 'Aman2', age : 21
        //         }],(error,result)=>{
        //     if ( error ){
        //         console.log('Error While Inserting the document')
        //     } else {
        //         console.log(result.ops);
        //     }
        // })

        db.collection('tasks').insertMany(
            [{
          description : 't1', completed : true
              }, {
          description : 't2', age : false
              }],(error,result)=>{
          if ( error ){
              console.log('Error While Inserting the document')
          } else {
              console.log(result.ops);
          }
      })
    }
})