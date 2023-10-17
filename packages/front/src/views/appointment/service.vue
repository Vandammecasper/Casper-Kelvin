<template>
    <div class="grid w-full h-screen content-center justify-items-center">
        <h1 class="Raleway-bold text-6xl mt-24">SERVICES</h1>
        <div class="flex px-20 py-4 mt-12 gap-24 justify-center">
            <button v-if="simple" @click="toggleSimple" class="w-1/2 border-2 p-1 border-yellow-600">
                <div class="flex justify-between">
                    <h3 class="text-xl Raleway-bold">Simple Haircut</h3>
                    <h3 class="text-xl Raleway-bold">€ 19.99</h3>
                </div>
                <p class="mt-2  text-neutral-700 Raleway text-left">We believe in the power of a simple haircut done right. Experience the beauty of effortless style with us.</p>
            </button>
            <button v-else @click="toggleSimple" class="w-1/2 hover:border-2 hover:border-neutral-600 p-1">
                <div class="flex justify-between">
                    <h3 class="text-xl Raleway-bold">Simple Haircut</h3>
                    <h3 class="text-xl Raleway-bold">€ 19.99</h3>
                </div>
                <p class="mt-2  text-neutral-700 Raleway text-left">We believe in the power of a simple haircut done right. Experience the beauty of effortless style with us.</p>
            </button>
            <button v-if="trim" @click="toggleTrim" class="w-1/2 border-2 p-1 border-yellow-600">
                <div class="flex justify-between">
                    <h3 class="text-xl Raleway-bold">Beard Trim</h3>
                    <h3 class="text-xl Raleway-bold">€ 17.95</h3>
                </div>
                <p class="mt-2  text-neutral-700 Raleway text-left">Enhance your appearance with a precise beard trim. Our skilled barbers sculpt and refine, giving you the confidence to conquer the day.</p>
            </button>
            <button v-else @click="toggleTrim" class="w-1/2 hover:border-2 hover:border-neutral-600 p-1">
                <div class="flex justify-between">
                    <h3 class="text-xl Raleway-bold">Beard Trim</h3>
                    <h3 class="text-xl Raleway-bold">€ 17.95</h3>
                </div>
                <p class="mt-2  text-neutral-700 Raleway text-left">Enhance your appearance with a precise beard trim. Our skilled barbers sculpt and refine, giving you the confidence to conquer the day.</p>
            </button>
        </div>
        <div class="flex px-20 py-4 gap-24 justify-center">
            <button v-if="shave" @click="toggleShave" class="w-1/2 border-2 p-1 border-yellow-600">
                <div class="flex justify-between">
                    <h3 class="text-xl Raleway-bold">Razor Shave</h3>
                    <h3 class="text-xl Raleway-bold">€ 15.95</h3>
                </div>
                <p class="mt-2  text-neutral-700 Raleway text-left">Indulge in the luxury of a razor shave. Our expert barbers deliver precision and perfection, leaving your skin irresistibly smooth.</p>
            </button>
            <button v-else @click="toggleShave" class="w-1/2 hover:border-2 hover:border-neutral-600 p-1">
                <div class="flex justify-between">
                    <h3 class="text-xl Raleway-bold">Razor Shave</h3>
                    <h3 class="text-xl Raleway-bold">€ 15.95</h3>
                </div>
                <p class="mt-2  text-neutral-700 Raleway text-left">Indulge in the luxury of a razor shave. Our expert barbers deliver precision and perfection, leaving your skin irresistibly smooth.</p>
            </button>
            <button v-if="sculpt" @click="toggleSculpt" class="w-1/2 border-2 p-1 border-yellow-600">
                <div class="flex justify-between">
                    <h3 class="text-xl Raleway-bold">Beard Sculpt</h3>
                    <h3 class="text-xl Raleway-bold">€ 24.95</h3>
                </div>
                <p class="mt-2  text-neutral-700 Raleway text-left">With our expert 'Beard Sculpt' service, we artfully shape and style your beard, giving you a distinguished and personalized look that leaves a lasting impression.</p>
            </button>
            <button v-else @click="toggleSculpt" class="w-1/2 hover:border-2 hover:border-neutral-600 p-1">
                <div class="flex justify-between">
                    <h3 class="text-xl Raleway-bold">Beard Sculpt</h3>
                    <h3 class="text-xl Raleway-bold">€ 24.95</h3>
                </div>
                <p class="mt-2  text-neutral-700 Raleway text-left">With our expert 'Beard Sculpt' service, we artfully shape and style your beard, giving you a distinguished and personalized look that leaves a lasting impression.</p>
            </button>
        </div>
        <div class="flex px-20 py-4 gap-24 justify-center">
            <button v-if="color" @click="toggleColor" class="w-1/2 border-2 p-1 border-yellow-600">
                <div class="flex justify-between">
                    <h3 class="text-xl Raleway-bold">Hair Coloring</h3>
                    <h3 class="text-xl Raleway-bold">€ 35.99</h3>
                </div>
                <p class="mt-2  text-neutral-700 Raleway text-left">Revitalize your look with our expert hair coloring services. From subtle enhancements to bold transformations, we bring your desired shades to life.</p>
            </button>
            <button v-else @click="toggleColor" class="w-1/2 hover:border-2 hover:border-neutral-600 p-1">
                <div class="flex justify-between">
                    <h3 class="text-xl Raleway-bold">Hair Coloring</h3>
                    <h3 class="text-xl Raleway-bold">€ 35.99</h3>
                </div>
                <p class="mt-2  text-neutral-700 Raleway text-left">Revitalize your look with our expert hair coloring services. From subtle enhancements to bold transformations, we bring your desired shades to life.</p>
            </button>
            <button v-if="neck" @click="toggleNeck" class="w-1/2 border-2 p-1 border-yellow-600">
                <div class="flex justify-between">
                    <h3 class="text-xl Raleway-bold">Neck Clean Up</h3>
                    <h3 class="text-xl Raleway-bold">€ 12.95</h3>
                </div>
                <p class="mt-2  text-neutral-700 Raleway text-left">Elevate your look with a crisp neck clean-up. Our attention to detail ensures your style is sharp and refined.</p>
            </button>
            <button v-else @click="toggleNeck" class="w-1/2 hover:border-2 hover:border-neutral-600 p-1">
                <div class="flex justify-between">
                    <h3 class="text-xl Raleway-bold">Neck Clean Up</h3>
                    <h3 class="text-xl Raleway-bold">€ 12.95</h3>
                </div>
                <p class="mt-2  text-neutral-700 Raleway text-left">Elevate your look with a crisp neck clean-up. Our attention to detail ensures your style is sharp and refined.</p>
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
            <button v-if="shampoo" @click="handleShampoo()" class="mx-10 p-1 text-left border-2 border-yellow-600">
                <div class="flex justify-between">
                    <h4 class="text-xl Raleway-bold">SHAMPOO</h4>
                    <h4 class="text-xl Raleway-bold">+€ 4.00</h4>
                </div>
                <p class="text-neutral-600 text-sm pr-20 Raleway">Add an extra layer of pampering to your grooming experience with our optional shampoo wash. Indulge in ultimate relaxation and leave with a clean, revitalized feel.</p>
            </button>
            <button v-else @click="handleShampoo()" class="mx-10 p-1 text-left">
                <div class="flex justify-between">
                    <h4 class="text-xl Raleway-bold">SHAMPOO</h4>
                    <h4 class="text-xl Raleway-bold">+€ 4.00</h4>
                </div>
                <p class="text-neutral-600 text-sm pr-20 Raleway">Add an extra layer of pampering to your grooming experience with our optional shampoo wash. Indulge in ultimate relaxation and leave with a clean, revitalized feel.</p>
            </button>
            <button v-if="massage" @click="handleMassage()" class="mx-10 p-1 mt-8 text-left border-2 border-yellow-600">
                <div class="flex justify-between">
                    <h4 class="text-xl Raleway-bold">SHAMPOO & MASSAGE</h4>
                    <h4 class="text-xl Raleway-bold">+€ 6.00</h4>
                </div>
                <p class="text-neutral-600 text-sm pr-20 Raleway">Experience the ultimate relaxation with our optional shampoo wash and massage. Elevate your grooming session to a spa-like indulgence.</p>
            </button>
            <button v-else @click="handleMassage()" class="mx-10 p-1 mt-8 text-left">
                <div class="flex justify-between">
                    <h4 class="text-xl Raleway-bold">SHAMPOO & MASSAGE</h4>
                    <h4 class="text-xl Raleway-bold">+€ 6.00</h4>
                </div>
                <p class="text-neutral-600 text-sm pr-20 raleway">Experience the ultimate relaxation with our optional shampoo wash and massage. Elevate your grooming session to a spa-like indulgence.</p>
            </button>
            <RouterLink v-if="extra" to="/appointment/barber&time">
                <button class="mt-8 Raleway-bold border-2 border-yellow-600 bg-yellow-600 py-2 px-8 font-semibold  hover:bg-yellow-700 focus:outline-none focus-visible:border-yellow-600 focus-visible:bg-yellow-700 focus-visible:ring-2 focus-visible:ring-yellow-300">NEXT</button>
            </RouterLink>
            <RouterLink v-else to="/appointment/barber&time">
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

<script>
export default {
    data() {
        return {
            simple: false,
            trim: false,
            shave: false,
            sculpt: false,
            color: false,
            neck: false,
            cont: false,
            next: false,
            shampoo: false,
            massage: false,
            extra: false
        };
    },
    methods: {
        toggleSimple() {
            this.simple = !this.simple;
            if (this.simple == true || this.trim == true || this.shave == true || this.sculpt == true || this.color == true || this.neck == true) {
                this.cont = true;
            } else {
                this.cont = false;
            }
            console.log(this.cont)
        },
        toggleTrim() {
            this.trim = !this.trim;
            if (this.simple == true || this.trim == true || this.shave == true || this.sculpt == true || this.color == true || this.neck == true) {
                this.cont = true;
            } else {
                this.cont = false;
            }
        },
        toggleShave() {
            this.shave = !this.shave;
            if (this.simple == true || this.trim == true || this.shave == true || this.sculpt == true || this.color == true || this.neck == true) {
                this.cont = true;
            } else {
                this.cont = false;
            }
        },
        toggleSculpt() {
            this.sculpt = !this.sculpt;
            if (this.simple == true || this.trim == true || this.shave == true || this.sculpt == true || this.color == true || this.neck == true) {
                this.cont = true;
            } else {
                this.cont = false;
            }
        },
        toggleColor() {
            this.color = !this.color;
            if (this.simple == true || this.trim == true || this.shave == true || this.sculpt == true || this.color == true || this.neck == true) {
                this.cont = true;
            } else {
                this.cont = false;
            }
        },
        toggleNeck() {
            this.neck = !this.neck;
            if (this.simple == true || this.trim == true || this.shave == true || this.sculpt == true || this.color == true || this.neck == true) {
                this.cont = true;
            } else {
                this.cont = false;
            }
        },
        handleContinue() {
            this.next = true;
        },
        handleShampoo() {
            if(this.shampoo == true){
                this.shampoo = false;
                this.extra = false;
            }
            else{
                this.shampoo = true;
                this.extra = true;
            }
            if (this.massage == true) {
                this.massage = false;
            }
        },
        handleMassage() {
            if(this.massage == true){
                this.massage = false;
                this.extra = false;
            }
            else{
                this.massage = true;
                this.extra = true;
            }
            if (this.shampoo == true) {
                this.shampoo = false;
            }
        }
    }
};
</script>