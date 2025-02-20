# 🚀 Como Rodar o Projeto

## Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **npm** (gerenciador de pacotes do Node.js)

## Passos para Executar

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Tchuc01/Atividade-avaliativa-final-Web-Backend.git
   ```

2. **Instale as dependências:**
   O projeto usa apenas **Express** como dependência externa. Instale com:
   ```bash
   npm install
   ```

3. **Inicie o servidor:**
   ```bash
   node server.js
   ```

4. **Acesse a API:**
   O servidor estará rodando em `http://localhost:3000`. Use ferramentas como **Postman**, **Insomnia** ou **curl** para testar as rotas.

---

## Rotas Disponíveis

- **Criar pedido:** `POST /orders`
- **Listar pedidos:** `GET /orders`
- **Buscar pedido por ID:** `GET /orders/:id`
- **Atualizar pedido:** `PUT /orders/:id`
- **Deletar pedido:** `DELETE /orders/:id`

---

## Exemplo de Uso com `curl`

**Criar um pedido:**
```bash
curl -X POST http://localhost:3000/orders -H "Content-Type: application/json" -d '{"items": ["X-Burger", "Batata Frita"], "client": "João Silva"}'
```

**Listar todos os pedidos:**
```bash
curl http://localhost:3000/orders
```

**Buscar um pedido por ID:**
```bash
curl http://localhost:3000/orders/ID_DO_PEDIDO
```

**Atualizar um pedido:**
```bash
curl -X PUT http://localhost:3000/orders/ID_DO_PEDIDO -H "Content-Type: application/json" -d '{"status": "preparando"}'
```

**Deletar um pedido:**
```bash
curl -X DELETE http://localhost:3000/orders/ID_DO_PEDIDO
```
