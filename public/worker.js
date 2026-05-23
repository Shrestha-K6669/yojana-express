console.log('Service Worker loaded')
self.addEventListener('push',e=>{
    const data=e.data.json();
    console.log('push event received');
    self.registration.showNotification(data.title,{
        body:'Notified by server',
        icon:'http://image.ibb.co/frYOFd/tmlogo.png'
    })
})