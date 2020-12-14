import AppError from '@shared/errors/AppError';
import FakeAppointmentsReppository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsReppository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsReppository();

        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );
    });

    it('should be able to create a new appointment', async () => {
        const appointment = await createAppointment.execute({
            date: new Date(),
            user_id: 'idtest',
            provider_id: '123',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123');
    });

    it('should not be able to create two appointment on the same time', async () => {
        const appointmentDate = new Date(2020, 4, 10, 11); // data fixada em AAAA/MM/DD/HH

        await createAppointment.execute({
            date: appointmentDate,
            user_id: 'idtest',
            provider_id: '123',
        });

        await expect(
            createAppointment.execute({
                date: appointmentDate,
                user_id: 'idtest',
                provider_id: '123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
