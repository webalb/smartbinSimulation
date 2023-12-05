
// Define your MQTT broker URL and client ID
const brokerUrl = 'ws://localhost:9001/mqtt'; // Use the appropriate URL and port
const clientId = 'smartagent1054';

const topic = 'smartbin';

const connectOptions = {
  onSuccess: onConnect,
  onFailure: onConnectionFailure,
};

let client;

function onConnect() {
  console.log('Connected to MQTT broker');
  // Subscribe to the desired topic after connecting
  client.subscribe(topic);
}

function onConnectionFailure() {
  console.error('MQTT connection error. Retrying in 5 seconds...');
  // Implement a delay and then attempt to reconnect
  setTimeout(connectToBroker, 5000);
}

 // Function to send notification

function connectToBroker() {
  client = new Paho.Client(brokerUrl, clientId);
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;

  // Connect to the MQTT broker
  client.connect(connectOptions);
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.error('Connection lost: ' + responseObject.errorMessage);
    // Attempt to reconnect
    connectToBroker();
  }
}

// Call the initial connection function
connectToBroker();


// client.onMessageArrived = (message) => {
function onMessageArrived(message){
  const payload = JSON.parse(message.payloadString);
  // Extract data from the payload
  const binName = payload.bin;
  const trashLevel = payload.trashLevel;
  const isFull = payload.isFull;

    // Update the corresponding HTML elements based on the binName
    const binId = binName.replace(" ", "").toLowerCase(); // Convert bin name to lowercase with no spaces
    const id = binId.replace('bin', '');
    // Update the trash level in the span element
    const trashLevelSpan = document.getElementById(`${binId}Status`);
    trashLevelSpan.innerHTML = trashLevel;

    // Set the height attribute of the 'grounds' div element
    const groundsDiv = document.getElementById(`grounds${id}`);
    groundsDiv.style.height = `${trashLevel}%`;

    // Check if the bin is full and remove the 'led' div if necessary
    if (!isFull) {
        const ledDiv = document.getElementById(`led${id}`);
        if(ledDiv) ledDiv.remove();
    }
    
      // Check if the bin is full and show a notification
    if (isFull) {
       // Check if the 'led' div already exists
       const existingLedDiv = document.getElementById(`led${id}`);
       const parentOfLedDive =  document.getElementById(`bin${id}`)
       // If 'led' div doesn't exist, create and append it
       if (!existingLedDiv) {
         const newLedDiv = document.createElement('div');
         newLedDiv.id = `led${id}`;
         newLedDiv.className = 'lid'; // Add any necessary class or style
         
         // Append the 'led' div to the desired container
         parentOfLedDive.prepend(newLedDiv);
       }
      sendNotification('Smartbin Notification', binName + ' is Full', './images/smartbin.png');
    }

  }

