const axios = require('axios');

const findAll = async function (){
   data = [];
   await axios.get('http://localhost:3000/v1/api/students')
         .then(res => {
            data = res.data;
         })
         .catch(error => {
            console.error(error);
          });
   //console.log(data);
   return data;
}

const findById = async function (id){
   data = [];
   await axios.get('http://localhost:3000/v1/api/students/' + id)
        .then(res => {
           data = res.data;
        })
        .catch(error => {
           console.error(error);
         });
   return data;
}

module.exports = { findAll, findById };
//module.exports = { findById };