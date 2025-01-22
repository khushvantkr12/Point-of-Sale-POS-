import { Link } from 'react-router-dom';
import { ShoppingCart, Store } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Navbar() {
  const cart = useStore((state) => state.cart);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-orange-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Store className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-800">Point of Sale</span>
          </Link>
          <Link
            to="/cart"
            className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
          >
            <ShoppingCart className="h-6 w-6" />
            {itemCount > 0 && (
              <span className="bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}