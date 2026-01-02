import { Form, FormItem, Input, Select } from "@formily/antd-v5";
import { createForm, onFormInit } from "@formily/core";
import { Field, ObjectField } from "@formily/react";
import { Button } from "antd";
import { ProfileUpdateAsync } from '@/services/openApi/Profile';
import React, { useEffect, useMemo } from "react";
import { useIntl } from "umi";
import styles from "./baseView.less";

const BaseView: React.FC<any> = (props: any) => {
    const { currentUserProfile } = props;
    const intl = useIntl();

    const form = useMemo(() => createForm({}), []);

    useEffect(() => {
        form.setInitialValues(currentUserProfile);
    }, [currentUserProfile]);

    const handleSave = () => {
        return form.submit((values) => ProfileUpdateAsync(values)).then(() => { props.onSave && props.onSave(); }, () => { });
    }

    return (
        <div className={styles.baseView}>
            <div className={styles.left}>
                <Form form={form} layout={"horizontal"} labelWidth={110} feedbackLayout={"terse"}>
                    <Field name={"name"} title={"姓名"} component={[Input]} decorator={[FormItem]} />
                    <Field name={"userName"} title={"登录名称"} component={[Input]} decorator={[FormItem]} readPretty />
                    <Field name={"email"} title={"电子邮箱"} component={[Input]} decorator={[FormItem]} />
                    <Field name={"phoneNumber"} title={"手机号码"} component={[Input]} decorator={[FormItem]} />

                    <ObjectField name={"extraProperties"}>

                        <Field name={"Sex"} required title={"性别"} component={[Select]} decorator={[FormItem]} dataSource={[{ value: 0, label: "男" }, { value: 1, label: "女" }]} />

                        <Field name={"InternalEmail"} title={"内部邮箱"} component={[Input, { placeholder: "请输入内部邮箱" }]} decorator={[FormItem]} />
                    </ObjectField>

                    <Button type="primary" onClick={handleSave}>{intl.formatMessage({ id: "AbpUi:Save" })}</Button>
                </Form>
            </div>
        </div>
    );
}
export default BaseView;
