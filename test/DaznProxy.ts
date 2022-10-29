import { IDazn } from '../src/types/dazn';

/**
 * @deprecated This method has been deprecated, instead, aim for mocking an
 * intermediate function that changes or gets values from the DAZN object.
 */
export const proxyDazn = <R extends Record<string, unknown>>(
    receiverProp: keyof R,
    receiver: R,
): void => {
    const daznProxyHandler: ProxyHandler<IDazn> = {
        get(target, prop) {
            if (prop === receiverProp) {
                return Reflect.get(target, prop);
            }

            return daznProxy;
        },

        set(...args): boolean {
            const [, prop, value] = args;

            if (prop === receiverProp) {
                receiver[receiverProp] = value;
            }

            return Reflect.set(...args);
        },
    };

    const dazn = {} as IDazn;
    const daznProxy = new Proxy<IDazn>(dazn, daznProxyHandler);

    window.dazn = daznProxy;
};
