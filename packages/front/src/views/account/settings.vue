<template>
    <!-- <div class="grid justify-items-center h-full w-screen">
        <h1 class="mt-32 text-4xl">BARBER SETTINGS</h1>
        <div class="flex w-screen mt-8 px-8 gap-8">
            <div class="w-1/2 grid justify-items-center border-2 border-white">
                <h2 class="text-2xl">BARBERS</h2>
                <div class="w-full px-8 py-4">
                    <div v-for="user of getUsersResult?.users " :key="user.id" class="my-2">
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
                                <p>{{getHairdresserName(vacation.hairdresserId)}}</p>
                                <p>{{ handleDates(new Date(vacation.startDate)) }} - {{ handleDates(new Date(vacation.endDate)) }}</p>
                                <div class="flex gap-2">
                                    <button class="px-2 py-1 Raleway-bold border-2 border-green-600 bg-green-600  hover:bg-green-700 focus:outline-none focus-visible:border-green-600 focus-visible:bg-green-700 focus-visible:ring-2 focus-visible:ring-green-300">
                                        <p>accept</p>
                                    </button>
                                    <button class="px-2 py-1 Raleway-bold border-2 border-red-600 bg-red-600  hover:bg-red-700 focus:outline-none focus-visible:border-red-600 focus-visible:bg-red-700 focus-visible:ring-2 focus-visible:ring-red-300">
                                        <p>decline</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div> -->
    <div class="flex h-full w-full mt-80 justify-center">
        <h1 class="text-2xl">We're diligently crafting this page to match the precision of our barbers' artistry!</h1>
    </div>
</template>

<script setup lang="ts">
    import { useQuery } from '@vue/apollo-composable'
    import { GET_ALL_USERS } from '@/graphql/user.query'
    import { GET_ALL_VACATIONS } from '@/graphql/vacations.query'
    import { ref, watchEffect } from 'vue';
    import { GET_ALL_HAIRDRESSERS } from '@/graphql/hairdressers.query'
    
    const hasFetchedData = ref(false);

    const {
        result: getHairdressersResult,
        refetch
    } = useQuery(GET_ALL_HAIRDRESSERS)
    
    const {
        result: getUsersResult,
    } = useQuery(GET_ALL_USERS)
    
    watchEffect(() => {
        if (getHairdressersResult.value) {
                hasFetchedData.value = true;
                console.log(getHairdressersResult?.value)
        }
        else {
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
        return formattedDate
    }

    const getHairdresserName = (hairdresserId) => {
        if(getHairdressersResult.value){
            for (const hairdresser of getHairdressersResult.value?.hairdressers) {
                if (hairdresser.id == hairdresserId) {
                    console.log(hairdresser)
                    return hairdresser.name
                }
            }
        }
    }

</script>