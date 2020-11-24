import * as React from 'react'
import { useRef, useEffect } from 'react'

import nipplejs from 'nipplejs'
import throttle from 'lodash/throttle'

export const Joystick = ({ onMove, lockX = false, lockY = false, color = 'red' }) => {
    const managerRef = useRef(null)
    const containerRef = useRef(null)
    const onMoveRef = useRef(null)
    onMoveRef.current = onMove && throttle(onMove, 100)

    const containerWidth = containerRef.current && containerRef.current.offsetWidth
    const containerHeight = containerRef.current && containerRef.current.offsetHeight

    const size = Math.min(containerWidth, containerHeight)

    const posLeft = `${containerWidth / 2}px`
    const posTop = `${containerHeight / 2}px`

    useEffect(() => {
        if (managerRef.current) {
            managerRef.current.destroy()
            managerRef.current = null
        }

        if (containerRef.current) {
            const manager = nipplejs.create({
                zone: containerRef.current,
                mode: 'static',
                color,
                size: size,
                lockX,
                lockY,
                position: {
                    top: posTop,
                    left: posLeft,
                },
            })

            managerRef.current = manager

            manager.on('move', (event, data) => {
                onMoveRef.current &&
                    onMoveRef.current({
                        x: data.vector.x,
                        y: data.vector.y,
                        deg: data.angle.degree,
                        dist: (data.distance * 200) / size,
                    })
            })
            manager.on('end', (event, data) => {
                onMoveRef.current &&
                    onMoveRef.current({
                        x: 0,
                        y: 0,
                        deg: 0,
                        dist: 0,
                    })
            })
        }
    }, [containerWidth, containerHeight])

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                display: 'block',
            }}
            ref={containerRef}
        />
    )
}
