import { defineConfig } from '@rsbuild/core';
import { pluginVue2 } from '@rsbuild/plugin-vue2';
import { pluginBabel } from '@rsbuild/plugin-babel';

export default defineConfig({
  plugins: [pluginVue2(),
  pluginBabel({
    include: /node_modules/,
    babelLoaderOptions: (config) => {
      console.log("this si the config ", config)
      config.presets ||= [];
      // Ensure the plugins array exists
      config.plugins ||= [];
      // Add component plugin for webmd-elements
      config.plugins.push([
        'component',
        {
          libraryName: "element-ui",
          styleLibraryName: "theme-chalk"
        }
      ]);

      // Add Babel plugin for transform runtime
      config.plugins.push([
        '@babel/plugin-transform-runtime',
        {
          regenerator: true,
        },
      ]);

      return config;
    }
  })
],

source:{
  include: [/node_modules/],
        transformImport: [
          {
            libraryName: "element-ui",
            style: true,
            customStyleName : `element-ui/lib/theme-chalk/{{ kebabCase member }}.css`
          }
        ]
}
});