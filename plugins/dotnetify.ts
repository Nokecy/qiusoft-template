import { Mustache } from '@umijs/utils';
import { join } from 'path';
import { IApi } from 'umi';
import { withTmpPath } from './withTmpPath';

export default (api: IApi) => {
    api.describe({
        key: "dotnetify",
        config: {
            schema(joi) {
                return joi.object();
            },
        },
        enableBy: api.EnableBy.config,
    });

    api.onGenerateFiles(async () => {
        // runtime.tsx
        api.writeTmpFile({
            path: 'runtime.tsx',
            content: `
            import React, { useEffect } from 'react';
            import { useModel } from '@@/plugin-model';
            import { useConnect } from "dotnetify";
            import { notification } from "antd";
  function Provider(props) {
    const { initialState } = useModel('@@initialState');
    const { loadNotifications } = useModel('useNotificationModel');
    const { vm, state, setState } = useConnect<any>("SignalRNotifierVM");

    useEffect(() => {
        if (!initialState?.isLogin) { return; }

        const correlationId = initialState.configuration.currentUser.id;

        if (vm && !state.Users.some(x => x.CorrelationId === correlationId)) {
            vm.$dispatch({ AddUser: correlationId });
        }

        if (state.NewNotification) {
            let otificationData = state.NewNotification.Notification.Data;

            console.log("SignalRNotifierVM: New notification", state);
      
            loadNotifications();
      
            notification.info({ message: otificationData.Message });
        }
    }, [initialState, state]);

    useEffect(() => {
        return () => vm?.$dispatch({ RemoveUser: null });
    }, []);

    return (
      <>
        { props.children }
      </>
    );
  }
  export function innerProvider(container) {
    return <Provider>{ container }</Provider>;
  }
        `,
        });

        // dotnetifyGlobal.tsx
        api.writeTmpFile({
            path: 'dotnetifyGlobal.tsx',
            content: `
            import React from "react";
import dotnetify from "dotnetify";
import { getPluginManager } from '../core/plugin';
dotnetify.hubServerUrl = "${api.config.dotnetify.hubServerUrl}";
              `,
        });
    });

    api.addRuntimePlugin(() => {
        return [withTmpPath({ api, path: 'runtime.tsx' })];
    });
    api.addEntryImportsAhead(() => {
        return [
            {
                source: withTmpPath({ api, path: 'dotnetifyGlobal.tsx' })
            },
        ]
    })
};