import { CreateAppointmentInput } from "../dto/create-appointment.input";

export const CreateAppointmentInputStub = (): CreateAppointmentInput => {
    const a = new CreateAppointmentInput();
    a.date = new Date();
    a.hairdresserId = '6569e0416129f8391bf7556a';
    a.servicesId = ['651c0edff8d57e36e40132c5'];
    a.extraId = '655cc49a25677922c53098c5';
    a.isPointsUsed = false;
    return a;
}

