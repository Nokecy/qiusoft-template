import { LanguageCreateAsync, LanguageGetAsync, LanguageUpdateAsync, LanguageGetCulturelistAsync } from '@/services/openApi/Language';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit, onFieldValueChange } from '@formily/core';
import { isField } from '@formily/core';
import { Button } from "antd";
import { useFormSchema, useSchemaField } from "umi";
import React, { } from "react";
import { formId, formSchema } from "./schema";

const LanguageFormDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit } = props;

    const schema = useFormSchema(formId, formSchema);

    const SchemaField = useSchemaField({});

    const formProps = {
        effects: () => {
            let cultureListCache: any[] = [];

            onFormInit(async (form) => {
                // 加载文化列表
                const cultureList = await LanguageGetCulturelistAsync({});
                cultureListCache = cultureList || [];
                const cultureOptions = cultureListCache.map(item => ({
                    label: `${item.displayName} (${item.name})`,
                    value: item.name
                })) || [];

                // 设置文化名称和UI文化名称的数据源
                const cultureNameField = form.query('cultureName').take();
                if (isField(cultureNameField)) {
                    cultureNameField.setDataSource(cultureOptions);
                }

                const uiCultureNameField = form.query('uiCultureName').take();
                if (isField(uiCultureNameField)) {
                    uiCultureNameField.setDataSource(cultureOptions);
                }

                // 如果是编辑模式，加载数据
                if (entityId) {
                    let language = await LanguageGetAsync({ id: entityId });
                    form.setInitialValues(language);
                }
            });

            // 文化名称到国旗图标的映射
            const getFlagIcon = (cultureName: string): string => {
                const cultureToFlag: Record<string, string> = {
                    'zh-CN': '🇨🇳', // 中国
                    'zh-Hans': '🇨🇳',
                    'zh-TW': '🇹🇼', // 台湾
                    'zh-Hant': '🇹🇼',
                    'zh-HK': '🇭🇰', // 香港
                    'en-US': '🇺🇸', // 美国
                    'en-GB': '🇬🇧', // 英国
                    'en': '🇺🇸',
                    'ja-JP': '🇯🇵', // 日本
                    'ja': '🇯🇵',
                    'ko-KR': '🇰🇷', // 韩国
                    'ko': '🇰🇷',
                    'fr-FR': '🇫🇷', // 法国
                    'fr': '🇫🇷',
                    'de-DE': '🇩🇪', // 德国
                    'de': '🇩🇪',
                    'es-ES': '🇪🇸', // 西班牙
                    'es': '🇪🇸',
                    'it-IT': '🇮🇹', // 意大利
                    'it': '🇮🇹',
                    'pt-BR': '🇧🇷', // 巴西
                    'pt-PT': '🇵🇹', // 葡萄牙
                    'pt': '🇵🇹',
                    'ru-RU': '🇷🇺', // 俄罗斯
                    'ru': '🇷🇺',
                    'ar-SA': '🇸🇦', // 沙特阿拉伯
                    'ar': '🇸🇦',
                    'th-TH': '🇹🇭', // 泰国
                    'th': '🇹🇭',
                    'vi-VN': '🇻🇳', // 越南
                    'vi': '🇻🇳',
                    'id-ID': '🇮🇩', // 印度尼西亚
                    'id': '🇮🇩',
                    'tr-TR': '🇹🇷', // 土耳其
                    'tr': '🇹🇷',
                    'nl-NL': '🇳🇱', // 荷兰
                    'nl': '🇳🇱',
                    'pl-PL': '🇵🇱', // 波兰
                    'pl': '🇵🇱'
                };

                // 精确匹配
                if (cultureToFlag[cultureName]) {
                    return cultureToFlag[cultureName];
                }

                // 尝试匹配语言代码(前两位)
                const langCode = cultureName.split('-')[0];
                return cultureToFlag[langCode] || '';
            };

            // 监听文化名称变化,自动填充显示名称和国旗图标
            onFieldValueChange('cultureName', (field) => {
                const selectedCulture = cultureListCache.find(c => c.name === field.value);
                if (selectedCulture) {
                    // 自动填充显示名称
                    const displayNameField = field.query('displayName').take();
                    if (isField(displayNameField) && !displayNameField.value) {
                        displayNameField.setValue(selectedCulture.displayName);
                    }

                    // 自动填充国旗图标
                    const flagIconField = field.query('flagIcon').take();
                    if (isField(flagIconField)) {
                        const flagIcon = getFlagIcon(field.value);
                        if (flagIcon) {
                            flagIconField.setValue(flagIcon);
                        }
                    }
                }
            });
        }
    };

    const portalId = `language${entityId}`


    return (<FormDialog.Portal id={portalId}>
        <Button type={"primary"} onClick={async () => {
            console.log(schema);
            let formDialog = FormDialog({ title: title, width: 960 }, portalId, () => {
                return (
                    <FormLayout {...schema.form}>
                        <SchemaField schema={schema.schema}></SchemaField>
                    </FormLayout>)
            });

            formDialog
                .forConfirm((payload, next) => {
                    let values: any = payload.values;
                    if (!values.id) {
                        return LanguageCreateAsync(values).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
                    } else {
                        return LanguageUpdateAsync({ id: values.id }, values).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
                    }
                })
                .open(formProps);
        }}
            {...buttonProps}
        >
            {props.children}
        </Button>
    </FormDialog.Portal>
    );
}

export default LanguageFormDialog