import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../components/home/AppHome.vue'
import DashboardHome from '../components/home/home-elements/DashboardHome.vue'
import AttendanceHome from '../components/inner-pages/sidebar-pages/attendance/AttendanceHome.vue'
import EmployeesHome from '../components/inner-pages/sidebar-pages/employees/EmployeesHome.vue'
import AllEmployees from '../components/inner-pages/sidebar-pages/employees/AllEmployees.vue'
import AddEmployee from '../components/inner-pages/sidebar-pages/employees/AddEmployee.vue'
import DepartmentsHome from '../components/inner-pages/sidebar-pages/departments/DepartmentsHome.vue'
import PayrollHome from '../components/inner-pages/sidebar-pages/payroll/PayrollHome.vue'
import PerformanceHome from '../components/inner-pages/sidebar-pages/performance/PerformanceHome.vue'
import ReportsHome from '../components/inner-pages/sidebar-pages/reports/ReportsHome.vue'
import SettingsHome from '../components/inner-pages/sidebar-pages/settings/SettingsHome.vue'
import navigationData from '../api/navigation.json'

// Component mapping based on navigation item ID
const componentMap = {
    'dashboard': DashboardHome,
    'employees': EmployeesHome,
    'departments': DepartmentsHome,
    'attendance': AttendanceHome,
    'payroll': PayrollHome,
    'performance': PerformanceHome,
    'reports': ReportsHome,
    'settings': SettingsHome,
}

// Child component mapping for employees
const employeesChildMap = {
    'all-employees': AllEmployees,
    'add-employee': AddEmployee,
}

function generateRoutesFromNavigation(navigationItems) {
    const routes = []

    navigationItems.forEach(item => {
        // Get component for parent route
        const component = componentMap[item.id] || EmployeesHome

        // Add parent route (skip dashboard as it's already added)
        if (item.path !== '/') {
            const routePath = item.path.replace(/^\//, '')
            routes.push({
                path: routePath,
                component: component,
            })
        }

        // Add child routes if they exist
        if (item.hasChildren && item.children && item.children.length > 0) {
            item.children.forEach(child => {
                const childPath = child.path.replace(/^\//, '')
                // Check if there's a specific component for this child route
                let childComponent = component
                if (item.id === 'employees' && employeesChildMap[child.id]) {
                    childComponent = employeesChildMap[child.id]
                }
                routes.push({
                    path: childPath,
                    component: childComponent,
                })
            })
        }
    })

    return routes
}

// Generate routes from navigation.json
const dynamicRoutes = generateRoutesFromNavigation(navigationData)

// Create router with routes generated from navigation.json
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '',
                    component: DashboardHome,
                },
                ...dynamicRoutes,
            ],
        },
    ],
})

export default router
