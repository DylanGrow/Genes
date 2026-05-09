# 🔥 Firebase Storage Setup Guide

This guide will help you set up Firebase Storage for cloud photo storage in your Family Tree app.

## Why Firebase Storage?

- **Free Tier**: 5GB storage and 1GB/day download bandwidth
- **Easy Setup**: Simple configuration, no server required
- **Automatic Scaling**: Handles traffic spikes automatically
- **Secure**: Built-in security rules and authentication
- **Fast**: Global CDN for quick photo loading

## Step-by-Step Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or select an existing project
3. Enter a project name (e.g., "Family Tree App")
4. (Optional) Enable Google Analytics
5. Click **"Create project"**

### 2. Enable Firebase Storage

1. In your Firebase project, click **"Build"** in the left sidebar
2. Click **"Storage"**
3. Click **"Get started"**
4. Choose **"Start in test mode"** (we'll secure it later)
5. Select a Cloud Storage location (choose closest to your users)
6. Click **"Done"**

### 3. Get Your Firebase Configuration

1. In Firebase Console, click the **gear icon** ⚙️ next to "Project Overview"
2. Click **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **Web icon** `</>` to add a web app
5. Enter an app nickname (e.g., "Family Tree Web")
6. Click **"Register app"**
7. Copy the `firebaseConfig` object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

### 4. Update Your App Configuration

1. Open `js/firebase-config.js` in your project
2. Replace the placeholder `firebaseConfig` object with your actual configuration:

```javascript
// REPLACE THIS WITH YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

3. Save the file
4. Refresh your app in the browser

### 5. Configure Storage Security Rules

For better security, update your Storage rules:

1. In Firebase Console, go to **Storage → Rules**
2. Replace the default rules with these:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow authenticated users to read/write their own photos
    match /photos/{personId}/{fileName} {
      allow read: if request.auth != null;
      allow write: if request.auth != null 
                   && request.resource.size < 5 * 1024 * 1024  // Max 5MB
                   && request.resource.contentType.matches('image/.*');
    }
    
    // Allow authenticated users to read/write thumbnails
    match /thumbnails/{personId}/{fileName} {
      allow read: if request.auth != null;
      allow write: if request.auth != null 
                   && request.resource.size < 1 * 1024 * 1024;  // Max 1MB
    }
  }
}
```

3. Click **"Publish"**

### 6. Enable Authentication (Recommended)

For the security rules above to work, enable authentication:

1. In Firebase Console, go to **Build → Authentication**
2. Click **"Get started"**
3. Click **"Anonymous"** under Sign-in providers
4. Toggle **"Enable"**
5. Click **"Save"**

The app will automatically sign in users anonymously.

## Testing Your Setup

1. Open your Family Tree app
2. Navigate to a person's card
3. Click **"Upload Photo"** button
4. Select an image file
5. Click **"Upload Photos"**
6. If successful, you'll see a success notification
7. The photo should appear in the person's card

## Troubleshooting

### "Firebase not configured" warning

**Problem**: You see a yellow warning banner at the top of the page.

**Solution**: 
- Make sure you've updated `js/firebase-config.js` with your actual Firebase configuration
- Refresh the page after updating the config

### "Permission denied" error

**Problem**: Upload fails with permission error.

**Solution**:
- Make sure you've enabled Anonymous Authentication
- Check your Storage security rules
- For testing, you can temporarily use these permissive rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;  // WARNING: Only for testing!
    }
  }
}
```

### Photos not loading

**Problem**: Photos uploaded but don't display.

**Solution**:
- Check browser console for errors
- Verify the photo URLs in your browser's Network tab
- Make sure your Storage bucket is public or authentication is working

### Upload fails silently

**Problem**: Upload progress shows but nothing happens.

**Solution**:
- Check file size (must be under 5MB)
- Check file type (must be image: JPG, PNG, GIF, WebP)
- Check browser console for detailed error messages

## Storage Limits & Pricing

### Free Tier (Spark Plan)
- **Storage**: 5 GB
- **Downloads**: 1 GB/day
- **Uploads**: 20,000/day

This is usually enough for:
- ~1,000-2,000 family photos (at ~2-3MB each after compression)
- Moderate daily usage by family members

### Paid Tier (Blaze Plan)
If you exceed free limits:
- **Storage**: $0.026/GB/month
- **Downloads**: $0.12/GB
- **Uploads**: Free

Example costs:
- 10 GB storage = ~$0.26/month
- 5 GB downloads = ~$0.60/month

## Best Practices

### 1. Photo Optimization
The app automatically:
- Compresses photos to reduce file size
- Resizes large images to max 1200x1200px
- Creates thumbnails (200x200px) for faster loading

### 2. Storage Organization
Photos are organized by person:
```
photos/
  ├── I1/
  │   ├── 1234567890.jpg
  │   └── 1234567891.jpg
  └── I2/
      └── 1234567892.jpg

thumbnails/
  ├── I1/
  │   ├── 1234567890.jpg
  │   └── 1234567891.jpg
  └── I2/
      └── 1234567892.jpg
```

### 3. Backup Strategy
- Firebase Storage is reliable, but consider periodic backups
- Use the Export Data feature to download all family data
- Store backups in multiple locations

### 4. Privacy Considerations
- Photos are stored in your Firebase project (you control access)
- Use security rules to restrict access
- Consider enabling authentication for better security
- Don't share your Firebase configuration publicly

## Advanced Configuration

### Custom Storage Bucket

If you want to use a custom domain or separate bucket:

1. Create a new bucket in Google Cloud Console
2. Update `storageBucket` in your config:

```javascript
const firebaseConfig = {
  // ... other config
  storageBucket: "gs://your-custom-bucket"
};
```

### CORS Configuration

If you have CORS issues, configure your bucket:

```json
[
  {
    "origin": ["*"],
    "method": ["GET", "HEAD", "PUT", "POST", "DELETE"],
    "maxAgeSeconds": 3600
  }
]
```

Apply with `gsutil`:
```bash
gsutil cors set cors.json gs://your-bucket-name
```

## Support

### Need Help?

- [Firebase Documentation](https://firebase.google.com/docs/storage)
- [Firebase Support](https://firebase.google.com/support)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/firebase-storage)

### Common Questions

**Q: Can I use this offline?**
A: Photos require internet connection to upload/download. The app works offline for viewing cached photos.

**Q: How do I delete old photos?**
A: Use the photo gallery view and click the delete button on any photo.

**Q: Can multiple people upload photos?**
A: Yes! Each person with access to the app can upload photos. Consider using Firebase Authentication for better access control.

**Q: What happens if I exceed free limits?**
A: Firebase will notify you. You can either upgrade to paid plan or reduce usage.

---

**Last Updated**: 2026-05-09
**Version**: 1.0.0