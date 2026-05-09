# Family Tree

A privacy-first, fully-featured genealogy website with complete data editing capabilities. No data leaves the device.

## Features

### Viewing
- **Pedigree & Descendant views** — switch between ancestor and descendant trees
- **Privacy protected** — living persons (born < 100 years ago, no death date) are automatically hidden
- **Mobile-first** — works on phones, tablets, and desktops
- **Lighthouse 100** — no external fonts, no trackers, no ads, minimal JS
- **Offline capable** — service worker caches all assets
- **Search** — find anyone in the tree instantly
- **Adblock friendly** — zero third-party requests

### Editing (NEW!)
- **Complete CRUD operations** — add, edit, and delete people
- **Relationship management** — manage parents, spouses, and children
- **Local storage persistence** — all changes saved automatically
- **Import/Export** — backup and restore your data as JSON
- **Edit mode toggle** — clean viewing mode, powerful editing mode
- **Inline editing** — edit buttons on every person card

## File Structure

```
genealogy-site/
├── index.html          # Main page
├── USER-GUIDE.md       # Complete user guide
├── css/
│   └── main.css        # All styles (no external fonts)
├── js/
│   ├── app.js          # Tree renderer, search, modal
│   ├── data-manager.js # CRUD operations & storage
│   └── editor.js       # Edit UI & forms
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

## Quick Start

1. **Open the app** — Just open `index.html` in a browser
2. **View demo data** — Explore the sample family tree
3. **Enter edit mode** — Click "✏️ Edit" in the header
4. **Add your family** — Click "➕ Add New Person" in the Data tab
5. **Build relationships** — Use the 👥 button to connect people
6. **Export your data** — Save your work with "📥 Export Data"

See [USER-GUIDE.md](USER-GUIDE.md) for complete documentation.

## Editing Your Family Tree

### Adding People
1. Click **"✏️ Edit"** to enter edit mode
2. Go to **"Data"** tab → Click **"➕ Add New Person"**
3. Fill in name, dates, places, and gender
4. Click **"Add Person"**

### Managing Relationships
1. Enter edit mode
2. Click **👥** on any person card
3. Add parents, spouses, or children
4. Select from existing people or create new ones

### Editing Details
- Click **✏️** on any person card to edit their information
- Click **🗑️** to delete (with confirmation)

### Backup & Restore
- **Export**: Download JSON file of your entire tree
- **Import**: Load a previously exported file
- **Backup**: Save to browser storage
- **Restore**: Recover from browser backup

## Converting GEDCOM

Use any GEDCOM-to-JSON converter, or write a small script to map your export to this format. The structure is intentionally simple. You can also manually import data using the Import feature in the Data tab.

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

## Data Storage

- All data is stored in **browser localStorage**
- Changes are saved automatically
- Data persists between sessions
- Export regularly to avoid data loss
- No server-side storage or transmission

## Privacy

- All data is client-side only
- No analytics, no cookies, no external requests
- Living persons are redacted automatically
- Optional: encrypt `family.json` with a password before sharing
- Your data never leaves your device

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern mobile browsers

## License

Private use only.