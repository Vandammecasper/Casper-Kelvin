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
    price: number;
    extra: {
        id: string;
        name: string;
        description: string;
        price: number;
        utilities: string[];
    };
    isCompleted: boolean;
    isPointsUsed: boolean;
}
