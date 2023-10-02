<template>
    <div class="h-32 w-screen bg-black p-4 px-16 flex justify-between">
        <RouterLink to="/">
            <img src="../../assets/logo-PhotoRoom.png" alt="logo" class="h-24">
        </RouterLink>
        <div class="flex items-center gap-16">
            <RouterLink to="/appointment">
                <h3 class="text-white">MAKE AN APPOINTMENT</h3>
            </RouterLink>
            <h3 class="text-white">ABOUT US</h3>
            <h3 class="text-white">OUR SERVICE</h3>
            <h3 class="text-white">THE CREW</h3>
            <h3 class="text-white">HALL OF FAME</h3>
            <RouterLink to="/account">
                <div class="h-16 w-16 bg-yellow-600 rounded-full flex items-center justify-center">
                    <img src="../../assets/Profile.svg" alt="profile icon" class="h-10 w-10 mb-1">
                </div>
            </RouterLink>
        </div>
    </div>
    <RouterView class="z-10"/>
</template>