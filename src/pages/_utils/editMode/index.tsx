import React from "react";
import { FormLayout } from '@formily/antd-v5';
import { FormProContext } from "@nokecy/qc-ui";
import { useSchemaField } from "@umijs/max";
import { getExtendTableData, getSchemaFromExtendData } from "./itemConfiguration";

const FormLayoutMode = (props: any) => {
    const { formId, editClickAfter, moduleKey, entityKey } = props;
    const { editMode, handleEditClick } = React.useContext(FormProContext);
    const SchemaField = useSchemaField({});

    const styles: any = {
        container: {
            border: "2px solid #1890FF",
            position: 'relative',
        },
        editLabel: {
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: '#1890FF',
            borderRadius: 4,
            margin: 4,
            color: '#fff',
            cursor: 'pointer',
            textAlign: 'center',
            width: 45,
            height: 20,
            zIndex: 9999
        },
    };

    const extendData = getExtendTableData(moduleKey, entityKey);
    const extendSchema = getSchemaFromExtendData(extendData)

    const editClick = () => {
        handleEditClick && handleEditClick(formId);

        editClickAfter && editClickAfter();
    }

    return (
        <div style={editMode ? styles.container : undefined}>
            <FormLayout {...props} >
                {props.children}
                {
                    (moduleKey && entityKey) && <SchemaField schema={extendSchema || {}} />
                }
            </FormLayout>
            {editMode && (
                <div style={styles.editLabel} onClick={editClick}>
                    编辑
                </div>
            )}
        </div>
    );
};

export default FormLayoutMode;
