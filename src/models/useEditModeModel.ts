// 编辑模式全局状态管理
import { useState, useCallback } from 'react';

export default function Page() {
    const [editModeState, setEditModeState] = useState(false);

    const updateEditModeState = useCallback(() => {
        return setEditModeState((c) => {
            return !c
        })
    }, []);


    return { editModeState, updateEditModeState };
};