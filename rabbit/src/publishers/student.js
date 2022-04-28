const { rabbitSettings } = require('../settings');
const amqp = require('amqplib');
const { findAll } = require('../controllers/studentController');

findAllStudents();

const exchangeName = 'direct-student';
const exchangeType = 'direct';

//Direct exchange
async function findAllStudents(){

    const routerKey = 'allStudents';
    const msgs = await findAll;

    try {
        const conn = await amqp.connect(rabbitSettings);
        console.log('Conexion creada');

        const channel = await conn.createChannel();
        console.log('Canal creado');

        await channel.assertExchange(exchangeName, exchangeType);
        console.log('Exchange "' + exchangeName + '" de tipo "' + exchangeType + '" creado');

        for(let msg in msgs){
            //console.log(Buffer.from(JSON.stringify(msgs[msg])));
            const sent = await channel.publish(
                exchangeName, 
                routerKey,
                Buffer.from(JSON.stringify(msgs[msg])),
                {

                }
            );
            sent ? 
                console.log('Mensaje enviado a ' + exchangeName + ' con llave ' + routerKey): 
                console.log('Mensaje no enviado a ' + exchangeName);
        }

    } catch (error) {
        console.error('Error -> ', error);
    }
}
