# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# 💊 PharmaCare Online Pharmacy Frontend

A modern, responsive e-commerce frontend application for an online pharmacy, built with **React, Redux Toolkit, and Vite**.

## ⚙️ Project Technologies

* **Build Tool:** Vite
* **Frontend Library:** React (Functional Components & Hooks)
* **State Management:** Redux Toolkit
* **Routing:** React Router DOM
* **Styling:** CSS Modules & Plain CSS
* **Data Fetching (Mocked):** Axios/Fetch API principles used with mock data.

## 🌟 Key Features Implemented

1.  **Searchable Medicine Catalog:** Dynamic catalog page with mock data, search filtering, and advanced filter sidebar (category, brand, price range).
2.  **Responsive UI/UX:** Built with CSS for fluid layouts (tested with mock media queries).
3.  **Prescription Upload:** Interactive drag-and-drop interface with real-time validation and simulated progress bar.
4.  **Personalized Recommendations:** Displays a mock recommendations carousel on the homepage based on user data.
5.  **Order Management:** Multi-step checkout process and a visual order tracking page with status updates.
6.  **Interactive Shopping Cart:** Dynamic cart with quantity adjustments and immediate subtotal feedback.
7.  **User Accounts:** User Profile page displaying mock medical history, prescription history, and past order history.
8.  **Detailed Product Pages:** Tabbed layout for description, ingredients, dosage, and mock reviews, plus a mock Live Chat widget.

## 🚀 Installation and Usage

Follow these steps to get the project running on your local machine.

### 1. Clone the repository

```bash
git clone <repository-link> # Replace with your actual repository link
cd online-pharmacy-frontend