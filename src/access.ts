export default function (initialState) {
    if (initialState && initialState.configuration) {
        const { configuration } = initialState;
        const { auth } = configuration;
        const { grantedPolicies } = auth;
        return grantedPolicies;
    }
    return {};
}