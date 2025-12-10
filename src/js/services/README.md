# API Services Guide

This directory contains API service files that handle data fetching from your backend.

## How It Works

### 1. **Dummy API Setup** (Current)
   - JSON files stored in `public/api/` folder
   - Real HTTP requests using `fetch()`
   - You can see requests in browser DevTools Network tab
   - Simulates real API behavior

### 2. **API Service File** (`navigationApi.js`)
   - Imports navigation data from `src/api/navigation.json` (single source of truth)
   - Router and API service both use the same file
   - Easy to switch to real API endpoints when needed

### 3. **Component Usage** (`AppSideBar.vue`)
   - Imports the API function
   - Calls it when component loads (`onMounted`)
   - Handles loading and error states
   - Updates UI with fetched data

## How to Add More API Endpoints

**Option 1: Static Data (Recommended for navigation/routes)**
1. Create a new JSON file in `src/api/` folder
   - Example: `src/api/users.json`
2. Import directly in your service:
```javascript
import usersData from '@/api/users.json'

export async function fetchUsers() {
    return usersData
}
```

**Option 2: Dynamic API Calls**
1. Create a JSON file in `public/api/` folder (for development)
   - Example: `public/api/users.json`
2. Create a function in the API service:
```javascript
export async function fetchUsers() {
    const response = await fetch('/api/users.json')
    return await response.json()
}
```

## Switching to Real API

When you're ready to use a real API:

1. Open `navigationApi.js`
2. Change the `API_BASE_URL` constant:
```javascript
const API_BASE_URL = 'https://your-api.com/api'
```
3. Update the endpoint:
```javascript
const response = await fetch(`${API_BASE_URL}/navigation`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${yourToken}`
    }
})
```
4. Remove the `delay()` function call (no artificial delay needed)

## Best Practices

✅ **Do:**
- Keep API logic separate from components
- Handle loading and error states
- Use async/await for cleaner code
- Add comments explaining what each function does

❌ **Don't:**
- Put API calls directly in components
- Forget to handle errors
- Make API calls without loading states

## Creating New API Services

1. Create a new file: `src/js/services/yourApi.js`
2. Export functions that return promises
3. Import and use in your components

Example:
```javascript
export async function fetchYourData() {
    const response = await fetch('/api/your-endpoint')
    return await response.json()
}
```

