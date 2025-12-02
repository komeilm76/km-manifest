import lib from './lib';
import { IManifest, IMimeType } from './lib/manifest';

export namespace kmManifest {
  export const make = lib.makeManifest;
  export type IManifestConfig = IManifest;
  export type IDefaultMimeType = IMimeType;
}
