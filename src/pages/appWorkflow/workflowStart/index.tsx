import { WorkflowDefinitionSettingGetList } from '@/services/workflow/WorkflowDefinitionSetting';
import { WorkflowDefinitionSettingGetByDefinitionId } from '@/services/workflow/WorkflowDefinitionSetting';
import { WorkflowCategoryGetList } from '@/services/workflow/WorkflowCategory';
import ProCard from '@ant-design/pro-card';
import React, { useEffect, useState } from 'react';
import { useAccess, useIntl, history, closeTab, dropByCacheKey } from 'umi';
import { Button, Card, List, Result } from 'antd';
import './index.less';
import '../../../../public/font/workfont/iconfont.css';

const ListPage: React.FC<any> = (props: any) => {
	const { data, itemClick } = props;

	return (
		<List
			grid={{ gutter: 16, column: 8 }}
			dataSource={data || []}
			renderItem={(item: any) => (
				<List.Item onClick={itemClick.bind(null, item)}>
					<Card className='listItem'>
						<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: 16 }}>
							{/* 默认companu-main-data */}
							<i className={`iconfont icon-${item.image || 'companu-main-data'}`} style={{ fontSize: 32 }} />
							<span style={{ marginTop: 8 }}>{item.workflowDefinitionDisplayName}</span>
						</div>
					</Card>
				</List.Item>
			)}
		/>
	);
};
const WorkflowStartPage = (props: any) => {
	const intl = useIntl();
	const access = useAccess();
	const [category, setCategory] = useState([]);
	const [data, setData] = useState([]);
	const [loaded, setLoaded] = useState(false);
	
	useEffect(() => {
		WorkflowDefinitionSettingGetList({}).then((res: any) => {
			setData(res.items);
			WorkflowCategoryGetList({}).then((res: any) => {
				setLoaded(true); //解决刚进来闪一下的bug
				setCategory(res.items);
			});
		});
	}, []);

	const startWorkflow = async (row: any) => {
		const setting: any = await WorkflowDefinitionSettingGetByDefinitionId({ definitionId: row.workflowDefinitionId });
		///@ts-ignore
		if (setting?.isCustomForm) {
			dropByCacheKey(window.location.pathname);
			closeTab(`/appWorkflow/workflowForm/customerForm`);
			history.push(`/appWorkflow/workflowForm/customerForm?definitionId=${row.workflowDefinitionId}&formName=${setting.defaultForm}`);
		} else {
			dropByCacheKey(window.location.pathname);
			closeTab(row.defaultForm);
			///@ts-ignore
			history.push(`${row.defaultForm!}?definitionId=${row.workflowDefinitionId}`);
		}
	};

	const getHeight = () => {
		return document.getElementsByTagName('body')[0].clientHeight - 96;
	};
	if (category.filter((i: any) => data?.filter((it: any) => it.cateogry === i.id).length).length === 0 && loaded) {
		return (
			<Result
				status='warning'
				title='该页面没有数据'
				extra={
					<Button type='primary' onClick={() => history.push('/')}>
						返回首页
					</Button>
				}
			/>
		);
	} else {
		return (
			<div id='wkstart' style={{ height: getHeight(), overflow: 'auto' }}>
				{
					//筛选只有存在内容才显示
					category
						.filter((i: any) => data?.filter((it: any) => it.cateogry === i.id).length)
						.map((i: any) => (
							<ProCard
								key={i.id}
								style={{ marginBottom: 8 }}
								bodyStyle={{ padding: '16px' }}
								headStyle={{ height: '44px', paddingBottom: 0 }}
								colSpan={12}
								layout='default'
								bordered
								title={<h2>{i.name}</h2>}
								headerBordered
							>
								<ListPage data={data?.filter((it: any) => it.cateogry === i.id)} itemClick={startWorkflow} />
							</ProCard>
						))
				}
			</div>
		);
	}
};

export default WorkflowStartPage;
export const routeProps = {
	name: '流程发起',
};
