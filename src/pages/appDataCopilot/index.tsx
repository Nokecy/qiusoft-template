import { PageContainer } from '@ant-design/pro-components';

const DataCopilotHomePage: React.FC = () => {
    return (
        <PageContainer
            header={{
                title: '智能问数',
                subTitle: 'Text-to-SQL 智能查询系统',
            }}
        >
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <h2>欢迎使用智能问数</h2>
                <p style={{ color: '#666' }}>用自然语言查询您的数据库</p>
            </div>
        </PageContainer>
    );
};

export default DataCopilotHomePage;

export const routeProps = {
    name: '智能问数',
};
