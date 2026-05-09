# Family Tree App - User Guide

## Overview

This is a privacy-first family tree application with complete data editing capabilities. All data is stored locally in your browser - nothing is sent to any server.

## Features

### 📊 View Your Family Tree
- **Pedigree View**: See ancestors going back multiple generations
- **Descendants View**: See children and grandchildren
- **Search**: Quickly find any person in your tree
- **Privacy Protection**: Living persons (born < 100 years ago, no death date) are automatically hidden

### ✏️ Edit Mode

Click the **"✏️ Edit"** button in the header to enter edit mode. In edit mode, you'll see three buttons on each person card:

- **✏️ Edit**: Modify person's details (name, birth, death, gender)
- **👥 Relationships**: Manage family relationships (parents, spouses, children)
- **🗑️ Delete**: Remove person from the tree (with confirmation)

### ➕ Adding People

1. Click **"✏️ Edit"** to enter edit mode
2. Go to the **"Data"** tab in the navigation
3. Click **"➕ Add New Person"**
4. Fill in the form:
   - **Full Name** (required)
   - **Gender** (Male/Female/Unknown)
   - **Birth Date & Place**
   - **Death Date & Place** (if applicable)
5. Click **"Add Person"**

### 👥 Managing Relationships

1. Enter edit mode
2. Click the **👥** button on any person card
3. You can add:
   - **Parents**: Select existing people or create new ones
   - **Spouses**: Create marriage/partnership relationships
   - **Children**: Link children to parents

### 📝 Editing Person Details

1. Enter edit mode
2. Click the **✏️** button on any person card
3. Update any information
4. Click **"Save Changes"**

### 🗑️ Deleting People

1. Enter edit mode
2. Click the **🗑️** button on any person card
3. Confirm the deletion (this will also remove them from all relationships)

## Data Management

Access the **"Data"** tab for advanced features:

### 💾 Backup & Restore

- **Export Data**: Download your family tree as a JSON file
- **Import Data**: Load a previously exported JSON file
- **Create Backup**: Save a backup in browser storage
- **Restore Backup**: Restore from the last backup

### 📥 Import/Export

**To Export:**
1. Go to Data tab
2. Click **"📥 Export Data"**
3. Save the JSON file to your computer

**To Import:**
1. Go to Data tab
2. Click **"📤 Import Data"**
3. Select a JSON file from your computer
4. Your data will be loaded and saved to browser storage

### 🔄 Data Storage

- All data is stored in your browser's **localStorage**
- Data persists between sessions
- No data is sent to any server
- Clear browser data will delete your family tree

### ⚠️ Important Notes

1. **Backup Regularly**: Export your data frequently to avoid loss
2. **Browser Storage**: Data is tied to your browser - use export/import to move between devices
3. **Privacy**: Living persons are automatically hidden from view
4. **Undo**: There is no undo - always backup before major changes

## Data Format

The app uses a simplified GEDCOM-compatible JSON format:

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

### Field Descriptions

**Person Fields:**
- `name`: Full name
- `birth`: Object with `date` (YYYY-MM-DD) and `place`
- `death`: Object with `date` (YYYY-MM-DD) and `place`
- `sex`: "M" (Male), "F" (Female), or "U" (Unknown)
- `fams`: Array of family IDs where this person is a spouse
- `famc`: Family ID where this person is a child

**Family Fields:**
- `husb`: Person ID of husband/partner
- `wife`: Person ID of wife/partner
- `children`: Array of person IDs

## Tips & Best Practices

1. **Start with yourself**: Add yourself first, then work backwards to parents and grandparents
2. **Use full names**: Include middle names and maiden names
3. **Be specific with places**: Use "City, State, Country" format
4. **Date format**: Use YYYY-MM-DD for consistency (e.g., 1920-03-15)
5. **Regular backups**: Export your data after each editing session
6. **Test imports**: After importing, verify your data loaded correctly

## Troubleshooting

**Data not saving?**
- Check browser storage isn't full
- Try exporting and re-importing
- Clear browser cache and reload

**Can't see edit buttons?**
- Make sure you clicked "✏️ Edit" to enter edit mode
- Check that JavaScript is enabled

**Lost data?**
- Check if you have a backup in browser storage (click "♻️ Restore Backup")
- Look for exported JSON files on your computer

**Privacy concerns?**
- All data stays in your browser
- No network requests are made (except loading the initial app files)
- You can use the app offline after first load

## Keyboard Shortcuts

- **Tab**: Navigate between elements
- **Enter**: Activate buttons and links
- **Escape**: Close modals
- **Arrow keys**: Navigate search results

## Browser Compatibility

Works best in modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Support

This is a static, privacy-first application with no backend. All data management happens in your browser.

For technical issues, check the browser console (F12) for error messages.