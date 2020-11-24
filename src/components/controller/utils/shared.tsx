import * as React from 'react'

import styled from '@emotion/styled'

import { Button } from '../../ui-kit'

export const FeatureContainer = styled.div`
    position: relative;
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    margin: 5px;
`

const FeatureOverlay = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1000;
    display: flex;
    flex-direction: column;
`

export const FeatureMenu = ({ openSettings, remove }) => (
    <FeatureOverlay>
        <Button onClick={openSettings}>settings</Button>
        <Button onClick={remove}>remove</Button>
    </FeatureOverlay>
)
