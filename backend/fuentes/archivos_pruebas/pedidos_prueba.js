const pedidos = {
    pedido: {
        item_pedido: {
            hora_pedido: "",
            detalle_pedido: [{
                    id_producto: 2,
                    precio_producto: 425
                },
                {
                    id_producto: 3,
                    precio_producto: 310
                },
                {
                    id_producto: 4,
                    precio_producto: 340
                }
            ],
            usuario: {
                id_usuario: 1
            },
            pago: {
                forma_pago: "",
                monto_pagar: ""
            }

        }
    }
}

module.exports = pedidos