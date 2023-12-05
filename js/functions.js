function sendNotification(title, body, icon) {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications.");
      
    }
    
    // Request permission to send notifications
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          // Send notification
          sendNotification(title, body, icon);
        } else {
          alert("Notifications permission denied.");
        }
      });
    } else {
      // Send notification
    
  
        const notification = new Notification(title, {
          body,
          icon
        });
  
        // Close notification after 5 seconds
        //setTimeout(() => notification.close(), 15000);
      }
  }