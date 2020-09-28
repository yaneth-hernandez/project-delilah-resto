const pedidos = {
    pedido_cont: {
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

const estados = {
    estados_cont: {
        estado_pedido: {
            id_pedido: 1,
            fecha_creación: "",
            codigo: "PD-03", //confirmado
            total_pago: 1200,
            forma_pago: "PGO-01", //efectivo
            direccion_entrega: "av.33 con 97"
        },
        items_pedido: [{
                id_producto: 2,
                nombre_producto: "Hamburguesa clásica",
                imagen_producto: "https://sifu.unileversolutions.com/image/es-MX/recipe-topvisual/2/1260-709/hamburguesa-clasica-50425188.jpg",
                precio_producto: 425
            },
            {
                id_producto: 3,
                nombre_producto: "Sandwich veggie",
                imagen_producto: "https://sifu.unileversolutions.com/image/es-MX/recipe-topvisual/2/1260-709/club-sandwich-50425539.jpg",
                precio_producto: 310
            },
            {
                id_producto: 4,
                nombre_producto: "Ensalada veggie",
                imagen_producto: "https://sifu.unileversolutions.com/image/es-MX/recipe-topvisual/2/1260-709/ensaladas-compuestas-rusa-ensalada-de-atun-50425544.jpg",
                precio_producto: 340
            }
        ],
        usuario: {
            id_usuario: 1
        }
    }
}


module.exports = { pedidos, status: estados }