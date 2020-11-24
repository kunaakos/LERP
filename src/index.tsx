import * as React from 'react'
import ReactDOM from 'react-dom'
import { useState } from 'react'

import { PoweredUpProvider, usePoweredUp } from './hooks/use-powered-up'

import { HubManager } from './components/device-ui'
import { Controller } from './components/controller'
import { Menu, FloatingButtons } from './components/menu'

import { Button } from './components/ui-kit'

const App = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)

    return (
        <>
            <Controller />

            <FloatingButtons side="left">
                <Button onClick={() => setIsSettingsOpen(!isSettingsOpen)}>hubs</Button>
            </FloatingButtons>

            <Menu isOpen={isSettingsOpen} close={() => setIsSettingsOpen(false)}>
                <HubManager />
            </Menu>
        </>
    )
}

ReactDOM.render(
    <PoweredUpProvider>
        <App />
    </PoweredUpProvider>,
    document.getElementById('app')
)
