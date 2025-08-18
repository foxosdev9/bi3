const Client = require('../models/userModel');


exports.getAllUsers = async (req, res) => {
   try{
      const clients = await Client.find();
      res.status(200).json({
        status: 'success',
        results: clients.length,
        data: {
            clients
        }
      });
   }catch(err){
    console.log(err)
   }
}


exports.createUser = async (req, res) => {
    try{
       const { fullName, email, password,passwordConfirm , gender } = req.body;
       
       const newClient = await Client.create({
        fullName, email, gender, password, passwordConfirm
       });

        await newClient.save();

        res.status(200).json({
            status: 'success',
            data: {
                data: newClient
            }
        })

    }catch(err){
        console.log(err.message);
    }
}
