/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { loggedInUser, removeUser } from '@/redux/features/auth/authSlice';
import {
  Menu,
  X,
  Phone,
  Mail,
  Globe,
  ArrowRight,
  User,
  Search,
  Package,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
} from 'lucide-react';
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router';
import type { NavLinkPropsI } from '@/types';
import { useUserLogoutMutation } from '@/redux/features/auth/authApi';
import { toast } from 'sonner';
import Logo from '@/components/common/Logo';
import { Role } from '@/constants';
import { Button } from '@/components/ui/button';
import { useParcelTrackingQuery } from '@/redux/features/parcels/parcelApi';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [searchTrackingId, setSearchTrackingId] = useState('');
  const [showResults, setShowResults] = useState(false);

  const { name, email, role } = useSelector(loggedInUser) || {};

  const [userLogout, { isLoading }] = useUserLogoutMutation();

  // Use the tracking query - only when searchTrackingId is set
  const {
    data: trackedParcelData,
    isLoading: isTracking,
    error: trackingError,
  } = useParcelTrackingQuery(searchTrackingId, {
    skip: !searchTrackingId,
  });

  const trackingData = trackedParcelData?.data;
  console.log({ trackingData });

  const handleLogout = async () => {
    try {
      const logoutRes = await userLogout(undefined);
      dispatch(removeUser());
      toast.success(logoutRes.data.message);
      navigate('/login');
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  // Handle input change
  const handleInputChange = useCallback(
    (e: any) => {
      setTrackingId(e.target.value);
      // Hide results when typing
      if (showResults) {
        setShowResults(false);
      }
    },
    [showResults]
  );

  // Handle Enter key press
  const handleKeyDown = useCallback(
    (e: any) => {
      if (e.key === 'Enter' && trackingId.trim()) {
        e.preventDefault();
        setSearchTrackingId(trackingId.trim());
        setShowResults(true);
      }
    },
    [trackingId]
  );

  // Close search results
  const closeResults = useCallback(() => {
    setShowResults(false);
    setSearchTrackingId('');
  }, []);

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

  const profileItems = [
    {
      to: `${
        role === Role.ADMIN
          ? '/dashboard/admin/overview'
          : role === Role.SENDER
          ? '/dashboard/sender/parcels'
          : role === Role.RECEIVER
          ? '/dashboard/receiver/overview'
          : ''
      }`,
      label: 'Dashboard',
    },
    { divider: true },
  ];

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
        `font-medium transition-colors duration-300 ${className} ${
          isActive ? 'text-primary' : 'text-white hover:text-primary'
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
        `block px-4 py-2 transition-colors ${
          isActive
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
        `block px-2 py-3 rounded-lg transition-colors duration-300 ${
          isActive
            ? 'bg-primary/20 text-primary'
            : 'text-white hover:text-primary hover:bg-gray-800'
        }`
      }
      onClick={onClick}
    >
      {children}
    </NavLink>
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
            <Logo />
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
            <div className="relative">
              <input
                value={trackingId}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                type="text"
                placeholder="Track package..."
                className="bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg border border-gray-700 focus:outline-none focus:border-primary focus:bg-gray-700 transition-all duration-300 w-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />

              {/* Search Results */}
              {showResults && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 w-96">
                  {isTracking ? (
                    <div className="p-6 text-center">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" />
                      <p className="text-gray-600">Tracking your package...</p>
                    </div>
                  ) : trackingError ? (
                    <div className="p-6 text-center">
                      <XCircle className="w-8 h-8 mx-auto mb-2 text-red-500" />
                      <p className="text-red-600 font-medium">
                        Package not found
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        Please check your tracking ID and try again
                      </p>
                      <button
                        onClick={closeResults}
                        className="mt-3 text-primary hover:text-primary/80 text-sm"
                      >
                        Close
                      </button>
                    </div>
                  ) : trackingData ? (
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Package className="w-5 h-5 text-primary" />
                          <h3 className="font-semibold text-gray-900">
                            Tracking ID: {searchTrackingId}
                          </h3>
                        </div>
                        <button
                          onClick={closeResults}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <div>
                            <p className="font-medium text-green-900">
                              {trackingData.status || 'In Transit'}
                            </p>
                            <p className="text-green-700 text-sm">
                              {trackingData.statusMessage ||
                                'Package is on the way'}
                            </p>
                          </div>
                        </div>

                        {trackingData.currentLocation && (
                          <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="font-medium text-gray-900">
                                Current Location
                              </p>
                              <p className="text-gray-600 text-sm">
                                {trackingData.currentLocation}
                              </p>
                            </div>
                          </div>
                        )}

                        {trackingData.estimatedDelivery && (
                          <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="font-medium text-gray-900">
                                Estimated Delivery
                              </p>
                              <p className="text-gray-600 text-sm">
                                {trackingData.estimatedDelivery}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <Link
                          to={`/parcel/${trackingData?._id}`}
                          className="text-primary hover:text-primary/80 text-sm font-medium"
                          onClick={closeResults}
                        >
                          View detailed tracking →
                        </Link>
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              {!name && !email ? (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `duration-300 block p-2 rounded-md border transition-colors ${
                      isActive
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
                      {isLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
                          <span className="text-sm text-gray-500"></span>
                        </div>
                      ) : (
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      )}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="start">
                      <DropdownMenuGroup>
                        {profileItems.map((item, index) => (
                          <DropdownMenuItem key={index}>
                            <Link to={item.to || ''}>{item.label}</Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="p-0">
                        <Button
                          variant="destructive"
                          className="w-full cursor-pointer"
                        >
                          {isLoading ? 'Logging out...' : 'Log out'}
                        </Button>
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
                  `duration-300 block p-2 rounded-md border transition-colors ${
                    isActive
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
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
                        <span className="text-sm text-gray-500"></span>
                      </div>
                    ) : (
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="start">
                    <DropdownMenuGroup>
                      {profileItems.map((item, index) => (
                        <DropdownMenuItem key={index}>
                          <Link to={item.to || ''}>{item.label}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="p-0">
                      <Button
                        variant="destructive"
                        className="w-full cursor-pointer"
                      >
                        {isLoading ? 'Logging out...' : 'Log out'}
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? 'max-h-96 pb-4' : 'max-h-0'
          }`}
        >
          <div className="space-y-1 pt-4 border-t border-gray-800">
            {/* Mobile Search */}
            <div className="px-2 pb-4 relative">
              <input
                value={trackingId}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                type="text"
                placeholder="Track package..."
                className="bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg border border-gray-700 focus:outline-none focus:border-primary focus:bg-gray-700 transition-all duration-300 w-full"
              />
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />

              {/* Mobile Search Results */}
              {showResults && (
                <div className="absolute top-full left-2 right-2 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  {isTracking ? (
                    <div className="p-6 text-center">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" />
                      <p className="text-gray-600">Tracking your package...</p>
                    </div>
                  ) : trackingError ? (
                    <div className="p-6 text-center">
                      <XCircle className="w-8 h-8 mx-auto mb-2 text-red-500" />
                      <p className="text-red-600 font-medium">
                        Package not found
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        Please check your tracking ID and try again
                      </p>
                      <button
                        onClick={closeResults}
                        className="mt-3 text-primary hover:text-primary/80 text-sm"
                      >
                        Close
                      </button>
                    </div>
                  ) : trackingData ? (
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-primary" />
                          <h3 className="font-semibold text-gray-900 text-sm">
                            ID: {searchTrackingId}
                          </h3>
                        </div>
                        <button
                          onClick={closeResults}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <div>
                            <p className="font-medium text-green-900 text-sm">
                              {trackingData.status || 'In Transit'}
                            </p>
                            <p className="text-green-700 text-xs">
                              {trackingData.statusMessage ||
                                'Package is on the way'}
                            </p>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-gray-100">
                          <Link
                            to={`/tracking/${trackingData?._id}`}
                            className="text-primary hover:text-primary/80 text-sm font-medium"
                            onClick={() => {
                              closeResults();
                              setIsOpen(false);
                            }}
                          >
                            View detailed tracking →
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
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
                  `block w-full py-3 rounded-lg font-semibold transition-colors duration-300 text-center ${
                    isActive
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
