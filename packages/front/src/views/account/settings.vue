<template>
    <div class="grid justify-items-center h-full w-screen">
        <h1 class="mt-32 text-4xl">{{ $t('account.dashboard.barberSettings') }}</h1>
        <div class="lg:flex w-screen mt-8 px-4 sm:px-8 gap-8">
            <div class="lg:w-1/2 grid justify-items-center border-2 border-white py-2">
                <h2 class="text-2xl mb-2">{{ $t('account.dashboard.barbers') }}</h2>
                <div class="w-full px-4 sm:px-8 py-4 pt-0 max-h-32 sm:max-h-40 lg:max-h-72 overflow-scroll overflow-x-hidden">
                    <div v-for="user of getUsersResult?.users " :key="user.id" class="my-2">
                        <div class="w-full h-0.5 bg-white"></div>
                        <div class="flex justify-between mt-1">
                            <p class="max-sm:text-sm">{{user.userName}}</p>
                            <p class="max-sm:text-sm max-sm:hidden">{{ user.uid }}</p>
                            <div class="flex gap-2">
                                <p>{{ $t('account.dashboard.barber') }}</p>
                                <input @click="handleRoleChange(user.id, 'USER')" v-if="user.role == 'ADMIN' || user.role == 'SUPER_ADMIN'" class="mt-1" type="checkbox" checked>
                                <input @click="handleRoleChange(user.id, 'ADMIN')" v-else class="mt-1" type="checkbox">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="lg:w-1/2 grid justify-items-center border-2 border-white max-lg:mt-8">
                    <h2 class="text-2xl">{{ $t('account.dashboard.holidays') }}</h2>
                    <div class="w-full px-4 sm:px-8 max-h-32 sm:max-h-40 lg:max-h-72 overflow-scroll overflow-x-hidden">
                        <div v-for="vacation of vacationList" :key="vacation.id" class="my-2">
                            <div class="w-full h-0.5 bg-white"></div>
                            <div class="flex justify-between mt-1">
                                <p class="max-sm:text-xs">{{vacation.hairdresser.name}}</p>
                                <p class="max-sm:text-xs text-center">{{ handleDates(vacation.startDate) }} - {{ handleDates(vacation.endDate) }}</p>
                                <div class="flex gap-2">
                                    <button @click="handleApproveVacation(vacation.id)" class="px-1 sm:px-2 py-1 Raleway-bold border-2 border-green-600 bg-green-600  hover:bg-green-700 focus:outline-none focus-visible:border-green-600 focus-visible:bg-green-700 focus-visible:ring-2 focus-visible:ring-green-300">
                                        <p class="text-xs sm:text-sm">{{ $t('account.dashboard.accept') }}</p>
                                    </button>
                                    <button @click="handleRemoveVacation(vacation.id)" class="px-1 sm:px-2 py-1 Raleway-bold border-2 border-red-600 bg-red-600  hover:bg-red-700 focus:outline-none focus-visible:border-red-600 focus-visible:bg-red-700 focus-visible:ring-2 focus-visible:ring-red-300">
                                        <p class="text-xs sm:text-sm">{{ $t('account.dashboard.decline') }}</p>
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
    import { useMutation, useQuery } from '@vue/apollo-composable'
    import { GET_ALL_USERS } from '@/graphql/user.query'
    import { GET_ALL_VACATIONS } from '@/graphql/vacation.query'
    import { APPROVE_VACATION, REMOVE_VACATION } from '@/graphql/vacation.mutation'
    import { ref, watchEffect } from 'vue';
    import { GET_ALL_HAIRDRESSERS } from '@/graphql/hairdressers.query'
    import type { CustomAppointment } from '@/interfaces/custom.appointment.interface';
    import { UPDATE_USER_ROLE } from '@/graphql/user.mutation';
import type { CustomUser } from '@/interfaces/custom.user.interface';
import type { CustomVacation } from '@/interfaces/custom.vacation.interface';
import type { Ref } from 'vue';
    
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
        onResult
    } = useQuery(GET_ALL_VACATIONS  )

    onResult((result) => {
    if (!result.loading) {
        console.log(result)
        checkVacations()
    }
})

    const vacationList: Ref<CustomVacation[]> = ref([])
    
    const handleDates = (date:string) =>{
        const dateObject = new Date(date)
        const year = dateObject.getFullYear();
        const month = dateObject.toLocaleString('default', { month: 'long' });
        const day = dateObject.getDate();
        const formattedDate = `${day} ${month} ${year}`
        return formattedDate
    }

    const checkVacations = () => {
        if (getVacationsResult.value) {
            for (let i = 0; i < getVacationsResult.value.vacations.length; i++) {
                if (getVacationsResult.value.vacations[i].isApproved == false) {
                    vacationList.value.push(getVacationsResult.value.vacations[i])
                }
            }
            console.log(vacationList.value)
        }
    }

    const {
    mutate: approveVacation,
    loading: approveVacationLoading,
} = useMutation<CustomAppointment>(APPROVE_VACATION)

    const handleApproveVacation = (vacationid:string) => {
        console.log('approving vacation')
        console.log(vacationid)
        approveVacation({
            id: vacationid
        })
        location.reload();
    }

    const {
    mutate: removeVacation,
    loading: removeVacationLoading,
} = useMutation<CustomAppointment>(REMOVE_VACATION)

    const handleRemoveVacation = (vacationid:string) => {
        console.log('removing vacation')
        console.log(vacationid)
        removeVacation({
            id: vacationid
        })
        location.reload();
    }

    const {
    mutate: changeRole,
    loading: changeRoleLoading,
} = useMutation<CustomUser>(UPDATE_USER_ROLE)

    const handleRoleChange = (userid:string, role:string) => {
        console.log('changing role')
        changeRole({
            id: userid,
            role: role
        })
        location.reload();
    }

</script>