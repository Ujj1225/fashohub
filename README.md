# Fashohub

# <p align="center"><img src="https://github.com/Ujj1225/fashohub/blob/main/client/src/images/user_layout.png" width=300 /></p>

<p align="center">
    <p align="center">
        <a href="https://github.com/Ujj1225/fashohub" target="blank">
            <img src="https://img.shields.io/github/watchers/Ujj1225/fashohub?style=for-the-badge&logo=appveyor" alt="Watchers"/>
        </a>
        <a href="https://github.com/Ujj1225/fashohub/fork" target="blank">
            <img src="https://img.shields.io/github/forks/Ujj1225/fashohub?style=for-the-badge&logo=appveyor" alt="Forks"/>
        </a>
        <a href="https://github.com/Ujj1225/fashohub/stargazers" target="blank">
            <img src="https://img.shields.io/github/stars/Ujj1225/fashohub?style=for-the-badge&logo=appveyor" alt="Star"/>
        </a>
    </p>
    <p align="center">
        <a href="https://github.com/Ujj1225/fashohub/issues" target="blank">
            <img src="https://img.shields.io/github/issues/Ujj1225/fashohub?style=for-the-badge&logo=appveyor" alt="Issue"/>
        </a>
        <a href="https://github.com/Ujj1225/fashohub/pulls" target="blank">
            <img src="https://img.shields.io/github/issues-pr/Ujj1225/fashohub?style=for-the-badge&logo=appveyor" alt="Open Pull Request"/>
        </a>
    </p>
    <p align="center">
        <a href="https://github.com/Ujj1225/fashohub/blob/master/LICENSE" target="blank">
            <img src="https://img.shields.io/github/license/Ujj1225/fashohub?style=for-the-badge&logo=appveyor" alt="License" />
        </a>
    </p>
</p>


## About the project

Fashohub is a fashion e-commerce platform offering trendy and affordable clothing aiming to provide a seamless shopping experience, from product discovery to secure checkout and delivery. The platform consists of three major roles:

- User Role: This role is for the customers who wish to shop online using our platform
<details>
   <summary> User Layout </summary>
   <img src="https://github.com/Ujj1225/fashohub/blob/main/client/src/images/user_layout.png" width=750/>
 </details>

- Admin Role: This role is for the admins providing them with full access of managing the platform
<details>
   <summary> Admin Layout </summary>
   <img src="https://github.com/Ujj1225/fashohub/blob/main/client/src/images/admin_layout.png" width=750/>
 </details>

- Vendor Role: This role is for the shops, bussinesses, etc. who wish to sell their products through our platform.
<details>
   <summary> Vendor Layout </summary>
   <img src="https://github.com/Ujj1225/fashohub/blob/main/client/src/images/vendor_layout1.png" width=750/>
 </details>

#### Features

- Personalized Fashion: Get outfit suggestions that match your style and budget instantly.

- Effortless Shopping: Add to your cart, place orders, and explore similar items.

- Complete Ecosystem: The project completes an ecosystem putting admin, vendor, delivery partners and customers in a loop.

### Research supporting how and why CopilotKit Integration Makes Fashohub Stand Out

1. **Enhanced User Experience with NLP Chatbots**  
   Chatbots streamline user interactions by automating product recommendations, filtering, and customer support. This aligns perfectly with Fashohub’s goal of making shopping easier and more personalized. Research shows chatbots improve service accessibility and task efficiency, which enhances overall customer satisfaction.  
   [Source of Claim](www.theseus.fi/bitstream/handle/10024/802337/A%20Feasibility%20Study%20of%20Available%20Natural%20Language%20Chatbot%20Technologies.pdf?sequence=2)



2. **Boosting Customer Trust and Engagement**  
   Chatbots that are friendly and empathetic make users feel more comfortable and engaged, increasing their likelihood of staying on the platform.CopilotKit helps Fashohub simplify product discovery and provides personalized suggestions, making shopping enjoyable and efficient.  
   [Source of claim](https://www.emerald.com/insight/content/doi/10.1108/INTR-08-2020-0460/full/html)



This research-backed facts show how integration of copilotkit in Fashohub makes it a more user-friendly and smart e-commerce platform.

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

- **Product recommendations (Future Plan):**  
  This is a feature that is yet to be integrated. Code for viewed products and copilotTask is ready but due to some time and support constraints I couldn't get it done for now. This feature provides suggestions for similar products (giving context of viewed products to copilotkit), helping users find what they like and increasing engagement.


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
https://github.com/user-attachments/assets/4a9958bb-0397-4e75-b8c0-0bbb28410a5c


## UI/UX
- To make the demo video short I have skipped certain portion showing category page, skeleton, mantine carousel for products, filter, etc
- Relevant video
  [Product Carousel](https://github.com/user-attachments/assets/4e155d9b-2149-4a44-ba34-8e346fd650d4)
- Relevant images
<details>
   <summary>Category Page</summary>
   <img src="https://github.com/Ujj1225/fashohub/blob/main/client/src/images/f1.png" width=750/>
 </details>
 <details>
   <summary>Skeleton</summary>
   <img src="https://github.com/Ujj1225/fashohub/blob/main/client/src/images/f2.png" width=750/>
 </details>


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

```bash
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

You are all set to use the application.
You can see your frontend running at `localhost:5173` and backend running at `localhost:8001`

## Dependencies

### Frontend

- For frontend can be found in [package.json](./client/package.json)

### Backend

- For backend can be found in [package.json](./server/package.json)

## License

This project is licensed under the [MIT License](/LICENSE).
