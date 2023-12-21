<template>
    <div class="sm:flex w-full h-screen items-center">
        <NavigationAccount />
        <div class="w-full grid mt-6 sm:mt-32 px-8 sm:px-24">
            <h1 class="text-3xl md:text-5xl Raleway-bold justify-self-center">{{ $t('account.myAppointments.hello') }} {{ firebaseUser?.displayName }}</h1>
            <div class="flex">
                <div class="mt-4 max-sm:ml-16" v-for="appointment of getAllAppointmentsByUid?.appointmentsByUid">
                    <div class="">
                        <div class="relative w-40 md:w-48">
                            <img :src="'/barbers/' + appointment.hairdresser.name + '.jpg'" alt="Image" class="w-40 md:w-48" />
                            <div class="absolute bottom-32 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent"></div>
                            <div class="absolute bottom-0 left-0 w-full h-32 bg-black"></div>
                            <div class="relative flex ml-2 gap-1 mb-2">
                                <img src="/icons/Calendar.svg" alt="" class="h-5">
                                <p class="Raleway text-xs md:text-sm">{{ date(appointment.date) }}</p>
                            </div>
                            <div class="relative flex ml-4 gap-2 mb-2">
                                <img src="/icons/man.svg" alt="" class="h-5">
                                <p class="Raleway text-sm">{{ appointment.hairdresser.name }}</p>
                            </div>
                            <div class="relative flex ml-2 gap-1 pb-2">
                                <img src="/icons/cut.svg" alt="" class="h-5 mt-1.5">
                                <div v-for="service of appointment.services">
                                    <p class="Raleway text-xs md:text-sm mt-1">{{ service.name }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="pt-1 pb-2 px-2 bg-black">
                            <button :onclick="() => handleDeleteAppointment(appointment?.id)" class="w-full max-md:text-xs Raleway-bold  border-2 border-red-500 bg-red-500 p-2 hover:bg-red-600 focus:outline-none focus-visible:border-red-500 focus-visible:bg-red-600 focus-visible:ring-2 focus-visible:ring-red-300">{{ $t('account.myAppointments.cancel') }}</button>
                        </div>
                    </div>
                </div>
                <div v-if="getAllAppointmentsByUid?.appointmentsByUid.length == 0" class="flex justify-center mt-48 mb-64 w-full">
                    <h1 class="text-2xl sm:text-xl lg:text-2xl justify-self-center text-center">You don't have any appointments yet</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.Raleway {
    font-family: 'Raleway', sans-serif;
}

.Raleway-bold {
    font-family: 'Raleway-Bold', sans-serif;
}
</style>

<script setup lang="ts">
import useFirebase from '@/composables/useFirebase'
import NavigationAccount from '@/components/navigationAccount.vue';
import { useMutation, useQuery } from '@vue/apollo-composable';
import { GET_ALL_APPOINTMENTS_BY_UID } from '@/graphql/appointments.query';
import { DELETE_APPOINTMENT_BY_ID } from '@/graphql/appointment.mutation';

const { firebaseUser } = useFirebase()
let datum = ''

const {
    result: getAllAppointmentsByUid,
} = useQuery(GET_ALL_APPOINTMENTS_BY_UID, {
    "isOpen": false,
})

console.log(getAllAppointmentsByUid)

const {
    mutate: deleteAppointment,
} = useMutation(DELETE_APPOINTMENT_BY_ID)

const handleDeleteAppointment = async (id: string) => {
    await deleteAppointment({
        id: id
    })
    location.reload()
}

const date = (givendate:string) => {
    const inputDate = new Date(givendate);

    // Extracting date information
    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = dayOfWeek[inputDate.getDay()];

    // Extracting time information
    const hours = inputDate.getHours();
    const minutes = inputDate.getMinutes();
    const period = hours < 12 ? 'AM' : 'PM';
    datum = `${day} ${inputDate.getDate()}/${inputDate.getMonth() + 1}/${inputDate.getFullYear()} ${hours % 12 || 12}.${minutes < 10 ? '0' : ''}${minutes} ${period}`;

    return datum;
};

</script>