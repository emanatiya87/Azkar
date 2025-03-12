setTimeout(function () {
  let loadingPage = document.getElementById("loadingPage");
  if (loadingPage) {
    loadingPage.style.visibility = "hidden";
  }
}, 1000);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js', {
            scope: './'
        })
            .then(registration => {
                console.log('ServiceWorker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('ServiceWorker registration failed:', error);
            });
    });
}
