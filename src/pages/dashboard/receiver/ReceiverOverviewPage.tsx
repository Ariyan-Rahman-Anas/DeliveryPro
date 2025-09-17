import React, { useState } from 'react';
import {
  Package,
  CheckCircle,
  Calendar,
  Truck,
  Building2,
  MapPin,
  Home,
  XCircle,
  RotateCcw,
  ArrowRight,
  Clock,
} from 'lucide-react';

// Types
export interface ParcelStatusInfo {
  status: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  nextStates: string[];
  category:
    | 'initial'
    | 'processing'
    | 'transit'
    | 'final'
    | 'cancelled'
    | 'return';
  position: { x: number; y: number };
}

// Parcel Status Configuration with positioning for flowchart
const PARCEL_STATUSES: Record<string, ParcelStatusInfo> = {
  REQUESTED: {
    status: 'REQUESTED',
    title: 'Requested',
    description: 'Customer initiates delivery request',
    icon: <Package className="w-4 h-4" />,
    color: 'text-primary',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    nextStates: ['APPROVED', 'CANCELLED'],
    category: 'initial',
    position: { x: 0, y: 0 },
  },
  APPROVED: {
    status: 'APPROVED',
    title: 'Approved',
    description: 'Request reviewed and accepted',
    icon: <CheckCircle className="w-4 h-4" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    nextStates: ['PICKUP_SCHEDULED', 'PICKED_UP', 'CANCELLED'],
    category: 'processing',
    position: { x: 0, y: 1 },
  },
  PICKUP_SCHEDULED: {
    status: 'PICKUP_SCHEDULED',
    title: 'Pickup Scheduled',
    description: 'Pickup date confirmed',
    icon: <Calendar className="w-4 h-4" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    nextStates: ['PICKED_UP', 'CANCELLED'],
    category: 'processing',
    position: { x: 0, y: 2 },
  },
  PICKED_UP: {
    status: 'PICKED_UP',
    title: 'Picked Up',
    description: 'Collected from sender',
    icon: <Truck className="w-4 h-4" />,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    nextStates: ['IN_TRANSIT', 'AT_HUB', 'RETURN_REQUESTED'],
    category: 'transit',
    position: { x: 0, y: 3 },
  },
  IN_TRANSIT: {
    status: 'IN_TRANSIT',
    title: 'In Transit',
    description: 'Moving between locations',
    icon: <MapPin className="w-4 h-4" />,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    nextStates: ['AT_HUB', 'OUT_FOR_DELIVERY', 'RETURN_REQUESTED'],
    category: 'transit',
    position: { x: 0, y: 4 },
  },
  AT_HUB: {
    status: 'AT_HUB',
    title: 'At Hub',
    description: 'At sorting facility',
    icon: <Building2 className="w-4 h-4" />,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    nextStates: ['OUT_FOR_DELIVERY', 'IN_TRANSIT', 'RETURN_REQUESTED'],
    category: 'transit',
    position: { x: 0, y: 5 },
  },
  OUT_FOR_DELIVERY: {
    status: 'OUT_FOR_DELIVERY',
    title: 'Out for Delivery',
    description: 'Final mile delivery',
    icon: <Home className="w-4 h-4" />,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    nextStates: ['DELIVERED', 'RETURN_REQUESTED'],
    category: 'transit',
    position: { x: 0, y: 6 },
  },
  DELIVERED: {
    status: 'DELIVERED',
    title: 'Delivered',
    description: 'Successfully delivered',
    icon: <CheckCircle className="w-4 h-4" />,
    color: 'text-primary',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    nextStates: [],
    category: 'final',
    position: { x: 0, y: 7 },
  },
  CANCELLED: {
    status: 'CANCELLED',
    title: 'Cancelled',
    description: 'Request cancelled',
    icon: <XCircle className="w-4 h-4" />,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    nextStates: [],
    category: 'cancelled',
    position: { x: 2, y: 2 },
  },
  RETURN_REQUESTED: {
    status: 'RETURN_REQUESTED',
    title: 'Return Requested',
    description: 'Return initiated',
    icon: <RotateCcw className="w-4 h-4" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    nextStates: ['RETURNED', 'IN_TRANSIT'],
    category: 'return',
    position: { x: 2, y: 5 },
  },
  RETURNED: {
    status: 'RETURNED',
    title: 'Returned',
    description: 'Returned to sender',
    icon: <RotateCcw className="w-4 h-4" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    nextStates: [],
    category: 'return',
    position: { x: 2, y: 6 },
  },
};

const UserParcelLifecycle: React.FC = () => {
  const [currentStatus] = useState<string>('IN_TRANSIT');

  const happyPath = [
    'REQUESTED',
    'APPROVED',
    'PICKUP_SCHEDULED',
    'PICKED_UP',
    'IN_TRANSIT',
    'AT_HUB',
    'OUT_FOR_DELIVERY',
    'DELIVERED',
  ];

  const getCurrentIndex = () => happyPath.indexOf(currentStatus);
  const currentIndex = getCurrentIndex();

  const StatusStep: React.FC<{
    status: ParcelStatusInfo;
    index: number;
    isActive: boolean;
    isCompleted: boolean;
    isLast: boolean;
  }> = ({ status, isActive, isCompleted, isLast }) => (
    <div className="flex flex-col items-center flex-1">
      {/* Status Circle */}
      <div
        className={`
        w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-500
        ${
          isCompleted
            ? 'bg-primary border-primary text-white shadow-lg'
            : isActive
            ? 'bg-white border-primary text-primary shadow-lg animate-pulse'
            : 'bg-gray-100 border-gray-300 text-gray-400'
        }
      `}
      >
        <div className="scale-125">{status.icon}</div>
      </div>

      {/* Connection Line */}
      {!isLast && (
        <div className="flex-1 flex items-center justify-center mt-4 mb-4 relative w-full">
          <div
            className={`
            h-1 w-full transition-all duration-700 rounded-full
            ${isCompleted ? 'bg-primary' : 'bg-gray-200'}
          `}
          />
          <ArrowRight
            className={`
            absolute right-0 w-4 h-4 transition-all duration-700
            ${isCompleted ? 'text-primary' : 'text-gray-400'}
          `}
          />
        </div>
      )}

      {/* Status Info */}
      <div className="text-center mt-4">
        <h3
          className={`
          font-semibold text-sm mb-1 transition-colors duration-300
          ${
            isActive
              ? 'text-primary'
              : isCompleted
              ? 'text-primary'
              : 'text-gray-500'
          }
        `}
        >
          {status.title}
        </h3>
        <p className="text-xs text-gray-500 max-w-24">{status.description}</p>
        {isActive && (
          <div className="mt-2 text-xs text-primary font-medium animate-pulse">
            Current Status
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border-l-4 border-primary">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            📦 DeliveryPro - Parcel Journey
          </h1>
          <p className="text-gray-600">
            Follow your parcel's complete journey from request to delivery
          </p>
        </div>

        {/* Current Status Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Current Status
            </h2>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Step {currentIndex + 1} of {happyPath.length}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-4 rounded-full">
              <div className="text-primary scale-150">
                {PARCEL_STATUSES[currentStatus].icon}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {PARCEL_STATUSES[currentStatus].title}
              </h3>
              <p className="text-gray-600 mb-2">
                {PARCEL_STATUSES[currentStatus].description}
              </p>
              <div className="flex items-center text-sm text-primary font-medium">
                <Clock className="w-4 h-4 mr-1" />
                Updated 30 minutes ago
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Delivery Progress
            </h2>
            <span className="text-2xl font-bold text-primary">
              {Math.round(((currentIndex + 1) / happyPath.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-primary h-4 rounded-full transition-all duration-1000 ease-out relative"
              style={{
                width: `${((currentIndex + 1) / happyPath.length) * 100}%`,
              }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Lifecycle Timeline */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-8 text-center">
            Complete Parcel Lifecycle
          </h2>

          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <div className="flex items-start justify-between space-x-4">
              {happyPath.map((statusKey, index) => {
                const status = PARCEL_STATUSES[statusKey];
                const isCompleted = index < currentIndex;
                const isActive = index === currentIndex;
                const isLast = index === happyPath.length - 1;

                return (
                  <StatusStep
                    key={statusKey}
                    status={status}
                    index={index}
                    isActive={isActive}
                    isCompleted={isCompleted}
                    isLast={isLast}
                  />
                );
              })}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-6">
            {happyPath.map((statusKey, index) => {
              const status = PARCEL_STATUSES[statusKey];
              const isCompleted = index < currentIndex;
              const isActive = index === currentIndex;
              const isLast = index === happyPath.length - 1;

              return (
                <div key={statusKey} className="flex items-center space-x-4">
                  <div
                    className={`
                    w-12 h-12 rounded-full flex items-center justify-center border-2 flex-shrink-0
                    ${
                      isCompleted
                        ? 'bg-primary border-primary text-white'
                        : isActive
                        ? 'bg-white border-primary text-primary animate-pulse'
                        : 'bg-gray-100 border-gray-300 text-gray-400'
                    }
                  `}
                  >
                    {status.icon}
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`
                      font-semibold mb-1
                      ${
                        isActive
                          ? 'text-primary'
                          : isCompleted
                          ? 'text-primary'
                          : 'text-gray-500'
                      }
                    `}
                    >
                      {status.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {status.description}
                    </p>
                    {isActive && (
                      <span className="inline-block mt-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  {!isLast && (
                    <div className="absolute left-6 mt-12 w-0.5 h-6 bg-gray-200"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6 border-l-4 border-primary">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            What's Next?
          </h3>
          {currentIndex < happyPath.length - 1 ? (
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                {PARCEL_STATUSES[happyPath[currentIndex + 1]].icon}
              </div>
              <div>
                <h4 className="font-medium text-gray-800">
                  {PARCEL_STATUSES[happyPath[currentIndex + 1]].title}
                </h4>
                <p className="text-gray-600">
                  {PARCEL_STATUSES[happyPath[currentIndex + 1]].description}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-2" />
              <h4 className="font-medium text-gray-800">Delivery Complete!</h4>
              <p className="text-gray-600">
                Your parcel has been successfully delivered.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Component with Toggle
const DeliveryProParcelLifecycle: React.FC = () => {
  return <UserParcelLifecycle />;
};
export default DeliveryProParcelLifecycle;
