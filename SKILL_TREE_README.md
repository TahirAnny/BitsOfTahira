# Force-Directed Skill Tree Component

A beautiful, interactive force-directed skill tree visualization built with React and D3.js, featuring floating animations, category-based coloring, and smooth interactions.

## 🚀 Features

### Core Functionality
- **Force-Directed Layout**: Physics-based node positioning using D3.js force simulation
- **Floating Animations**: Continuous floating and bouncing animations for all nodes
- **Interactive Nodes**: Clickable and hoverable nodes with detailed tooltips
- **Zoom & Pan**: Smooth zoom and drag interactions
- **Responsive Design**: Works perfectly on all device sizes
- **Dark Mode Support**: Seamless dark/light theme integration

### Visual Design
- **Category Colors**: Each skill category has its own color scheme
- **Node Icons**: Emoji icons for each skill for visual appeal
- **Smooth Transitions**: Framer Motion animations for UI interactions
- **Professional Styling**: Clean, modern design with TailwindCSS

### Data Structure
- **Hierarchical Data**: Tree structure with categories and skills
- **Rich Metadata**: Experience levels, years of practice, and skill icons
- **Extensible**: Easy to add new categories and skills

## 📦 Installation

The component uses the following dependencies (already included in your project):

```json
{
  "d3": "^7.9.0",
  "d3-force": "^3.0.0",
  "d3-hierarchy": "^3.1.2",
  "framer-motion": "^10.18.0",
  "react-icons": "^4.12.0"
}
```

## 🎯 Usage

### Basic Implementation

```jsx
import SkillTree from './components/SkillTree';

function App() {
  return (
    <div className="w-full h-screen">
      <SkillTree />
    </div>
  );
}
```

### With Toggle View (as in Skills.js)

```jsx
import React, { useState } from 'react';
import SkillTree from './components/SkillTree';

const Skills = () => {
  const [viewMode, setViewMode] = useState('tree');

  return (
    <section id="skills">
      {/* View Mode Toggle */}
      <div className="flex justify-center space-x-4 mb-8">
        <button onClick={() => setViewMode('tree')}>
          Interactive Tree
        </button>
        <button onClick={() => setViewMode('list')}>
          List View
        </button>
      </div>

      {/* Skill Tree View */}
      {viewMode === 'tree' && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
          <SkillTree />
        </div>
      )}

      {/* Traditional List View */}
      {viewMode === 'list' && (
        <div>Your existing skills list</div>
      )}
    </section>
  );
};
```

## 📊 Data Structure

The component expects data in this hierarchical format:

```javascript
const data = {
  name: "Tech Stack",
  children: [
    {
      name: "Frontend",
      category: "frontend",
      color: "#3B82F6",
      children: [
        { 
          name: "React", 
          level: 90, 
          years: 3, 
          icon: "⚛️" 
        },
        // ... more skills
      ]
    },
    // ... more categories
  ]
};
```

### Node Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Skill or category name |
| `category` | string | Category identifier |
| `color` | string | Hex color for the category |
| `level` | number | Skill proficiency (0-100) |
| `years` | number | Years of experience |
| `icon` | string | Emoji or text icon |
| `children` | array | Sub-skills or categories |

## 🎨 Customization

### Colors
Each category has its own color scheme:
- **Frontend**: Blue (#3B82F6)
- **Backend**: Green (#10B981)
- **Database & Cloud**: Purple (#8B5CF6)
- **Mobile Development**: Orange (#F59E0B)
- **Tools & Others**: Red (#EF4444)
- **Soft Skills**: Cyan (#06B6D4)

### Animations
The floating animation can be customized by modifying these properties in the `useEffect`:

```javascript
node.floatOffset = Math.random() * Math.PI * 2;  // Random starting position
node.floatSpeed = 0.5 + Math.random() * 0.5;     // Animation speed
node.floatRadius = 5 + Math.random() * 10;       // Float radius
```

### Force Simulation
Adjust the physics simulation parameters:

```javascript
const simulation = d3.forceSimulation(nodes)
  .force("link", d3.forceLink(links).id(d => d.id).distance(100))  // Link distance
  .force("charge", d3.forceManyBody().strength(-300))              // Repulsion strength
  .force("center", d3.forceCenter(width / 2, height / 2))          // Center position
  .force("collision", d3.forceCollide().radius(30));               // Collision radius
```

## 🎮 Interactions

### Mouse Interactions
- **Hover**: Shows detailed tooltip with skill information
- **Click**: Selects the node (with visual feedback)
- **Drag**: Moves nodes around the canvas
- **Scroll**: Zooms in/out of the visualization

### Touch Interactions (Mobile)
- **Tap**: Same as click
- **Pinch**: Zoom in/out
- **Pan**: Move around the canvas

## 📱 Responsive Design

The component automatically adapts to different screen sizes:

- **Desktop**: Full interactive experience with all features
- **Tablet**: Optimized touch interactions
- **Mobile**: Simplified interactions with larger touch targets

## 🌙 Dark Mode

The component automatically adapts to dark mode using TailwindCSS classes:

```css
/* Light mode */
.bg-white
.text-gray-900

/* Dark mode */
.dark:bg-gray-800
.dark:text-white
```

## 🔧 Performance Optimization

- **Efficient Rendering**: Uses D3.js for optimized SVG rendering
- **Smooth Animations**: 60fps animations with requestAnimationFrame
- **Memory Management**: Proper cleanup of event listeners and simulations
- **Responsive Updates**: Debounced window resize handling

## 🐛 Troubleshooting

### Common Issues

1. **Nodes not appearing**: Check if D3.js is properly imported
2. **Animations not smooth**: Ensure the component has sufficient space
3. **Tooltips not showing**: Check z-index and positioning
4. **Performance issues**: Reduce the number of nodes or animation complexity

### Browser Compatibility

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## 📄 License

This component is part of your portfolio project and follows the same MIT license.

## 🤝 Contributing

To enhance the skill tree component:

1. Fork the repository
2. Create a feature branch
3. Make your improvements
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you need help with the skill tree component, feel free to reach out:
- Email: tahirabishwas@gmail.com
- GitHub: [Tahira](https://github.com/TahirAnny)

---

Made with ❤️ using React, D3.js, and Framer Motion 