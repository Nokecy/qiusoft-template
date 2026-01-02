import { MaterialGetByCodeAsync, MaterialGetMaterialAttributeListAsync } from '@/services/common/Material';
import { BomCalculationSuperConfigurationAsync } from '@/services/smarterp/Bom';
import { Form } from '@formily/antd-v5';
import { createForm, onFieldValueChange, onFormSubmitValidateFailed } from '@formily/core';
import { Button, message, Spin } from 'antd';
import React, { useMemo, useState, useRef } from 'react';
import { useFormSchema, useSchemaField } from 'umi';
import { formId, mergeSchemaWithAttributes } from './schema';
import { extractAttributeValues, bomResultColumnDefs, toTree } from './utils';
import { flattenTreeDeep } from '@nokecy/qc-ui';
import { AgGridPlus } from '@/components/agGrid';
import ToolBar from '@/components/toolBar';

const BomAttributePage = () => {
  const [loading, setLoading] = useState(false);
  const [attributeSchema, setAttributeSchema] = useState<any[]>([]);
  const [bomResults, setBomResults] = useState<any[]>([]);
  const [currentMaterialCode, setCurrentMaterialCode] = useState<string>('');
  const gridRef = useRef<any>();

  // 动态生成Schema
  const dynamicSchema = useMemo(() => {
    return mergeSchemaWithAttributes(attributeSchema);
  }, [attributeSchema]);

  const schema = useFormSchema(formId, dynamicSchema);

  const SchemaField = useSchemaField({});

  const form = useMemo(
    () =>
      createForm({
        initialValues: { materialCode: currentMaterialCode },
        effects: () => {
          // 物料选择联动
          onFieldValueChange('{label:materialCode,value:materialCode}', async (field) => {
            let materialCode = field.value;

            // 处理MaterialSelect的labelInValue格式
            if (materialCode && typeof materialCode === 'object' && materialCode.value) {
              materialCode = materialCode.value;
            }

            console.log('物料编码选择:', { originalValue: field.value, processedCode: materialCode });

            if (!materialCode) {
              setAttributeSchema([]);
              setCurrentMaterialCode('');
              setBomResults([]);
              return;
            }

            if (materialCode === currentMaterialCode) {
              return; // 避免重复调用
            }

            setLoading(true);
            setCurrentMaterialCode(materialCode);

            try {
              console.log('调用 MaterialGetByCodeAsync，参数:', { code: materialCode });
              const material = await MaterialGetByCodeAsync({ code: materialCode });
              console.log('MaterialGetByCodeAsync 响应:', material);

              if (!material?.id) {
                message.error('获取物料信息失败');
                console.error('物料信息为空或无效:', material);
                return;
              }

              const attributeResponse = await MaterialGetMaterialAttributeListAsync({
                materialId: material.id
              });

              const attributeSchemaData = attributeResponse.items || [];
              setAttributeSchema(attributeSchemaData);

              if (attributeSchemaData.length > 0) {
                message.success(`物料 ${materialCode} 加载成功，共有 ${attributeSchemaData.length} 个特性需要配置`);
              } else {
                message.info(`物料 ${materialCode} 暂无可配置的特性`);
              }

              // 清空之前的BOM结果
              setBomResults([]);

            } catch (error) {
              message.error('获取物料特性失败');
              setAttributeSchema([]);
            } finally {
              setLoading(false);
            }
          });

          onFormSubmitValidateFailed(() => {
            message.error('请完善必填信息')
          });
        },
      }),
    [currentMaterialCode, attributeSchema]
  );

  // 处理表单提交
  const handleSubmit = async (formValues: any) => {
    // 处理物料编码值
    let materialCode = formValues.materialCode || currentMaterialCode;

    // 处理MaterialSelect的labelInValue格式
    if (materialCode && typeof materialCode === 'object' && materialCode.value) {
      materialCode = materialCode.value;
    }

    // 检查物料字段
    if (!materialCode) {
      message.warning('请先选择物料');
      return;
    }

    setLoading(true);

    try {
      // 提取特性值
      const attributeValues = extractAttributeValues(formValues);

      // 调用BOM计算API
      const bomResult = await BomCalculationSuperConfigurationAsync(
        { materialCode: materialCode },
        { variables: attributeValues }
      );

      if (bomResult && bomResult.length > 0) {
        // 转换BOM结果数据格式，确保树状结构数据正确
        const formattedResults = bomResult.map((item, index) => {
          const parentMaterial = item.parentMaterialCode
            ? bomResult.find(x => x.materialCode === item.parentMaterialCode)
            : null;

          return {
            id: item.id || `${item.materialCode}_${index}`,
            parentId: parentMaterial?.id || null,
            materialCode: item.materialCode,
            materialOutCode: item.materialOutCode,
            materialDescription: item.materialDescription,
            unitUsage: item.qty,
            orderUsage: item.qty,
            memo: item.memo || '',
            level: item.level || '',
            sort: item.sort || index,
            parentMaterialCode: item.parentMaterialCode,
            // 暂时简化处理，后面动态构建
            hierarchy: []
          };
        });

        // 构建正确的层级路径
        const buildHierarchyPath = (materialCode, visited = new Set()) => {
          if (visited.has(materialCode)) {
            return [materialCode]; // 防止循环引用
          }
          visited.add(materialCode);

          const currentItem = bomResult.find(x => x.materialCode === materialCode);
          if (!currentItem || !currentItem.parentMaterialCode) {
            return [materialCode]; // 根节点
          }

          const parentPath = buildHierarchyPath(currentItem.parentMaterialCode, visited);
          return [...parentPath, materialCode];
        };

        // 为每个项目构建正确的 hierarchy
        formattedResults.forEach(item => {
          item.hierarchy = buildHierarchyPath(item.materialCode);
        });

        // 调试数据结构
        console.log('原始BOM数据:', bomResult);
        console.log('格式化后的数据:', formattedResults);

        // 查看第一条数据的结构
        if (formattedResults.length > 0) {
          console.log('第一条数据详细结构:', formattedResults[0]);
          console.log('层级字段示例:', formattedResults.map(item => ({
            materialCode: item.materialCode,
            level: item.level,
            hierarchy: item.hierarchy,
            parentId: item.parentId
          })));
        }

        // 使用 attributeProfile.tsx 的数据处理方式
        const treeData = toTree(formattedResults);
        console.log('树状数据:', treeData);

        const flattenedData = flattenTreeDeep(treeData || [], 'children');
        console.log('扁平化后的数据:', flattenedData);

        setBomResults(flattenedData);

        message.success(`BOM 计算完成，共生成 ${formattedResults.length} 条记录`);
      } else {
        setBomResults([]);
        message.warning('BOM 计算结果为空，请检查特性配置');
      }
    } catch (error) {
      message.error('BOM 计算失败');
      console.error('BOM计算错误:', error);
    } finally {
      setLoading(false);
    }
  };

  // 清空表单
  const handleReset = () => {
    form.reset();
    setAttributeSchema([]);
    setBomResults([]);
    setCurrentMaterialCode('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '16px' }}>
      <Spin spinning={loading} tip={'加载中'} style={{ height: '100%' }}>
        {/* 上半部分：表单区域 */}
        <div style={{ marginBottom: 16, flexShrink: 0 }}>
          <Form form={form} {...schema.form}>
            <SchemaField schema={schema.schema}></SchemaField>

            <ToolBar>
              <Button onClick={handleReset}>重置</Button>
              <Button
                type="primary"
                loading={loading}
                onClick={() => {
                  form.submit().then((values) => {
                    handleSubmit(values);
                  }).catch((error) => {
                    console.error('表单验证失败:', error);
                  });
                }}
                style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
              >
                保存
              </Button>
            </ToolBar>
          </Form>
        </div>

        {/* 下半部分：结果表格 */}
        <div style={{ flex: 1, minHeight: 0, height: 'calc(100vh - 300px)' }}>
          <AgGridPlus
            ref={gridRef}
            headerTitle="BOM计算结果"
            gridKey="bom-attribute-tree-grid"
            columnDefs={bomResultColumnDefs}
            dataSource={bomResults}
            hidePagination={true}
            pagination={false}
            defaultColDef={{
              sortable: true,
              filter: true,
              resizable: true,
            }}
            domLayout="normal"
            enableRangeSelection={true}
            enableBrowserTooltips={true}
            search={false}
            // 树状表格配置 - 使用getDataPath模式（attributeProfile.tsx方式）
            treeData={true}
            treeParentName={'parentId'}
            treeKeyName='id'
            getDataPath={data => {
              return data.hierarchy;
            }}
            animateRows={true}
            autoGroupColumnDef={{
              headerName: '物料编码',
              field: 'materialCode',
              width: 200,
            }}
            groupDefaultExpanded={-1} // 默认展开所有层级
          />
        </div>
      </Spin>
    </div>
  );
};

export default BomAttributePage;

export const routeProps = {
  name: 'BOM特性模拟',
};