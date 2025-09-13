import {
  Package,
  Menu,
  X,
  Phone,
  Mail,
  Globe,
  ArrowRight,
  User,
  Search,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  return (
    <nav className="bg-black text-white shadow-2xl z-50 sticky top-0">
      {/* Top Info Bar */}
      <div className="bg-primary text-black py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>24/7 Support: 1-800-DELIVERY</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>support@deliveryapp.com</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span>Free shipping on orders over $50</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 pt-2">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg">
              <Package className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">DeliveryPro</h1>
              <p className="text-xs text-gray-400">Fast & Secure</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <a
              href="/"
              className="text-white hover:text-primary font-medium transition-colors duration-300"
            >
              Home
            </a>
            <div className="relative group">
              <button className="text-white hover:text-primary font-medium transition-colors duration-300 flex items-center gap-1">
                Services
                <ArrowRight className="w-4 h-4 transform rotate-90 group-hover:rotate-0 transition-transform duration-300" />
              </button>
              <div className="absolute top-full left-0 bg-white text-black rounded-lg shadow-xl py-2 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-primary/5 hover:text-primary transition-colors"
                >
                  Express Delivery
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-primary/5 hover:text-primary transition-colors"
                >
                  Standard Shipping
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-primary/5 hover:text-primary transition-colors"
                >
                  International
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-primary/5 hover:text-primary transition-colors"
                >
                  Secure Transit
                </a>
              </div>
            </div>
            <a
              href="#"
              className="text-white hover:text-primary font-medium transition-colors duration-300"
            >
              Tracking
            </a>
            <a
              href="#"
              className="text-white hover:text-primary font-medium transition-colors duration-300"
            >
              Pricing
            </a>
            <a
              href="/about"
              className="text-white hover:text-primary font-medium transition-colors duration-300"
            >
              About
            </a>
            <a
              href="#"
              className="text-white hover:text-primary font-medium transition-colors duration-300"
            >
              Contact
            </a>
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Track package..."
                className="bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg border border-gray-700 focus:outline-none focus:border-primary focus:bg-gray-700 transition-all duration-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              {/* <Link to="/login">
                <Button
                  onClick={toggleProfile}
                  className="bg-gray-800 px-5 py-[22px] hover:bg-gray-700 transition-colors duration-300"
                >
                  <User size={100} className="text-primary w-20 h-10" />
                </Button>
              </Link> */}
              <Link
                to="/login"
                className="bg-gray-800 hover:bg-gray-700 duration-300 block p-2 rounded-md border border-transparent hover:border-primary"
              >
                <User size={25} className="text-primary" />
              </Link>

              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white text-black rounded-lg shadow-xl py-2 min-w-48">
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    My Account
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    My Orders
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    Settings
                  </a>
                  <hr className="my-2 border-gray-200" />
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    Sign Out
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? 'max-h-96 pb-4' : 'max-h-0'
          }`}
        >
          <div className="space-y-1 pt-4 border-t border-gray-800">
            {/* Mobile Search */}
            <div className="px-2 pb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Track package..."
                  className="w-full bg-gray-800 text-white px-4 py-3 pl-10 rounded-lg border border-gray-700 focus:outline-none focus:border-primary"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <a
              href="#"
              className="block px-2 py-3 text-white hover:text-primary hover:bg-gray-800 rounded-lg transition-colors duration-300"
            >
              Home
            </a>
            <a
              href="#"
              className="block px-2 py-3 text-white hover:text-primary hover:bg-gray-800 rounded-lg transition-colors duration-300"
            >
              Services
            </a>
            <a
              href="#"
              className="block px-2 py-3 text-white hover:text-primary hover:bg-gray-800 rounded-lg transition-colors duration-300"
            >
              Tracking
            </a>
            <a
              href="#"
              className="block px-2 py-3 text-white hover:text-primary hover:bg-gray-800 rounded-lg transition-colors duration-300"
            >
              Pricing
            </a>
            <a
              href="#"
              className="block px-2 py-3 text-white hover:text-primary hover:bg-gray-800 rounded-lg transition-colors duration-300"
            >
              About
            </a>
            <a
              href="#"
              className="block px-2 py-3 text-white hover:text-primary hover:bg-gray-800 rounded-lg transition-colors duration-300"
            >
              Contact
            </a>

            {/* Mobile CTA */}
            <div className="px-2 pt-4">
              <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary transition-colors duration-300">
                Ship Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
