import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository, getRepository } from 'typeorm';
import Appointment from '../models/Appointment';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  console.log(request.user);

  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

appointmentsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const appointmentsRepository = getRepository(Appointment);

  const appointment = await appointmentsRepository.delete(id);

  return response.json(appointment);
});

export default appointmentsRouter;
