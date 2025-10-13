diff --git a/script.js b/script.js
new file mode 100644
index 0000000000000000000000000000000000000000..465fcf5e7477e068224426d10a24383ef9858276
--- /dev/null
+++ b/script.js
@@ -0,0 +1,17 @@
+document.addEventListener('DOMContentLoaded', () => {
+    const navToggle = document.querySelector('.nav-toggle');
+    const navLinks = document.querySelector('.nav-links');
+    const year = document.getElementById('year');
+
+    if (navToggle && navLinks) {
+        navToggle.addEventListener('click', () => {
+            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
+            navToggle.setAttribute('aria-expanded', String(!expanded));
+            navLinks.classList.toggle('active');
+        });
+    }
+
+    if (year) {
+        year.textContent = new Date().getFullYear();
+    }
+});
