import { Hairdresser } from "src/hairdressers/entities/hairdresser.entity";
import { ObjectId } from "mongodb";

export const hairdresserStub = (): Hairdresser => {
    const h = new Hairdresser();
    h.id = '6569e0416129f8391bf7556a';
    h.uid = 'cQCC4OIADbOsDfn47ihVhD1B7nT2';
    h.name = 'Samuel';
    h.daysOff = [2];
    h.servicesId = [new ObjectId("651c0edff8d57e36e40132c5")];
    h.vacationDays = 35;

    return h;
};