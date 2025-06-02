import manifest from './manifest';

export default {
  ...manifest,
};
export const useManifest = () => {
  return {
    ...manifest,
  };
};
