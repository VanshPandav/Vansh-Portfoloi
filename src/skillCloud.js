// Geometry is separate from React so resizing and dragging use the same projection.
export function spherePoints(names) {
  return names.map((name, i) => {
    const y = 1 - 2 * (i + 0.5) / names.length;
    const r = Math.sqrt(1 - y * y);
    const a = i * Math.PI * (3 - Math.sqrt(5));
    return { name, x: Math.cos(a) * r, y, z: Math.sin(a) * r };
  });
}
export function rotatePoint(point, yaw, pitch) {
  const x = point.x * Math.cos(yaw) + point.z * Math.sin(yaw);
  const z = point.z * Math.cos(yaw) - point.x * Math.sin(yaw);
  const y = point.y * Math.cos(pitch) - z * Math.sin(pitch);
  const depth = point.y * Math.sin(pitch) + z * Math.cos(pitch);
  return { x, y, depth };
}
export function projectCloud(points, yaw, pitch, radius) {
  return points.map(point => {
    const p = rotatePoint(point, yaw, pitch);
    return { name: point.name, x: p.x * radius, y: p.y * radius, depth: p.depth };
  });
}
export const lerp = (from, to, t) => from + (to - from) * t;
export function smoothstep(value, edge0, edge1) {
  const t = Math.min(Math.max((value - edge0) / (edge1 - edge0), 0), 1);
  return t * t * (3 - 2 * t);
}
// A faint wireframe globe behind the icons, drawn with the same rotation so it moves with them.
export function drawWireframe(context, width, height, yaw, pitch, radius, alpha, rgb = '17, 17, 17') {
  context.clearRect(0, 0, width, height);
  if (alpha <= 0) return;
  context.save();
  context.translate(width / 2, height / 2);
  context.lineWidth = 1;
  context.strokeStyle = `rgba(${rgb || '17, 17, 17'}, ${alpha})`;
  const line = points => {
    context.beginPath();
    points.forEach((p, i) => {
      const r = rotatePoint(p, yaw, pitch);
      i ? context.lineTo(r.x * radius, r.y * radius) : context.moveTo(r.x * radius, r.y * radius);
    });
    context.stroke();
  };
  const steps = 64;
  for (let m = 0; m < 8; m++) {
    const a = m * Math.PI / 8;
    line(Array.from({ length: steps + 1 }, (_, i) => {
      const t = i / steps * Math.PI * 2;
      return { x: Math.cos(a) * Math.sin(t), y: Math.cos(t), z: Math.sin(a) * Math.sin(t) };
    }));
  }
  for (let l = 1; l < 6; l++) {
    const y = Math.cos(l * Math.PI / 6);
    const r = Math.sqrt(1 - y * y);
    line(Array.from({ length: steps + 1 }, (_, i) => {
      const t = i / steps * Math.PI * 2;
      return { x: Math.cos(t) * r, y, z: Math.sin(t) * r };
    }));
  }
  context.restore();
}
