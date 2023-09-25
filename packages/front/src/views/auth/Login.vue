<template>
    <RouterLink
        to="/"
        class="mt-1 inline-block rounded text-sm text-blue-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 dark:text-blue-200"
      >
        home
      </RouterLink>
    <div>Login</div>
    <RouterLink
        to="/auth/forgotpassword"
        class="mt-1 inline-block rounded text-sm text-blue-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 dark:text-blue-200"
      >
        Forgot password?
      </RouterLink>
    <div class="flex justify-center">
      <RouterLink
        class="mt-3 inline-block rounded text-center text-sm text-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
        to="/auth/register"
      >
        Need to create an account?
      </RouterLink>
    </div>
</template>