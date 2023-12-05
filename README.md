## Smartbin Flow Simulation with Mosquitto and Webpage

This project simulates the trash levels of smart bins using Node-RED and Mosquitto MQTT broker. It utilizes a simple web page to display the current status of each bin.

### Project Overview

**Goals:**

* Simulate the real-time trash levels of smart bins.
* Visualize the bin status on a webpage.
* Receive data from the Mosquitto MQTT broker.

**Technologies:**

* Node-RED: Flow-based programming platform for the Internet of Things (IoT).
* Mosquitto: Open-source MQTT broker for message exchange.
* Webpage: HTML and JavaScript to display bin data.
* mqtt.js: MQTT client library written in JavaScript

### Downloading the Project

You can download the project from [https://github.com/mfbwala/smartbin](https://github.com/mfbwala/smartbin).

### Getting Started

**Prerequisites:**

* Node.js installed
* Node-RED installed
* Mosquitto installed and running

**Steps:**

1. Clone the project to your local machine using the following command:

```
git clone https://github.com/mfbwala/smartbin.git
```

2. Open Node-RED and import the flow file `flow.json` (found in the repository).
3. Install any missing nodes (e.g., `mqtt`).
4. Update the environment settings in the flow:
    * `broker`: Replace "localhost" with the address of your Mosquitto broker.
    * `topic`: Replace "smartbin" with your desired MQTT topic.
    * `binFullThreshold`: Adjust this value to define the trash level at which a bin is considered full.
5. Deploy the flow.
6. Open the webpage included in the `webpage` folder.

### Webpage Functionality

**Note:** You can customize the webpage design and functionality to meet your specific needs.

### Data Flow

The Node-RED flow operates as follows:

1. Inject nodes inject messages at specific intervals, representing trash being added to each bin.
2. Random nodes generate random numbers representing the amount of trash added.
3. Function nodes process the data:
    * They update the bin's trash level based on the random number.
    * They check if the bin is full based on the `binFullThreshold`.
    * They update the bin data in the environment.
4. MQTT out node publishes the updated bin data to the specified MQTT topic.
5. The webpage subscribes to the MQTT topic and receives the updated bin data.
6. The webpage updates its display with the latest information.

### Potential Enhancements

* Implement a mechanism to empty the bins when they become full.
* Add logic to handle different types of trash or waste categories.
* Implement a feedback loop where the system can adjust trash collection frequency based on actual usage.
* Integrate with a real-time monitoring system for more advanced visualization.

### Contributions and Feedback

We welcome contributions and feedback to improve this project. Feel free to fork the repository and submit pull requests or create issues for discussion.



**IMPORTANT NOTE:** By default, Mosquitto does not support WebSockets. You need to configure it to enable this functionality before running the project.

### Mosquitto Websocket Configuration

Here's how to enable WebSockets in Mosquitto by configuring the configuration file:

**1. Edit the Mosquitto configuration file:**

On most systems, the Mosquitto configuration file is located at `/etc/mosquitto/mosquitto.conf`. You can edit this file using a text editor like `nano` or `vim`.

**2. Add the following lines to the configuration file:**

```
listener 9001
protocol websockets
```

These lines tell Mosquitto to listen for connections on port 9001 using the WebSockets protocol.

**3. Save the configuration file.**

**4. Restart the Mosquitto server:**

The command to restart the Mosquitto server will depend on your operating system. Here are some examples:

* **Linux:** `sudo systemctl restart mosquitto`
* **Mac:** `brew services restart mosquitto`
* **Windows:** Run the Mosquitto service as an application with the "Use configuration file" option enabled and pointing to your modified `mosquitto.conf` file.

## Starting Mosquitto with mosquitto.conf Configuration


### Command Syntax

The general syntax for starting Mosquitto with a configuration file is:

```
mosquitto -c /path/to/mosquitto.conf
```

where:

* `mosquitto`: The name of the Mosquitto executable.
* `-c`: Option flag specifying the configuration file.
* `/path/to/mosquitto.conf`: The path to the Mosquitto configuration file.

**Note:**

* Replace `/path/to/mosquitto.conf` with the actual path to your Mosquitto configuration file.
* On Windows, you may need to include quotes around the path if it contains spaces.

### Operating System Specifics

The following commands are specific to different operating systems:

* **Linux:**

```
mosquitto -c /etc/mosquitto/mosquitto.conf
```

* **Mac:**

```
mosquitto -c /usr/local/etc/mosquitto/mosquitto.conf
```

* **Windows:**

```
mosquitto -c "C:\Program Files\Mosquitto\mosquitto.conf" -v
```

### Additional Options

For a complete list of available options and their usage, please refer to the official Mosquitto documentation: [https://mosquitto.org/documentation/](https://mosquitto.org/documentation/)



