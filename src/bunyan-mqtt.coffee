"use strict"

mqtt = require "mqtt"

class BunyanMqtt
    constructor: (options) ->
        return new BunyanMqtt options unless @ instanceof BunyanMqtt

        {@topic, @port, @host, @protocol, @qos, @retain} = options

        @topic ?= "bunyan"
        @port ?= 1883
        @host ?= "localhost"
        @protocol ?= "mqtt"
        @qos ?= 0
        @retain ?= false

        mqttOptions = {@port, @host, @protocol}

        @mqtt = mqtt.connect mqttOptions

    write: (item) ->
        message = JSON.stringify item
        options = {@qos, @retain}

        @mqtt.publish @topic, message, options

module.exports = BunyanMqtt
