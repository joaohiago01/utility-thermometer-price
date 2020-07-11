const knex = require('../database/connection');

module.exports = {

    async index(request, response) {
        const products = await knex('products').orderBy('utility');

        const serializedProducts = products.map(product => {
            return {
                ...product,
                image_url: `http://192.168.0.116:3333/uploads/${product.image}`
            }
        });

        return response.json(serializedProducts);
    },
    async show(request, response) {
        const { id } = request.params;

        const products = await knex('products').where('id', id).first();

        if (!products) {
            return response.status(400).json({ message: "Product not found." })
        }

        const serializedProduct = {
            ...products,
            image_url: `http://192.168.0.116:3333/uploads/${products.image}`
        };

        return response.json(serializedProduct);
    },
    async create(request, response) {
        const { name, price } = request.body;
        const utility = thermometerUtility(price);
        const product = {
            name,
            price,
            image: request.file.filename,
            utility
        };

        await knex('products').insert(product);

        return response.status(201).send();
    },
    async update(request, response) {
        const { name, price, image } = request.body;
        const { id } = request.params;

        await knex('products')
            .where('id', id)
            .update({
                name,
                price,
                image
            });

        return response.status(204).send();
    },
    async delete(request, response) {
        const { id } = request.params;

        await knex('products')
            .where('id', id)
            .del();

        return response.status(202).send();
    },
}

function thermometerUtility(price) {
    let utility = '';

    if (price < 21) {
        utility = 'Útil'
    } else if (price < 31) {
        utility = 'Um pouco útil'
    } else if (price < 51) {
        utility = 'Quase útil'
    } else if (price < 81) {
        utility = 'Utilidade questionável'
    } else if (price < 101) {
        utility = 'Quase inútil'
    } else if (price < 151) {
        utility = 'Nem um pouco útil'
    } else if (price < 201) {
        utility = 'Você não precisa disso!'
    }

    return utility;
}