export default function (initialState) {
    if (initialState && initialState.formSchemas) {
        const { formSchemas } = initialState;
        const formSchema = {};
        formSchemas.map(x => formSchema[x.name] = JSON.parse(x.content));
        console.log("formSchemas",formSchemas)
        return formSchema;
    }
    return {};
}