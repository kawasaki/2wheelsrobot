function showSensorJudge () {
    if (pins.analogReadPin(AnalogPin.P2) < sensor_threshold) {
        basic.showIcon(IconNames.No)
    } else {
        basic.showIcon(IconNames.Yes)
    }
}
function turnLeft () {
    pins.analogWritePin(AnalogPin.P0, 1023)
    pins.analogWritePin(AnalogPin.P1, onVoltage)
    basic.showIcon(IconNames.SmallSquare)
}
function goForward () {
    pins.digitalWritePin(DigitalPin.P0, onVoltage)
    pins.digitalWritePin(DigitalPin.P1, onVoltage)
    basic.showIcon(IconNames.Square)
}
function stop () {
    pins.analogWritePin(AnalogPin.P0, 1023)
    pins.analogWritePin(AnalogPin.P1, 1023)
    basic.showIcon(IconNames.SmallSquare)
}
input.onButtonPressed(Button.A, function () {
    goForward()
    running = 1
})
function turnRight () {
    pins.analogWritePin(AnalogPin.P0, onVoltage)
    pins.analogWritePin(AnalogPin.P1, 1023)
    basic.showIcon(IconNames.SmallSquare)
}
input.onButtonPressed(Button.B, function () {
    stop()
    running = 0
})
function readSensor () {
    largest = pins.analogReadPin(AnalogPin.P2)
    for (let index = 0; index < 4; index++) {
        current = pins.analogReadPin(AnalogPin.P2)
        if (largest < current) {
            largest = current
        }
    }
    sensor = largest
}
let current = 0
let largest = 0
let onVoltage = 0
let sensor = 0
let running = 0
let sensor_threshold = 0
sensor_threshold = 700
running = 0
sensor = 0
onVoltage = 736
basic.showIcon(IconNames.Yes)
basic.pause(2000)
while (running == 0) {
    basic.pause(500)
}
while (running == 1) {
    readSensor()
    if (running == 1 && sensor > sensor_threshold) {
        turnRight()
    } else {
        turnLeft()
    }
    basic.pause(100)
}
