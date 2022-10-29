import { DaznEnvironmentKeys } from 'types/dazn/Environment';

export const getEnvironment = (): DaznEnvironmentKeys => window.dazn.environment;
