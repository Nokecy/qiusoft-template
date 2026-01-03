import React, { useRef } from 'react';
import IframeResizer from 'iframe-resizer-react';

interface WorkflowDefinitionEditorProps {
	definitionId: string;
}

export const WorkflowDefinitionEditor: React.FC<WorkflowDefinitionEditorProps> = ({
	definitionId,
}) => {
	const iframeRef = useRef(null);
	return (
		<IframeResizer
			forwardRef={iframeRef}
			heightCalculationMethod='taggedElement'
			inPageLinks
			log
			// onMessage={onMessage}
			// onResized={onResized}
			//@ts-ignore
			src={`${window.serverUrl?.workflowDesignerServerUrl}/definition-editor.html?definitionId=${definitionId}`}
			style={{ borderWidth: 0, width: '1px', minWidth: '100%', height: '100%' }}
		/>
	);
};
