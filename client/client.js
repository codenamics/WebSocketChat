const public = 'BHFBJ-vcaywicbrsvzLr4Cuy_W6_vdaRVkVBZc5s_91Xh2plmyFZbduWksRPXC_e3qCaeUiftMF_COL60gHvLiU';




setInterval(() => {
    if ('serviceWorker' in navigator) {
        send().catch(err => {
            console.log(err)
        })
    }
    async function send() {
        console.log('Registering')
        const register = await navigator.serviceWorker.register('/worker.js', {
            scope: '/'
        })
        console.log('Service worker registered')
        const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(public)
        })
        await fetch("/subscribe", {
            method: "POST",
            body: JSON.stringify(subscription),
            headers: {
                "content-type": "application/json"
            }
        });
        console.log("Push Sent...");
    }
}, 5000);



function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}