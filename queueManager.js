const log = require('./logger');

class Queue {
    constructor() {
        this.items = [];
        this.processing = false;
    }

    processNext() {
        if (this.processing || this.items.length === 0) return;
        
        this.processing = true;
        const order = this.items.shift();
        
        this.updateStatus(order.id, 'preparing')
            .then(() => this.wait(5000))
            .then(() => this.updateStatus(order.id, 'delivered'))
            .catch(error => log(`Erro: ${error.message}`))
            .finally(() => {
                this.processing = false;
                this.processNext();
            });
    }

    wait(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }

    updateStatus(id, status) {
        return new Promise((resolve, reject) => {
            try {
                const orders = JSON.parse(fs.readFileSync(ordersFile));
                const index = orders.findIndex(o => o.id === id);
                orders[index].status = status;
                fs.writeFileSync(ordersFile, JSON.stringify(orders));
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    add(order) {
        this.items.push(order);
        this.processNext();
        log(`Pedido ${order.id} adicionado à fila`);
    }
}

module.exports = new Queue();