const { MercadoPagoConfig, Preference } = require('mercadopago');
require('dotenv').config();

exports.crearPago = async (req, res) => {
    const { items, email } = req.body;
    const cliente = new MercadoPagoConfig({
        accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN
    });

    const preferencia = new Preference(cliente);
    const body = {
        items: items,
        payer: {
            email: email,
            entity_type: 'individual'
        },
        back_urls: {
            success: 'http://localhost:5173/completado',
            failure: 'http://localhost:5173/fallido',
            pending: 'http://localhost:5173/pendiente'
        },
        auto_return: 'approved'
    }

    try {
        const response = await preferencia.create({ body });
        return res.send(response.init_point);
    } catch (error) {
        console.error(error);
        return res.status(500).send('No se pudo completar la compra');
    }

}