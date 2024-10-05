# Fashohub

## About the project

Fashohub is a fashion e-commerce platform offering trendy and affordable clothing aiming to provide a seamless shopping experience, from product discovery to secure checkout and delivery. The platform consists of three major roles:

- User Role: This role is for the customers who wish to shop online using our platform


- Admin Role: This role is for the admins providing them with full access of managing the platform


- Vendor Role: This role is for the shops, bussinesses, etc. who wish to sell their products through our platform.

#### Features

- Personalized Fashion: Get outfit suggestions that match your style and budget instantly.


- Effortless Shopping: Add to your cart, place orders, and explore similar items.


- Complete Ecosystem: The project completes an ecosystem putting admin, vendor, delivery partners and customers in a loop.

### CopilotKit Features in Fashohub

- **Product view and filter actions:**  
  Allows users to view products and filter them by price, discount, and more, improving product discovery.

- **Auto-complete for reviews:**  
  Helps users write better reviews by suggesting relevant phrases as they type.

- **Auto-complete for product descriptions:**  
  Makes it easier for sellers to create detailed, professional product descriptions during product creation.

- **UI Customization for chatbot:**  
  Allows users to get a more stylish modern look while talking to the chatbot.

- **Render method for product cards:**  
  Dynamically displays product cards, making browsing products smooth and responsive.

- **Product recommendations:**  
  Provides suggestions for similar products, helping users find what they like and increasing engagement.

## Problem Statement and Solution
In today’s digital age, customers are looking for convenient and efficient ways to shop online. Many existing platforms are cluttered, difficult to navigate, and lack personalization. Furthermore, small and medium businesses often struggle to reach a broader audience and manage online transactions effectively.

Our platform solves these problems by offering a user-friendly interface that simplifies the shopping process. It provides easy navigation, quick product search, and secure payment gateways. Additionally, the website helps businesses showcase their products, manage orders, and reach a larger customer base, all in one place. This creates a better shopping experience for customers while offering businesses the tools they need to thrive online.

## Technologies Used
    1. ReactJS
    2. ExpressJS
    3. MongoDB
    4. Redux Toolkit: State management
    5. JWT: Authentication
    6. MantineUI
    7. Copilotkit

## Demo

## Installation
Follow the given steps to set up fashohub

1. Clone the repo:

    ```bash 
    git@github.com:Ujj1225/fashohub.git
    ```

2. Navigate to the clone directory
    ```bash
    cd fashohub
    ```

3. Navigate to backend directory and run the following commands: 
``` bash
npm i
npm run server
```

4. Navigate to frontend directory and run the following commands: 
```bash
npm i
npm run dev
```

5. Create a .env file inside the backend directory and insert:
```bash
PORT=8001
MONGO_URI=******
NODE_ENV=development
JWT_SECRET=******
FTP_HOST=******
FTP_USER=fashohub
FTP_PASSWORD=******
FTP_PORT=21
```
Now, you can view your frontend running at ```localhost:5173``` and backend running at ```localhost:8001```