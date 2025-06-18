import React, { useEffect, useRef } from 'react';

const TagCanvasCloud = ({ tags, width = 500, height = 500 }) => {
  const canvasRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    // Dynamically load TagCanvas if not already loaded
    const loadTagCanvas = () => {
      if (window.TagCanvas) return Promise.resolve();
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = '/tagcanvas.min.js';
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    loadTagCanvas().then(() => {
      try {
        window.TagCanvas.Start(
          canvasRef.current.id,
          listRef.current.id,
          {
            textColour: '#00ffff',
            outlineColour: '#20e3b2',
            reverse: true,
            depth: 0.9,
            maxSpeed: 0.05,
            initial: [0.1, -0.1],
            wheelZoom: false,
            freezeActive: true,
            shuffleTags: true,
            shape: 'sphere',
            zoom: 1,
            noSelect: true,
            pinchZoom: false,
            freezeDecel: true,
            fadeIn: 800,
            clickToFront: 600,
            outlineMethod: 'block',
            outlineThickness: 2,
            outlineOffset: 0,
            shadow: '#00ffff',
            shadowBlur: 10,
            weight: true,
            weightMode: 'size',
            weightSize: 2,
            font: 'Montserrat, Arial, sans-serif',
          }
        );
      } catch (e) {
        // TagCanvas may throw if already started
      }
    });
  }, [tags, width, height]);

  return (
    <div style={{ width: '100%', maxWidth: width, margin: '0 auto', background: '#111827', borderRadius: '50%', boxShadow: '0 0 40px #00ffff33', padding: 16 }}>
      <canvas
        ref={canvasRef}
        id="tagcanvas-skill"
        width={width}
        height={height}
        style={{ display: 'block', margin: '0 auto', background: 'transparent' }}
      >
        Canvas not supported
      </canvas>
      <ul ref={listRef} id="taglist-skill" style={{ display: 'none' }}>
        {tags.map((tag, i) => (
          <li key={i}>
            <a
              href={tag.url || '#'}
              style={{ color: tag.color || '#00ffff', fontSize: tag.fontSize || 22 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {tag.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagCanvasCloud; 