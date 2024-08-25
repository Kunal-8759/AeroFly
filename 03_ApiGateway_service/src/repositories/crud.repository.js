const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app.error');

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const response = await this.model.create(data);
        return response;
    }

    async destroy(id) {
        const response = await this.model.destroy({
            where: {
                id: id
            }
        });
        
        return response;
    }

    async get(data) {
        const response = await this.model.findByPk(data);
        if(!response){
            throw new AppError('the resource you requested is not present',StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async getAll() {
        const response = await this.model.findAll();
        return response;
    }

    async update(id, data) { // data -> {col: value, ....}
        const response = await this.model.update(data, {
            where: {
                id: id
            }
        })
        return response;
    }
}

module.exports = CrudRepository;