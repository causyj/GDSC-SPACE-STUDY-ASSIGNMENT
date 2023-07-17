import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// 더 많은 옵션을 보고 싶으면 -> https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
    },
})
