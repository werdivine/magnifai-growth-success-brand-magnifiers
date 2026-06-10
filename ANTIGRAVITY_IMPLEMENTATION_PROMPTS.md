# Google Antigravity IDE Implementation Prompts
## Comprehensive Prompts for Premium Animated Website Transformation

---

## Master Implementation Prompt

### Phase 1: Foundation Setup

```
You are an expert frontend developer specializing in premium animated websites using Google Antigravity IDE techniques. 

Your task is to transform the current MagnifAI Growth Success website into a Apple-style animated experience with the following requirements:

## Technology Stack
- Next.js 14 with App Router
- TypeScript with strict mode
- CSS Modules with design tokens
- Framer Motion for animations
- Custom canvas-based scroll sequences
- Lenis for smooth scrolling

## Core Animation Components to Build

1. CanvasScrollSequence - A component that renders image sequences based on scroll progress
2. ScrollTrigger - A component that triggers animations when sections enter viewport
3. MagneticButton - Buttons that follow cursor with magnetic effect
4. TravelingElement - Elements that move across sections as user scrolls
5. ParallaxContainer - Container with depth-based parallax effects
6. PerformanceMonitor - System to monitor and optimize animation performance

## Implementation Approach
1. First, set up the project structure with new animation directories
2. Create the core hooks (useScrollProgress, useFrameLoader, useMagneticEffect)
3. Build the foundational animation components
4. Implement performance optimization utilities
5. Create accessibility utilities for motion preferences
6. Set up global animation configuration

Please start by implementing the foundation setup and core components. Focus on clean, reusable code with proper TypeScript types and performance optimization.
```

---

## Component-Specific Prompts

### Hero Section Animation Prompt

```
Create a premium animated hero section for the MagnifAI Growth Success website using canvas-driven scroll sequences.

## Requirements

### Visual Design
- Apple product launch aesthetic
- Deep space theme with cyan and violet accent colors
- Smooth, cinematic transitions
- 60-frame animation sequence showing growth engine visualization

### Animation Sequence (60 frames)
1. Frame 1-20: Abstract network nodes connecting and glowing
2. Frame 21-40: Data streams flowing between nodes, accelerating
3. Frame 41-60: Complete system with pulsing core and satellite elements

### Component Structure
```typescript
// src/components/hero/AnimatedHero.tsx
- CanvasScrollSequence for main animation
- TravelingElement for terminal demo
- MagneticButton for CTAs
- FadeIn text overlays
```

### Performance Requirements
- Preload first 10 frames immediately
- Lazy load remaining frames
- 60fps target on desktop
- 30fps minimum on mobile
- Memory limit: 50MB max

### Accessibility
- Respect prefers-reduced-motion
- Provide static fallback
- Keyboard navigable
- Screen reader friendly

### Content
- Badge: "v2.0.0 Now Live"
- Headline: "The Growth Engine For Scaling Agencies"
- Description: "Stop relying on luck. We build automated AI pipelines..."
- CTA 1: "Start Growth Engine" (primary, magnetic)
- CTA 2: "View System Architecture" (secondary, magnetic)
- Traveling TerminalDemo component

Please implement this hero section with all the specified animations and interactions.
```

### Architecture Section Animation Prompt

```
Create an animated architecture section with scroll-triggered bento grid animations.

## Requirements

### Visual Design
- Clean isometric 3D aesthetic
- Soft shadows and depth
- Pastel accent colors
- Smooth materialization animations

### Animation Behavior
- Bento items animate in sequence as user scrolls
- Each item has unique animation (slide-left, scale-up, fade-in, rotate)
- 3D tilt effect on hover
- Magnetic interaction on cards

### Component Structure
```typescript
// src/components/sections/AnimatedArchitecture.tsx
- ScrollTrigger wrapper for section
- Animated BentoGrid with staggered item animations
- 3D card tilt effects
- Icon animations
```

### Animation Timing
- Section enters viewport at 30% scroll
- Items animate with 100ms stagger
- Hover effects: 300ms transition
- Scroll-triggered: ease-out cubic-bezier

### Content Items
1. AI Agents Swarm (span 2, slide-left animation)
2. Visual Intelligence (scale-up animation)
3. Global CDN (fade-in animation)
4. Data Lake (span 2, rotate animation)

### Performance
- Intersection Observer for scroll detection
- GPU-accelerated transforms
- Will-change optimizations
- RequestAnimationFrame for smooth updates

Please implement this animated architecture section with all specified behaviors.
```

### Telegram Growth Engine Animation Prompt

```
Create an animated Telegram Growth Engine section with dynamic stats and traveling elements.

## Requirements

### Visual Design
- Modern data visualization aesthetic
- Animated charts and graphs
- Clean typography
- Telegram brand colors (blue)

### Animation Features
1. Canvas-based background animation (40 frames)
2. Animated stat counters that count up
3. Traveling element that moves across section
4. Feature cards with staggered entrance

### Component Structure
```typescript
// src/components/sections/AnimatedTelegram.tsx
- CanvasScrollSequence for background
- StatsCounter component for animated numbers
- TravelingElement for movement
- ScrollTrigger for feature cards
```

### Animation Sequence (40 frames)
1. Frame 1-10: Telegram icon particles gather
2. Frame 11-20: Network graph builds up
3. Frame 21-30: Data points flow and accumulate
4. Frame 31-40: Stats counters animate with numbers

### Stats to Animate
- Groups: 47
- Leads: 1,284
- DMs: 612
- Pipeline: £142,000

### Features Grid
- AI Group Discovery
- GPT-4o Content Engine
- Lead Scoring
- 3-Step DM Sequences

### Interaction Design
- Hover effects on stat cards
- Magnetic buttons
- Smooth scroll to related sections
- Parallax depth on cards

Please implement this animated Telegram section with all specified features.
```

### Resource Hub Animation Prompt

```
Create an animated Resource Hub section with magnetic 3D card effects.

## Requirements

### Visual Design
- Card-based grid layout
- 3D tilt on hover
- Magnetic cursor following
- Smooth transition effects

### Animation Features
1. Cards tilt in 3D space based on cursor position
2. Magnetic effect pulls cards toward cursor
3. Staggered entrance animations
4. Glow effects on hover

### Component Structure
```typescript
// src/components/sections/AnimatedResources.tsx
- MagneticCard wrapper component
- 3D tilt calculation
- Magnetic force calculation
- Smooth spring animations
```

### Card Content
1. 📖 PLAYBOOK - B2B Growth System 2026
2. 📊 CALCULATOR - Growth ROI Calculator
3. ⚡ GUIDE - AI Search Optimisation Checklist

### Interaction Design
- Tilt strength: 15 degrees max
- Magnetic strength: 0.3
- Spring stiffness: 300
- Damping ratio: 25
- Transition duration: 300ms

### Performance
- GPU-accelerated transforms
- RequestAnimationFrame for updates
- Debounce resize events
- Optimize for touch devices

### Accessibility
- Reduce motion preference respected
- Keyboard focus visible
- Screen reader announcements
- Touch-friendly tap targets

Please implement this animated Resource Hub section with all specified interactions.
```

---

## Performance Optimization Prompts

### Frame Optimization Prompt

```
Create a comprehensive frame optimization system for canvas-based animations.

## Requirements

### Features
1. Intelligent frame caching
2. Batch loading strategy
3. Quality adaptation based on device
4. Memory management
5. Progressive loading

### Component Structure
```typescript
// src/utils/frameOptimizer.ts
class FrameOptimizer {
  - Singleton pattern
  - Frame cache management
  - Loading promise management
  - Quality adaptation
  - Memory monitoring
}
```

### Optimization Strategies
1. Load frames in batches of 5
2. Cache loaded frames in memory
3. Adapt quality based on device capabilities
4. Implement LRU cache eviction
5. Provide progress callbacks

### Device Detection
- Hardware concurrency check
- Device memory detection
- Frame rate monitoring
- Battery status consideration
- Network condition awareness

### Quality Levels
- High: 60 frames, 4K resolution, full quality
- Medium: 40 frames, 1080p resolution, 80% quality
- Low: 20 frames, 720p resolution, 60% quality

### Memory Management
- Max 50MB memory usage
- Automatic cache eviction
- Explicit cache clearing API
- Memory pressure event handling

Please implement this frame optimization system with all specified features.
```

### Performance Monitoring Prompt

```
Create a performance monitoring system for animations.

## Requirements

### Features
1. Real-time frame rate monitoring
2. Device capability detection
3. Performance score calculation
4. Adaptive quality adjustment
5. Performance reporting

### Component Structure
```typescript
// src/utils/performanceMonitor.ts
class PerformanceMonitor {
  - Frame rate measurement
  - Device capability detection
  - Performance scoring
  - Quality adjustment
  - Reporting interface
}
```

### Metrics to Track
1. Frame rate (FPS)
2. Frame time (ms)
3. Memory usage (MB)
4. CPU usage (%)
5. GPU usage (%)
6. Network latency (ms)

### Device Categories
- High-end: 8+ cores, 16GB+ RAM, dedicated GPU
- Mid-range: 4-8 cores, 8-16GB RAM, integrated GPU
- Low-end: <4 cores, <8GB RAM, basic GPU

### Adaptive Behavior
1. Reduce frame count if FPS < 30
2. Lower quality if memory > 40MB
3. Enable lazy loading on low-end
4. Disable complex animations on mobile
5. Provide performance fallbacks

### Reporting
- Console logging (development)
- Performance API integration
- Custom analytics events
- User feedback collection
- A/B testing support

Please implement this performance monitoring system with all specified features.
```

---

## Asset Generation Prompts

### Hero Animation Asset Generation Prompt

```
Generate a 60-frame animation sequence for the hero section using AI tools.

## Visual Requirements

### Style
- Apple product launch aesthetic
- Deep space theme
- Cyan (#22d3ee) and violet (#8b5cf6) accent colors
- Smooth gradients
- 4K resolution (3840x2160)
- Consistent lighting throughout

### Animation Breakdown

#### Phase 1: Network Emergence (Frames 1-20)
- Frame 1-5: Dark void with subtle cyan particles
- Frame 6-10: Network nodes begin to appear
- Frame 11-15: Nodes start connecting with lines
- Frame 16-20: Initial network structure forms

#### Phase 2: Data Flow (Frames 21-40)
- Frame 21-25: Data streams begin flowing
- Frame 26-30: Streams accelerate and multiply
- Frame 31-35: Network complexity increases
- Frame 36-40: 3D depth emerges in the visualization

#### Phase 3: System Activation (Frames 41-60)
- Frame 41-45: Central core activates
- Frame 46-50: Pulsing glow effect begins
- Frame 51-55: Satellite elements materialize
- Frame 56-60: Full system with dynamic lighting

### Technical Specifications
- Output format: WebP
- Quality: 85%
- Frame rate: 24 fps
- Duration: 2.5 seconds
- Color space: sRGB
- Alpha channel: No (solid background)

### AI Generation Prompts

#### For Google Whisk (Image Generation)
```
Create a futuristic growth engine visualization for a tech company website.
Style: Apple product launch aesthetic, deep space theme, cyan and violet accents.
Elements: Network nodes, data streams, glowing core, satellite elements.
Lighting: Soft studio lighting with dynamic highlights.
Resolution: 4K, professional quality.
```

#### For Google Flow (Video Generation)
```
Frame-to-frame transition showing:
1. Network nodes emerging from darkness
2. Data streams flowing between nodes
3. System complexity increasing with 3D depth
4. Core activation with pulsing glow
5. Satellite elements materializing

Motion: Smooth expansion and acceleration
Duration: 2.5 seconds
FPS: 24
Style: Cinematic, premium tech visualization
```

### Post-Processing
1. Convert video to image sequence (24 fps)
2. Optimize each frame to WebP (85% quality)
3. Ensure consistent naming (frame_000.webp to frame_059.webp)
4. Verify color consistency across frames
5. Check for smooth transitions

### Delivery Requirements
- 60 individual WebP files
- Consistent 3840x2160 resolution
- Sequential naming: frame_000.webp through frame_059.webp
- Total size under 15MB
- Smooth frame-to-frame transitions
- Professional quality output

Please generate this animation sequence following all specifications.
```

### Architecture Animation Asset Generation Prompt

```
Generate a 40-frame animation sequence for the architecture section.

## Visual Requirements

### Style
- Clean isometric 3D aesthetic
- Soft shadows
- Pastel accent colors
- Smooth materialization
- 1920x1080 resolution

### Animation Breakdown

#### Phase 1: Grid Foundation (Frames 1-10)
- Frame 1-3: Isometric grid materializes
- Frame 4-7: Grid lines become solid
- Frame 8-10: Grid foundation complete

#### Phase 2: Block Materialization (Frames 11-20)
- Frame 11-14: First bento block appears
- Frame 15-17: Second block materializes
- Frame 18-20: Remaining blocks form

#### Phase 3: Icon Animation (Frames 21-30)
- Frame 21-24: Icons scale in
- Frame 25-27: Icons reach full size
- Frame 28-30: Icons settle into position

#### Phase 4: Connection Flow (Frames 31-40)
- Frame 31-34: Connection lines appear
- Frame 35-37: Data flows between blocks
- Frame 38-40: Complete architecture visualization

### Technical Specifications
- Output format: WebP
- Quality: 80%
- Frame rate: 24 fps
- Duration: 1.67 seconds
- Color space: sRGB

### AI Generation Prompts

#### For Google Whisk
```
Create an isometric 3D architecture diagram for a tech platform.
Style: Clean, modern, soft shadows, pastel colors.
Elements: Bento grid blocks, icons, connection lines.
Perspective: Isometric view, 45-degree angle.
Resolution: 1920x1080, professional quality.
```

#### For Google Flow
```
Frame-to-frame transition showing:
1. Isometric grid materializing
2. Bento blocks appearing one by one
3. Icons scaling into position
4. Connection lines and data flows forming

Motion: Smooth materialization and scaling
Duration: 1.67 seconds
FPS: 24
Style: Clean, professional tech visualization
```

### Delivery Requirements
- 40 individual WebP files
- Consistent 1920x1080 resolution
- Sequential naming: frame_000.webp through frame_039.webp
- Total size under 8MB
- Smooth transitions

Please generate this animation sequence following all specifications.
```

---

## Integration Prompts

### Full Page Integration Prompt

```
Integrate all animated components into the main page with proper coordination.

## Requirements

### Page Structure
1. Animated Hero Section (sticky, full viewport)
2. Premium Tools Band (floating, magnetic)
3. Metrics Strip (animated counters)
4. Animated Architecture Section (scroll-triggered)
5. Problem Section (fade-in)
6. Telegram Growth Engine (canvas + traveling)
7. Resource Hub (magnetic cards)
8. Growth Stack (hover effects)
9. Lead Magnet (CTA animation)
10. Footer (smooth scroll)

### Coordination Requirements
1. Smooth scroll between sections using Lenis
2. Proper z-index management for overlapping elements
3. Performance budget: 60fps on desktop, 30fps on mobile
4. Memory limit: 100MB total
5. Loading priority: Hero first, then sections in viewport

### Scroll Behavior
- Hero section: Sticky for first 100vh
- Tool band: Floats above content
- Architecture: Triggers at 30% viewport
- Telegram: Canvas animation throughout
- Resources: Magnetic cards on hover

### Loading Strategy
1. Critical CSS inline
2. Hero frames preload immediately
3. Other sections lazy load
4. Progressive enhancement
5. Graceful degradation

### Performance Optimization
1. Intersection Observer for scroll detection
2. RequestAnimationFrame for animations
3. GPU acceleration where possible
4. Debounce resize events
5. Optimize paint cycles

### Accessibility
1. Keyboard navigation
2. Screen reader support
3. Focus management
4. ARIA labels
5. Reduced motion support

Please integrate all components with proper coordination and optimization.
```

### Mobile Responsiveness Prompt

```
Optimize all animations for mobile devices.

## Requirements

### Target Devices
- iPhones (12 Pro Max and newer)
- Android flagship devices
- Tablets (iPad Pro, Galaxy Tab)
- Budget smartphones (3GB RAM minimum)

### Mobile Adaptations

#### Hero Section
- Reduce frame count to 30
- Lower canvas resolution to 720p
- Simplify particle effects
- Optimize touch interactions

#### Architecture Section
- Single column layout
- Reduce animation complexity
- Larger tap targets (44px minimum)
- Simplified 3D effects

#### Telegram Section
- Static background on low-end
- Simplified stat animations
- Compact layout
- Touch-optimized interactions

#### Resource Hub
- Single column cards
- Reduced tilt effect
- Larger touch targets
- Simplified magnetic effect

### Performance Targets
- First Contentful Paint: < 2s
- Time to Interactive: < 4s
- Frame rate: 30fps minimum
- Memory usage: < 30MB
- Battery impact: Minimal

### Touch Optimization
1. Prevent default zoom on double-tap
2. Optimize scroll performance
3. Use touch-action CSS property
4. Implement proper touch handlers
5. Avoid hover states on touch

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

Please optimize all animations for mobile devices following these specifications.
```

---

## Testing & Debugging Prompts

### Animation Testing Prompt

```
Create a comprehensive testing suite for all animations.

## Test Coverage

### Unit Tests
1. CanvasScrollSequence component
2. ScrollTrigger component
3. useScrollProgress hook
4. useFrameLoader hook
5. FrameOptimizer class
6. PerformanceMonitor class

### Integration Tests
1. Hero section animation flow
2. Architecture section scroll triggers
3. Telegram section canvas rendering
4. Resource hub magnetic effects
5. Full page scroll coordination

### Performance Tests
1. Frame rate consistency
2. Memory usage monitoring
3. Loading time measurement
4. Battery impact assessment
5. Network condition adaptation

### Accessibility Tests
1. Keyboard navigation
2. Screen reader compatibility
3. Reduced motion preference
4. Focus management
5. ARIA attribute validation

### Cross-Browser Tests
1. Chrome (latest)
2. Firefox (latest)
3. Safari (latest)
4. Edge (latest)
5. Mobile browsers

### Test Scenarios

#### Scenario 1: Normal Scroll
```
1. Load page
2. Scroll from top to bottom
3. Verify all animations trigger correctly
4. Check frame rate consistency
5. Monitor memory usage
```

#### Scenario 2: Fast Scroll
```
1. Load page
2. Scroll rapidly to bottom
3. Verify animations catch up
4. Check for frame drops
5. Verify no memory leaks
```

#### Scenario 3: Reduced Motion
```
1. Enable prefers-reduced-motion
2. Load page
3. Scroll through page
4. Verify animations are disabled
5. Check static fallbacks work
```

#### Scenario 4: Low-End Device
```
1. Simulate low-end device
2. Load page
3. Scroll through page
4. Verify quality adaptation
5. Check performance is acceptable
```

#### Scenario 5: Network Throttling
```
1. Throttle network to 3G
2. Load page
3. Verify progressive loading
4. Check placeholder display
5. Verify all assets load eventually
```

### Automated Testing Setup
```typescript
// tests/animations/CanvasScrollSequence.test.tsx
describe('CanvasScrollSequence', () => {
  it('renders canvas element', () => {});
  it('loads frames correctly', () => {});
  it('updates frame on scroll', () => {});
  it('calls onStart callback', () => {});
  it('calls onComplete callback', () => {});
  it('handles loading errors', () => {});
});
```

### Performance Testing
```typescript
// tests/performance/animationPerformance.test.ts
describe('Animation Performance', () => {
  it('maintains 60fps on desktop', () => {});
  it('maintains 30fps on mobile', () => {});
  it('stays under 50MB memory', () => {});
  it('loads within 3 seconds', () => {});
  it('has minimal battery impact', () => {});
});
```

Please create a comprehensive testing suite covering all these scenarios.
```

### Debugging Tools Prompt

```
Create debugging tools for animation development and troubleshooting.

## Requirements

### Debug Panel Component
```typescript
// src/components/debug/AnimationDebugPanel.tsx
interface DebugPanelProps {
  showFPS?: boolean;
  showMemory?: boolean;
  showScrollProgress?: boolean;
  showFrameInfo?: boolean;
  enableHotReload?: boolean;
}
```

### Features

#### Performance Monitoring
1. Real-time FPS counter
2. Memory usage graph
3. Frame time histogram
4. CPU usage indicator
5. Network status display

#### Animation State
1. Current scroll progress
2. Active animations list
3. Frame loading status
4. Trigger states
5. Component lifecycle

#### Debug Controls
1. Pause/resume animations
2. Adjust animation speed
3. Force quality level
4. Clear frame cache
5. Reload assets

#### Visual Debugging
1. Show scroll triggers
2. Display hit boxes
3. Highlight animated elements
4. Show transform values
5. Visualize frame loading

### Console Commands
```typescript
// Debug API
window.ANIMATION_DEBUG = {
  getPerformanceMetrics(): Metrics,
  getAnimationStates(): States,
  setQualityLevel(level: string): void,
  clearFrameCache(pattern?: string): void,
  reloadAssets(pattern?: string): void,
  pauseAnimation(id?: string): void,
  resumeAnimation(id?: string): void,
  getFrameInfo(pattern: string): FrameInfo
};
```

### Error Handling
1. Frame loading errors
2. Canvas rendering errors
3. Performance degradation warnings
4. Memory pressure alerts
5. Network timeout notifications

### Logging System
```typescript
// src/utils/animationLogger.ts
class AnimationLogger {
  logPerformance(metrics: Metrics): void;
  logError(error: Error, context: any): void;
  logStateChange(component: string, state: any): void;
  logFrameLoad(pattern: string, index: number): void;
  getLogs(): Log[];
}
```

### Development Mode Features
1. Hot reload for animation changes
2. Visual debug overlay
3. Performance profiling
4. Memory leak detection
5. Asset optimization suggestions

Please create comprehensive debugging tools with all specified features.
```

---

## Deployment Prompts

### Production Build Optimization Prompt

```
Optimize the animated website for production deployment.

## Build Optimization

### Asset Optimization
1. Compress all WebP images
2. Generate responsive image sets
3. Create WebP fallbacks for older browsers
4. Optimize SVG assets
5. Minimize asset bundle size

### Code Optimization
1. Tree-shake unused animations
2. Minify JavaScript bundles
3. Optimize CSS delivery
4. Remove development code
5. Enable production mode

### Performance Optimizations
1. Enable code splitting
2. Implement lazy loading
3. Optimize bundle loading
4. Preload critical assets
5. Implement resource hints

### Build Configuration
```typescript
// next.config.js
module.exports = {
  productionBrowserSourceMaps: false,
  compress: true,
  swcMinify: true,
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  webpack: (config) => {
    // Animation-specific optimizations
    return config;
  }
};
```

### CDN Configuration
1. Configure CDN for static assets
2. Enable caching headers
3. Implement CDN purging
4. Set up edge caching
5. Configure geographic distribution

### Performance Budgets
```json
{
  "budgets": [
    {
      "type": "javascript",
      " maxSize": "200kb"
    },
    {
      "type": "css",
      "maxSize": "50kb"
    },
    {
      "type": "image",
      "maxSize": "500kb"
    },
    {
      "type": "animation",
      "maxSize": "1MB per sequence"
    }
  ]
}
```

### Monitoring Setup
1. Lighthouse CI integration
2. Real user monitoring (RUM)
3. Performance analytics
4. Error tracking
5. User feedback collection

Please optimize the website for production deployment with all specified configurations.
```

---

## Conclusion

These prompts provide comprehensive guidance for implementing premium animated website features using Google Antigravity IDE techniques. Each prompt is designed to be used directly with the AI IDE to generate production-ready code with proper optimization, accessibility, and performance considerations.

The prompts follow a logical progression from foundation setup through component implementation, asset generation, optimization, testing, and deployment. Each section includes specific technical requirements, code structure guidance, and performance targets to ensure high-quality results.

Use these prompts in sequence to transform the MagnifAI Growth Success website into a premium, Apple-style animated experience.