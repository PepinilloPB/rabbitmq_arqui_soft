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
    return data;
}

exports.findAll = findAll();