import { useRef, useState, useEffect } from 'react';
import { useLatest } from 'ahooks';

type QueueType<T = any> = (...arg: any[]) => Promise<T>;

const usePromiseQueue = <T = any, E = any>() => {
    const doing = useRef(false);
    const [result, setResult] = useState<T[]>([]);
    const [errors, setErrors] = useState<E[]>([]);
    const [queue, setQueue] = useState<QueueType<T>[]>([]);
    const lastQueue = useLatest<typeof queue>(queue);

    const addQueue = (fn) => {
        setQueue([...lastQueue.current, fn]);
    };

    useEffect(() => {
        const currentQueue = lastQueue.current;

        if (currentQueue.length && !doing.current) {
            const fn = currentQueue[0];

            fn()
                .then((res) => {
                    setResult([...result, res]);
                })
                .catch((err) => {
                    setErrors([...errors, err]);
                })
                .finally(() => {
                    doing.current = false;
                    lastQueue.current.shift();
                    setQueue([...lastQueue.current]);
                });
            doing.current = true;
        }
    }, [queue]);

    return { result, errors, queue, addQueue };
};

export default usePromiseQueue;