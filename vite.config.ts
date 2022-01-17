import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      beforeWriteFile(filePath, content){
        return {
          filePath: filePath.replace(`${distPath}/src`, distPath),
          content,
        };
      },
    }),
  ],
  resolve: {
    alias: {
      '@': srcPath,
    },
  },
  build: {
    lib: {
      entry: `${srcPath}/index.tsx`,
      name: 'react-magic-scroll',
      fileName: (format) => `react-magic-scroll.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['react'],
    },
  },
  server: {
    port: 3001,
  },
});
