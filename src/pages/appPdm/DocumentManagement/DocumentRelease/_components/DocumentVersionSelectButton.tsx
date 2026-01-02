import React, { useState, useEffect, useCallback } from 'react';
import { Select } from 'antd';
import { connect, mapProps, useField } from '@formily/react';
import { DocumentGetListAsync } from '@/services/pdm/Document';

// 文档生命周期状态枚举
const DocumentLifecycleStatus = {
	Draft: 0,
	PendingApproval: 10,
	InApproval: 15,
	Approved: 20,
	Released: 30,
	Obsolete: 40,
};

/**
 * 文档版本选择下拉框组件
 * 用于ArrayTable中选择文档版本,自动填充文档信息到当前行
 * 只显示已发布状态(Released)的文档
 */
const DocumentVersionSelectButton = connect(
	(props: any) => {
		const { value, onChange } = props;
		const [options, setOptions] = useState<any[]>([]);
		const [loading, setLoading] = useState(false);
		const field = useField();

		// 加载已发布状态的文档列表
		const loadDocuments = useCallback(async (keyword?: string) => {
			setLoading(true);
			try {
				// 使用 DocumentGetListAsync，过滤已发布状态的文档
				// LifecycleState == 3 表示 Released 状态
				let filter = 'PublishState = 1';
				if (keyword) {
					filter = `(DocumentNumber contains "${keyword}" OR DocumentName contains "${keyword}") AND LifecycleState == 30`;
				}

				const data = await DocumentGetListAsync({
					Filter: filter,
					SkipCount: 0,
					MaxResultCount: 50, // 限制返回数量,避免数据过多
				});
				setOptions(data.items || []);
			} catch (error) {
				console.error('加载文档列表失败:', error);
				setOptions([]);
			} finally {
				setLoading(false);
			}
		}, []);

		// 组件加载时获取初始数据
		useEffect(() => {
			loadDocuments();
		}, [loadDocuments]);

		// 搜索处理
		const handleSearch = useCallback((keyword: string) => {
			loadDocuments(keyword);
		}, [loadDocuments]);

		// 选择文档
		const handleChange = useCallback((selectedId: string) => {
			const selectedDoc = options.find((doc) => doc.id === selectedId);
			if (selectedDoc) {
				// 获取当前行的父字段(ArrayTable的item)
				const parent = field.parent;

				if (parent) {
					// 设置documentSelect字段的值,包含所有需要的信息
					onChange?.({
						documentVersionId: selectedDoc.id,
						documentNumber: selectedDoc.documentNumber,
						documentName: selectedDoc.documentName,
						version: selectedDoc.currentVersion || selectedDoc.version,
					});

					// 同步填充其他显示字段
					const documentNumberField = parent.query('documentNumber').take();
					if (documentNumberField && selectedDoc.documentNumber) {
						documentNumberField.setValue(selectedDoc.documentNumber);
					}

					const documentNameField = parent.query('documentName').take();
					if (documentNameField && selectedDoc.documentName) {
						documentNameField.setValue(selectedDoc.documentName);
					}

					const releaseVersionField = parent.query('releaseVersion').take();
					if (releaseVersionField && (selectedDoc.currentVersion || selectedDoc.version)) {
						releaseVersionField.setValue(selectedDoc.currentVersion || selectedDoc.version);
					}
				}
			}
		}, [options, field.parent, onChange]);

		return (
			<Select
				showSearch
				allowClear
				value={value?.documentVersionId}
				placeholder="请选择文档"
				loading={loading}
				filterOption={false}
				onSearch={handleSearch}
				onChange={handleChange}
				style={{ width: '100%' }}
				notFoundContent={loading ? '加载中...' : '暂无数据'}
			>
				{options.map((doc) => (
					<Select.Option key={doc.id} value={doc.id}>
						{`${doc.documentNumber} - ${doc.documentName || ''} (${doc.currentVersion || doc.version || 'v1.0'})`}
					</Select.Option>
				))}
			</Select>
		);
	},
	mapProps({
		value: 'value',
		onChange: 'onChange',
	})
);

export default DocumentVersionSelectButton;

