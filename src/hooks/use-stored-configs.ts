import { useStorageState } from 'react-storage-hooks'

export const useLayoutConfig = () => {
    const [layoutConfigs, saveLayoutConfig] = useStorageState(localStorage, 'layout_configs', [])

    return {
        layoutConfigs,
        saveLayoutConfig,
    }
}

export const useFeatureConfigs = () => {
    const [featureConfigs, saveFeatureConfigs] = useStorageState(localStorage, 'feature_configs', {})

    const saveFeatureConfig = id => featureConfig => {
        saveFeatureConfigs({
            ...featureConfigs,
            [id]: {
                ...featureConfigs[id],
                config: featureConfig,
            },
        })
    }

    const removeFeature = id => () => {
        const { [id]: toDelete, ...toKeep } = featureConfigs
        saveFeatureConfigs(toKeep)
    }

    const addFeature = type => () => {
        const id = `${Date.now()}`
        saveFeatureConfigs({
            ...featureConfigs,
            [id]: {
                type,
                config: {
                    layout: {
                        i: id,
                        x: 1,
                        y: Infinity,
                        w: 1,
                        h: 1,
                    },
                },
            },
        })
    }

    return {
        featureConfigs,
        saveFeatureConfig,
        addFeature,
        removeFeature,
    }
}
