// Import navigation data directly (single source of truth)
import navigationData from '@/api/navigation.json'

// Fetches all navigation menu items
// Using direct import for consistency, but keeping async function signature for compatibility
export async function fetchNavigationItems() {
    try {
        // Return navigation data directly (no API call needed)
        return navigationData
    } catch (error) {
        console.error('Error loading navigation items:', error)
        throw error
    }
}

// Fetches a single navigation item by its ID
export async function fetchNavigationItemById(itemId) {
    try {
        const items = await fetchNavigationItems()
        return items.find(item => item.id === itemId) || null
    } catch (error) {
        console.error(`Error fetching navigation item ${itemId}:`, error)
        throw error
    }
}

