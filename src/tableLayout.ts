export default function (initialState) {
	if (!initialState) {
		return {};
	}
	const { tableLayout = {}, configuration = {} } = initialState;
	const { extraProperties = {} } = configuration;

	//获取扩展表格列信息
	let extenedObjects = extraProperties.extendedObjects ? extraProperties.extendedObjects : [];
	let extensibleColumns = {};
	extenedObjects.map((item: any) => {
		extensibleColumns[item.objectName] = item.propertyInfos;
	});

	return { tableLayout: tableLayout, extensibleColumns: extensibleColumns };
}
