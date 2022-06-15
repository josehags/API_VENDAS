import AppError from '@shared/errors/appError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    //Verificanod se o usuário existe
    if (!customer) {
      throw new AppError('Customer not found.');
    }

    //Verifica se o email enviado não está em uso pelo usuário
    const customerExistsEmail = await customersRepository.findByEmail(email);

    if (customerExistsEmail && email !== customer.email) {
      throw new AppError('There is already one customer with this email.');
    }

    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);

    return customer;
  }
}
export default UpdateCustomerService;