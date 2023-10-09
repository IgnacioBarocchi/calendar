import { defineConfig } from 'vite';
// import million from 'million/compiler';
// import million from 'million/compiler';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  // plugins: [react(), million.vite()],
  plugins: [react()],
});
