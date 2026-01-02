import { ProfileChangePasswordAsync, ProfileGetAsync, ProfileUpdateAsync } from '@/services/openApi/Profile';
import { DingtalkOutlined, GroupOutlined, PhoneOutlined, PushpinOutlined, ScanOutlined, UserOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import { Avatar, Form, message, Space, Tabs } from "antd";
import React from "react";
import { useIntl, useRequest } from "umi";
import BaseView from "./components/baseView";
import ChangePassword from "./components/changePassword";
import UserInfoLabel from "./components/userInfoLabel";

const UserProfile = (props: any) => {
    const [form] = Form.useForm();
    const [passWordform] = Form.useForm();
    const intl = useIntl();

    const { data: profile, run: getProfile } = useRequest(() => {
        return ProfileGetAsync({}).then(profileValue => {
            return profileValue
        });
    }, {
        onSuccess: (profile) => {
            form.setFieldsValue(profile);
        }
    });

    const { run: changePassword } = useRequest((passwordInput) => {
        return ProfileChangePasswordAsync(passwordInput);
    }, {
        manual: true,
        onSuccess: () => {
            message.success("密码更新成功,请重新登录!");
            window.location.href = "/Account/Logout";
        }
    });

    const handleSave = () => {
        message.success("信息更改成功!");
        getProfile();
    }

    const handleChangePassword = () => {
        passWordform.validateFields().then(value => {
            changePassword(value);
        });
    }

    const handleAvatarCompleted = (file) => {
        props.dispatch({ type: "userProfile/updateProfilePicture", payload: { fileName: file.response.result.fileToken } });
    }

    return <>

        <ProCard split="vertical" bodyStyle={{ height: `calc(100vh - ${80}px)` }}>
            <ProCard title={<Space><GroupOutlined /><span>个人信息</span></Space>} colSpan={{ sm: 12, md: 6, lg: 5, xl: 5 }} headerBordered>
                <div style={{ textAlign: "center", paddingBottom: 15, borderBottom: "1px solid #f0f0f0" }}>
                    {
                        profile?.extraProperties!['AvatarUrl'] ? <Avatar size={140} src={profile?.extraProperties!['AvatarUrl']}>{profile?.userName}</Avatar> :
                            <Avatar style={{ backgroundColor: "#f56a00", verticalAlign: 'middle' }} size={140}>{profile?.userName}</Avatar>
                    }
                </div>
                <UserInfoLabel icon={<GroupOutlined />} leftText={"用户名称"} rightText={profile?.userName} />
                <UserInfoLabel icon={<PushpinOutlined />} leftText={"姓名"} rightText={profile?.name} />
                <UserInfoLabel icon={<ScanOutlined />} leftText={"昵称"} rightText={profile?.surname} />
                <UserInfoLabel icon={<PhoneOutlined />} leftText={"手机号码"} rightText={profile?.phoneNumber} />
                <UserInfoLabel icon={<DingtalkOutlined />} leftText={"用户邮箱"} rightText={profile?.email} />
            </ProCard>

            <ProCard title={<Space><UserOutlined /><span>基本资料</span></Space>} colSpan={{ sm: 12, md: 18, lg: 19, xl: 19 }} headerBordered>
                <Tabs tabPosition="top" style={{ backgroundColor: "#fff", paddingLeft: 5 }}>
                    <Tabs.TabPane tab={intl.formatMessage({ id: "UserProfile:BaseInfo" })} key="1">
                        <BaseView currentUserProfile={profile} form={form} onSave={handleSave} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={intl.formatMessage({ id: "UserProfile:ResetPassword" })} key="2">
                        <ChangePassword onSave={handleChangePassword} form={passWordform} />
                    </Tabs.TabPane>
                </Tabs>
            </ProCard>
        </ProCard>
    </>;
}
export default UserProfile;
export const routeProps = {
	name: '个人信息',
};