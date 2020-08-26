var braintree = require('braintree');

var gateway = braintree.connect({
    environment : braintree.Environment.Sandbox,
    merchantId: 'p36gpnd6vb2qxyhx',
    publicKey: 'n27c43zkjkbqkqr4',
    privateKey: '94460b15107957fa05ca96333c06adf3'
});

exports.getToken = (req,res) =>{
   // console.log("gettoken");
    gateway.clientToken.generate({},
     function (err,response){
         console.log("responce",response);
         console.log("err",err);

       if(err){
           console.log("err",err);
           res.status(500).send(err)
       } else{
           res.send(response)
       } 
    });
}

exports.processPayment = (req,res) =>{
    let nonceFromTheClient = req.body.paymentMethodNonce

    let amountFromTheClient = req.body.amount
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        //deviceData:deviceDataFromTheClient,
        options:{
            submitForSettlement : true
        }
    }, function(err,result){
        if(err){
            res.status(500).json(err)
        }else{
            res.json(result);
        }
    });
}