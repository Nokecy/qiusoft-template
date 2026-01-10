import { OrganizationInfoGetOrganizationsByUserNameAsync } from '@/services/openApi/OrganizationInfo';
import {
    ApartmentOutlined,
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Helmet, history, request, SelectLang, useIntl, useModel } from 'umi';
import { Alert, Button, Flex, Form, FormProps, Input, message, Select } from 'antd';
import { createStyles } from 'antd-style';
import Cookies from 'js-cookie';
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

    /**
     * 语言切换回调 - 与 RightContent 保持一致
     * @author nokecy
     */
    const handleLangChange = ({ key }: { key: string }) => {
        let langKey = key;
        if (langKey === 'zh-CN') {
            langKey = 'zh-Hans';
        }
        if (langKey === 'en-US') {
            langKey = 'en';
        }
        Cookies.set('Accept-Language', langKey);
        const switchUrl = `/Abp/Languages/Switch?culture=${langKey}&uiCulture=${langKey}`;
        window.location.href = switchUrl;
    };

    return (
        <div className={styles.lang} data-lang>
            {SelectLang && <SelectLang onItemClick={handleLangChange} />}
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
    const { styles } = useStyles();
    const intl = useIntl();
    const appTitle = APP_TITLE || intl.formatMessage({ id: 'login.defaultAppTitle' });
    const { status, type: loginType } = userLoginState;

    const [loginLoading, setLoginLoading] = useState(false);
    const [organizations, setOrganizations] = useState<any[]>([]);
    const [loadingOrgs, setLoadingOrgs] = useState(false);
    const [selectedOrgCode, setSelectedOrgCode] = useState<string | undefined>();
    const [form] = Form.useForm();

    const login = ({ username, password }: { username?: string; password?: string }) => {
        const clientId = OAUTH_ClientID;
        const clientSecret = OAUTH_ClientSecret;
        const scope = OAUTH_Scope;

        return request<any>(`/connect/token`, {
            method: 'POST',
            //@ts-ignore
            baseURL: window.serverUrl.authServerUrl,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: `grant_type=password&scope=${scope}&client_id=${clientId}&client_secret=${clientSecret}&username=${username || ''}&password=${password || ''}`,
        });
    };

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
                message.warning(intl.formatMessage({ id: 'login.organization.required' }));
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

            message.success(intl.formatMessage({ id: 'login.success' }));
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
            message.error(intl.formatMessage({ id: 'login.failed' }));
        }
    };


    return (
        <div className={styles.container} style={{ backgroundImage: `url(${loginImg})` }}>

            <Helmet>
                <title>{intl.formatMessage({ id: 'login.title' })}--{appTitle}</title>
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
                                rules={[{ required: true, message: intl.formatMessage({ id: 'login.username.required' }) }]}
                            >
                                <Input
                                    placeholder={intl.formatMessage({ id: 'login.username.placeholder' })}
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
                                            placeholder={intl.formatMessage({ id: 'login.organization.placeholder' })}
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
                                rules={[{ required: true, message: intl.formatMessage({ id: 'login.password.required' }) }]}
                            >
                                <Input.Password prefix={<LockOutlined />} type="password" style={{ borderBottom: '1px solid #666666', borderRadius: '0px' }} placeholder={intl.formatMessage({ id: 'login.password.placeholder' })} variant="borderless" />
                            </Form.Item>
                            <Form.Item>
                                <Flex justify='space-between' align="center">
                                    <a href="" className='register'>{intl.formatMessage({ id: 'login.register' })}</a>
                                    <a className='forget' onClick={() => history.push({
                                        pathname: '/appLogin/forgetPassword',
                                        // search: `?xurl=${window.location.href}`,
                                    })} >{intl.formatMessage({ id: 'login.forgetPassword' })}</a>
                                </Flex>
                            </Form.Item>

                            <Form.Item >
                                <Button type="primary" htmlType="submit" className='login-buttonx' loading={loginLoading}>
                                    {intl.formatMessage({ id: 'login.submit' })}
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
