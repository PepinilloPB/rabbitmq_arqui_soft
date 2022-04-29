const { rabbitSettings } = require('../settings');
const amqp = require('amqplib');

findAllStudents();
findStudentById();

async function findAllStudents(){

    const queue = 'student-queue';
    const exchangeName = 'direct-student';
    const exchangeType = 'direct';
    const pattern = 'allStudents';

    try {
        const conn = await amqp.connect(rabbitSettings);
        console.log('Conexion creada');

        const channel = await conn.createChannel();
        console.log('Canal creado');

        await channel.assertQueue(queue, {
            //durable: false
        });
        console.log('Cola ' + queue + ' creado');

        await channel.assertExchange(exchangeName, exchangeType);
        console.log('Exchange ' + exchangeName + ' de tipo ' + exchangeType + ' creado');

        await channel.bindQueue(queue, exchangeName, pattern);
        console.log('Bind de cola ' + queue + ' con exchange ' + exchangeName + ' creado con llave ' + pattern);

        console.log('Esperando por mensajes de patron ' + pattern);
        channel.consume(queue, message => {
            let students = JSON.parse(message.content.toString());
            console.log(students);
            channel.ack(message);
        });
    } catch (error) {
        console.error('Error -> ', error);
    }
}

async function findStudentById(){

    const queue = 'studentId-queue';
    const exchangeName = 'fanout-student';
    const exchangeType = 'fanout';
    const pattern = '';

    try {
        const conn = await amqp.connect(rabbitSettings);
        console.log('Conexion creada');

        const channel = await conn.createChannel();
        console.log('Canal creado');

        await channel.assertQueue(queue, {
            //durable: false
        });
        console.log('Cola ' + queue + ' creado');

        await channel.assertExchange(exchangeName, exchangeType);
        console.log('Exchange ' + exchangeName + ' de tipo ' + exchangeType + ' creado');

        await channel.bindQueue(queue, exchangeName, pattern);
        console.log('Bind de cola ' + queue + ' con exchange ' + exchangeName + ' creado con llave ' + pattern);

        console.log('Esperando por mensajes de patron ' + pattern);
        channel.consume(queue, message => {
            let students = JSON.parse(message.content.toString());
            console.log(students);
            channel.ack(message);
        });
    } catch (error) {
        console.error('Error -> ', error);
    }
}