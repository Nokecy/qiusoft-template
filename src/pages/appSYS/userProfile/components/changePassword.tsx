import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import { useIntl } from "umi";
const FormItem = Form.Item;
import styles from "./baseView.less"

const ChangePassword: React.FC<any> = (props: any) => {
    const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };
    const intl = useIntl();

    const checkPassword = (rule, value, callback) => {
        if (value && value !== props.form.getFieldValue("newPassword")) {
            callback("您输入的两个密码不一致！");
        } else {
            callback();
        }
    };

    return (
        <div className={styles.baseView}>
            <div className={styles.left}>
                <Form {...formItemLayout} form={props.form}>
                    <FormItem name={"currentPassword"} label={intl.formatMessage({ id: "AbpIdentity:DisplayName:CurrentPassword" })} rules={[{ required: true, message: "密码必须填写" }]}>
                        <Input type="password" placeholder={intl.formatMessage({ id: "AbpIdentity:DisplayName:Password" })} />
                    </FormItem>

                    <FormItem name={"newPassword"} label={intl.formatMessage({ id: "AbpIdentity:DisplayName:NewPassword" })} rules={[{ required: true, message: "密码必须填写" }]}>
                        <Input type="password" placeholder={intl.formatMessage({ id: "AbpIdentity:DisplayName:Password" })} />
                    </FormItem>

                    <FormItem name={"newPasswordConfirm"} label={intl.formatMessage({ id: "AbpIdentity:DisplayName:NewPasswordConfirm" })} rules={[{ validator: checkPassword }]}>
                        <Input type="password" placeholder={intl.formatMessage({ id: "AbpIdentity:DisplayName:NewPasswordConfirm" })} />
                    </FormItem>

                </Form>

                <Button type="primary" onClick={() => { props.onSave && props.onSave(); }}>{intl.formatMessage({ id: "AbpUi:Save" })}</Button>
            </div>
        </div>
    );
}

export default ChangePassword;
