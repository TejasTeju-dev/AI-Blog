# NeuralPulse - Modern AI Blog Platform

A sleek, modern blog platform focused on Artificial Intelligence, built with Next.js 13+, React, and Three.js. Features an innovative 3D neural network visualization background and dynamic content management.

## ✨ Key Features

- **Interactive 3D Background**
  - Neural network visualization with animated spheres
  - Dynamic particle system
  - Responsive WebGL rendering
  
- **Modern Blog Features**
  - Responsive dark theme design
  - Server-side rendering for optimal performance
  - Category-based article organization
  - Featured posts carousel
  - Newsletter integration
  - Social sharing capabilities

- **Technical Stack**
  - Next.js 13+ with App Router
  - React 18 with Server Components
  - Three.js with React Three Fiber
  - TypeScript for type safety
  - Tailwind CSS for styling

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/neural-pulse.git
   cd neural-pulse
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
neural-pulse/
├── app/                  # Next.js 13+ app directory
│   ├── blog/            # Blog post pages
│   ├── components/      # Reusable components
│   └── page.tsx         # Home page
├── components/          # Shared components
│   ├── 3d-background/  # Three.js visualization
│   └── ui/             # UI components
├── public/             # Static assets
└── styles/            # Global styles
```

## 🎨 Customization

### Modifying the 3D Background

The neural network visualization can be customized in `components/3d-background.tsx`:
- Adjust particle count and properties
- Modify sphere colors and animations
- Change network node positions

### Theme Configuration

Update the theme in `tailwind.config.js` to match your brand colors.

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Acknowledgments

- Three.js for 3D visualization
- Next.js team for the awesome framework
- React Three Fiber for making Three.js integration seamless

## 📮 Contact

Project Link: [https://github.com/TejasTeju-dev/AI-Blog](https://github.com/TejasTeju-dev/AI-Blog)