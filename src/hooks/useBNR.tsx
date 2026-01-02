import { useEffect, useState } from 'react';

const useBNR = (rule, generate) => {
    const [bnrString, setBnrString] = useState<string>("");

    useEffect(() => {
        if (generate) {
            // ApplicationBNRGet({ rule: rule }).then(types => {
            //     setBnrString(types);
            // })
        }
    }, [rule]);

    return bnrString;
}

export default useBNR;