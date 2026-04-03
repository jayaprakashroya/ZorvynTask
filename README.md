# Finance Dashboard

A modern Finance Dashboard UI built with React 18, TypeScript, and Tailwind CSS.

## Features

- Clean and professional UI
- TypeScript for type safety
- Responsive design with Tailwind CSS
- Modular component structure
- Context-based state management

## Project Structure

```
finance-dashboard/
├── src/
│   ├── assets/          # Static assets (images, icons, etc.)
│   ├── components/      # Reusable UI components
│   │   ├── common/      # Shared components
│   │   ├── dashboard/   # Dashboard-specific components
│   │   ├── transactions/# Transaction-related components
│   │   ├── insights/    # Analytics and insights components
│   │   └── layout/      # Layout components (header, sidebar, etc.)
│   ├── context/         # React context for global state
│   ├── data/            # Mock data and data utilities
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main App component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles with Tailwind
├── public/              # Public assets
└── README.md            # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd finance-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Lint the Code

```bash
npm run lint
```

## Technologies Used

- **React 18**: Latest React with concurrent features
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and development server
- **ESLint**: Code linting

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.