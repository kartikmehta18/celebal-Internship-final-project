
# Firebase Setup Instructions - CRITICAL FIXES NEEDED

## 🚨 IMMEDIATE ACTION REQUIRED

You're getting "Missing or insufficient permissions" and "Missing Firebase Index" errors. Follow these steps to fix them:

### Step 1: Update Firestore Security Rules

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `studybudy-37a66`
3. Go to **Firestore Database** → **Rules**
4. Replace ALL existing rules with this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow all authenticated users to read and write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Allow creating user documents for new sign-ups
      allow create: if request.auth != null && request.auth.uid == userId;
      
      // Allow admins to read all user documents
      allow read: if request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Ticket rules
    match /tickets/{ticketId} {
      // Users can read and write their own tickets
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      
      // Users can create tickets
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
      
      // Admins can read and write all tickets
      allow read, write: if request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

5. Click **Publish**

### Step 2: Create Required Firebase Indexes

**CRITICAL**: You need to create Firebase indexes for ticket queries to work.

1. **Automatic Method** (Recommended):
   - Click this link: https://console.firebase.google.com/v1/r/project/studybudy-37a66/firestore/indexes/?create_composite=Cm9wcm9qZWN0cy9zdHVkeWJ1ZHktMzdhNjYvZGF0YWJhc2VzLyhkZWZhdWx0KS9jb2xsZWN0aW9uR3JvdXBzL3RpY2tldHMvaW5kZXhlcy9fEAEaCgoGdXNlcklkEAEaDQoJY3JlYXRlZEF0EAIaDAoIX19uYW1lX18QAg
   - This will automatically create the required index for user tickets

2. **Manual Method** (If automatic doesn't work):
   - Go to **Firestore Database** → **Indexes**
   - Click **Create Index**
   - Set Collection ID: `tickets`
   - Add these fields in order:
     - `userId` (Ascending)
     - `createdAt` (Descending)
   - Click **Create**

3. **For Admin Users** (Additional Index):
   - Create another index for all tickets
   - Collection ID: `tickets`
   - Fields:
     - `createdAt` (Descending)
   - Click **Create**

### Step 3: Fix Domain Authorization

Add your current domain to Firebase Auth:

1. Go to **Authentication** → **Settings** → **Authorized domains**
2. Add your current domain: `ee548a2e-8045-44db-9361-0220ed067f26.lovableproject.com`
3. Save changes

### Step 4: Test the Setup

1. Sign out and sign in again with Google
2. The app should redirect to `/dashboard` instead of `/profile`
3. Tickets should load without errors
4. `kartikmehta650@gmail.com` will automatically be set as admin

## Common Issues & Solutions

### "Missing or insufficient permissions"
- Make sure you've applied the Firestore rules above
- Sign out and sign in again after updating rules

### "The query requires an index"
- Follow Step 2 above to create the required Firebase indexes
- Wait 1-2 minutes after creating indexes for them to become active

### "Unauthorized domain"
- Add your domain to Firebase Auth authorized domains
- Check that you're using the correct Firebase project

### Cross-Origin-Opener-Policy warnings
- These are browser warnings and won't break functionality
- They occur due to popup-based authentication

## Admin Account
- `kartikmehta650@gmail.com` is automatically set as admin when first signing in
- Admin users can see all tickets and manage the system

## Index Status Check
After creating indexes, you can check their status:
1. Go to **Firestore Database** → **Indexes**
2. Look for indexes with status "Building" or "Ready"
3. Wait for all indexes to show "Ready" status

## Need Help?
If you're still seeing errors after following these steps:
1. Check browser console for specific error messages
2. Verify you're signed into the correct Google account
3. Clear browser cache and cookies
4. Try signing in from an incognito window
5. Make sure all Firebase indexes show "Ready" status
