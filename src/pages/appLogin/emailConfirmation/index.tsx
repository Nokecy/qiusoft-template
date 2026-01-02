import { Helmet, history, SelectLang, useIntl, useModel } from 'umi';
import { Alert, Button, Input, message, Space } from 'antd';
import { createStyles } from 'antd-style';
import React, { useEffect, useState } from 'react';
import { useKeepAliveParams } from '@/hooks';
import './index.less';
import { AccountProConfirmEmailAsync, AccountProSendEmailConfirmationTokenAsync, AccountProVerifyEmailConfirmationTokenAsync } from '@/services/openApi/AccountPro';

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

const EmailConfirmation = () => {

    // 使用 Hook 获取路由参数
    const { params } = useKeepAliveParams('/appLogin/emailConfirmation', ['userId', 'confirmationToken']);
    const { userId, confirmationToken } = params;
    const { styles } = useStyles();

    const { initialState } = useModel("@@initialState");
    const User = initialState?.configuration?.currentUser || {};

    const [visible, setVisible] = useState(false);

    const [verifyVisible, setVerifyVisible] = useState(false);

    useEffect(() => {
        if (userId && confirmationToken) {
            verfiyToken()
        }
    }, [userId])

    const verfiyToken = async () => {
        try {
            await AccountProVerifyEmailConfirmationTokenAsync({
                userId: userId,
                token: confirmationToken,
            })
            message.success('验证成功');
            setVerifyVisible(true)
        } catch (error) {
            message.error('验证失败，请重试');
        }
    };

    const handleNext = async () => {

        try {
            await AccountProSendEmailConfirmationTokenAsync({
                userId: User.id || '',
                appName: 'React',
                returnUrl: '/appLogin',
                returnUrlHash: '/appLogin'.toLocaleUpperCase(),
            })

            setVisible(true)
        } catch (error) {

        }
    }

    const handleRestPs = async () => {

        try {
            await AccountProConfirmEmailAsync({
                userId,
                token: confirmationToken
            })

            message.success('邮箱确认成功，请重新登录');
            history.push('/appLogin');
        } catch (error) {

        }
    };


    return (
        <div className={styles.container} >

            <Helmet>
                <title>找回密码</title>
            </Helmet>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', marginTop: '190px' }}>

                {
                    verifyVisible ?
                        // true ?
                        <Space direction="vertical" size="middle" style={{ display: 'flex', width: 320 }}>
                            <div className='password-title'>确认邮箱</div>

                            <Button type="primary" block onClick={handleRestPs} style={{ height: 48, fontSize: 16 }}>确认邮箱</Button>
                        </Space>
                        :
                        <Space direction="vertical" size="middle" style={{ display: 'flex', width: 320 }}>
                            <div className='password-title'> {visible ? '发送成功' : '确认邮箱'}</div>
                            {visible ?
                                <div className='forget-text'>
                                    请查收邮件，并按照说明确认邮箱。如果没有收到，请检查垃圾邮件。
                                </div>
                                :
                                null
                            }
                            {visible ? null : <Button type="primary" block onClick={handleNext} style={{ height: 48, fontSize: 16 }}>发送邮件</Button>}
                        </Space>
                }

            </div>
        </div>
    );
};

export default EmailConfirmation;

export const routeProps = {
    name: '登录',
    xLayout: false
};