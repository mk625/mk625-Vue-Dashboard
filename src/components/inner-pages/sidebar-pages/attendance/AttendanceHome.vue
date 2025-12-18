
<script setup>

</script>


<template>
    <div class="">
        <ul class="d-grid gtc-4 g-30">
            <li class="primary-dashboard-card">
                <div class="dashboard-card">
                    <header class="dashboard-card-header">
                        <div class="d-flx g-10">
                            <div class="dashboard-card-icon-container">
                                <i class="bi bi-people-fill"></i>
                            </div>
                            <div>
                                <h3 class="dashboard-card-title mB5">Total Employees</h3>
                                <h4 class="dashboard-card-title-secondary">Total Employees</h4>
                            </div>
                        </div>
                    </header>

                    <div class="dashboard-card-body">
                        <p class="dashboard-card-description">+10% than last month</p>
                    </div>
                </div>
            </li>
            <li class="">
                <div class="dashboard-card">
                    <header class="dashboard-card-header">
                        <div class="d-flx g-10">
                            <div class="dashboard-card-icon-container">
                                <i class="bi bi-people-fill"></i>
                            </div>
                            <div>
                                <h3 class="dashboard-card-title mB5">Total Employees</h3>
                                <h4 class="dashboard-card-title-secondary">Total Employees</h4>
                            </div>
                        </div>
                    </header>

                    <div class="dashboard-card-body">
                        <p class="dashboard-card-description">+10% than last month</p>
                    </div>
                </div>
            </li>
            <li class="">
                <div class="dashboard-card">
                    <header class="dashboard-card-header">
                        <div class="d-flx g-10">
                            <div class="dashboard-card-icon-container">
                                <i class="bi bi-people-fill"></i>
                            </div>
                            <div>
                                <h3 class="dashboard-card-title mB5">Total Employees</h3>
                                <h4 class="dashboard-card-title-secondary">Total Employees</h4>
                            </div>
                        </div>
                    </header>

                    <div class="dashboard-card-body">
                        <p class="dashboard-card-description">+10% than last month</p>
                    </div>
                </div>
            </li>
            <li class="">
                <div class="dashboard-card">
                    <header class="dashboard-card-header">
                        <div class="d-flx g-10">
                            <div class="dashboard-card-icon-container">
                                <i class="bi bi-people-fill"></i>
                            </div>
                            <div>
                                <h3 class="dashboard-card-title mB5">Total Employees</h3>
                                <h4 class="dashboard-card-title-secondary">Total Employees</h4>
                            </div>
                        </div>
                    </header>

                    <div class="dashboard-card-body">
                        <p class="dashboard-card-description">+10% than last month</p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>


<style scoped lang="scss">
    .dashboard-card {
        background-color: var(--c-white);
        border-radius: 8px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        padding: 20px;
    }
    .primary-dashboard-card .dashboard-card {
        background-color: var(--c-app-theme__shade-70);
    }
    .dashboard-card-header {
        margin-bottom: 10px;
    }
    .dashboard-card-icon-container {
        @include flex-AI-JC;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--c-gray-10);
        color: var(--c-white);
    }
    .primary-dashboard-card .dashboard-card-title {
        color: var(--c-app-theme);
    }
    .primary-dashboard-card .dashboard-card-title-secondary {
        color: var(--c-text-secondary);
    }
</style>
