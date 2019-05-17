self.addEventListener("push", e => {
    const data = e.data.json();
    console.log("Push Recieved...");
    self.registration.showNotification(data.title, {
        body: "Catering zaprasza na jedzenie",
        icon: "http://image.ibb.co/frYOFd/tmlogo.png"

    });
});