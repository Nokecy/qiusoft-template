import { Select, Tag } from 'antd';
import React from 'react';

/**
 * 工作流状态枚举 (对应后端 EnumWorkflowStatus)
 * Unstart = 0     未开始（草稿）
 * Running = 1     运行中
 * Finished = 2    已完成
 * Cancelled = 3   已取消
 * Faulted = 4     已故障
 * Rejected = 5    已拒绝
 * Terminated = 6  已终止
 */
const WorkflowStatusRender = ({ value, data }) => {
	// 处理 null/undefined 为草稿状态
	const status = value === null || value === undefined ? 0 : Number(value);
	switch (status) {
		case 0:
			return <Tag color={'default'}>草稿</Tag>;
		case 1:
			return <Tag color={'processing'}>运行中</Tag>;
		case 2:
			return <Tag color={'success'}>已完成</Tag>;
		case 3:
			return <Tag color={'warning'}>已取消</Tag>;
		case 4:
			return <Tag color={'error'}>已故障</Tag>;
		case 5:
			return <Tag color={'error'}>已拒绝</Tag>;
		case 6:
			return <Tag color={'error'}>已终止</Tag>;
		default:
			return <Tag color={'default'}>-</Tag>;
	}
};
const WorkflowStatusTextRender = ({ value, data }) => {
	// 如果是数值类型，使用 WorkflowStatusRender 的逻辑
	if (value === null || value === undefined || typeof value === 'number') {
		const status = value === null || value === undefined ? 0 : Number(value);
		switch (status) {
			case 0:
				return <Tag color={'default'}>草稿</Tag>;
			case 1:
				return <Tag color={'processing'}>运行中</Tag>;
			case 2:
				return <Tag color={'success'}>已完成</Tag>;
			case 3:
				return <Tag color={'warning'}>已取消</Tag>;
			case 4:
				return <Tag color={'error'}>已故障</Tag>;
			case 5:
				return <Tag color={'error'}>已拒绝</Tag>;
			case 6:
				return <Tag color={'error'}>已终止</Tag>;
			default:
				return <Tag color={'default'}>-</Tag>;
		}
	}
	// 字符串类型（兼容旧版本）
	switch (value) {
		case "Pending":
			return <Tag color={'default'}>草稿</Tag>;
		case "Executing":
			return <Tag color={'processing'}>运行中</Tag>;
		case "Suspended":
			return <Tag color={'processing'}>运行中</Tag>;
		case "Finished":
			return <Tag color={'success'}>已完成</Tag>;
		case "Cancelled":
			if (data?.workflowState?.properties?.IsRejected) {
				return <Tag color={'error'}>已拒绝</Tag>;
			} else if (data?.workflowState?.properties?.IsTerminated) {
				return <Tag color={'error'}>已终止</Tag>;
			} else {
				return <Tag color={'warning'}>已取消</Tag>;
			}
		case "Faulted":
			return <Tag color={'error'}>已故障</Tag>;
		case "Rejected":
			return <Tag color={'error'}>已拒绝</Tag>;
		case "Termination":
			return <Tag color={'error'}>已终止</Tag>;
		default:
			return <Tag color={'default'}>-</Tag>;
	}
};
const { Option } = Select;

const gradeMap = [
	{ label: '草稿', value: 0 },
	{ label: '运行中', value: 1 },
	{ label: '已完成', value: 2 },
	{ label: '已取消', value: 3 },
	{ label: '已故障', value: 4 },
	{ label: '已拒绝', value: 5 },
	{ label: '已终止', value: 6 },
];

const StatusQuery = (props: any) => {
	return (
		<Select {...props}>
			{gradeMap.map((i: any) => (
				<Option value={i.value}>{i.label}</Option>
			))}
		</Select>
	);
};

export default WorkflowStatusRender;
export { StatusQuery, WorkflowStatusTextRender };
