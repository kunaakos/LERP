import * as React from 'react'
import styled from '@emotion/styled'

export const Paragraph = styled.p`
    font-family: 'Roboto';
    margin: 0 0.3rem;
`

export const Title = styled.h1`
    font-family: 'Roboto';
    margin: 0 0.3rem;
`
export const SectionTitle = styled.h2`
    font-family: 'Roboto';
    margin: 0 0.3rem;
`

export const Button = styled.div`
    cursor: pointer;
    background: purple;
    display: inline-block;
    padding: 0.2rem 0.75rem;
    margin: 0.2rem;
    box-sizing: border-box;
    text-transform: uppercase;
    color: #fff;
    font-family: 'Roboto';
    font-size: 1rem;
`

export const Label = styled.span`
    font-family: 'Roboto';
`

export const List = styled.ul`
    display: flex;
    flex-direction: column;
    padding: 0;
    list-style-type: none;
    margin: 0.3rem 0;
    box-sizing: border-box;
`

export const ListItem = styled.li`
    box-sizing: border-box;
    cursor: pointer;
    width: 100%;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding: 0.3rem;
    &:hover,
    &.active {
        background: #ddd;
    }
`

const CenterWrapper = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
`

const CenterContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
`

export const Center = ({ children }) => (
    <CenterWrapper>
        <CenterContainer>{children}</CenterContainer>
    </CenterWrapper>
)

const HorizontalCenterWrapper = styled.div`
    text-align: center;
`

const HorizontalCenterContainer = styled.div`
    display: inline-block;
`

export const HorizontalCenter = ({ children }) => (
    <HorizontalCenterWrapper>
        <HorizontalCenterContainer>{children}</HorizontalCenterContainer>
    </HorizontalCenterWrapper>
)

const ModalBackgroundOverlay = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
`

const ModalContainer = styled.div`
    background: #fff;
    border-radius: 1rem;
    padding: 0.5rem;
    max-width: 95vw;
    max-height: 95vh;
`

export const Modal = ({ children, onBgClick }) => {
    return (
        <ModalBackgroundOverlay onClick={onBgClick}>
            <Center>
                <ModalContainer onClick={e => e.stopPropagation()}>{children}</ModalContainer>
            </Center>
        </ModalBackgroundOverlay>
    )
}

export const Box = styled.div`
    background: gray;
    width: 100%;
    height: 100%;
`
