const rabbitSettings = {
    protocol: "amqp",
    hostname: "localhost",
    port: 5672,
    username: "eddy",
    password: "123456789",
    vhost: "/",
    authMechanism: ['PLAIN', 'AMQPLAIN', 'EXTERNAL']
}

exports.rabbitSettings = rabbitSettings;