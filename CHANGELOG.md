# Changelog

## Version 2.0 - Complete Data Editor (2026-05-09)

### 🎉 Major Features Added

#### Data Management System
- **Full CRUD Operations**: Add, edit, update, and delete people
- **Local Storage Persistence**: All changes automatically saved to browser localStorage
- **Backup & Restore**: Create backups and restore from previous states
- **Import/Export**: Download and upload family data as JSON files

#### Editor UI
- **Edit Mode Toggle**: Clean separation between viewing and editing
- **Inline Edit Controls**: Edit buttons on every person card
  - ✏️ Edit person details
  - 👥 Manage relationships
  - 🗑️ Delete person (with confirmation)
- **Person Editor Form**: Complete form for adding/editing:
  - Full name
  - Gender (Male/Female/Unknown)
  - Birth date and place
  - Death date and place
- **Relationship Editor**: Manage family connections:
  - Add/view parents
  - Add/view spouses
  - Add/view children
  - Person selector with search
  - Create new people on-the-fly

#### Data Management Tab
- **Statistics Dashboard**: View total people and families
- **Quick Actions**:
  - Add new person
  - Export data to JSON
  - Import data from JSON
  - Create backup
  - Restore from backup
  - Clear all data (with double confirmation)

### 📁 New Files

- `js/data-manager.js` - Data persistence and CRUD operations
- `js/editor.js` - Editor UI components and forms
- `USER-GUIDE.md` - Complete user documentation
- `CHANGELOG.md` - This file

### 🔧 Modified Files

- `index.html` - Added script references for new modules
- `js/app.js` - Integrated data manager and editor
- `css/main.css` - Added styles for editor UI
- `README.md` - Updated with new features

### 🎨 UI Improvements

- Edit mode toggle button in header
- Edit controls appear on person cards in edit mode
- Modal dialogs for all editing operations
- Person selector with search functionality
- Confirmation dialogs for destructive actions
- Responsive forms for mobile and desktop

### 💾 Data Features

- Automatic save to localStorage on every change
- JSON export with timestamp in filename
- JSON import with validation
- Backup system separate from main storage
- Demo data fallback if no data exists

### 🔒 Privacy & Security

- All data remains client-side
- No server communication for data operations
- Privacy rules still apply (living persons hidden)
- Data only in browser localStorage
- Export for manual backup recommended

### 📱 Compatibility

- Works in all modern browsers
- Mobile-responsive editor forms
- Touch-friendly edit buttons
- Keyboard accessible

### 🐛 Bug Fixes

- Fixed data loading to prioritize localStorage
- Improved person card click handling
- Better modal backdrop handling

### 📚 Documentation

- Complete USER-GUIDE.md with step-by-step instructions
- Updated README.md with quick start guide
- Inline code documentation
- Data format specification

---

## Version 1.0 - Initial Release

### Features
- Pedigree view
- Descendants view
- Search functionality
- Privacy protection for living persons
- Mobile-first responsive design
- Offline capability with service worker
- Static JSON data file