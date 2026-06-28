# assets

This folder is kept for your real images, matching the brief's folder structure:

- `profile.jpg` — your photo. The Hero section currently shows an elegant
  monogram placeholder instead (see `src/components/Hero.jsx`, the
  `.hero__avatar` block). To use a real photo:
  1. Drop `profile.jpg` in this folder.
  2. In `Hero.jsx`, add `import profileImg from '../assets/profile.jpg'`
     near the top.
  3. Replace the `<svg className="hero__monogram">` block with
     `<img src={profileImg} alt="Chandana" />`.

- `project1.png`, `project2.png`, etc. — project thumbnails. The Projects
  section currently renders a generated SVG placeholder per card (see
  `src/components/Projects.jsx`). To use real screenshots, import each
  image and swap the `<svg>` inside `.project-card__thumb` for an `<img>`,
  the same way as above.

- `resume.pdf` — your actual resume lives in **`/public/resume.pdf`**
  instead of here, since Vite serves files in `public/` directly at the
  site root (so the "Download Resume" button in Hero just links to
  `/resume.pdf`). Replace that file with your real resume — the filename
  can stay the same.
