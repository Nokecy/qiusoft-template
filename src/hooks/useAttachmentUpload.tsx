/**
 * 通用附件上传 Hook
 * 用于在表单页面中配置附件上传功能
 *
 * @example
 * ```tsx
 * const AttachmentUploadWithConfig = useAttachmentUpload(
 *   entityId,
 *   '/api/pdm/project-management/risks'
 * );
 *
 * const SchemaField = useSchemaField({
 *   MultiAttachmentUpload: AttachmentUploadWithConfig,
 * });
 * ```
 */

import React from 'react';
import { request } from 'umi';
import { v4 as uuidv4 } from 'uuid';
import MultiAttachmentUpload from '@/components/MultiAttachmentUpload';

/**
 * 附件上传配置 Hook
 * @param entityId - 实体ID,新建时可为 undefined(内部会自动生成临时ID)
 * @param apiBasePath - API 基础路径,例如 '/api/pdm/project-management/risks'
 * @returns 配置好的 AttachmentUpload 组件
 */
export const useAttachmentUpload = (
  entityId: string | undefined,
  apiBasePath: string
) => {
  // 为新建记录生成临时 entityId (用于附件上传)
  const tempEntityIdRef = React.useRef<string>();
  if (!tempEntityIdRef.current) {
    tempEntityIdRef.current = uuidv4();
  }
  const currentEntityId = entityId || tempEntityIdRef.current;

  // 创建附件上传配置的包装器组件
  const AttachmentUploadWithConfig = React.useCallback(
    (uploadProps: any) => {
      const effectiveEntityId = uploadProps.entityId || currentEntityId;

      // 上传函数 - 使用正确的 API 路由和 FormData
      const uploadFn = React.useCallback(
        async (eid: string, file: File) => {
          const uploadEntityId = eid || effectiveEntityId;
          console.log('📤 上传文件:', file.name, '到 entityId:', uploadEntityId);

          const formData = new FormData();
          formData.append('file', file);

          const result = await request<any>(
            `${apiBasePath}/${uploadEntityId}/documents`,
            {
              method: 'POST',
              data: formData,
              requestType: 'form', // 关键：触发 multipart/form-data
            }
          );

          console.log('✅ 上传成功:', result);
          return result;
        },
        [effectiveEntityId, apiBasePath]
      );

      // 下载函数
      const downloadFn = React.useCallback(
        async (eid: string, blobName: string) => {
          const downloadEntityId = eid || effectiveEntityId;
          const result = await request<Blob>(
            `${apiBasePath}/${downloadEntityId}/documents/${blobName}`,
            {
              method: 'GET',
              responseType: 'blob',
            }
          );
          return result;
        },
        [effectiveEntityId, apiBasePath]
      );

      // 删除函数
      const deleteFn = React.useCallback(
        async (eid: string, blobName: string) => {
          const deleteEntityId = eid || effectiveEntityId;
          await request<any>(
            `${apiBasePath}/${deleteEntityId}/documents/${blobName}`,
            {
              method: 'DELETE',
            }
          );
        },
        [effectiveEntityId, apiBasePath]
      );

      return (
        <MultiAttachmentUpload
          {...uploadProps}
          entityId={effectiveEntityId}
          uploadFn={uploadFn}
          downloadFn={downloadFn}
          deleteFn={deleteFn}
        />
      );
    },
    [currentEntityId, apiBasePath]
  );

  return AttachmentUploadWithConfig;
};
