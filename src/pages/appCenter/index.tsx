/**
 * 应用中心 - 应用列表页
 * 展示已启用的应用卡片，支持搜索过滤
 */
import React, { useEffect, useState, useMemo } from 'react';
import { Input, Spin, Empty, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { history } from 'umi';
import { DynamicApplicationGetListAsync } from '@/services/openApi/DynamicApplication';
import AppCardGrid from './_components/AppCardGrid';

const { Search } = Input;

const AppCenterPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');

  // 加载已启用的应用列表
  useEffect(() => {
    setLoading(true);
    DynamicApplicationGetListAsync({
      IsEnabled: true,
      MaxResultCount: 100,
    })
      .then((res) => {
        setApplications(res.items || []);
      })
      .catch((err) => {
        console.error('[AppCenter] 加载应用列表失败:', err);
        message.error('加载应用列表失败');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // 根据搜索文本过滤应用
  const filteredApplications = useMemo(() => {
    if (!searchText.trim()) {
      return applications;
    }
    const lowerSearch = searchText.toLowerCase();
    return applications.filter(
      (app) =>
        app.displayName?.toLowerCase().includes(lowerSearch) ||
        app.name?.toLowerCase().includes(lowerSearch) ||
        app.description?.toLowerCase().includes(lowerSearch)
    );
  }, [applications, searchText]);

  // 点击卡片跳转到应用数据页
  const handleCardClick = (app: any) => {
    history.push(`/appCenter/app?name=${encodeURIComponent(app.name)}`);
  };

  return (
    <div style={{ padding: 24, background: '#f5f5f5', minHeight: '100%' }}>
      {/* 页面标题和搜索框 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>应用中心</h2>
        <Search
          placeholder="搜索应用名称或描述"
          allowClear
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* 应用卡片网格 */}
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 400,
          }}
        >
          <Spin size="large" tip="加载中..." />
        </div>
      ) : filteredApplications.length === 0 ? (
        <Empty
          description={searchText ? '未找到匹配的应用' : '暂无可用应用'}
          style={{ marginTop: 100 }}
        />
      ) : (
        <AppCardGrid applications={filteredApplications} onCardClick={handleCardClick} />
      )}
    </div>
  );
};

export default AppCenterPage;

export const routeProps = {
  name: '应用中心',
};
