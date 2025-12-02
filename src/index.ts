import lib from './lib';
import { IManifest, IMimeType } from './lib/manifest';

namespace kmManifest {
  export const make = lib.makeManifest;
  export type IManifestConfig<MIME_TYPE extends string> = IManifest<MIME_TYPE>;
  export type IDefaultMimeType = IMimeType;
}

export default kmManifest;
