'use strict';

const converter = document.getElementById('converter');
const input = document.getElementById('convert-value');
const unit = document.getElementById('convert-unit');
const message = document.getElementById('convert-message');
const millimetresPerUnit = { mm: 1, um: 0.001, mil: 0.0254 };
const outputs = ['mm', 'um', 'mil'].map(name => ({
  factor: millimetresPerUnit[name],
  element: document.getElementById('answer-' + name),
}));
const decimalFormat = new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 6 });
const scientificFormat = new Intl.NumberFormat('zh-CN', {
  notation: 'scientific',
  maximumFractionDigits: 6,
});

function format(value) {
  const needsScientific = value > 0 && (value < 0.000001 || value >= 1e12);
  return (needsScientific ? scientificFormat : decimalFormat).format(value);
}

function convert() {
  const value = input.value.trim() === '' ? NaN : Number(input.value);
  const millimetres = value * millimetresPerUnit[unit.value];
  const results = outputs.map(output => millimetres / output.factor);
  const valid = value >= 0 && results.every(Number.isFinite);
  for (const [index, output] of outputs.entries()) {
    output.element.textContent = valid ? format(results[index]) : '—';
  }
  message.textContent = valid ? '' : '请输入可以换算的非负数。';
}

converter.addEventListener('input', convert);
converter.addEventListener('change', convert);
converter.addEventListener('submit', event => event.preventDefault());
convert();
