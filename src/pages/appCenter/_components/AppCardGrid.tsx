/**
 * 应用卡片网格布局组件
 * 响应式展示应用卡片
 */
import React from 'react';
import AppCard from './AppCard';

interface AppCardGridProps {
  applications: any[];
  onCardClick: (app: any) => void;
}

const AppCardGrid: React.FC<AppCardGridProps> = ({ applications, onCardClick }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 16,
      }}
    >
      {applications.map((app) => (
        <AppCard
          key={app.id || app.name}
          app={app}
          dataCount={app.dataCount}
          onClick={() => onCardClick(app)}
        />
      ))}

      {/* 添加悬浮效果的样式 */}
      <style>{`
        .app-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
        }
      `}</style>
    </div>
  );
};

export default AppCardGrid;
