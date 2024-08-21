import redis from 'redis'

const publisher = redis.createClient({
    url: 'redis://localhost:6379', 
});

publisher.on('error',(err)=>{
    console.error('Redis error:', err)
})

// update the mssge datatype
const publishMessage = async (channel: string,message: any)=>{
    try{
        const result = await publisher.publish(channel,message);
        console.log(`Message published to ${channel}. Number of subscribers: ${result}`);
    }catch(err){
        console.error('Failed to publish message:', err);
    }
}


export default publishMessage