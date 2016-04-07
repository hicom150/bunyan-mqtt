(function() {
  "use strict";
  var BunyanMqtt, mqtt;

  mqtt = require("mqtt");

  BunyanMqtt = (function() {
    function BunyanMqtt(options) {
      var mqttOptions;
      if (!(this instanceof BunyanMqtt)) {
        return new BunyanMqtt(options);
      }
      this.topic = options.topic, this.port = options.port, this.host = options.host, this.protocol = options.protocol, this.qos = options.qos, this.retain = options.retain;
      if (this.topic == null) {
        this.topic = "bunyan";
      }
      if (this.port == null) {
        this.port = 1883;
      }
      if (this.host == null) {
        this.host = "localhost";
      }
      if (this.protocol == null) {
        this.protocol = "mqtt";
      }
      if (this.qos == null) {
        this.qos = 0;
      }
      if (this.retain == null) {
        this.retain = false;
      }
      mqttOptions = {
        port: this.port,
        host: this.host,
        protocol: this.protocol
      };
      this.mqtt = mqtt.connect(mqttOptions);
    }

    BunyanMqtt.prototype.write = function(item) {
      var message, options;
      message = JSON.stringify(item);
      options = {
        qos: this.qos,
        retain: this.retain
      };
      return this.mqtt.publish(this.topic, message, options);
    };

    return BunyanMqtt;

  })();

  module.exports = BunyanMqtt;

}).call(this);
