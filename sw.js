self.addEventListener("push", event => {
  let data = {
    title: "Shakti Niketan",
    body: "New school notification",
    url: "./#portal"
  };

  try {
    if (event.data) data = event.data.json();
  } catch (e) {}

  event.waitUntil(
    self.registration.showNotification(data.title || "Shakti Niketan", {
      body: data.body || "New notification",
      icon: "./favicon.ico",
      badge: "./favicon.ico",
      vibrate: [200, 100, 200],
      data: {
        url: data.url || "./#portal"
      },
      tag: "shakti-niketan-parent-request"
    })
  );
});

self.addEventListener("notificationclick", event => {
  event.notification.close();

  const url = event.notification.data?.url || "./#portal";

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then(list => {
      for (const client of list) {
        if ("focus" in client) {
          client.navigate(url);
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
