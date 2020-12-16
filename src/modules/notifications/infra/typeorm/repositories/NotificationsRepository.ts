import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';
import ICreateNotificationDTO from '@modules/notifications/dto/ICreateNotificationDTO';

import Notification from '../schemas/Notification';

// @EntityRepository(Appointment)
class NotificationsRepository implements INotificationRepository {
    private ormRepository: MongoRepository<Notification>;

    constructor() {
        this.ormRepository = getMongoRepository(Notification, 'mongo');
    }

    public async create({
        // eslint-disable-next-line camelcase
        content,
        recipient_id,
    }: ICreateNotificationDTO): Promise<Notification> {
        const notification = this.ormRepository.create({ content, recipient_id });

        await this.ormRepository.save(notification);

        return notification;
    }
}

export default NotificationsRepository;
