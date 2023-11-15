<template>
    <div class="grid w-full h-screen content-center justify-items-center">
        <h1 class="Raleway-bold text-6xl mt-24">SERVICES</h1>
        <div class="grid grid-cols-2 justify-self-center px-24 gap-10 mt-8">
            <button
            v-for="service in getServicesResult.services"
            :key="service.id"
            :class="{
                'border-2 border-yellow-600 hover:border-yellow-600': isSelected(service.id),
                'p-1 hover:border-2 hover:border-neutral-600 border-2 border-transparent': true // Add other classes as needed
            }"
            @click="toggleSelection(service.id)"
            >
            <div class="flex justify-between">
                <h3 class="text-xl Raleway-bold">{{ service.name }}</h3>
                <h3 class="text-xl Raleway-bold">€ {{ service.price }}</h3>
            </div>
            <p class="mt-2 text-lg text-neutral-700 Raleway text-left">{{ service.description }}</p>
            </button>
        </div>
        <button v-if="cont" @click="handleContinue()" class="Raleway-bold mt-6  border-2 border-yellow-600 bg-yellow-600 py-4 px-8 font-semibold  hover:bg-yellow-700 focus:outline-none focus-visible:border-yellow-600 focus-visible:bg-yellow-700 focus-visible:ring-2 focus-visible:ring-yellow-300">CONTINUE</button>
        <div v-else class="Raleway-bold mt-6 bg-neutral-500 py-4 px-8 font-semibold">CONTINUE</div>
    </div>
    <div v-if="next" class="grid">
        <div class="absolute w-screen h-screen z-50 top-0 left-0 bg-black opacity-60 "></div>
        <div class="bg-neutral-800 justify-self-center top-16 h-3/4 w-2/5  absolute z-50 grid justify-items-center px-16 py-16">
            <div class="text-center px-16">
                <h3 class="text-4xl Raleway-bold">SELECT EXTRA'S</h3>
                <p class="text-neutral-600 mt-2 Raleway">Choose from our selection of premium extras to take your grooming experience to the next level.</p>
            </div>
            <div v-for="extra of getExtrasResult.extras">
                <button v-if="extra?.id == selectedExtra" @click="handleExtra(extra.id)" class="mx-10 p-1 text-left border-2 border-yellow-600">
                    <div class="flex justify-between">
                        <h4 class="text-xl Raleway-bold">{{ extra.name }}</h4>
                        <h4 class="text-xl Raleway-bold">+€ {{ extra.price }}</h4>
                    </div>
                    <p class="text-neutral-600 text-sm pr-20 Raleway">{{ extra.description }}</p>
                </button>
                <button v-else @click="handleExtra(extra.id)" class="mx-10 p-1 text-left border-2 border-transparent hover:border-neutral-600">
                    <div class="flex justify-between">
                        <h4 class="text-xl Raleway-bold">{{ extra.name }}</h4>
                        <h4 class="text-xl Raleway-bold">+€ {{ extra.price }}</h4>
                    </div>
                    <p class="text-neutral-600 text-sm pr-20 Raleway">{{ extra.description }}</p>
                </button>
            </div>
            <router-link v-if="extra" :to="{ name: 'appointment', params: { service: selectedServices.join(','), extra: selectedExtra } }">
                <button class="mt-8 Raleway-bold border-2 border-yellow-600 bg-yellow-600 py-2 px-8 font-semibold  hover:bg-yellow-700 focus:outline-none focus-visible:border-yellow-600 focus-visible:bg-yellow-700 focus-visible:ring-2 focus-visible:ring-yellow-300">NEXT</button>
            </router-link>
            <RouterLink v-else :to="{ name: 'appointment', params: { service: selectedServices.join(','), extra: selectedExtra } }">
                <button class="mt-8 Raleway-bold border-2 border-neutral-600 bg-neutral-600 py-2 px-8 font-semibold  hover:bg-neutral-700 focus:outline-none focus-visible:border-neutral-600 focus-visible:bg-neutral-700 focus-visible:ring-2 focus-visible:ring-neutral-300">SKIP</button>
            </RouterLink>
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
            selectedServices: [],
            selectedExtra: "0", // this was 0, I now get an error when pressing on continue
            cont: false,
            next: false,
            shampoo: false,
            massage: false,
            extra: false
        };
    },
    methods: {
        isSelected(serviceId) {
            return this.selectedServices.includes(serviceId);
        },
        toggleSelection(serviceId) {
            if (this.isSelected(serviceId)) {
                console.log(this.selectedServices)
                // Service is already selected, so remove it
                const index = this.selectedServices.indexOf(serviceId);
                this.selectedServices.splice(index, 1);
                this.checkContinue();
            } else {
                console.log(this.selectedServices)
                // Service is not selected, so add it
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