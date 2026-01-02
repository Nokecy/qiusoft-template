import Table, { ProColumnType, ProTableProps } from '@ant-design/pro-table';
import { message, Table as AntdTable } from 'antd';
import React, { useRef } from 'react';
import { isFragment } from 'react-is';
import './index.less';
import useTableScroll from './useTableScroll';

function toArray(children: React.ReactNode): React.ReactElement[] {
	let ret: React.ReactElement[] = [];

	React.Children.forEach(children, (child: any) => {
		if (isFragment(child) && child.props) {
			ret = ret.concat(toArray(child.props.children));
		} else {
			ret.push(child);
		}
	});

	return ret;
}

function convertChildrenToColumns<RecordType>(children: React.ReactNode): ProColumnType[] {
	return toArray(children)
		.filter((node: any) => React.isValidElement(node))
		.map(({ key, props }: React.ReactElement) => {
			const { children: nodeChildren, ...restProps } = props;
			const column = {
				key,
				...restProps,
			};

			if (nodeChildren) {
				column.children = convertChildrenToColumns(nodeChildren);
			}
			return column;
		});
}

function Column(_: ProColumnType) {
	return null;
}

function TablePlus(props: ProTableProps<any, any>) {
	const { columns, children, scroll, ...rest } = props;
	const formRef = useRef();
	const tableRef = useRef<any>();

	const { scrollY } = useTableScroll(formRef, tableRef);

	const baseColumns = React.useMemo<ProColumnType[]>(() => columns || convertChildrenToColumns(children), [columns, children]);

	return (
		<span ref={tableRef}>
			<Table
				formRef={formRef}
				onRequestError={(e: Error) => {
					message.error('数据加载错误!');
				}}
				columns={baseColumns}
				{...rest}
				scroll={{ ...scroll, y: scrollY }}
			/>
		</span>
	);
}

TablePlus.Column = Column;
TablePlus.ColumnGroup = AntdTable.ColumnGroup;
export default TablePlus;
