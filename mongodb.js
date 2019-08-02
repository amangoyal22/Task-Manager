const { MongoClient, ObjectID } = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const database = 'task-manager'

const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())


MongoClient.connect(connectionUrl,{useNewUrlParser: true}, (error,client) => {
    if(error) {
        console.log(error);
    } else {
        
        console.log('Connected Successfully')
        const db = client.db(database);
        // db.collection('users').insertOne({
        //     name : 'Aman5', age : 22 , _id : id
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

    //     db.collection('tasks').insertMany(
    //         [{
    //       description : 't1', completed : true
    //           }, {
    //       description : 't2', age : false
    //           }],(error,result)=>{
    //       if ( error ){
    //           console.log('Error While Inserting the document')
    //       } else {
    //           console.log(result.ops);
    //       }
    //   })

    // db.collection('users').findOne({name : 'Aman', age : 22},(error,result)=>{
    //     if(error){
    //         console.log(error);
    //     } else {
    //         console.log(result);
    //     }})

//     db.collection('users').find({age : 21}).toArray((error,result)=>{
//             if (error){
//                 console.log(error)
//             } else {
//                 console.log(result)
//             }
//     })

//     db.collection('users').find({age : 21}).count((error,result)=>{
//         if (error){
//             console.log(error)
//         } else {
//             console.log(result)
//         }
//      })

    // db.collection('users').findOne({_id : new ObjectID("5d3f8db0b2f59901f3e9749e")},(error,result)=>{
    //     if(error){
    //         console.log(error);
    //     } else {
    //         console.log(result);
    //     }})
    // const update  = db.collection('users').updateOne({_id : new ObjectID("5d3f8db0b2f59901f3e9749e")},{
    //     $inc: {
    //         age : 2
    //     }
    // })

    // update.then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

   // db.collection('users').deleteMany({age : 26}).then((result) => {console.log(result)}).catch((error) => {console.log(error)})
}
})