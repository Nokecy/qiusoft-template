export default function (initialState) {
    if (initialState && initialState.configuration) {
        const { configuration } = initialState;
        const { setting } = configuration;
        return setting?.values;
    }
    return {};
}