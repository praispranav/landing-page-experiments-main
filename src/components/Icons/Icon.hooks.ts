import { useEffect, useState } from 'react';

type IconSource = string | null;
interface ModuleVector {
    default: 'string';
}

export const useIcon = (name: string): IconSource | undefined => {
    const [source, setSource] = useState<IconSource>();

    useEffect(() => {
        let isSubscribed = true;
        const vector: Promise<ModuleVector> = import(
            /* webpackChunkName: "vector-[request]" */
            `./Vectors/${name}.svg`
        );

        const setSubscribedSource = (value: IconSource): void => {
            if (!isSubscribed) {
                return;
            }

            setSource(value);
        };

        vector
            .then((vectorModule) => setSubscribedSource(vectorModule.default))
            .catch((error) => setSubscribedSource(error));

        return (): void => {
            isSubscribed = false;
        };
    }, [name]);

    return source;
};
