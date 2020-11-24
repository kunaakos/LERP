import * as React from 'react'
import { createContext, useContext, useState, useEffect, useRef } from 'react'

// @ts-ignore
import 'node-poweredup/dist/browser/poweredup.js'

const log = {
    info: message => console.info(message),
    warn: message => console.warn(message),
    error: message => console.error(message),
}

export enum DeviceType {
    BASIC_MOTOR = 1,
    BOOST_TACHO_MOTOR = 38,
    BOOST_MOVE_HUB_MOTOR = 39,
    CONTROL_PLUS_LARGE_MOTOR = 46,
    CONTROL_PLUS_XLARGE_MOTOR = 47,
}

const createHub = hub => ({
    instance: hub,
    uuid: hub.uuid,
    name: hub.name,
    connected: false,
})

const createBasicMotorFrom = async device => {
    const motor = await device.hub.waitForDeviceAtPort(device.portName)
    return {
        type: device.type,
        port: device.portName,
        hubUuid: device.hub.uuid,
        id: `${device.hub.uuid}_${device.portName}_${device.type}`,
        setPower: val => {
            motor.setPower(val).catch(log.error)
        },
    }
}

const PoweredUpContext = createContext(null)

export const PoweredUpProvider = ({ children }) => {
    const [poweredUp, setPoweredUp] = useState(null)

    const [hubs, setHubs] = useState<any[]>([])
    const [devices, setDevices] = useState<any[]>([])
    // hubs and devices are also stored in refs, so updated values
    // are available to use in useEffect hooks
    const hubsRef = useRef(hubs)
    const devicesRef = useRef(devices)
    // refs are updated every time this component updates
    hubsRef.current = hubs
    devicesRef.current = devices

    console.info('updating PoweredUpProvider')

    const addHub = hub => setHubs([...hubsRef.current, createHub(hub)])

    const removeHub = uuid => setHubs(hubsRef.current.filter(hub => hub.uuid !== uuid))

    const onAttach = async device => {
        log.info(`found ${DeviceType[device.type]} on port ${device.portName} of hub ${device.hub.name}`)

        if (device.isVirtualPort) {
            log.info(`discarding device on virtual port`)
            return
        }

        switch (device.type) {
            case DeviceType.BASIC_MOTOR:
            case DeviceType.BOOST_TACHO_MOTOR:
            case DeviceType.BOOST_MOVE_HUB_MOTOR:
                const basicMotor = await createBasicMotorFrom(device)
                setDevices([...devicesRef.current, basicMotor])
            default:
                log.error(`unsupported device attached to port ${device.portName} of hub ${device.hub.name}`)
                break
        }
    }

    const removeDevicesConnectedToHub = uuid => setDevices(devicesRef.current.filter(device => device.hubUuid !== uuid))

    const removeDeviceConnectedToHubAndPort = (hubUuid, port) =>
        setDevices(devicesRef.current.filter(device => !(device.hubUuid === hubUuid && device.port === port)))

    const scan = () => poweredUp && poweredUp.scan()

    const connect = (uuid: string) => {
        try {
            const hub = hubs.find(hub => hub.uuid === uuid)
            hub &&
                hub.instance.connect().then(() => {
                    setHubs(hubs.map(hub => (hub.uuid === uuid ? { ...hub, connected: true } : hub)))
                })
        } catch (error) {
            log.error(error)
        }
    }

    const disconnect = (uuid: string) => {
        const hub = hubs.find(hub => hub.uuid === uuid)
        hub && hub.instance.disconnect().catch(log.error)
    }

    const getById = id => devices.find(device => device.id === id)

    const init = () => {
        const pu = new window.PoweredUP.PoweredUP()
        window.pu = pu
        setPoweredUp(pu)

        pu.on('discover', hub => {
            log.info(`found hub named '${hub.name}'`)
            addHub(hub)

            hub.on('disconnect', () => {
                log.info(`lost hub named '${hub.name}'`)
                removeDevicesConnectedToHub(hub.uuid)
                removeHub(hub.uuid)
            })

            hub.on('attach', device => onAttach(device).catch(log.error))

            hub.on('detach', port => {
                log.info(`lost device connected to port ${port} of hub ${hub.name}`)
                removeDeviceConnectedToHubAndPort(hub.uuid, port)
            })
        })
    }

    // run on initial update only
    useEffect(() => {
        log.info('initialising')
        const check = () => {
            if (!window.PoweredUP) {
                window.setTimeout(check, 10)
            } else {
                init()
            }
        }
        check()
    }, [])

    return (
        <PoweredUpContext.Provider
            value={{
                initialised: Boolean(poweredUp),
                scan,
                connect,
                disconnect,
                getById,
                hubs,
                devices,
            }}
        >
            {children}
        </PoweredUpContext.Provider>
    )
}

export const usePoweredUp = () => useContext(PoweredUpContext)
