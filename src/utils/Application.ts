import packageJson from '../../package.json';

export const getApplicationName = (): string => packageJson.name;
