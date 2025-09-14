import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { loggedInUser, removeUser } from '@/redux/features/auth/authSlice';
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
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router';
import type { NavLinkPropsI } from '@/types';
import { useUserLogoutMutation } from '@/redux/features/auth/authApi';
import { toast } from 'sonner';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const { name, email } = useSelector(loggedInUser) || {};

  const [userLogout, { isLoading }] = useUserLogoutMutation();

  const handleLogout = async () => {
    try {
      const logoutRes = await userLogout(undefined);
      dispatch(removeUser());
      toast.success(logoutRes.data.message);
      navigate('/login');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  // const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  // Navigation items configuration
  const navItems = [
    { to: '/', label: 'Home' },
    {
      to: '/services',
      label: 'Services',
      hasDropdown: true,
      dropdownItems: [
        { to: '/services/express', label: 'Express Delivery' },
        { to: '/services/standard', label: 'Standard Shipping' },
        { to: '/services/international', label: 'International' },
        { to: '/services/secure', label: 'Secure Transit' },
      ],
    },
    { to: '/tracking', label: 'Tracking' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  // const profileItems = [
  //   { to: '/account', label: 'My Account' },
  //   { to: '/orders', label: 'My Orders' },
  //   { to: '/settings', label: 'Settings' },
  //   { divider: true },
  //   { to: '/logout', label: 'Sign Out' },
  // ];

  // Custom NavLink component with active state

  const CustomNavLink = ({
    to,
    children,
    className = '',
    onClick,
  }: NavLinkPropsI) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `font-medium transition-colors duration-300 ${className} ${isActive ? 'text-primary' : 'text-white hover:text-primary'
        }`
      }
      onClick={onClick}
    >
      {children}
    </NavLink>
  );

  // DropdownItem component
  const DropdownItem = ({ to, children, onClick }: NavLinkPropsI) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-4 py-2 transition-colors ${isActive
          ? 'bg-primary/10 text-primary'
          : 'hover:bg-primary/5 hover:text-primary'
        }`
      }
      onClick={onClick}
    >
      {children}
    </NavLink>
  );

  // MobileNavItem component
  const MobileNavItem = ({ to, children, onClick }: NavLinkPropsI) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-2 py-3 rounded-lg transition-colors duration-300 ${isActive
          ? 'bg-primary/20 text-primary'
          : 'text-white hover:text-primary hover:bg-gray-800'
        }`
      }
      onClick={onClick}
    >
      {children}
    </NavLink>
  );

  // Search Input component
  const SearchInput = ({ className = '' }: { className?: string }) => (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder="Track package..."
        className="bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg border border-gray-700 focus:outline-none focus:border-primary focus:bg-gray-700 transition-all duration-300 w-full"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
    </div>
  );

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
      <div className="container mx-auto px-2 pt-2">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMenu}
              className="lg:hidden p2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-1.5">
              {() => (
                <>
                  <div className="bg-primary p-2 rounded-lg">
                    <Package className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">DeliveryPro</h1>
                    <p className="text-sm text-gray-300/95">Fast & Secure</p>
                  </div>
                </>
              )}
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) =>
              item.hasDropdown ? (
                <div key={index} className="relative group">
                  <CustomNavLink
                    to={item.to}
                    className="flex items-center gap-1"
                  >
                    {item.label}
                    <ArrowRight className="w-4 h-4 transform rotate-90 group-hover:rotate-0 transition-transform duration-300" />
                  </CustomNavLink>
                  <div className="absolute top-full left-0 bg-white text-black rounded-lg shadow-xl py-2 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                    {item.dropdownItems.map((dropdownItem, dropIndex) => (
                      <DropdownItem key={dropIndex} to={dropdownItem.to}>
                        {dropdownItem.label}
                      </DropdownItem>
                    ))}
                  </div>
                </div>
              ) : (
                <CustomNavLink key={index} to={item.to || ''}>
                  {item.label}
                </CustomNavLink>
              )
            )}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search */}
            <SearchInput />

            {/* Profile Dropdown */}
            <div className="relative">
              {!name && !email ? (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `duration-300 block p-2 rounded-md border transition-colors ${isActive
                      ? 'bg-primary/20 border-primary'
                      : 'bg-gray-800 border-transparent hover:border-primary hover:bg-gray-700'
                    }`
                  }
                >
                  <User size={25} className="text-primary" />
                </NavLink>
              ) : (
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="start">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Dashboard
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Settings
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        {isLoading ? 'Logging out...' : 'Log out'}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          </div>

          <div className="relative lg:hidden">
            {!name && !email ? (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `duration-300 block p-2 rounded-md border transition-colors ${isActive
                    ? 'bg-primary/20 border-primary'
                    : 'bg-gray-800 border-transparent hover:border-primary hover:bg-gray-700'
                  }`
                }
              >
                <User size={25} className="text-primary" />
              </NavLink>
            ) : (
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="border-2 border-primary">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="start">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Settings
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      {isLoading ? 'Logging out...' : 'Log out'}
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 pb-4' : 'max-h-0'
            }`}
        >
          <div className="space-y-1 pt-4 border-t border-gray-800">
            {/* Mobile Search */}
            <div className="px-2 pb-4">
              <SearchInput />
            </div>

            {/* Mobile Nav Items */}
            {navItems.map(
              (item, index) =>
                !item.hasDropdown && (
                  <MobileNavItem
                    key={index}
                    to={item.to || ''}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </MobileNavItem>
                )
            )}

            {/* Services submenu for mobile */}
            <div className="px-2">
              <div className="text-white font-medium py-2">Services</div>
              {navItems
                .find((item) => item.hasDropdown)
                ?.dropdownItems?.map((item, index) => (
                  <MobileNavItem
                    key={index}
                    to={item.to || ''}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </MobileNavItem>
                ))}
            </div>

            {/* Mobile CTA */}
            <div className="px-2 pt-4">
              <NavLink
                to="/ship-now"
                className={({ isActive }) =>
                  `block w-full py-3 rounded-lg font-semibold transition-colors duration-300 text-center ${isActive
                    ? 'bg-primary/80 text-white'
                    : 'bg-primary text-white hover:bg-primary/90'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Ship Now
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
