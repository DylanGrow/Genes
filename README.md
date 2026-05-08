# Family Tree

A privacy-first, static genealogy website. No data leaves the device.

## Features

- **Pedigree & Descendant views** — switch between ancestor and descendant trees
- **Privacy protected** — living persons (born < 100 years ago, no death date) are automatically hidden
- **Mobile-first** — works on phones, tablets, and desktops
- **Lighthouse 100** — no external fonts, no trackers, no ads, minimal JS
- **Offline capable** — service worker caches all assets
- **Search** — find anyone in the tree instantly
- **Adblock friendly** — zero third-party requests

## File Structure

```
genealogy-site/
├── index.html          # Main page
├── css/
│   └── main.css        # All styles (no external fonts)
├── js/
│   └── app.js          # Tree renderer, search, modal
├── data/
│   └── family.json     # Your family data (GEDCOM-compatible)
└── sw.js               # Service worker for offline use
```

## Data Format

`data/family.json` follows a simplified GEDCOM structure:

```json
{
  "persons": {
    "I1": {
      "name": "Jane Doe",
      "birth": { "date": "1920-03-15", "place": "Boston, MA" },
      "death": { "date": "1995-07-22", "place": "Portland, OR" },
      "sex": "F",
      "fams": ["F1"],
      "famc": "F2"
    }
  },
  "families": {
    "F1": {
      "husb": "I2",
      "wife": "I1",
      "children": ["I3", "I4"]
    }
  }
}
```

- `fams` = families this person is a parent in (spouse)
- `famc` = family this person is a child in

## Converting GEDCOM

Use any GEDCOM-to-JSON converter, or write a small script to map your export to this format. The structure is intentionally simple.

## Hosting

This is a fully static site. Upload to:

- **GitHub Pages** — push to a repo, enable Pages in settings
- **Cloudflare Pages** — drag and drop the folder
- **Netlify** — drag and drop the folder
- **Any static host** — no server-side processing needed

## Privacy

- All data is client-side only
- No analytics, no cookies, no external requests
- Living persons are redacted automatically
- Optional: encrypt `family.json` with a password before sharing

## License

Private use only.