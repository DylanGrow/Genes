# Import Guide - Bringing Your Family Tree Data

This app supports importing family tree data from multiple sources and formats.

## Supported Formats

### 1. **GEDCOM (.ged, .gedcom)** ✅
The standard genealogy data format used by most platforms.

**Supported Platforms:**
- Ancestry.com
- FamilySearch
- MyHeritage
- Findmypast
- Geni
- Legacy Family Tree
- Family Tree Maker
- RootsMagic
- Gramps
- And virtually any genealogy software

**How to Export from Popular Platforms:**

#### Ancestry.com
1. Go to your tree
2. Click "Trees" → "Tree Settings"
3. Click "Export tree"
4. Download the GEDCOM file

#### FamilySearch
1. Go to Family Tree
2. Click your name → "Tree"
3. Click "Download" → "GEDCOM"
4. Save the file

#### MyHeritage
1. Go to Family Tree
2. Click "Manage Tree" → "Export to GEDCOM"
3. Download the file

### 2. **CSV (.csv)** ✅
Spreadsheet format for simple data entry.

**Required Columns:**
- `name` or `full name` - Person's full name
- `id` - Unique identifier (optional, will be auto-generated)
- `sex` or `gender` - M/F/U
- `birth date` or `birthdate` - Birth date
- `birth place` or `birthplace` - Birth location
- `death date` or `deathdate` - Death date (optional)
- `death place` or `deathplace` - Death location (optional)
- `father` or `father id` - Father's ID (optional)
- `mother` or `mother id` - Mother's ID (optional)
- `spouse` or `spouse id` - Spouse's ID (optional)

**Example CSV:**
```csv
id,name,sex,birth date,birth place,death date,father,mother
I1,John Smith,M,1920-05-15,Boston MA,1995-12-20,I3,I4
I2,Mary Jones,F,1922-08-22,New York NY,,I5,I6
I3,Robert Smith,M,1890-03-10,Boston MA,1960-01-15,,
```

**Date Formats Supported:**
- YYYY-MM-DD (recommended)
- MM/DD/YYYY
- DD/MM/YYYY
- Any format parseable by JavaScript Date

### 3. **JSON (.json)** ✅
Native format for this app.

**Structure:**
```json
{
  "persons": {
    "I1": {
      "name": "John Doe",
      "birth": { "date": "1920-03-15", "place": "Boston, MA" },
      "death": { "date": "1995-07-22", "place": "Portland, OR" },
      "sex": "M",
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

### 4. **Auto-Detect** ✅
Let the app automatically detect the format.

Supports: GEDCOM, CSV, JSON

## How to Import

### Method 1: Import from Data Tab

1. Open the app
2. Go to **"Data"** tab in navigation
3. Choose import method:
   - **"📄 Import GEDCOM"** - For .ged/.gedcom files
   - **"📊 Import CSV"** - For .csv files
   - **"🔄 Auto-Detect Format"** - Let app detect format
4. Select your file
5. Wait for import to complete
6. Choose action:
   - **Replace** - Replace all current data (previous data backed up)
   - **Merge** - Combine with existing data

### Method 2: Drag & Drop (Coming Soon)
Drag files directly onto the app window.

## Import Options

### Replace vs. Merge

**Replace:**
- Deletes all current data
- Loads imported data
- Previous data saved to backup
- Use when: Starting fresh or switching trees

**Merge:**
- Keeps all current data
- Adds imported data
- Resolves ID conflicts automatically
- Use when: Combining multiple sources

## What Gets Imported

### From GEDCOM:
✅ Names
✅ Birth dates and places
✅ Death dates and places
✅ Gender
✅ Parent-child relationships
✅ Spouse relationships
✅ Multiple marriages
❌ Photos (not in GEDCOM standard)
❌ Notes (coming soon)
❌ Sources (coming soon)

### From CSV:
✅ Names
✅ Birth dates and places
✅ Death dates and places
✅ Gender
✅ Parent relationships (via father/mother columns)
✅ Spouse relationships (via spouse column)
❌ Multiple marriages (use GEDCOM)
❌ Complex family structures

### From JSON:
✅ Everything (native format)

## Troubleshooting

### "Failed to parse GEDCOM"
- Ensure file is valid GEDCOM format
- Try exporting again from source platform
- Check file isn't corrupted

### "Invalid CSV format"
- Ensure first row has column headers
- Check required columns are present
- Verify dates are in valid format
- Remove special characters from names

### "Failed to import file"
- Check file isn't empty
- Verify file extension matches content
- Try "Auto-Detect Format" option
- Check browser console for detailed errors

### Missing People After Import
- Check if they're marked as "Living" (privacy filter)
- Verify they have valid birth dates
- Check relationships are properly linked

### Duplicate People After Merge
- Use **"👥 Find Duplicates"** in Data tab
- Review and merge duplicates
- Consider using "Replace" instead of "Merge"

## Best Practices

### Before Importing:
1. **Backup current data** - Export to JSON first
2. **Clean source data** - Fix errors in original platform
3. **Test with small file** - Import subset first
4. **Review privacy settings** - Check living persons

### After Importing:
1. **Validate data** - Use "🔍 Validate All Data"
2. **Find duplicates** - Use "👥 Find Duplicates"
3. **Check relationships** - Verify parent-child links
4. **Export backup** - Save imported data

### For Large Trees:
- Import may take 10-30 seconds for 1000+ people
- Browser may show "Not Responding" - this is normal
- Don't close browser during import
- Consider splitting very large files (5000+ people)

## Data Quality Tips

### Dates:
- Use YYYY-MM-DD format for consistency
- Include full dates when possible
- Use "ABT 1920" in GEDCOM for approximate dates

### Names:
- Use full names with middle names
- Include maiden names in parentheses
- Avoid special characters

### Places:
- Use consistent format: "City, State, Country"
- Be specific: "Boston, MA, USA" not just "Boston"
- Use modern place names

### Relationships:
- Verify parent ages are reasonable
- Check marriage dates make sense
- Ensure children are linked to correct parents

## Platform-Specific Notes

### Ancestry.com
- Exports complete GEDCOM
- Includes all relationships
- May include living persons (check privacy)
- Photos not included in GEDCOM

### FamilySearch
- Exports public tree data only
- May have incomplete relationships
- Check for duplicates after import
- Verify dates and places

### MyHeritage
- Exports complete tree
- Includes smart matches data
- May have merged duplicates
- Review after import

### Excel/Google Sheets
- Export as CSV
- Use column headers exactly as specified
- One person per row
- Save as UTF-8 encoding

## Advanced: Creating Custom CSV

For bulk data entry, create a CSV with these columns:

```csv
id,name,sex,birth date,birth place,death date,death place,father,mother,spouse
I1,John Smith,M,1920-05-15,Boston MA,1995-12-20,Portland OR,I3,I4,I2
I2,Mary Jones,F,1922-08-22,New York NY,,,I5,I6,I1
I3,Robert Smith,M,1890-03-10,Boston MA,1960-01-15,,,
I4,Sarah Brown,F,1895-07-20,Boston MA,1970-03-25,,,
```

**Tips:**
- Leave death fields empty for living persons
- Use consistent ID format (I1, I2, etc.)
- Link children to parents via father/mother columns
- Link spouses via spouse column

## Support

For import issues:
1. Check browser console (F12) for errors
2. Verify file format matches extension
3. Try smaller test file first
4. Use "Auto-Detect Format" if unsure

## Future Import Features

Coming soon:
- 📸 Photo import from GEDCOM
- 📝 Notes and sources
- 🔗 Direct API integration with Ancestry/FamilySearch
- 📊 Import statistics and preview
- 🔄 Incremental sync
- 🗺️ Place name standardization