import * as React from 'react'

import flow from 'lodash/flow'
import inRange from 'lodash/inRange'

import { usePoweredUp } from '../../hooks/use-powered-up'
import { useModal } from '../../hooks/use-modal'

import { DeviceList } from '../device-ui'
import { Joystick } from '../joystick'

import { reverseMotors, setMotors } from './utils'

import { FeatureContainer, FeatureMenu } from './utils/shared'

import { Title, SectionTitle } from '../ui-kit'

const leftMotorMaxOutputAtAngle = deg => {
    if (inRange(deg, 0, 90)) {
        return 100
    } else if (inRange(deg, 90, 180)) {
        return 300 - (20 * deg) / 9 // 100 to -100
    } else if (inRange(deg, 180, 225)) {
        return (20 * deg) / 9 - 500 // -100 to 0
    } else if (inRange(deg, 225, 270)) {
        return 500 - (20 * deg) / 9 // 0 to -100
    } else if (inRange(deg, 270, 315)) {
        return -100
    } else {
        return (40 * deg) / 9 - 1500 // -100 to 100
    }
}

const rightMotorMaxOutputAtAngle = deg => {
    if (inRange(deg, 0, 90)) {
        return (20 * deg) / 9 - 100 // -100 to 100
    } else if (inRange(deg, 90, 180)) {
        return 100
    } else if (inRange(deg, 180, 225)) {
        return 900 - (40 * deg) / 9 // 100 to -100
    } else if (inRange(deg, 225, 270)) {
        return -100
    } else if (inRange(deg, 270, 315)) {
        return (20 * deg) / 9 - 700 // -100 to 0
    } else {
        return 700 - (20 * deg) / 9 // 0 to -100
    }
}

const joyToTank = ({
    deg, // joystick direction, 0 deg is right
    dist, // joystick distance from center, in percentage (0..100)
}) => [
    Math.round((leftMotorMaxOutputAtAngle(deg) * dist) / 100), // left motor power (-100..100)
    Math.round((rightMotorMaxOutputAtAngle(deg) * dist) / 100), // right motor power (-100..100)
]

export const TankControl = ({ config, setConfig, isInEditMode, remove }) => {
    const poweredUp = usePoweredUp()
    const { openModal, ModalContents } = useModal()

    const { leftMotorId, reverseLeftMotor, rightMotorId, reverseRightMotor } = config

    const leftMotor = poweredUp.getById(leftMotorId)
    const rightMotor = poweredUp.getById(rightMotorId)

    const joyMoveHandler =
        leftMotor && rightMotor ? flow(joyToTank, reverseMotors([reverseLeftMotor, reverseRightMotor]), setMotors([leftMotor, rightMotor])) : () => {}

    return (
        <FeatureContainer>
            {isInEditMode ? <FeatureMenu openSettings={openModal} remove={remove} /> : <Joystick onMove={joyMoveHandler} color={'black'} />}

            <ModalContents>
                <Title>Tank Control</Title>
                <SectionTitle>Left Motor</SectionTitle>
                <DeviceList selectedId={leftMotorId} devices={poweredUp.devices} onSelect={id => setConfig({ ...config, leftMotorId: id })} />
                <SectionTitle>Right Motor</SectionTitle>
                <DeviceList selectedId={rightMotorId} devices={poweredUp.devices} onSelect={id => setConfig({ ...config, rightMotorId: id })} />
            </ModalContents>
        </FeatureContainer>
    )
}
