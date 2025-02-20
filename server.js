const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const log = require('./logger');

const dataDir = path.join(__dirname, 'data');
const ordersFile = path.join(dataDir, 'orders.json');

const { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } = require('./orderManager');

app.use((req, res, next) => {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => {
        try {
            req.body = data ? JSON.parse(data) : {};
        } catch (error) {
            log(`Erro ao parsear JSON: ${error.message}`);
            return res.status(400).send('JSON inválido');
        }
        next();
    });
});

app.post('/orders', (req, res) => {
    try {
        const newOrder = createOrder(req.body);
        log(`Pedido criado: ${newOrder.id}`);
        res.status(201).json(newOrder);
    } catch (error) {
        log(`Erro: ${error.message}`, 'ERRO');
        res.status(500).json({ error: error.message });
    }
});

app.get('/orders', (req, res) => {
    try {
        const orders = getAllOrders();
        res.json(orders);
    } catch (error) {
        log(`Erro: ${error.message}`, 'ERRO');
        res.status(500).json({ error: error.message });
    }
});

app.get('/orders/:id', (req, res) => {
    try {
        const order = getOrderById(req.params.id);
        res.json(order);
    } catch (error) {
        log(`Pedido não encontrado: ${req.params.id}`, 'ERRO');
        res.status(404).json({ error: error.message });
    }
});

app.put('/orders/:id', (req, res) => {
    try {
        const updatedOrder = updateOrder(req.params.id, req.body);
        log(`Pedido atualizado: ${req.params.id}`);
        res.json(updatedOrder);
    } catch (error) {
        log(`Erro na atualização: ${error.message}`, 'ERRO');
        res.status(404).json({ error: error.message });
    }
});

app.delete('/orders/:id', (req, res) => {
    try {
        deleteOrder(req.params.id);
        log(`Pedido deletado: ${req.params.id}`);
        res.status(204).send();
    } catch (error) {
        log(`Erro ao deletar: ${error.message}`, 'ERRO');
        res.status(404).json({ error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    initializeFiles();
    log('Servidor iniciado');
});

function initializeFiles() {
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
    if (!fs.existsSync(ordersFile)) fs.writeFileSync(ordersFile, '[]');
}