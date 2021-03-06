import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    day: number;
    month: number;
    year: number;
}

@injectable()
class ListProviderAppointmentsService {
    // eslint-disable-next-line no-empty-function
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({ provider_id, year, month, day }: IRequest): Promise<Appointment[]> {
        const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
            provider_id,
            year,
            month,
            day
        });

        return appointments;
    }
}

export default ListProviderAppointmentsService;
