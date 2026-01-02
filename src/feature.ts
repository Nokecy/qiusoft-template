export default function (initialState) {
    if (initialState && initialState.configuration) {
        const { configuration } = initialState;
        const { features } = configuration;
        return features?.values;
    }
    return {};
}