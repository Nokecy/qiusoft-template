import { PageContainer } from '@ant-design/pro-layout';
import React, { useState } from 'react';
import { Dashboard as DashboardPro } from '@nokecy/qc-ui';
import { WidgetComponents } from 'umi';

const Dashboard = (props: any) => {
	const getHeight = () => {
		return document.getElementsByTagName('body')[0].clientHeight - 60;
	};
	return (
		<PageContainer style={{ height: getHeight(), overflowY: 'auto' }} pageHeaderRender={() => null}>
			<DashboardPro
				storageKey={'/appQuality'}
				widgets={WidgetComponents}
				defaultLayout={[
					{ w: 6, h: 12, x: 0, y: 0, i: 'QmsBoard-29177961605594964562260388251910', minW: 6, maxW: 12, minH: 6, maxH: 12, moved: false, static: false },
					{ w: 6, h: 12, x: 0, y: 12, i: 'DefectMaterialTopTen-23889164428695288934187990000684', minW: 6, maxW: 12, minH: 6, maxH: 12, moved: false, static: false },
					{ w: 6, h: 12, x: 6, y: 12, i: 'DefectGysForMaterialTopTen-61651364985096688048349041033280', minW: 6, maxW: 12, minH: 6, maxH: 12, moved: false, static: false },
					{ w: 6, h: 12, x: 0, y: 24, i: 'DefectQtyTopTen-09431193612471791746319529591992', minW: 6, maxW: 12, minH: 6, maxH: 12, moved: false, static: false },
					{ w: 6, h: 12, x: 6, y: 24, i: 'DefectGysTopTen-61352110374982805654160285880043', minW: 6, maxW: 12, minH: 6, maxH: 12, moved: false, static: false },
					{ w: 6, h: 12, x: 6, y: 0, i: 'DefectMaterialForGysTopTen-47390518159273742531350567226797', minW: 6, maxW: 12, minH: 6, maxH: 12, moved: false, static: false },
				]}
			/>
		</PageContainer>
	);
};

export default Dashboard;
export const routeProps = {
	name: '质量仪表',
  };