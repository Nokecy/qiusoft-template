import React, { Component, ErrorInfo } from 'react';
import { Result, Button } from 'antd';

interface Props {
  scenarioKey?: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  onRetry?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class SchemaErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[DynamicSchema] 渲染错误:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    this.props.onRetry?.();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Result
          status="error"
          title="表单渲染失败"
          subTitle={
            this.props.scenarioKey
              ? `场景 "${this.props.scenarioKey}" 的表单渲染出错`
              : '表单渲染过程中发生错误'
          }
          extra={[
            <Button key="retry" type="primary" onClick={this.handleRetry}>
              重试
            </Button>,
          ]}
        />
      );
    }

    return this.props.children;
  }
}

export default SchemaErrorBoundary;
