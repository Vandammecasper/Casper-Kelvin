import type CustomService from './custom.service.interface';

export interface CustomHairdresser {
    id: string;
    uid: string;
    name: string;
    services: CustomService[];
  }

  export default CustomHairdresser;