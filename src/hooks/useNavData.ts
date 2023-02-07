import { useNavData as originUseNavData } from 'dumi';
import { Nav } from '../type';

export const useNavData = (): Nav => {
  const originNavData = originUseNavData();

  return originNavData;
};
