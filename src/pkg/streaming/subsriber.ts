import { error } from 'console'
import redis from 'redis'

export function subscribe(){
    // create redisclient
    // establish connection
    // recieve mssges according to the channels.
    
    const subscriber = redis.createClient({
        url:'redis://localhost:6379',
    })
    subscriber.on('error',(err)=>{
        console.error('Redis error:', err)
    })

    //pick the channels to subscribe
    const channels: string[] = ['channel1','channel2']

    subscriber.subscribe(channels,(err,count)=>{
        if (err) {
            console.error('Failed to subscribe:', err);
        } else {
            console.log(`Subscribed to ${count} channels: ${channels.join(', ')}`);
        }
    })

    // Handle incoming mssge
    subscriber.on('message',(channel,message)=>{
        console.log(`Received message from ${channel}: ${message}`);
    })

    // Optionally, handle connection close
    subscriber.on('end', () => {
    console.log('Redis connection closed');
    })

}