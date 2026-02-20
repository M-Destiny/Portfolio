import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  ssr: {
    noExternal: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing']
  }
})
