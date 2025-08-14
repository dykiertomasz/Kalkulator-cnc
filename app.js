// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js');
  });
}

// Tabs
const tabs = document.getElementById('tabs').querySelectorAll('button');
tabs.forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
}));

// Utils
const $ = (id) => document.getElementById(id);
const out = (id, text) => { $(id).textContent = text; };

// RPM & vc
$('btn-rpm').onclick = () => {
  const D = parseFloat($('rpm-D').value);
  const vc = parseFloat($('rpm-vc').value);
  if (D>0 && vc>0) {
    const rpm = (1000 * vc) / (Math.PI * D);
    out('rpm-out', `RPM ≈ ${rpm.toFixed(0)}`);
  } else out('rpm-out', 'Podaj D i vc.');
};
$('btn-vc').onclick = () => {
  const D = parseFloat($('rpm-D').value);
  const rpm = parseFloat($('rpm-vc').value); // reuse field for convenience when user pastes RPM
  const rpmVal = parseFloat($('rpm-vc').value);
  if (D>0 && rpmVal>0) {
    const vc = (Math.PI * D * rpmVal) / 1000;
    out('rpm-out', `vc ≈ ${vc.toFixed(2)} m/min`);
  } else out('rpm-out', 'Podaj D i RPM (w polu vc).');
};

// Feedrate
$('btn-feedrate').onclick = () => {
  const fz = parseFloat($('feed-fz').value);
  const z = parseFloat($('feed-z').value);
  const rpm = parseFloat($('feed-rpm').value);
  if (fz>0 && z>0 && rpm>0) {
    const vf = fz * z * rpm;
    out('feed-out', `v_f ≈ ${vf.toFixed(1)} mm/min`);
  } else out('feed-out', 'Podaj fz, z, RPM.');
};
$('btn-feedrate2').onclick = () => {
  const fn = parseFloat($('feed-fn').value);
  const rpm = parseFloat($('feed-rpm2').value);
  if (fn>0 && rpm>0) {
    const vf = fn * rpm;
    out('feed-out2', `v_f ≈ ${vf.toFixed(1)} mm/min`);
  } else out('feed-out2', 'Podaj f_n i RPM.');
};

// Chip load
$('btn-cl').onclick = () => {
  const vf = parseFloat($('cl-vf').value);
  const z = parseFloat($('cl-z').value);
  const rpm = parseFloat($('cl-rpm').value);
  if (vf>0 && z>0 && rpm>0) {
    const fz = vf / (z * rpm);
    out('cl-out', `f_z ≈ ${fz.toFixed(4)} mm/ząb`);
  } else out('cl-out', 'Podaj v_f, z, RPM.');
};

// Passes
$('btn-passes').onclick = () => {
  const total = parseFloat($('passes-total').value);
  const ap = parseFloat($('passes-ap').value);
  if (total>0 && ap>0) {
    const n = Math.ceil(total / ap);
    out('passes-out', `Liczba przejść: ${n}`);
  } else out('passes-out', 'Podaj głębokości.');
};

// Path length
$('btn-path2d').onclick = () => {
  const x1 = parseFloat($('p-x1').value||0), y1 = parseFloat($('p-y1').value||0);
  const x2 = parseFloat($('p-x2').value||0), y2 = parseFloat($('p-y2').value||0);
  const d = Math.hypot(x2-x1, y2-y1);
  out('path-out', `Długość 2D: ${d.toFixed(3)} mm`);
};
$('btn-path3d').onclick = () => {
  const x1 = parseFloat($('p-x1').value||0), y1 = parseFloat($('p-y1').value||0), z1 = parseFloat($('p-z1').value||0);
  const x2 = parseFloat($('p-x2').value||0), y2 = parseFloat($('p-y2').value||0), z2 = parseFloat($('p-z2').value||0);
  const d = Math.hypot(x2-x1, y2-y1, z2-z1);
  out('path-out', `Długość 3D: ${d.toFixed(3)} mm`);
};

// Units
$('btn-mm2in').onclick = () => {
  const mm = parseFloat($('mm').value);
  if (mm || mm===0) out('mm-out', `${(mm/25.4).toFixed(4)} in`);
};
$('btn-in2mm').onclick = () => {
  const inch = parseFloat($('inch').value);
  if (inch || inch===0) out('inch-out', `${(inch*25.4).toFixed(3)} mm`);
};
$('btn-mmin2mmmin').onclick = () => {
  const v = parseFloat($('mmin').value);
  if (v || v===0) out('mmin-out', `${(v*1000).toFixed(1)} mm/min`);
};
$('btn-mmmin2mmin').onclick = () => {
  const v = parseFloat($('mmmin').value);
  if (v || v===0) out('mmmin-out', `${(v/1000).toFixed(3)} m/min`);
};
