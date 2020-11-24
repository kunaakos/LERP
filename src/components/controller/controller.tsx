import * as React from 'react'
import { useState, useEffect } from 'react'

import styled from '@emotion/styled'

import GridLayout from 'react-grid-layout'

import { useModal } from '../../hooks/use-modal'
import { useFeatureConfigs, useLayoutConfig } from '../../hooks/use-stored-configs'

import { Title, Button, List, ListItem, Label } from '../ui-kit'

import { TankControl } from './tank-control'
import { MotorControl } from './motor-control'
import { FloatingButtons } from '../menu'

const nothingOutOfBounds = layoutConfig => !layoutConfig.some(({ y, h }) => y + h > 9)

const ControllerContainer = styled.div`
    width: 100%;
    height: 100%;
    transform: translate(0);
    position: relative;
    display: flex;
    align-items: center;
    .react-grid-layout {
        position: relative;
        overflow: hidden;
        @media (max-aspect-ratio: 16/9) {
            width: 100%;
            padding-bottom: 56.25%;
        }
        @media (min-aspect-ratio: 16/9) {
            height: 100%;
            width: 177%;
        }
    }
`

const GridItem = styled.div`
    &:not(.react-resizable-hide) {
        .react-resizable-handle {
            position: absolute;
            display: block;
            cursor: se-resize;
            width: 10px;
            height: 10px;
            background: purple;
            right: 0;
            bottom: 0;
        }
    }
`

export const Controller = () => {
    const { openModal, ModalContents } = useModal()
    const { featureConfigs, saveFeatureConfig, removeFeature, addFeature } = useFeatureConfigs()
    const { layoutConfigs, saveLayoutConfig } = useLayoutConfig()

    const [isEditMode, setIsEditMode] = useState(false)
    const [gridSize, setGridSize] = useState(null)

    useEffect(() => {
        console.log('render')
    })

    useEffect(() => {
        console.log('initial render')

        setGridSize({
            width: window.innerWidth,
            rowHeight: window.innerWidth / 16,
        })

        window.addEventListener('resize', () => {
            setGridSize({
                width: window.innerWidth,
                rowHeight: window.innerWidth / 16,
            })
        })
    }, [])

    const onLayoutChange = newLayoutConfigs => {
        if (nothingOutOfBounds(newLayoutConfigs)) {
            saveLayoutConfig(newLayoutConfigs.map(({ isDraggable, isResizable, ...toSave }) => toSave))
        } else {
            // this is ugly af, but we need to trigger a rerender of the grid, and we need its props to change for that.
            saveLayoutConfig(newLayoutConfigs.map(({ isDraggable, isResizable, ...toSave }) => toSave))
            saveLayoutConfig(layoutConfigs)
        }
    }

    return (
        <>
            <ControllerContainer>
                {gridSize && (
                    <GridLayout
                        cols={16}
                        margin={[0, 0]}
                        compactType={null}
                        autoSize={false}
                        layout={layoutConfigs.map(config => ({ ...config, isDraggable: isEditMode, isResizable: isEditMode }))}
                        onLayoutChange={onLayoutChange}
                        {...gridSize}
                    >
                        {Object.entries(featureConfigs).map(([id, { type, config }]) => {
                            switch (type) {
                                case 'tankcontrol_v1':
                                    return (
                                        <GridItem key={id}>
                                            <TankControl
                                                config={config}
                                                setConfig={saveFeatureConfig(id)}
                                                isInEditMode={isEditMode}
                                                remove={removeFeature(id)}
                                            />
                                        </GridItem>
                                    )
                                case 'motorcontrol_v1':
                                    return (
                                        <GridItem key={id}>
                                            <MotorControl
                                                config={config}
                                                setConfig={saveFeatureConfig(id)}
                                                isInEditMode={isEditMode}
                                                remove={removeFeature(id)}
                                            />
                                        </GridItem>
                                    )
                                default:
                                    return null
                            }
                        })}
                    </GridLayout>
                )}
            </ControllerContainer>

            <FloatingButtons side="right">
                {isEditMode && <Button onClick={openModal}>add</Button>}
                <Button onClick={() => setIsEditMode(!isEditMode)}>{isEditMode ? 'done' : 'edit'}</Button>
            </FloatingButtons>

            <ModalContents>
                <Title>Add Control</Title>
                <List>
                    <ListItem>
                        <Label onClick={addFeature('motorcontrol_v1')}>Motor Control</Label>
                    </ListItem>
                    <ListItem>
                        <Label onClick={addFeature('tankcontrol_v1')}>Tank Control</Label>
                    </ListItem>
                </List>
            </ModalContents>
        </>
    )
}
