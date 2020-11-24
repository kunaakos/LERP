import * as React from 'react'
import styled from '@emotion/styled'

const FloatingButtonsContainer = styled.div`
    position: fixed;
    bottom: 0.5rem;
    transform: translateX();
    display: flex;
    flex-direction: column;
`

export const FloatingButtons = ({ children, side }) => (
    <FloatingButtonsContainer style={side === 'right' ? { right: '0.5rem' } : { left: '0.5rem' }}>{children}</FloatingButtonsContainer>
)

const Drawer = styled.div`
    transition: transform 100ms;
    position: fixed;
    background: #fafafa;
    padding: 1rem;
    top: 0;
    bottom: 0;
    left: 0;
    right: 3rem;
    &:not(.open) {
        transform: translateX(-100%);
    }
    &.open {
        transform: translateX(0);
    }
`

const BackgroundOverlay = styled.div`
    background: #fff;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: opacity 100ms;
    &:not(.show) {
        transform: translateX(-100%);
        opacity: 0;
    }

    &.show {
        transform: translateX(0);
        opacity: 0.8;
    }
`

export const Menu = ({ isOpen = false, close, children }) => {
    return (
        <>
            <BackgroundOverlay className={isOpen ? 'show' : null} onClick={close} />
            <Drawer className={isOpen ? 'open' : null}>{children}</Drawer>
        </>
    )
}
