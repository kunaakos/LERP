export const delay = millis => new Promise(resolve => setTimeout(resolve, millis))

// math from https://answers.unity.com/questions/1642093/how-would-you-convert-circular-joystick-input-to-a.html
export const circleCoordsToSquare = ({ x: u, y: v }) => {
    const x = 0.5 * Math.sqrt(2 + u * u - v * v + 2 * u * Math.sqrt(2)) - 0.5 * Math.sqrt(2 + u * u - v * v - 2 * u * Math.sqrt(2))
    const y = 0.5 * Math.sqrt(2 - u * u + v * v + 2 * v * Math.sqrt(2)) - 0.5 * Math.sqrt(2 - u * u + v * v - 2 * v * Math.sqrt(2))
    return { x, y }
}
