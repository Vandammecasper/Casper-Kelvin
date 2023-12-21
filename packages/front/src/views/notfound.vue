<template>
    <div class="flex h-screen items-center justify-center">
        <div class="text-center px-8 sm:px-16 lg:px-40">
            <h1 class="text-8xl md:text-9xl text-yellow-600 Raleway-bold">404</h1>
            <h2 class="text-xl sm:text-3xl md:text-5xl text-yellow-600 Raleway-bold">It seems the style you're looking for is out of bounds.</h2>
            <h3 class="max-sm:text-sm px-4 sm:px-8 md:px-16 lg:px-24 mt-4 md:mt-6 Raleway">Looks like you've taken a detour to the land of elusive hairstyles! Our scissors couldn't find the page you're looking for, but just like a bad haircut, 404s can grow back. Head back to the homepage and let's trim down the confusion together.</h3>
            <RouterLink to="/" class="grid justify-items-center">
                <div class="border-3 lg:border-4 border-yellow-500 p-1.5 sm:p-2 relative mt-8 w-56 sm:w-64 justify-self-center">
                    <div class="border-3 lg:border-4 border-yellow-500 p-3 sm:p-4 relative">
                        <div class="sm:text-lg z-30 relative Raleway-bold">BACK TO HOMEPAGE</div>
                    </div>
                </div>
            </RouterLink>
        </div>
        
    </div>
</template>

<script setup lang="ts"></script>

<style>
.Raleway {
    font-family: 'Raleway', sans-serif;
}

.Raleway-bold {
    font-family: 'Raleway-Bold', sans-serif;
}
</style>