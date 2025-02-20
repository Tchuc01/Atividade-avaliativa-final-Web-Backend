const fs = require('fs');
const path = require('path');
const log = require('./logger');

const ordersFile = path.join(__dirname, 'data', 'orders.json');

function createOrder(orderData) {
    const orders = getAllOrders();
    const newOrder = {
        id: Date.now().toString(),
        ...orderData,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    orders.push(newOrder);
    saveOrders(orders);
    return newOrder;
}

function getAllOrders() {
    try {
        return JSON.parse(fs.readFileSync(ordersFile));
    } catch (error) {
        log(`Erro ao ler pedidos: ${error.message}`);
        return [];
    }
}

function getOrderById(id) {
    const orders = getAllOrders();
    const order = orders.find(o => o.id === id);
    if (!order) throw new Error('Pedido não encontrado');
    return order;
}

function updateOrder(id, updates) {
    const orders = getAllOrders();
    const index = orders.findIndex(o => o.id === id);
    
    if (index === -1) throw new Error('Pedido não encontrado');
    
    orders[index] = { ...orders[index], ...updates };
    saveOrders(orders);
    return orders[index];
}

function deleteOrder(id) {
    let orders = getAllOrders();
    const initialLength = orders.length;
    
    orders = orders.filter(o => o.id !== id);
    if (orders.length === initialLength) throw new Error('Pedido não encontrado');
    
    saveOrders(orders);
}

function saveOrders(orders) {
    try {
        fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
    } catch (error) {
        log(`Erro ao salvar pedidos: ${error.message}`);
        throw error;
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
};