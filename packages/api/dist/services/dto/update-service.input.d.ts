import { CreateServiceInput } from './create-service.input';
declare const UpdateServiceInput_base: import("@nestjs/common").Type<Partial<CreateServiceInput>>;
export declare class UpdateServiceInput extends UpdateServiceInput_base {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    utilities: string[];
}
export {};
