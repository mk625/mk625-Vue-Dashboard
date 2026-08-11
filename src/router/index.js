import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../components/home/AppHome.vue'
import LoginPage from '../components/auth/LoginPage.vue'
import NotFoundPage from '../components/inner-pages/NotFoundPage.vue'
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
import { useAuthStore } from '../stores/authStore.js'


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

const settingsChildMap = {}
const reportsChildMap = {}

const childMapRegistry = {
    'employees': employeesChildMap,
    'settings': settingsChildMap,
    'reports': reportsChildMap,
}


function generateRoutesFromNavigation(navigationItems) {
    const routes = []

    navigationItems.forEach(item => {

        const component = componentMap[item.id] || NotFoundPage

        if (item.path !== '/') {
            const routePath = item.path.replace(/^\//, '')

            routes.push({
                path: routePath,
                component: component,
            })
        }

        if (item.hasChildren && item.children && item.children.length > 0) {
            item.children.forEach(child => {
                const childPath = child.path.replace(/^\//, '')

                const childMap = childMapRegistry[item.id]
                const childComponent = (childMap && childMap[child.id]) || NotFoundPage

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
            path: '/login',
            name: 'login',
            component: LoginPage,
            meta: { guestOnly: true },
        },
        {
            path: '/',
            component: AppLayout,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    component: DashboardHome,
                },
                ...dynamicRoutes,
            ],
        },
        {
            path: '/:pathMatch(.*)*',
            component: NotFoundPage,
        },
    ],
})


router.beforeEach(async (to) => {
    const authStore = useAuthStore()

    if (!authStore.isReady) {
        await authStore.initAuthListener()
    }

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return {
            path: '/login',
            query: { redirect: to.fullPath },
        }
    }

    if (to.meta.guestOnly && authStore.isAuthenticated) {
        return typeof to.query.redirect === 'string' ? to.query.redirect : '/'
    }

    return true
})


export default router
