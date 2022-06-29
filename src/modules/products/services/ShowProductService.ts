//Mostra um produto especifico

import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IShowProduct } from '../domain/models/IShowProduct';
import { IProduct } from '../domain/models/IProduct';
import AppError from '@shared/errors/appError';

@injectable()
class ShowProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute({ id }: IShowProduct): Promise<IProduct> {
        const product = await this.productsRepository.findById(id);

        if (!product) {
            throw new AppError('Product not found.');
        }

        return product;
    }
}

export default ShowProductService;
