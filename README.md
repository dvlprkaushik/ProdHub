# Product API

This is a simple **RESTful API** for managing **products** in an e-commerce system. Built with **Node.js**, **Express**, and **MongoDB**, this API allows you to create, read, update, and delete product information. It also supports product filtering, retrieval by ID, and adding new products.

## Endpoints

### 1. **GET /coolapi/product/all**
- **Description**: Retrieve all products.
- **Response**: 
    - `200 OK` with a list of products.
    - `404 Not Found` if no products are available.
  
### 2. **GET /coolapi/product/:productid**
- **Description**: Retrieve a product by its `id`.
- **Parameters**: 
    - `productid` (required) - The ID of the product.
- **Response**:
    - `200 OK` with the product details.
    - `404 Not Found` if the product is not found.

### 3. **POST /coolapi/product/add**
- **Description**: Add a new product to the inventory.
- **Request Body**:
    - `id` (required)
    - `name` (required)
    - `category` (required)
    - `price` (required)
    - `stock` (required)
    - `rating` (required)
    - `description` (required)
- **Response**:
    - `201 Created` if the product was successfully added.
    - `400 Bad Request` if any required fields are missing.

### 4. **PUT /coolapi/product/:productid**
- **Description**: Update a product by its `id`.
- **Parameters**: 
    - `productid` (required) - The ID of the product to update.
- **Request Body**:
    - `name` (optional)
    - `category` (optional)
    - `price` (optional)
    - `stock` (optional)
    - `rating` (optional)
    - `description` (optional)
- **Response**:
    - `200 OK` with the updated product.
    - `404 Not Found` if the product is not found.

### 5. **DELETE /coolapi/product/:productid**
- **Description**: Delete a product by its `id`.
- **Parameters**:
    - `productid` (required) - The ID of the product to delete.
- **Response**:
    - `200 OK` if the product was successfully deleted.
    - `404 Not Found` if the product is not found.
    - `500 Internal Server Error` if there is an issue with deletion.

## Technologies Used

- **Node.js**
- **Express**
- **MongoDB** (Mongoose ODM)


