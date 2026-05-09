/**
 * Firebase Configuration Template for Family Tree App
 * 
 * This file provides a template for setting up Firebase services
 * for photo storage and optional authentication features.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://console.firebase.google.com/
 * 2. Create a new project (or use existing)
 * 3. Add a web app to your project
 * 4. Copy the configuration values
 * 5. Replace the placeholder values below
 * 6. Rename this file to 'firebase-config.js' (remove -template)
 * 7. Enable Firebase Storage in Firebase Console
 * 8. Set up Storage Rules (see below)
 */

// Firebase Configuration
const firebaseConfig = {
  apiKey: "YOUR-API-KEY-HERE",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

// Initialize Firebase
let app, storage, auth;

try {
  // Check if Firebase is loaded
  if (typeof firebase !== 'undefined') {
    app = firebase.initializeApp(firebaseConfig);
    storage = firebase.storage();
    auth = firebase.auth();
    
    console.log('Firebase initialized successfully');
    
    // Optional: Enable offline persistence
    // firebase.firestore().enablePersistence()
    //   .catch((err) => {
    //     console.warn('Persistence error:', err.code);
    //   });
  } else {
    console.warn('Firebase SDK not loaded. Photo storage features will be disabled.');
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
}

/**
 * FIREBASE STORAGE RULES
 * 
 * Go to Firebase Console → Storage → Rules
 * Replace the default rules with these:
 */

/*
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow authenticated users to upload/read their own photos
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Public photos (optional - for sharing)
    match /public/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Limit file size to 5MB
    match /{allPaths=**} {
      allow write: if request.resource.size < 5 * 1024 * 1024;
    }
  }
}
*/

/**
 * FIREBASE AUTHENTICATION SETUP (Optional)
 * 
 * If you want user accounts:
 * 1. Go to Firebase Console → Authentication
 * 2. Enable sign-in methods (Email/Password, Google, etc.)
 * 3. Use the functions below
 */

// Sign up new user
async function signUp(email, password) {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    console.log('User created:', userCredential.user.uid);
    return userCredential.user;
  } catch (error) {
    console.error('Sign up error:', error.message);
    throw error;
  }
}

// Sign in existing user
async function signIn(email, password) {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    console.log('User signed in:', userCredential.user.uid);
    return userCredential.user;
  } catch (error) {
    console.error('Sign in error:', error.message);
    throw error;
  }
}

// Sign out
async function signOut() {
  try {
    await auth.signOut();
    console.log('User signed out');
  } catch (error) {
    console.error('Sign out error:', error.message);
    throw error;
  }
}

// Check authentication state
auth?.onAuthStateChanged((user) => {
  if (user) {
    console.log('User is signed in:', user.uid);
    // Update UI for signed-in user
  } else {
    console.log('User is signed out');
    // Update UI for signed-out user
  }
});

/**
 * PHOTO UPLOAD EXAMPLE
 */

async function uploadPhoto(file, personId) {
  if (!storage) {
    throw new Error('Firebase Storage not initialized');
  }
  
  if (!auth.currentUser) {
    throw new Error('User must be signed in to upload photos');
  }
  
  try {
    // Create a reference to the file location
    const userId = auth.currentUser.uid;
    const fileName = `${Date.now()}_${file.name}`;
    const storageRef = storage.ref(`users/${userId}/photos/${personId}/${fileName}`);
    
    // Upload the file
    const snapshot = await storageRef.put(file);
    
    // Get the download URL
    const downloadURL = await snapshot.ref.getDownloadURL();
    
    console.log('Photo uploaded:', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('Upload error:', error.message);
    throw error;
  }
}

/**
 * PHOTO DELETE EXAMPLE
 */

async function deletePhoto(photoURL) {
  if (!storage) {
    throw new Error('Firebase Storage not initialized');
  }
  
  try {
    const photoRef = storage.refFromURL(photoURL);
    await photoRef.delete();
    console.log('Photo deleted');
  } catch (error) {
    console.error('Delete error:', error.message);
    throw error;
  }
}

/**
 * COST ESTIMATION
 * 
 * Firebase Free Tier (Spark Plan):
 * - Storage: 5 GB
 * - Downloads: 1 GB/day
 * - Uploads: 20,000/day
 * 
 * This is usually sufficient for personal family tree apps.
 * 
 * Paid Plan (Blaze - Pay as you go):
 * - Storage: $0.026/GB/month
 * - Downloads: $0.12/GB
 * - Uploads: Free
 * 
 * Example: 100 photos (50MB each) = 5GB storage
 * Cost: ~$0.13/month
 */

/**
 * PRIVACY CONSIDERATIONS
 * 
 * ⚠️ IMPORTANT: Firebase stores data on Google's servers.
 * 
 * For maximum privacy:
 * 1. Don't use Firebase - keep everything client-side
 * 2. Use Firebase only for non-sensitive photos
 * 3. Encrypt photos before uploading
 * 4. Use Firebase Storage Rules to restrict access
 * 5. Enable authentication to protect user data
 * 
 * Alternative: Use browser's IndexedDB for local photo storage
 */

/**
 * ALTERNATIVE: LOCAL STORAGE (No Firebase)
 * 
 * For complete privacy, store photos in browser's IndexedDB:
 */

async function storePhotoLocally(file, personId) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const photoData = {
        personId: personId,
        data: e.target.result,
        name: file.name,
        type: file.type,
        size: file.size,
        uploadedAt: new Date().toISOString()
      };
      
      // Store in localStorage (limited to ~5-10MB)
      // Or use IndexedDB for larger storage
      const photos = JSON.parse(localStorage.getItem('familyPhotos') || '[]');
      photos.push(photoData);
      localStorage.setItem('familyPhotos', JSON.stringify(photos));
      
      resolve(photoData);
    };
    
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * EXPORT CONFIGURATION
 */

// Make functions available globally if needed
if (typeof window !== 'undefined') {
  window.firebaseApp = app;
  window.firebaseStorage = storage;
  window.firebaseAuth = auth;
  window.uploadPhoto = uploadPhoto;
  window.deletePhoto = deletePhoto;
  window.signUp = signUp;
  window.signIn = signIn;
  window.signOut = signOut;
}

/**
 * TESTING
 * 
 * To test Firebase setup:
 * 1. Open browser console
 * 2. Run: console.log(firebaseApp)
 * 3. Should see Firebase app object
 * 4. Try uploading a test photo
 */

console.log('Firebase config template loaded. Replace placeholder values with your actual Firebase configuration.');

// Made with Bob
