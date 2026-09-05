import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { runInNewContext } from 'node:vm';

const script = await readFile(new URL('../script.js', import.meta.url), 'utf8');

function setup() {
  class Element {
    listeners = {};
    addEventListener(name, callback) { this.listeners[name] = callback; }
    focus() {}
  }
  class Dialog extends Element {
    open = false;
    showModal() { this.open = true; }
  }
  class Image extends Element {}
  class Anchor extends Element {
    href = 'https://example.test/chart.png';
    dataset = { lightboxTitle: 'Measured results', lightboxAlt: 'Actual versus forecast' };
  }
  class Button extends Element {}
  const nodes = {
    imageLightbox: new Dialog(), imageLightboxImage: new Image(),
    imageLightboxTitle: new Element(), imageLightboxOriginal: new Anchor(),
    imageLightboxClose: new Button(),
  };
  const link = new Anchor();
  runInNewContext(script, {
    HTMLDialogElement: Dialog, HTMLImageElement: Image,
    HTMLAnchorElement: Anchor, HTMLButtonElement: Button,
    document: {
      getElementById: (id) => nodes[id], querySelectorAll: () => [link],
      body: { classList: { add() {} } },
    },
  });
  return { link, nodes };
}

test('ordinary activation opens the matching chart with accessible text', () => {
  const { link, nodes } = setup();
  let prevented = false;
  link.listeners.click({ button: 0, preventDefault() { prevented = true; } });
  assert.ok(prevented);
  assert.ok(nodes.imageLightbox.open);
  assert.equal(nodes.imageLightboxImage.src, link.href);
  assert.equal(nodes.imageLightboxImage.alt, link.dataset.lightboxAlt);
  assert.equal(nodes.imageLightboxTitle.textContent, link.dataset.lightboxTitle);
});

test('modified, non-primary and already-handled clicks retain native navigation', () => {
  for (const override of [
    { ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { altKey: true },
    { button: 1 }, { button: 2 }, { defaultPrevented: true },
  ]) {
    const { link, nodes } = setup();
    link.listeners.click({ button: 0, ...override, preventDefault() { assert.fail('Navigation intercepted'); } });
    assert.equal(nodes.imageLightbox.open, false);
  }
});
