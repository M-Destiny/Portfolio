# 🚀 Portfolio

A premium, award-winning 3D portfolio website showcasing my work as a Full Stack Developer.

![Portfolio](https://img.shields.io/badge/Made%20with-React%20Three%20Fiber-purple)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)

## ✨ Features

- **Immersive 3D Hero** - Animated floating shapes with post-processing effects
- **Glass Morphism** - Modern frosted glass UI elements
- **Smooth Animations** - Framer Motion throughout
- **Auto-fetched Projects** - GitHub API integration
- **Fully Responsive** - Works on all devices
- **Performance Optimized** - 60fps target

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript + Vite
- **3D:** Three.js, React Three Fiber, @react-three/drei
- **Post-processing:** @react-three/postprocessing
- **Animation:** Framer Motion
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

## 🚀 Live Demo

**[portfolio-m-destiny.vercel.app](https://portfolio-m-destiny.vercel.app)**

## 🏗️ Architecture

```
src/
├── components/
│   └── 3d/
│       └── HeroScene.tsx    # 3D hero with particles & effects
├── App.tsx                 # Main app with all sections
├── index.css              # Global styles & animations
└── main.tsx              # Entry point
```

## 🧑‍💻 Sections

1. **Hero** - 3D animated scene with floating objects
2. **About** - Bio & stats
3. **Work** - GitHub projects (auto-fetched)
4. **Skills** - Tech stack
5. **Contact** - Social links & CTA

## 🔧 Setup

```bash
# Install dependencies
npm install

# Development
npm run dev

# Build
npm run build
```

## 🌿 Branches

- `main` - Production
- `dev` - Development

## 📝 Development Workflow

1. Create feature branch from `dev`
2. Make changes
3. Push and create PR
4. Merge to `dev` → test
5. Merge `dev` to `main` for production

## 🔐 License

MIT

---

Built with 💜 using React Three Fiber & Framer Motion
