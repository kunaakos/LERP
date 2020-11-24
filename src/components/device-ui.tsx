import * as React from 'react'

import { delay } from '../utils'
import { Paragraph, SectionTitle, HorizontalCenter, Button, Label, List, ListItem } from './ui-kit'
import { usePoweredUp } from '../hooks/use-powered-up'

const testMotor = async motor => {
    motor.setPower(100)
    await delay(1000)
    motor.setPower(-50)
    await delay(1000)
    motor.setPower(0)
}

export const HubManager = () => {
    const poweredUp = usePoweredUp()

    return (
        <>
            <SectionTitle>Hubs</SectionTitle>

            <List>
                {poweredUp.hubs.length ? (
                    poweredUp.hubs.map(hub => (
                        <ListItem key={hub.uuid}>
                            <Label>{hub.name}</Label>
                            {hub.connected ? (
                                <Button onClick={() => poweredUp.disconnect(hub.uuid)}>disconnect</Button>
                            ) : (
                                <Button onClick={() => poweredUp.connect(hub.uuid)}>connect</Button>
                            )}
                        </ListItem>
                    ))
                ) : (
                    <Paragraph>No hubs paired.</Paragraph>
                )}
            </List>

            <HorizontalCenter>
                <Button onClick={poweredUp.scan}>scan for hubs</Button>
            </HorizontalCenter>
        </>
    )
}

export const DeviceList = ({ devices, selectedId, onSelect }) => {
    const isSelectedDeviceOffline = Boolean(selectedId) && !Boolean(devices.find(device => device.id === selectedId))

    return (
        <>
            {selectedId && isSelectedDeviceOffline && <Paragraph>Selected device is offline.</Paragraph>}

            {devices.length ? (
                <List>
                    {devices.map(device => (
                        <ListItem key={device.id} onClick={() => onSelect && onSelect(device.id)} className={selectedId === device.id ? 'active' : null}>
                            <Label>{device.id}</Label>
                            <Button onClick={() => testMotor(device)}>test</Button>
                        </ListItem>
                    ))}
                    <ListItem key={'null'} onClick={() => onSelect && onSelect(null)} className={selectedId === null ? 'active' : null}>
                        <Label>disable</Label>
                    </ListItem>
                </List>
            ) : (
                <Paragraph>No {isSelectedDeviceOffline ? 'other ' : ''}compatible devices found.</Paragraph>
            )}
        </>
    )
}
