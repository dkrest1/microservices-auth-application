import amqp from 'amqplib';

interface ConnectionAndChannel {
  connection: amqp.Connection;
  channel: amqp.Channel;
}
const connect = async (): Promise<ConnectionAndChannel> => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    return { connection, channel };
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
    throw error;
  }
};

export { connect };
