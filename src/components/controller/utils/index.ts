import zip from 'lodash/zip'

export const reverseMotors = reverses => outputs => zip(reverses, outputs).map(([reverse, output]) => (reverse ? output * -1 : output))

export const setMotors = motors => outputs => {
    zip(motors, outputs).forEach(([motor, output]) => {
        motor && motor.setPower(output)
    })
}
