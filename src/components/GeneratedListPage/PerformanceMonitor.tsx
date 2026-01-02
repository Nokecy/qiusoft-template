import { useEffect, useRef, useState } from 'react';

/**
 * 性能指标接口
 */
interface PerformanceMetrics {
  renderTime: number;
  mountTime: number;
  updateCount: number;
  memoryUsage?: number;
  apiResponseTime?: number;
  errorCount: number;
  lastUpdate: number;
}

/**
 * 性能监控 Hook
 */
export const usePerformanceMonitor = (componentName: string) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    mountTime: 0,
    updateCount: 0,
    errorCount: 0,
    lastUpdate: Date.now()
  });
  
  const mountStartTime = useRef<number>(Date.now());
  const renderStartTime = useRef<number>(Date.now());
  const updateCount = useRef<number>(0);
  const errorCount = useRef<number>(0);
  
  // 组件挂载时间测量
  useEffect(() => {
    const mountTime = Date.now() - mountStartTime.current;
    setMetrics(prev => ({
      ...prev,
      mountTime,
      lastUpdate: Date.now()
    }));
  }, []);
  
  // 渲染性能测量 - 移除无限更新的useEffect
  // 改用ref来跟踪更新次数，避免无限重新渲染
  useEffect(() => {
    updateCount.current++;
  });
  
  // 内存使用监控（如果支持）
  useEffect(() => {
    if ('memory' in performance) {
      const memInfo = (performance as any).memory;
      setMetrics(prev => ({
        ...prev,
        memoryUsage: memInfo.usedJSHeapSize / 1024 / 1024 // MB
      }));
    }
  }, []);
  
  // API响应时间测量
  const measureApiCall = async <T,>(apiCall: () => Promise<T>): Promise<T> => {
    const startTime = Date.now();
    try {
      const result = await apiCall();
      const responseTime = Date.now() - startTime;
      
      setMetrics(prev => ({
        ...prev,
        apiResponseTime: responseTime,
        lastUpdate: Date.now()
      }));
      
      return result;
    } catch (error) {
      errorCount.current++;
      setMetrics(prev => ({
        ...prev,
        errorCount: errorCount.current,
        lastUpdate: Date.now()
      }));
      throw error;
    }
  };
  
  // 错误记录
  const recordError = () => {
    errorCount.current++;
    setMetrics(prev => ({
      ...prev,
      errorCount: errorCount.current,
      lastUpdate: Date.now()
    }));
  };
  
  // 性能报告
  const getPerformanceReport = () => {
    const currentMetrics = {
      ...metrics,
      updateCount: updateCount.current,
      errorCount: errorCount.current
    };
    
    const report = {
      component: componentName,
      ...currentMetrics,
      performance: {
        mountPerformance: currentMetrics.mountTime < 100 ? 'good' : currentMetrics.mountTime < 300 ? 'warning' : 'poor',
        apiPerformance: currentMetrics.apiResponseTime ? 
          (currentMetrics.apiResponseTime < 300 ? 'good' : currentMetrics.apiResponseTime < 1000 ? 'warning' : 'poor') : 'unknown',
        stability: currentMetrics.errorCount === 0 ? 'excellent' : currentMetrics.errorCount < 3 ? 'good' : 'poor'
      },
      recommendations: generateRecommendations(currentMetrics)
    };
    
    return report;
  };
  
  // 返回带有实时更新次数的metrics
  const currentMetrics = {
    ...metrics,
    updateCount: updateCount.current,
    errorCount: errorCount.current
  };

  return {
    metrics: currentMetrics,
    measureApiCall,
    recordError,
    getPerformanceReport
  };
};

/**
 * 生成性能优化建议
 */
const generateRecommendations = (metrics: PerformanceMetrics): string[] => {
  const recommendations: string[] = [];
  
  if (metrics.renderTime > 16) {
    recommendations.push('渲染时间过长，考虑使用 React.memo 或 useMemo 优化');
  }
  
  if (metrics.mountTime > 300) {
    recommendations.push('组件挂载时间过长，考虑代码分割或懒加载');
  }
  
  if (metrics.apiResponseTime && metrics.apiResponseTime > 1000) {
    recommendations.push('API响应时间过长，考虑添加缓存或优化查询');
  }
  
  if (metrics.updateCount > 10) {
    recommendations.push('更新频率过高，检查是否有不必要的重新渲染');
  }
  
  if (metrics.errorCount > 0) {
    recommendations.push('存在错误，建议添加错误边界和异常处理');
  }
  
  if (metrics.memoryUsage && metrics.memoryUsage > 50) {
    recommendations.push('内存使用过高，检查是否存在内存泄漏');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('性能表现良好');
  }
  
  return recommendations;
};

/**
 * 性能监控开发工具组件
 * 仅在开发环境显示
 */
export const PerformanceDevTools: React.FC<{
  componentName: string;
  metrics: PerformanceMetrics;
  onGetReport: () => any;
}> = ({ componentName, metrics, onGetReport }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  // 仅在开发环境显示
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  
  const handleShowReport = () => {
    const report = onGetReport();
    console.group(`🚀 Performance Report: ${componentName}`);
    console.table(report);
    console.groupEnd();
    setShowDetails(!showDetails);
  };
  
  const getPerformanceColor = (value: number, thresholds: [number, number]) => {
    if (value <= thresholds[0]) return '#52c41a';
    if (value <= thresholds[1]) return '#faad14';
    return '#f5222d';
  };
  
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '8px 12px',
        borderRadius: 6,
        fontSize: 12,
        zIndex: 9999,
        fontFamily: 'monospace',
        cursor: 'pointer',
        userSelect: 'none'
      }}
      onClick={handleShowReport}
      title="点击查看详细性能报告"
    >
      <div style={{ marginBottom: 4, fontWeight: 'bold' }}>
        📊 {componentName}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <span style={{ color: getPerformanceColor(metrics.renderTime, [16, 50]) }}>
          R: {metrics.renderTime}ms
        </span>
        <span style={{ color: getPerformanceColor(metrics.mountTime, [100, 300]) }}>
          M: {metrics.mountTime}ms
        </span>
        {metrics.apiResponseTime && (
          <span style={{ color: getPerformanceColor(metrics.apiResponseTime, [300, 1000]) }}>
            API: {metrics.apiResponseTime}ms
          </span>
        )}
        <span style={{ color: metrics.errorCount === 0 ? '#52c41a' : '#f5222d' }}>
          E: {metrics.errorCount}
        </span>
      </div>
      
      {showDetails && (
        <div style={{ 
          marginTop: 8, 
          padding: 8, 
          background: 'rgba(255, 255, 255, 0.1)', 
          borderRadius: 4,
          fontSize: 11
        }}>
          <div>更新次数: {metrics.updateCount}</div>
          {metrics.memoryUsage && (
            <div>内存: {metrics.memoryUsage.toFixed(1)}MB</div>
          )}
          <div style={{ fontSize: 10, opacity: 0.7, marginTop: 4 }}>
            最后更新: {new Date(metrics.lastUpdate).toLocaleTimeString()}
          </div>
        </div>
      )}
    </div>
  );
};