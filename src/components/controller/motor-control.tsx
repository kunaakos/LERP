import * as React from 'react'

import flow from 'lodash/flow'

import { usePoweredUp } from '../../hooks/use-powered-up'
import { useModal } from '../../hooks/use-modal'

import { DeviceList } from '../device-ui'
import { Joystick } from '../joystick'

import { reverseMotors, setMotors } from './utils'

import { FeatureContainer, FeatureMenu } from './utils/shared'

import { Title } from '../ui-kit'

const joyToMotor = ({ y }) => [Math.round(y * 100)]

export const MotorControl = ({ config, setConfig, isInEditMode, remove }) => {
    const poweredUp = usePoweredUp()
    const { openModal, ModalContents } = useModal()

    const { motorId, reverseMotor } = config

    const motor = poweredUp.getById(motorId)

    const joyMoveHandler = motor ? flow(joyToMotor, reverseMotors([reverseMotor]), setMotors([motor])) : () => {}

    return (
        <FeatureContainer>
            {isInEditMode ? <FeatureMenu openSettings={openModal} remove={remove} /> : <Joystick onMove={joyMoveHandler} color={'black'} lockY={true} />}

            <ModalContents>
                <Title>Motor Control</Title>
                <DeviceList selectedId={motorId} devices={poweredUp.devices} onSelect={id => setConfig({ ...config, motorId: id })} />
            </ModalContents>
        </FeatureContainer>
    )
}
