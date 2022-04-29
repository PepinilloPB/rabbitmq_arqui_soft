const { rabbitSettings } = require('../settings');
const amqp = require('amqplib');
const { findAll, findById }= require('../controllers/studentController');

//findAllStudents();
//findStudentById(1);
findAllByTopic(1);

//Direct exchange
async function findAllStudents(){

    const routerKey = 'allStudents';
    const exchangeName = 'direct-student';
    const exchangeType = 'direct';

    const msgs = await findAll();

    try {
        const conn = await amqp.connect(rabbitSettings);
        console.log('Conexion creada');

        const channel = await conn.createChannel();
        console.log('Canal creado');

        await channel.assertExchange(exchangeName, exchangeType);
        console.log('Exchange "' + exchangeName + '" de tipo "' + exchangeType + '" creado');

        //console.log(msgs);

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

//Fanout exchange
async function findStudentById(id){

    const routerKey = '';
    const exchangeName = 'fanout-student';
    const exchangeType = 'fanout';
    const msgs = await findById(id);

    //console.log(msgs);
    //console.log(routerKey);

    try {
        const conn = await amqp.connect(rabbitSettings);
        console.log('Conexion creada');

        const channel = await conn.createChannel();
        console.log('Canal creado');

        await channel.assertExchange(exchangeName, exchangeType);
        console.log('Exchange "' + exchangeName + '" de tipo "' + exchangeType + '" creado');

        //console.log(Buffer.from(JSON.stringify(msgs)));
        const sent = await channel.publish(
            exchangeName, 
            '',
            Buffer.from(JSON.stringify(msgs)),
            {

            }
        );
        sent ? 
        console.log('Mensaje enviado a ' + exchangeName + ' con llave ' + routerKey): 
        console.log('Mensaje no enviado a ' + exchangeName);
        

    } catch (error) {
        console.error('Error -> ', error);
    }
}

async function findAllByTopic(id){

    const routerKey = 'orange.student.blue';
    const exchangeName = 'topic-student';
    const exchangeType = 'topic';
    const msgs = await findById(id);

    //console.log(msgs);
    //console.log(routerKey);

    try {
        const conn = await amqp.connect(rabbitSettings);
        console.log('Conexion creada');

        const channel = await conn.createChannel();
        console.log('Canal creado');

        await channel.assertExchange(exchangeName, exchangeType);
        console.log('Exchange "' + exchangeName + '" de tipo "' + exchangeType + '" creado');

        //console.log(Buffer.from(JSON.stringify(msgs)));
        const sent = await channel.publish(
            exchangeName, 
            routerKey,
            Buffer.from(JSON.stringify(msgs)),
            {

            }
        );
        sent ? 
        console.log('Mensaje enviado a ' + exchangeName + ' con llave ' + routerKey): 
        console.log('Mensaje no enviado a ' + exchangeName);
        

    } catch (error) {
        console.error('Error -> ', error);
    }
}