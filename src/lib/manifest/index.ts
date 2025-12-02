import jetpack from 'fs-jetpack';

type Nothing = {};
type StringLiteralUnion<T extends U, U = string> = T | (U & Nothing);
type IconPurpose = 'monochrome' | 'maskable' | 'any';

export type IMimeType = 'image/svg' | 'image/png' | 'image/jpg';

type IconResource<TYPE> = {
  sizes: string;
  src: string;
  type?: TYPE | IMimeType;
  /**
   * **NOTE**: string values for backward compatibility with the old type.
   */
  purpose?: StringLiteralUnion<IconPurpose> | IconPurpose[];
};

type ScreenShotResource<TYPE> = {
  src: string;
  sizes: string;
  label?: string;
  platform?:
    | 'android'
    | 'ios'
    | 'kaios'
    | 'macos'
    | 'windows'
    | 'windows10x'
    | 'chrome_web_store'
    | 'play'
    | 'itunes'
    | 'microsoft-inbox'
    | 'microsoft-store'
    | string;
  form_factor?: 'narrow' | 'wide';
  type?: TYPE | IMimeType;
};
type Display = 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser';
type DisplayOverride = Display | 'window-controls-overlay';
type ShareTargetFiles = {
  name: string;
  accept: string | string[];
};
type LaunchHandlerClientMode = 'auto' | 'focus-existing' | 'navigate-existing' | 'navigate-new';

export type IManifest<MIME_TYPE extends string> = {
  name: string;
  short_name: string;
  description: string;
  icons: [IconResource<MIME_TYPE>, ...IconResource<MIME_TYPE>[]];
  screenshots: [ScreenShotResource<MIME_TYPE>, ...ScreenShotResource<MIME_TYPE>[]];
  file_handlers: {
    action: string;
    accept: Record<string, string[]>;
  }[];
  start_url: string;
  scope: string;
  id: string;
  orientation:
    | 'any'
    | 'natural'
    | 'landscape'
    | 'landscape-primary'
    | 'landscape-secondary'
    | 'portrait'
    | 'portrait-primary'
    | 'portrait-secondary';
  display: Display;
  display_override: DisplayOverride[];
  background_color: string;
  theme_color: string;
  dir: 'ltr' | 'rtl';
  lang: string;
  publicPath: string;
  related_applications: {
    platform: string;
    url: string;
    id?: string;
  }[];
  prefer_related_applications: boolean;
  protocol_handlers: {
    protocol: string;
    url: string;
  }[];
  shortcuts: {
    name: string;
    short_name?: string;
    url: string;
    description?: string;
    icons?: IconResource<string>[];
  }[];

  categories: string[];
  iarc_rating_id: string;
  share_target: {
    action: string;
    method?: 'GET' | 'POST';
    enctype?: 'application/x-www-form-urlencoded' | 'multipart/form-data';
    params: {
      title?: string;
      text?: string;
      url?: string;
      files?: ShareTargetFiles | ShareTargetFiles[];
    };
  };
  handle_links?: 'auto' | 'preferred' | 'not-preferred';
  launch_handler?: {
    client_mode: LaunchHandlerClientMode | LaunchHandlerClientMode[];
  };
  edge_side_panel?: {
    preferred_width?: number;
  };
  scope_extensions: {
    origin: string;
  }[];
};

const makeConfig = <MIME_TYPE extends string>(
  entryConfig: Partial<IManifest<MIME_TYPE>> &
    Pick<IManifest<MIME_TYPE>, 'name' | 'start_url' | 'display' | 'icons' | 'screenshots'>
) => {
  const config: Partial<IManifest<MIME_TYPE>> = {
    name: 'km-pwa',
    short_name: 'km-pwa',
    description: 'km-pwa-description',
    file_handlers: [],
    orientation: 'any',
    display: 'standalone',
    display_override: [],
    background_color: '#ffffff',
    theme_color: '#42b883',
    dir: 'ltr',
    lang: 'en',
    related_applications: [],
    prefer_related_applications: false,
    protocol_handlers: [],
    shortcuts: [],
    categories: [],
    iarc_rating_id: '',
    share_target: {
      action: '',
      method: 'GET',
      enctype: 'application/x-www-form-urlencoded',
      params: {
        title: undefined,
        text: undefined,
        url: undefined,
        files: undefined,
      },
    },
    scope_extensions: [],
    id: '/manifest.json',
  };
  return { ...config, ...entryConfig };
};

// // @ts-ignore
// const makeFile = <MIME_TYPE extends string>(
//   config: ReturnType<typeof makeConfig<MIME_TYPE>>,
//   options: { path: string }
// ) => {
//   if (options.path.startsWith('/')) {
//     options.path = `.${options.path}`;
//   }
//   // const fileName = config.id?.startsWith('/')
//   //   ? config.id.substring(1)
//   //   : config.id ?? 'manifest.json';
//   const filePath = jetpack.cwd(options.path);
//   const isExist = filePath.exists('manifest.json');
//   if (isExist) {
//   }
//   filePath.write('manifest.json', config, {});
//   return {};
// };

const makeManifest = <MIME_TYPE extends string>(
  entryConfig: ReturnType<typeof makeConfig<MIME_TYPE>>
) => {
  const config = makeConfig(entryConfig);
  return {
    // jsonFile: (options: { path: string }) => {
    //   makeFile(config, options);
    // },
    object: () => {
      return config;
    },
    json: () => {
      return JSON.stringify(config);
    },
  };
};

export default {
  makeManifest,
};
