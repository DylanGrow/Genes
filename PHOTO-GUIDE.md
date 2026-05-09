# Photo Guide - Adding Photos to Your Family Tree

Make your family tree come alive with photos! This guide explains how to add, manage, and display photos for people in your tree.

## Features

✅ **Upload Photos** - Add photos for any person
✅ **Display in Tree** - Photos appear on person cards
✅ **Modal View** - Larger photo in person details
✅ **Privacy Protected** - Photos hidden for living persons
✅ **Data URL Storage** - Photos stored as base64 in browser
✅ **5MB Limit** - Reasonable file size for performance

## How to Add Photos

### Method 1: When Adding a New Person

1. Click **"✏️ Edit"** to enter edit mode
2. Go to **"Data"** tab → Click **"➕ Add New Person"**
3. Fill in person details
4. In the **Photo** section, click **"📷 Upload Photo"**
5. Select an image file from your computer
6. Preview appears immediately
7. Click **"Add Person"** to save

### Method 2: When Editing Existing Person

1. Click **"✏️ Edit"** to enter edit mode
2. Click the **✏️** button on any person card
3. In the **Photo** section, click **"📷 Upload Photo"**
4. Select an image file
5. Preview appears immediately
6. Click **"Save Changes"**

### Method 3: Replace Existing Photo

1. Edit the person (as above)
2. Click **"📷 Upload Photo"** to select new image
3. New photo replaces old one
4. Click **"Save Changes"**

### Method 4: Remove Photo

1. Edit the person
2. Click **"🗑️ Remove"** button next to photo
3. Photo is removed
4. Click **"Save Changes"**

## Photo Requirements

### File Types Supported:
- ✅ JPEG (.jpg, .jpeg)
- ✅ PNG (.png)
- ✅ GIF (.gif)
- ✅ WebP (.webp)
- ✅ BMP (.bmp)
- ❌ HEIC (convert to JPEG first)
- ❌ RAW formats (convert first)

### File Size:
- **Maximum:** 5MB per photo
- **Recommended:** 500KB - 1MB for best performance
- **Tip:** Compress large photos before uploading

### Image Dimensions:
- **Minimum:** 200x200 pixels
- **Recommended:** 400x400 to 800x800 pixels
- **Aspect Ratio:** Square photos work best
- **Note:** Photos are automatically cropped to circles

## Where Photos Appear

### 1. Person Cards in Tree View
- Small circular photo (4rem/64px)
- Appears above person's name
- Visible in both Pedigree and Descendants views
- Hover for larger view

### 2. Person Details Modal
- Larger photo at top of modal
- Full width display (up to 12rem/192px)
- Appears when clicking on person card

### 3. People List
- Photos appear next to names
- Helps identify people quickly
- Sortable by name

## Photo Storage

### How Photos Are Stored:
- **Format:** Base64 Data URLs
- **Location:** Browser localStorage
- **Persistence:** Saved with all other data
- **Export:** Included in JSON exports
- **Import:** Supported in JSON imports

### Storage Considerations:
- Photos increase data size significantly
- Browser localStorage typically limited to 5-10MB total
- Recommend 20-50 photos maximum
- Use compressed images for more photos
- Export regularly to backup photos

### Storage Tips:
1. **Compress photos** before uploading
2. **Use JPEG** instead of PNG for photos
3. **Resize** to 400x400 or 600x600 pixels
4. **Export regularly** to backup
5. **Monitor storage** in Data tab

## Best Practices

### Photo Selection:
- ✅ Use clear, well-lit photos
- ✅ Face should be visible and centered
- ✅ Square aspect ratio works best
- ✅ Recent photos for living persons
- ✅ Historical photos for deceased
- ❌ Avoid group photos (hard to see face)
- ❌ Avoid low-resolution images
- ❌ Avoid photos with text overlays

### Photo Preparation:
1. **Crop** to square (1:1 aspect ratio)
2. **Resize** to 400-800 pixels
3. **Compress** to reduce file size
4. **Adjust brightness** if needed
5. **Save as JPEG** for smaller size

### Recommended Tools:
- **Online:** TinyPNG, Squoosh, Compressor.io
- **Desktop:** GIMP, Paint.NET, Photoshop
- **Mobile:** Built-in photo editors
- **Batch:** ImageMagick, XnConvert

## Privacy & Photos

### Automatic Privacy:
- Photos **automatically hidden** for living persons
- Living = born < 100 years ago, no death date
- Privacy badge shown instead of photo
- Photo still stored, just not displayed

### Manual Privacy:
- Add death date to show photo
- Or wait until person is >100 years old
- Edit privacy settings in future update

## Troubleshooting

### "Photo must be less than 5MB"
- **Solution:** Compress the image
- Use online tools like TinyPNG
- Resize to smaller dimensions
- Convert PNG to JPEG

### "Please select an image file"
- **Solution:** Ensure file is an image
- Check file extension (.jpg, .png, etc.)
- Try different image file
- Convert HEIC to JPEG on iPhone

### Photo Not Appearing
- **Check:** Is person marked as living?
- **Check:** Did you click "Save Changes"?
- **Check:** Refresh the page
- **Check:** Browser console for errors

### Photo Quality Poor
- **Solution:** Upload higher resolution
- Minimum 200x200 pixels
- Recommended 400x400 or larger
- Use original photo, not screenshot

### Photos Disappeared After Import
- **Check:** Did you import JSON with photos?
- **Check:** GEDCOM doesn't include photos
- **Check:** CSV doesn't include photos
- **Solution:** Re-add photos after import

### Browser Storage Full
- **Solution:** Reduce number of photos
- Compress existing photos
- Export data and clear storage
- Use fewer/smaller photos

## Advanced Tips

### Batch Photo Preparation:
```bash
# Using ImageMagick to batch resize and compress
magick mogrify -resize 600x600^ -gravity center -extent 600x600 -quality 85 *.jpg
```

### Optimal Photo Settings:
- **Format:** JPEG
- **Dimensions:** 600x600 pixels
- **Quality:** 80-85%
- **File Size:** 50-200KB
- **Color Space:** sRGB

### Photo Organization:
1. Keep original photos in separate folder
2. Create "family-tree-photos" folder
3. Name files: "firstname-lastname.jpg"
4. Resize and compress before uploading
5. Upload in batches

## Future Photo Features

Coming soon:
- 📸 Multiple photos per person
- 🖼️ Photo gallery view
- 🔄 Photo sync with cloud storage
- 📥 Bulk photo import
- 🎨 Photo editing tools
- 🏷️ Photo tagging and captions
- 📅 Photo date/location metadata
- 👥 Face detection and auto-tagging

## FAQ

**Q: Can I add multiple photos per person?**
A: Currently one photo per person. Multiple photos coming soon.

**Q: Are photos included in exports?**
A: Yes, in JSON exports. Not in GEDCOM (not supported by standard).

**Q: Can I import photos from Ancestry/FamilySearch?**
A: Not directly. Download photos separately and upload manually.

**Q: What happens to photos when I delete a person?**
A: Photos are deleted with the person. Export first to backup.

**Q: Can I use photos from the internet?**
A: Yes, but respect copyright. Use family photos you own.

**Q: Do photos slow down the app?**
A: Slightly. Use compressed photos for best performance.

**Q: Can I see all photos at once?**
A: Not yet. Photo gallery view coming in future update.

**Q: Are photos backed up?**
A: Only when you export data. Export regularly to backup photos.

## Support

For photo-related issues:
1. Check browser console (F12) for errors
2. Verify image file is valid
3. Try different image
4. Check storage isn't full
5. Export and re-import data

## Tips for Best Results

1. **Use square photos** - Circular display works best with square images
2. **Compress before upload** - Smaller files = better performance
3. **Export regularly** - Backup photos with data exports
4. **Test with one photo** - Verify it works before adding many
5. **Keep originals** - Store original photos separately
6. **Use consistent quality** - Similar resolution for all photos
7. **Add photos gradually** - Don't upload 100 photos at once
8. **Monitor storage** - Check Data tab for storage usage