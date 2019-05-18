document.querySelector('#btn-unsub').addEventListener('click', () => {
    navigator.serviceWorker.ready.then((reg) => {
        reg.pushManager.getSubscription().then((subscription) => {
            subscription.unsubscribe().then((successful) => {
                console.log(successful)
            }).catch(
                err => console.log(err)
            )
        })
    });
})

document.querySelector('#btn-send').addEventListener('click', () => {
    fetch("/subscribe", {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    }).then(res => {
        console.log(res)
    }).catch(err => console.log(err))
})
const public = 'BHFBJ-vcaywicbrsvzLr4Cuy_W6_vdaRVkVBZc5s_91Xh2plmyFZbduWksRPXC_e3qCaeUiftMF_COL60gHvLiU';

document.querySelector('#btn').addEventListener('click', () => {
    if ('serviceWorker' in navigator) {
        send().catch(err => {
            console.log(err)
        })
    }
    async function send() {
        const register = await navigator.serviceWorker.register('/worker.js', {
            scope: '/'
        })
        const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(public)
        })
        await fetch("/save", {
            method: "POST",
            body: JSON.stringify(subscription),
            headers: {
                "content-type": "application/json"
            }
        });
    }

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
})