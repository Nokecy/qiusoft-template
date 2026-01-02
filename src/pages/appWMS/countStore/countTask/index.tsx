import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { CountOrderTaskItemGetListAsync } from '@/services/wms/CountOrderTaskItem';
import { LotAttrItemGetListAsync } from '@/services/wms/LotAttrItem';
import { children } from '@umijs/utils/compiled/cheerio/lib/api/traversing';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'umi';

const CountTaskPage: React.FC<any> = (props: any) => {
	const intl = useIntl();

	const [cols, setCols] = useState<any>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		LotAttrItemGetListAsync({}).then((res: any) => {
			setCols(res.items);
			setIsLoading(false);
		});
	}, []);


    const changeData = (type?: string) => {
        let colChildArr: any = []
        for (let index = 0; index < 12; index++) {
            let headerName = cols.find((item) => item.field.toLowerCase() === `property${index + 1}`)?.label
            if (headerName) {
                colChildArr.push({
                    field: `${type ? type+"L" : 'l'}otProperty.property${index + 1}`,
                    headerName: headerName,
                    width: 90
                })
            }
        }
        return colChildArr;
    }

	const columnDefs: any = [
		{ field: 'checkOrderNo', headerName: '盘点清单号', width: 150 },
		{ field: 'countTaskNo', headerName: '盘点任务号', width: 150 },
		{ field: 'wareHouse.code', headerName: '库房编码', width: 100 },
		{ field: 'wareHouse.name', headerName: '库房名称', width: 150 },
		{ field: 'warehouseZoneCode', headerName: '库区编码', width: 100 },
		{ field: 'wareHouseLocationCode', headerName: '库位编码', width: 150 },
		{ field: 'wareHouseLocationName', headerName: '库位名称', width: 150 },
		{ field: 'materialItem.code', headerName: '物料编码', width: 120 },
		{ field: 'materialItem.outCode', headerName: '物料外码', width: 120 },
		{ field: 'materialItem.description', headerName: '物料描述', width: 140 },
		{ field: 'traceId', headerName: 'LPN', width: 150 },
		{ field: 'needSerialNumber', headerName: '需要SN', width: 80, type: 'bool' },
		{ field: 'isOpen', headerName: '开箱', width: 100, type: 'bool' },
		{ field: 'systemQty', headerName: '初盘库存', width: 120 },
		{ field: 'countQty', headerName: '初盘数量', width: 120 },

		{ field: 'isRoHS', headerName: '是否环保', width: 90, type: 'bool' },
		{ field: 'acProperty', headerName: 'AC属性', width: 90 },
		{ field: 'realRightCode', headerName: '物权', width: 100 },
		{ field: 'systemIsRoHS', headerName: '系统是否环保', width: 90, type: 'bool' },
        { field: 'systemAcProperty', headerName: '系统AC属性', width: 90 },
        { field: 'systemRealRightCode', headerName: '系统物权', width: 100 },
        {
            field: 'systemLotProperty', headerName: '系统批次属性', width: 150,
            children: changeData('system')
        },
		{
			field: 'lotProperty', headerName: '批次属性', width: 150,
			children: changeData()
		},

		{ field: 'diffQty', headerName: '初盘差异数量', width: 120 },
		{ field: 'countTime', headerName: '初盘时间', width: 150, type: 'dateTimeColumn', initialSort: 'desc' },
		{ field: 'replaySystemQty', headerName: '复盘系统量', width: 120 },
		{ field: 'replayCountQty', headerName: '复盘量', width: 120 },

		{ field: 'replayIsRoHS', headerName: '复盘是否环保', width: 90, type: 'bool' },
		{ field: 'replayAcProperty', headerName: '复盘AC属性', width: 90 },
		{ field: 'replayRealRightCode', headerName: '复盘物权', width: 100 },
		{
			field: 'replayLotProperty', headerName: '复盘批次属性', width: 150,
			children: changeData('replay')
		},

		{ field: 'replayDiffQty', headerName: '复盘差异量', width: 120 },
		{ field: 'replayCountTime', headerName: '复盘时间', width: 150, type: 'dateTimeColumn', initialSort: 'desc' },
		{ field: 'replayOperator', headerName: '复盘人', width: 120 },
	];

	return (
		<>
			{!isLoading && (
				<AgGridPlus
					headerTitle={'盘点任务查询'}
					gridKey="appWMS.countStore.countTask"
					request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
						let data = await CountOrderTaskItemGetListAsync({
							Filter: params!.filter,
							Sorting: params!.sorter,
							SkipCount: params!.skipCount,
							MaxResultCount: params!.maxResultCount,
						});
						let requestData: any = { success: true, data: data.items!, total: data.totalCount };
						return requestData;
					}}
					columnDefs={columnDefs}
				>
				</AgGridPlus>
			)}
		</>
	);
};

export default CountTaskPage;

export const routeProps = {
	name: '盘点任务',
};
