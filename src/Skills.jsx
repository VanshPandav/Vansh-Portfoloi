import { useEffect, useRef, useState } from 'react';
import { portfolio } from './content.js';
import { spherePoints, projectCloud, visibleLabels } from './skillCloud.js';

const allSkills = portfolio.skills.flatMap(group => group.items.split(', '));
const points = spherePoints(portfolio.cloudSkills.filter(name => allSkills.includes(name)));

export default function Skills() {
  const stage = useRef(null);
  const globe = useRef(null);
  const rotation = useRef({ yaw: 0.4, pitch: -0.2 });
  const drag = useRef(null);
  const draw = useRef(() => {});
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let previous = 0;
    let inView = true;
    let radius = 200;
    let sizes = [];
    const nodes = [...globe.current.children];
    function paint() {
      const projected = projectCloud(points, rotation.current.yaw, rotation.current.pitch, radius);
      const visible = visibleLabels(projected, sizes);
      projected.forEach((point, i) => {
        nodes[i].style.transform = `translate(-50%, -50%) translate(${point.x}px, ${point.y}px) scale(${point.scale})`;
        nodes[i].style.opacity = visible.has(i) ? 0.32 + (point.depth + 1) * 0.34 : 0;
        nodes[i].style.zIndex = Math.round((point.depth + 1) * 100);
      });
    }
    function measure() {
      const width = stage.current.clientWidth;
      radius = Math.max(70, Math.min(width * 0.34, 225));
      sizes = nodes.map(node => ({ width: node.offsetWidth, height: node.offsetHeight }));
      paint();
    }
    function tick(time) {
      if (previous && !drag.current && inView && !document.hidden) rotation.current.yaw += Math.min(time - previous, 40) * 0.00009;
      previous = time;
      if (inView) paint();
      frame = requestAnimationFrame(tick);
    }
    function start() {
      cancelAnimationFrame(frame);
      previous = 0;
      if (!paused && !motion.matches) frame = requestAnimationFrame(tick);
    }
    draw.current = paint;
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(stage.current);
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; });
    observer.observe(stage.current);
    let disposed = false;
    document.fonts.ready.then(() => { if (!disposed) measure(); });
    motion.addEventListener('change', start);
    start();
    return () => { disposed = true; cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect(); motion.removeEventListener('change', start); draw.current = () => {}; };
  }, [paused]);

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
    <div className="skills-heading"><p className="eyebrow">04 / TECH STACK</p><h2 id="skills-title">My <span>Skills</span></h2><p>The tools I use to turn ideas into working software.</p></div>
    <div ref={stage} className={`skill-stage${dragging ? ' is-dragging' : ''}`} tabIndex={0} role="group" aria-label="Interactive skill cloud" aria-describedby="cloud-help"
      onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerEnd} onPointerCancel={pointerEnd} onLostPointerCapture={pointerEnd} onKeyDown={keyDown}>
      <div className="skill-globe" ref={globe} aria-hidden="true">{points.map(point => <span className="floating-skill" key={point.name}>{point.name}</span>)}</div>
    </div>
    <div className="skills-controls"><p id="cloud-help">Drag to explore · Arrow keys to rotate</p><button type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? 'Resume rotation' : 'Pause rotation'}</button></div>
    <details className="skills-readable"><summary>View all skills by category</summary><div className="skills-categories">{portfolio.skills.map(group => <div key={group.name}><h3>{group.name}</h3><ul>{group.items.split(', ').map(name => <li key={name}>{name}</li>)}</ul></div>)}</div></details>
  </section>;
}
