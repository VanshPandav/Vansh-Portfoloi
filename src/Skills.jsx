import { useEffect, useRef, useState } from 'react';
import { portfolio } from './content.js';
import { spherePoints, projectCloud, lerp, smoothstep, drawWireframe } from './skillCloud.js';
import { skillIcons } from './skillIcons.js';

const allSkills = portfolio.skills.flatMap(group => group.items.split(', '));
const points = spherePoints(portfolio.cloudSkills.filter(name => allSkills.includes(name) && skillIcons[name]));
// Icons start scattered around the stage and fly into the sphere when it first scrolls into view.
const scattered = points.map(() => ({ x: (Math.random() - 0.5) * 4, y: (Math.random() - 0.5) * 3 }));

export default function Skills() {
  const stage = useRef(null);
  const globe = useRef(null);
  const wireframe = useRef(null);
  const rotation = useRef({ yaw: 0.4, pitch: -0.2 });
  const drag = useRef(null);
  const hovering = useRef(false);
  const pausedRef = useRef(false);
  const draw = useRef(() => {});
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const context = wireframe.current.getContext('2d');
    const nodes = [...globe.current.children];
    let frame = 0;
    let previous = 0;
    let inView = false;
    let assembled = false;
    let radius = 200;
    let width = 0;
    let height = 0;
    let spin = 0;
    let lastScroll = scrollY;
    let current = scattered.map(p => ({ x: p.x * radius, y: p.y * radius }));
    let wire = '';
    const readWire = () => { wire = getComputedStyle(stage.current).getPropertyValue('--wire').trim(); paint(); };

    function paint(elapsed = 16) {
      const { yaw, pitch } = rotation.current;
      const projected = projectCloud(points, yaw, pitch, radius);
      const ease = motion.matches ? 1 : 1 - Math.pow(0.93, elapsed / 16.7);
      projected.forEach((point, i) => {
        const target = assembled ? point : { x: scattered[i].x * radius, y: scattered[i].y * radius };
        current[i].x = lerp(current[i].x, target.x, ease);
        current[i].y = lerp(current[i].y, target.y, ease);
        const facing = smoothstep(point.depth, 0, 0.7);
        const opacity = assembled ? lerp(0.15, 1, facing) : 0;
        const node = nodes[i];
        node.style.transform = `translate(-50%, -50%) translate(${current[i].x}px, ${current[i].y}px) scale(${lerp(0.6, 1.1, facing)})`;
        node.style.opacity = opacity;
        node.style.zIndex = Math.round((point.depth + 1) * 100);
        node.style.pointerEvents = opacity > 0.4 ? 'auto' : 'none';
        node.style.setProperty('--facing', facing);
        node.classList.toggle('is-front', point.depth > 0.85);
      });
      drawWireframe(context, width, height, yaw, pitch, radius * 0.97, assembled ? 0.07 : 0, wire);
    }
    function measure() {
      const ratio = devicePixelRatio || 1;
      width = stage.current.clientWidth;
      height = stage.current.clientHeight;
      wireframe.current.width = width * ratio;
      wireframe.current.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const scale = radius;
      radius = Math.max(110, Math.min(width * 0.38, height * 0.4, 250));
      current = current.map(p => ({ x: p.x / scale * radius, y: p.y / scale * radius }));
      paint();
    }
    function tick(time) {
      const elapsed = previous ? Math.min(time - previous, 40) : 16;
      previous = time;
      if (inView && !document.hidden) {
        if (assembled && !drag.current) {
          if (!pausedRef.current && !hovering.current) rotation.current.yaw += elapsed * 0.00012;
          rotation.current.yaw += spin;
        }
        spin *= 0.95;
        paint(elapsed);
      }
      frame = requestAnimationFrame(tick);
    }
    function start() {
      cancelAnimationFrame(frame);
      previous = 0;
      if (motion.matches) paint();
      else frame = requestAnimationFrame(tick);
    }
    // Scrolling the page gives the globe a small push, which then eases out.
    function scrolled() {
      const delta = scrollY - lastScroll;
      lastScroll = scrollY;
      spin = pausedRef.current || motion.matches || Math.abs(delta) > 120 ? 0 : delta * 0.001;
    }
    draw.current = paint;
    measure();
    readWire();
    document.addEventListener('themechange', readWire);
    const resize = new ResizeObserver(measure);
    resize.observe(stage.current);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView && !assembled) setTimeout(() => { assembled = true; if (motion.matches) paint(); }, 100);
    }, { threshold: 0.2 });
    observer.observe(stage.current);
    addEventListener('scroll', scrolled, { passive: true });
    motion.addEventListener('change', start);
    start();
    return () => { cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect(); removeEventListener('scroll', scrolled); document.removeEventListener('themechange', readWire); motion.removeEventListener('change', start); draw.current = () => {}; };
  }, []);

  function pointerDown(event) {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
    setDragging(true);
  }
  function pointerMove(event) {
    if (!drag.current || drag.current.id !== event.pointerId) return;
    rotation.current.yaw += (event.clientX - drag.current.x) * 0.007;
    rotation.current.pitch -= (event.clientY - drag.current.y) * 0.007;
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
    draw.current();
  }
  function pointerEnd(event) {
    if (drag.current?.id !== event.pointerId) return;
    drag.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  function keyDown(event) {
    const changes = { ArrowLeft: [-0.15, 0], ArrowRight: [0.15, 0], ArrowUp: [0, 0.15], ArrowDown: [0, -0.15] };
    if (!changes[event.key]) return;
    event.preventDefault();
    rotation.current.yaw += changes[event.key][0];
    rotation.current.pitch += changes[event.key][1];
    draw.current();
  }

  return <section className="section container skills-section" id="skills" aria-labelledby="skills-title">
    <div className="skills-heading"><p className="eyebrow">03 / TECH STACK</p><h2 id="skills-title">My <em>skills</em></h2><p>The tools I use to turn ideas into working software.</p></div>
    <div ref={stage} className={`skill-stage${dragging ? ' is-dragging' : ''}`} tabIndex={0} role="group" aria-label="Interactive skill cloud" aria-describedby="cloud-help"
      onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerEnd} onPointerCancel={pointerEnd} onLostPointerCapture={pointerEnd} onKeyDown={keyDown}>
      <canvas className="skill-wireframe" ref={wireframe} aria-hidden="true" />
      <div className="skill-globe" ref={globe} aria-hidden="true" onPointerOver={() => { hovering.current = true; }} onPointerOut={() => { hovering.current = false; }}>
        {points.map(point => {
          const { icon: Icon, color, ink = '#fff', dark = color, darkInk = ink } = skillIcons[point.name];
          return <span className="floating-skill" key={point.name} style={{ '--brand-light': color, '--ink-light': ink, '--brand-dark': dark, '--ink-dark': darkInk }}>
            <span className="skill-body"><Icon className="skill-icon" /><span className="skill-name">{point.name}</span></span>
          </span>;
        })}
      </div>
    </div>
    <div className="skills-controls"><p id="cloud-help">Drag to explore · Hover an icon to see its name · Arrow keys to rotate</p><button type="button" aria-pressed={paused} onClick={() => { pausedRef.current = !paused; setPaused(!paused); }}>{paused ? 'Resume rotation' : 'Pause rotation'}</button></div>
    <details className="skills-readable"><summary>View all skills by category</summary><div className="skills-categories">{portfolio.skills.map(group => <div key={group.name}><h3>{group.name}</h3><ul>{group.items.split(', ').map(name => <li key={name}>{name}</li>)}</ul></div>)}</div></details>
  </section>;
}
