import type CustomHairdresser from './custom.hairdresser.interface';
import type CustomService from './custom.service.interface';

export interface CustomAppointment {
    id: string;
    uid: string;
    totalTime: number;
    userName: string;
    date: Date;
    hairdresser: CustomHairdresser;
    services: CustomService[];
    extra: string;
    price: number;
    isCompleted: boolean;
}

export default CustomAppointment;