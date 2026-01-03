import { login } from '@/services/loginApi';
import { OrganizationInfoGetOrganizationsByUserNameAsync } from '@/services/openApi/OrganizationInfo';
import {
    ApartmentOutlined,
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Helmet, history, SelectLang, useIntl, useModel } from 'umi';
import { Alert, Button, Flex, Form, FormProps, Input, message, Select } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import loginImg from '../../assets/loginBg.jpg';
import loginimg2 from '../../assets/loginimg2.png';
import './index.less';

type FieldType = {
    username?: string;
    password?: string;
    organizationId?: string;
    remember?: string;
};

const useStyles = createStyles(({ token }) => {
    return {
        action: {
            marginLeft: '8px',
            color: 'rgba(0, 0, 0, 0.2)',
            fontSize: '24px',
            verticalAlign: 'middle',
            cursor: 'pointer',
            transition: 'color 0.3s',
            '&:hover': {
                color: token.colorPrimaryActive,
            },
        },
        lang: {
            width: 42,
            height: 42,
            lineHeight: '42px',
            position: 'fixed',
            color: '#FFF',
            right: 16,
            borderRadius: token.borderRadius,
            ':hover': {
                backgroundColor: token.colorBgTextHover,
            },
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            overflow: 'auto',
            backgroundImage: '../../assets/loginBg.png',
            backgroundSize: '100% 100%',
        },
    };
});

const Lang = () => {
    const { styles } = useStyles();

    return (
        <div className={styles.lang} data-lang>
            {SelectLang && <SelectLang />}
        </div>
    );
};

const LoginMessage: React.FC<{
    content: string;
}> = ({ content }) => {
    return (
        <Alert
            style={{
                marginBottom: 24,
            }}
            message={content}
            type="error"
            showIcon
        />
    );
};

const Login = () => {
    const [userLoginState, setUserLoginState] = useState<any>({});
    const [type, setType] = useState<string>('account');
    const { initialState, setInitialState, refresh } = useModel('@@initialState');
    const appTitle = APP_TITLE || '数字平台';
    const { styles } = useStyles();
    const intl = useIntl();
    const { status, type: loginType } = userLoginState;

    const [loginLoading, setLoginLoading] = useState(false);
    const [organizations, setOrganizations] = useState<any[]>([]);
    const [loadingOrgs, setLoadingOrgs] = useState(false);
    const [selectedOrgCode, setSelectedOrgCode] = useState<string | undefined>();
    const [form] = Form.useForm();

    const fetchUserInfo = async () => {
        await refresh();
    };

    // 当用户名改变时获取组织机构列表
    const handleUsernameChange = async (e: React.FocusEvent<HTMLInputElement>) => {
        const username = e.target.value?.trim();
        if (!username) {
            setOrganizations([]);
            form.setFieldValue('organizationId', undefined);
            return;
        }

        try {
            setLoadingOrgs(true);
            const orgs = await OrganizationInfoGetOrganizationsByUserNameAsync({ userName: username });
            setOrganizations(orgs || []);

            // 自动选中默认组织，如果没有默认组织且只有一个则自动选中
            if (orgs && orgs.length > 0) {
                const defaultOrg = orgs.find((org: any) => org.isDefault === true || org.IsDefault === true || org.isdefault === true);
                if (defaultOrg) {
                    setSelectedOrgCode(defaultOrg.code);
                } else if (orgs.length === 1) {
                    setSelectedOrgCode(orgs[0].code);
                } else {
                    setSelectedOrgCode(undefined);
                }
            } else {
                setSelectedOrgCode(undefined);
            }
        } catch (error) {
            console.error('获取组织机构失败:', error);
            setOrganizations([]);
            form.setFieldValue('organizationId', undefined);
        } finally {
            setLoadingOrgs(false);
        }
    };

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            // 检查是否选择了组织机构
            if (organizations.length > 0 && !selectedOrgCode) {
                message.warning('请选择组织机构');
                return;
            }

            setLoginLoading(true);

            const logInfo = await login({ ...values });
            sessionStorage.setItem('access_token', logInfo.access_token);
            sessionStorage.setItem('refresh_token', logInfo.refresh_token);
            sessionStorage.setItem('expires_in', logInfo.expires_in);

            // 保存选中的组织机构代码到 localStorage，与右上角组织选择器保持一致
            if (selectedOrgCode) {
                localStorage.setItem('_organizationCode', selectedOrgCode);
            }

            message.success("登录成功！");
            await fetchUserInfo();
            setLoginLoading(false);
            setTimeout(() => {
                const urlParams = new URL(window.location.href).searchParams;
                history.push(urlParams.get('redirect') || '/');
            }, 500)
            return;
        } catch (error) {
            setLoginLoading(false);
            console.log(error, "error");
            message.error("登录失败,用户名或密码错误，请重试！");
        }
    };


    return (
        <div className={styles.container} style={{ backgroundImage: `url(${loginImg})` }}>

            <Helmet>
                <title>登录--{appTitle}</title>
            </Helmet>

            <Lang />

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                <div className='login-content' style={{ backgroundImage: `url(${loginimg2})` }}>
                    <div>
                        <div className='login-title'>{appTitle}</div>

                        <Form
                            form={form}
                            name="login"
                            style={{ width: 243, maxWidth: 600, }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: '请输入账号!' }]}
                            >
                                <Input
                                    placeholder="请输入账号"
                                    prefix={<UserOutlined />}
                                    style={{ borderBottom: '1px solid #666666', borderRadius: '0px' }}
                                    variant="borderless"
                                    onBlur={handleUsernameChange}
                                />
                            </Form.Item>

                            {organizations.length > 0 && (
                                <Form.Item>
                                    <div className="org-select-wrapper">
                                        <ApartmentOutlined className="org-select-icon" />
                                        <Select
                                            placeholder="请选择组织机构"
                                            loading={loadingOrgs}
                                            style={{ borderRadius: '0px' }}
                                            variant="borderless"
                                            value={selectedOrgCode}
                                            onChange={setSelectedOrgCode}
                                            options={organizations.map(org => ({
                                                label: org.name,
                                                value: org.code,
                                            }))}
                                        />
                                    </div>
                                </Form.Item>
                            )}

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: '请输入密码!' }]}
                            >
                                <Input.Password prefix={<LockOutlined />} type="password" style={{ borderBottom: '1px solid #666666', borderRadius: '0px' }} placeholder="请输入密码" variant="borderless" />
                            </Form.Item>
                            <Form.Item>
                                <Flex justify='space-between' align="center">
                                    <a href="" className='register'>注册</a>
                                    <a className='forget' onClick={() => history.push({
                                        pathname: '/appLogin/forgetPassword',
                                        // search: `?xurl=${window.location.href}`,
                                    })} >忘记密码?</a>
                                </Flex>
                            </Form.Item>

                            <Form.Item >
                                <Button type="primary" htmlType="submit" className='login-buttonx' loading={loginLoading}>
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

export const routeProps = {
    name: '登录',
    xLayout: false
};
