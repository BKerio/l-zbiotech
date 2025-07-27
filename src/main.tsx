import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ProductsProvider } from '@/contexts/ProductsContext'

createRoot(document.getElementById("root")!).render(
  <App />
);
