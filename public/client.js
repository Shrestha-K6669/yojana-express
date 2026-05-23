//import { sensitiveHeaders } from "http2";

const publicVapidKey='BEmmH_DWdezacEpOQAaQNsx9OkXUsE2x6MbDnwMO6ladjRK6GG2E5HSOJYqB0OsTacvytaZAorlBkv3fGKYkLG0'
//const privateVapidKey='WP39HlgGzJZi8pnficxLK4pyjjF6i_EMt3uMCol1GDQ'
/*
if('serviceWorker' in navigator){
    send().catch(err=>console.error(err));
}
*/
/*
//register service worker
//register push, send push
async function send(){
console.log('Registering service worker')
const register=await navigator.serviceWorker.register('/worker.js',{
    //scope home page now:: home page would get notification now.
    //scope:'/'
    scope:'/'
})
console.log('Service worker registered..');
//register push
console.log('Registering Push..')
const subscription=await register.pushManager.subscribe({
    userVisibleOnly:true,
    applicationServerKey:publicVapidKey
})
console.log('Push Registered.')
//send push notification
console.log('sending push')
await fetch('/subscribe',{
    method:'POST',
    body:JSON.stringify(subscription),
    headers: {
        'content-type':'application/json'
    }
    
}).then(s=>{
    document.getElementById("notification").innerHTML="Got notification from server.";
});
console.log('Push Sent...')

}
*/