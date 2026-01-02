import { useEffect, useState } from 'react';
import { DocumentTypeGetListAsync } from '@/services/pdm/DocumentType';

/**
 * 根据文档类型ID获取文档类型名称
 */
export const useDocumentTypeName = (typeId?: string) => {
  const [typeName, setTypeName] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!typeId) {
      setTypeName('');
      return;
    }

    const loadTypeName = async () => {
      setLoading(true);
      try {
        const res = await DocumentTypeGetListAsync({
          MaxResultCount: 1000,
          SkipCount: 0,
        } as any);

        const type = res.items?.find((item: any) => item.id === typeId);
        setTypeName(type?.typeName || typeId);
      } catch (error) {
        console.error('加载文档类型失败:', error);
        setTypeName(typeId);
      } finally {
        setLoading(false);
      }
    };

    loadTypeName();
  }, [typeId]);

  return { typeName, loading };
};
