import { Helmet, history, SelectLang, useIntl, useModel } from 'umi';
import { Alert, Button, Input, message, Space } from 'antd';
import { createStyles } from 'antd-style';
import React, { useEffect, useState } from 'react';
import { useKeepAliveParams } from '@/hooks';
import './index.less';
import { AccountResetPasswordAsync, AccountSendPasswordResetCodeAsync, AccountVerifyPasswordResetTokenAsync } from '@/services/openApi/Account';


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



function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

const ForgetPassword = () => {

    // 使用 Hook 获取路由参数
    const { params } = useKeepAliveParams('/appLogin/forgetPassword', ['userId', 'resetToken']);
    const { userId, resetToken } = params;
    const { styles } = useStyles();

    const [visible, setVisible] = useState(false);
    const [emailValue, setEmailValue] = useState<string>('');
    const [psValue, setpsValue] = useState<string>('');
    const [newpsValue, setnewpsValue] = useState<string>('');

    const [verifyVisible, setVerifyVisible] = useState(false);

    useEffect(() => {
        if (userId && resetToken) {
            verfiyToken()
        }
    }, [userId])

    const verfiyToken = async () => {
        try {
            await AccountVerifyPasswordResetTokenAsync({
                userId: userId,
                resetToken: resetToken,
            })
            message.success('验证成功');
            setVerifyVisible(true)
        } catch (error) {
            message.error('验证失败，请重试');
        }
    };

    const handleNext = async () => {

        if (!emailValue && emailValue !== '') {
            message.error('请输入邮箱');
        }

        if (!validateEmail(emailValue)) {
            message.error('请输入正确的邮箱');
            return;
        }

        try {
            await AccountSendPasswordResetCodeAsync({
                email: emailValue,
                appName: 'React',
                returnUrl: '/appLogin',
                returnUrlHash: '/appLogin'.toLocaleUpperCase(),
            })

            setVisible(true)
        } catch (error) {

        }
    }

    const handleRestPs = async () => {

        if (!psValue && psValue !== '') {
            message.error('请输入密码');
        }

        if (psValue !== newpsValue) {
            message.error('两次密码不一致');
            return;
        }

        try {
            await AccountResetPasswordAsync({
                userId,
                resetToken,
                password: psValue
            })

            message.success('重置成功，请重新登录');
            history.push('/appLogin');
        } catch (error) {

        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value: inputValue } = e.target;
        setEmailValue(inputValue)
    };
    const handlepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value: inputValue } = e.target;
        setpsValue(inputValue)
    };
    const handlenewpsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value: inputValue } = e.target;
        setnewpsValue(inputValue)
    };



    return (
        <div className={styles.container} >

            <Helmet>
                <title>找回密码</title>
            </Helmet>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', marginTop: '190px' }}>

                {
                    verifyVisible ?
                        <Space direction="vertical" size="middle" style={{ display: 'flex', width: 320 }}>
                            <div className='password-title'>重置密码</div>

                            <Input.Password placeholder="请输入新密码" value={psValue} variant="filled" size='large' onChange={handlepsChange} style={{ height: 50 }} />
                            <Input.Password placeholder="请再次确认新密码" value={newpsValue} variant="filled" size='large' onChange={handlenewpsChange} style={{ height: 50 }} />

                            <Button type="primary" block onClick={handleRestPs} style={{ height: 48, fontSize: 16 }}>重置</Button>
                        </Space>
                        :
                        <Space direction="vertical" size="middle" style={{ display: 'flex', width: 320 }}>
                            <div className='password-title'> {visible ? '发送成功' : '找回密码'}</div>
                            {visible ?
                                <div className='forget-text'>
                                    请查收邮件，并按照说明重置密码。如果没有收到，请检查垃圾邮件。
                                </div>
                                :
                                <Input placeholder="请输入邮箱" value={emailValue} variant="filled" size='large' onChange={handleChange} style={{ height: 50 }} />
                            }
                            {visible ? null : <Button type="primary" block onClick={handleNext} style={{ height: 48, fontSize: 16 }}>下一步</Button>}
                        </Space>
                }

            </div>
        </div>
    );
};

export default ForgetPassword;

export const routeProps = {
    name: '登录',
    xLayout: false
};