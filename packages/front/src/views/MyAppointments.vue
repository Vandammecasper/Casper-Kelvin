<template>
    <div class="flex w-full h-screen items-center">
        <div class="w-2/5 border-r-2 border-neutral-600 content-center grid justify-items-center h-80 mt-32">
            <RouterLink to="/account/myaccount">
                <h2 class="text-2xl text-neutral-700">MY ACCOUNT</h2>
            </RouterLink>
            <RouterLink to="/account/myappointments">
                <h2 class="text-3xl mt-6"> MY APPOINTMENTS</h2>
            </RouterLink>
        </div>
        
    </div>
</template>