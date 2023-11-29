<template>
    <div class="grid justify-items-center h-full w-screen">
        <h1 class="mt-32 text-4xl">BARBER SETTINGS</h1>
        <div class="flex w-screen mt-8 px-8 gap-8">
            <div class="w-1/2 grid justify-items-center border-2 border-white">
                <h2 class="text-2xl">BARBERS</h2>
                <div class="w-full px-8 py-4">
                    <div v-for="user of users" :key="user.id" class="my-2">
                        <div class="w-full h-0.5 bg-white"></div>
                        <div class="flex justify-between mt-1">
                            <p>name</p>
                            <p>{{ user.uid }}</p>
                            <div class="flex gap-2">
                                <p>Barber</p>
                                <input v-if="user.role == 'ADMIN'" class="mt-1" type="checkbox" checked>
                                <input v-else class="mt-1" type="checkbox">
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit"
                class="Raleway-bold mt-2 mb-4 w-24  border-2 border-yellow-600 bg-yellow-600 py-2 px-4 font-semibold  hover:bg-yellow-700 focus:outline-none focus-visible:border-yellow-600 focus-visible:bg-yellow-700 focus-visible:ring-2 focus-visible:ring-yellow-300"
                >
                    SAVE
                </button>
            </div>
            <div class="w-1/2 grid justify-items-center border-2 border-white">
                    <h2 class="text-2xl">HOLIDAYS</h2>
                    <div class="w-full px-8 py-4">
                        <div v-for="vacation of getVacationsResult?.vacations" :key="vacation.id" class="my-2">
                            <div class="w-full h-0.5 bg-white"></div>
                            <div class="flex justify-between mt-1">
                                <p>name</p>
                                <p>{{ handleDates(new Date(vacation.startDate)) }} - {{ handleDates(new Date(vacation.endDate)) }}</p>
                                <div class="flex gap-2">
                                    <button class="px-2 py-1 bg-green-500">
                                        <p>accept</p>
                                    </button>
                                    <button class="px-2 py-1 bg-red-500">
                                        <p>decline</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useQuery } from '@vue/apollo-composable'
    import { GET_ALL_USERS } from '@/graphql/user.query'
    import { GET_ALL_VACATIONS } from '@/graphql/vacations.query'
    import { ref, watchEffect } from 'vue';
    
    const hasFetchedData = ref(false);
    let users = []

    const {
        result: getUsersResult,
        refetch
    } = useQuery(GET_ALL_USERS)
    
    watchEffect(() => {
        if (getUsersResult.value) {
            hasFetchedData.value = true;
            console.log(getUsersResult?.value.users)
            users = getUsersResult?.value.users
    } else if (hasFetchedData.value) {
        console.log('Retrying data fetch...');
        refetch();
    } else {
        console.log('No data');
        refetch();
    }
});
    
    const {
        result: getVacationsResult,
    } = useQuery(GET_ALL_VACATIONS  )
    
    const handleDates = (date) =>{
        const dateObject = new Date(date)
        const year = dateObject.getFullYear();
        const month = dateObject.toLocaleString('default', { month: 'long' });
        const day = dateObject.getDate();
        const formattedDate = `${day} ${month} ${year}`
        console.log(formattedDate)
        return formattedDate
    }

</script>