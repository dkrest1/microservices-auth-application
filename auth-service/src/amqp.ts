import amqp from 'amqplib';

const connectRabbitMQ = async () => {
  try {
    // Define connection URL
    const url = 'amqp://localhost';
    
    // Create connection
    const connection = await amqp.connect(url);
    
    // Create channel
    const channel = await connection.createChannel();
    
    // Return connection and channel
    return { connection, channel };
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
    throw error;
  }
};

export default connectRabbitMQ;