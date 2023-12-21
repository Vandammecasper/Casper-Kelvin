<template>
    <div class="grid w-full h-screen content-center justify-items-center">
        <h1 class="Raleway-bold text-6xl max-lg:text-5xl max-sm:text-md mt-24 max-sm:mt-112 3xl:text-8xl">{{ $t('appointment.service.services') }}</h1>
        <div class="sm:grid sm:grid-cols-2 3xl:mt-32 justify-self-center max-xl:px-8 xl:px-24 max-xl:gap-4 xl:gap-10 max-xl:mt-4 xl:mt-8 max-lg:mt-2">
            <button
            v-for="service in getServicesResult.services"
            :key="service.id"
            :class="{
                'border-2 border-yellow-600 hover:border-yellow-600 max-sm:mt-2': isSelected(service.id),
                'p-1 hover:border-2 hover:border-neutral-600 border-2 border-transparent max-sm:mt-2': true // Add other classes as needed
            }"
            @click="toggleSelection(service.id)"
            >
            <div class="flex justify-between">
                <h3 class="text-xl max-md:text-lg 3xl:text-5xl Raleway-bold">{{ service.name }}</h3>
                <h3 class="text-xl max-md:text-lg 3xl:text-5xl Raleway-bold">€ {{ service.price }}</h3>
            </div>
            <p class="mt-2 lg:text-lg max-md:text-sm 3xl:text-3xl text-neutral-700 Raleway text-left">{{ service.description }}</p>
            </button>
        </div>
        <button v-if="cont" @click="handleContinue()" class="Raleway-bold mt-6 3xl:text-3xl 3xl:py-6 3xl:px-10 3xl:mt-24 border-2 border-yellow-600 bg-yellow-600 py-4 px-8 font-semibold  hover:bg-yellow-700 focus:outline-none focus-visible:border-yellow-600 focus-visible:bg-yellow-700 focus-visible:ring-2 focus-visible:ring-yellow-300">{{ $t('appointment.service.continue') }}</button>
        <div v-else class="Raleway-bold mt-6 bg-neutral-500 py-4 px-8 3xl:text-3xl 3xl:py-6 3xl:px-10 3xl:mt-24 font-semibold">{{ $t('appointment.service.continue') }}</div>
    </div>
    <div v-if="next" class="grid">
        <div class="fixed w-screen h-screen z-50 top-0 left-0 bg-black opacity-60 "></div>
        <div class="fixed bg-neutral-800 justify-self-center top-16 h-3/4 w-2/5 max-lg:w-3/5 max-md:w-4/5 max-md:h-4/5 absolute z-50 grid justify-items-center max-lg:px-0 max-lg:py-2 max-xl:px-2 max-xl:py-4 max-md:py-6 max-sm:py-2 px-8 py-6">
            <div class="text-center px-16 max-sm:px-10">
                <h3 class="text-2xl Raleway-bold max-sm:text-xl">{{ $t('appointment.service.selectExtras') }}</h3>
                <p class="text-neutral-600 mt-2 Raleway text-sm max-sm:text-xs">{{ $t('appointment.service.infoSelectExtras') }}</p>
            </div>
            <div v-for="extra of getExtrasResult.extras">
                <button v-if="extra?.id == selectedExtra" @click="handleExtra(extra.id)" class="mx-10 max-lg:mx-8 p-1 text-left border-2 border-yellow-600">
                    <div class="flex justify-between">
                        <h4 class="Raleway-bold max-sm:text-sm">{{ extra.name }}</h4>
                        <h4 class="Raleway-bold max-sm:text-sm">+€ {{ extra.price }}</h4>
                    </div>
                    <p class="text-neutral-600 text-sm pr-20 max-sm:pr-12 Raleway max-sm:text-xs">{{ extra.description }}</p>
                </button>
                <button v-else @click="handleExtra(extra.id)" class="mx-10 max-lg:mx-8 p-1 text-left border-2 border-transparent hover:border-neutral-600">
                    <div class="flex justify-between">
                        <h4 class="Raleway-bold max-sm:text-sm">{{ extra.name }}</h4>
                        <h4 class="Raleway-bold max-sm:text-sm">+€ {{ extra.price }}</h4>
                    </div>
                    <p class="text-neutral-600 text-sm pr-20 max-sm:pr-12 Raleway max-sm:text-xs">{{ extra.description }}</p>
                </button>
            </div>
            <router-link v-if="extra" :to="{ name: 'appointment', params: { service: selectedServices.join(','), extra: selectedExtra } }">
                <button class="mt-6 max-lg:mt-4 Raleway-bold border-2 border-yellow-600 bg-yellow-600 py-2 px-8 hover:bg-yellow-700 focus:outline-none focus-visible:border-yellow-600 focus-visible:bg-yellow-700 focus-visible:ring-2 focus-visible:ring-yellow-300">{{ $t('appointment.service.next') }}</button>
            </router-link>
            <button v-else class="mt-6 max-lg:mt-4 Raleway-bold border-2 border-neutral-600 bg-neutral-600 py-2 px-8 hover:bg-neutral-700 focus:outline-none focus-visible:border-neutral-600 focus-visible:bg-neutral-700 focus-visible:ring-2 focus-visible:ring-neutral-300 cursor-not-allowed">{{ $t('appointment.service.next') }}</button>
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

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { GET_ALL_SERVICES } from '@/graphql/services.query'
import type { CustomService } from '@/interfaces/custom.service.interface'
import { GET_ALL_EXTRAS } from '@/graphql/extras.query';

export default {
    setup() {
        const {
            result: getServicesResult,
            loading: getServicesLoading,
        } = useQuery(GET_ALL_SERVICES)

        const {
            result: getExtrasResult,
            loading: getExtrasLoading,
        } = useQuery(GET_ALL_EXTRAS)

        return {
            getServicesResult,
            getServicesLoading,
            getExtrasResult,
            getExtrasLoading
        }
    },
    data() {
        return {
            selectedServices: [] as string[],
            selectedExtra: "0",
            cont: false,
            next: false,
            shampoo: false,
            massage: false,
            extra: false
        };
    },
    methods: {
        isSelected(serviceId:string) {
            return this.selectedServices.includes(serviceId);
        },
        toggleSelection(serviceId:string) {
            if (this.isSelected(serviceId)) {
                console.log(this.selectedServices)
                //@ts-ignore
                const index = this.selectedServices.indexOf(serviceId);
                this.selectedServices.splice(index, 1);
                this.checkContinue();
            } else {
                console.log(this.selectedServices)
                //@ts-ignore
                this.selectedServices.push(serviceId);
                this.checkContinue();
            }
        },
        checkContinue() {
            if (this.selectedServices.length > 0) {
                this.cont = true;
            }
            else {
                this.cont = false;
            }
        },
        handleContinue() {
            this.next = true;
            console.log(this.getExtrasResult)
        },
        handleExtra(id: string){
            if(this.selectedExtra == id){
                this.selectedExtra = "0";
                this.extra = false;
            }else{
                this.selectedExtra = id;
                this.extra = true;
            }
        }
    }
};
</script>