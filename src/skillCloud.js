// Geometry is separate from React so resizing and dragging use the same projection.
export function spherePoints(names) {
  return names.map((name, i) => {
    const y = 1 - 2 * (i + 0.5) / names.length;
    const r = Math.sqrt(1 - y * y);
    const a = i * Math.PI * (3 - Math.sqrt(5));
    return { name, x: Math.cos(a) * r, y, z: Math.sin(a) * r };
  });
}
export function projectCloud(points, yaw, pitch, radius) {
  return points.map(point => {
    const x = point.x * Math.cos(yaw) + point.z * Math.sin(yaw);
    const z = point.z * Math.cos(yaw) - point.x * Math.sin(yaw);
    const y = point.y * Math.cos(pitch) - z * Math.sin(pitch);
    const depth = point.y * Math.sin(pitch) + z * Math.cos(pitch);
    return { name: point.name, x: x * radius, y: y * radius, depth, scale: 0.7 + (depth + 1) * 0.15 };
  });
}
// Keep nearer labels visible when two labels project onto the same screen area.
export function visibleLabels(projected, sizes) {
  const occupied = [];
  const visible = new Set();
  projected.map((p, i) => ({ ...p, i })).sort((a, b) => b.depth - a.depth).forEach(p => {
    const width = sizes[p.i].width * p.scale + 16;
    const height = sizes[p.i].height * p.scale + 12;
    const box = { left: p.x - width / 2, right: p.x + width / 2, top: p.y - height / 2, bottom: p.y + height / 2 };
    if (!occupied.some(b => box.left < b.right && box.right > b.left && box.top < b.bottom && box.bottom > b.top)) {
      occupied.push(box);
      visible.add(p.i);
    }
  });
  return visible;
}
