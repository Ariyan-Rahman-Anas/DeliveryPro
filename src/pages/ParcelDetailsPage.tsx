/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useGetParcelByParcelIdQuery } from '@/redux/features/parcels/parcelApi';
import { useParams } from 'react-router';
import {
  ArrowLeft,
  Package,
  Truck,
  MapPin,
  Clock,
  User,
  Phone,
  Shield,
  CheckCircle,
  AlertCircle,
  Calendar,
  Weight,
  DollarSign,
  Copy,
  ExternalLink,
  Loader2,
} from 'lucide-react';

const ParcelDetailsPage = () => {
  const { id: paramsParcelId } = useParams();
  const {
    data: parcelData,
    isLoading,
    isError,
  } = useGetParcelByParcelIdQuery(paramsParcelId);

  console.log({ parcelData });

  const [copiedTracking, setCopiedTracking] = useState(false);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-black mb-2">
            Loading parcel details...
          </h2>
          <p className="text-gray-600">
            Please wait while we fetch your parcel information.
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError || !parcelData?.data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-black mb-2">
            Parcel Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The parcel with ID "{paramsParcelId}" could not be found. Please
            check your tracking ID and try again.
          </p>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const parcel = parcelData.data;

  const copyTrackingId = () => {
    navigator.clipboard.writeText(parcel.trackingId);
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 2000);
  };

  const getStatusColor = (status: any) => {
    const colors = {
      APPROVED: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
      PICKED_UP: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
      IN_TRANSIT: 'text-primary bg-primary/10 border-primary/20',
      AT_HUB: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
      OUT_FOR_DELIVERY: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
      DELIVERED: 'text-green-500 bg-green-500/10 border-green-500/20',
      CANCELLED: 'text-red-500 bg-red-500/10 border-red-500/20',
    };
    return (
      colors[status as keyof typeof colors] ||
      'text-gray-500 bg-gray-500/10 border-gray-500/20'
    );
  };

  const formatDate = (dateString: any) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusIcon = (status: any) => {
    const icons = {
      APPROVED: <CheckCircle className="w-4 h-4" />,
      PICKED_UP: <Package className="w-4 h-4" />,
      IN_TRANSIT: <Truck className="w-4 h-4" />,
      AT_HUB: <MapPin className="w-4 h-4" />,
      OUT_FOR_DELIVERY: <Truck className="w-4 h-4" />,
      DELIVERED: <CheckCircle className="w-4 h-4" />,
      CANCELLED: <AlertCircle className="w-4 h-4" />,
    };
    return (
      icons[status as keyof typeof icons] || <Package className="w-4 h-4" />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white py-6">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Parcel Details</h1>
              <p className="text-gray-300">Track and manage your shipment</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tracking Header */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Package className="w-6 h-6 text-primary" />
                    <span className="text-sm font-medium text-gray-600">
                      Tracking ID
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-black">
                      {parcel.trackingId}
                    </span>
                    <button
                      onClick={copyTrackingId}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Copy tracking ID"
                    >
                      <Copy className="w-4 h-4 text-gray-500" />
                    </button>
                    {copiedTracking && (
                      <span className="text-sm text-primary">Copied!</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-semibold ${getStatusColor(
                      parcel.status
                    )}`}
                  >
                    {getStatusIcon(parcel.status)}
                    {parcel.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 overflow-auto">
              <div className="flex items-center gap-3 mb-6">
                <Truck className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold text-black">
                  Tracking Timeline
                </h2>
              </div>

              <div className="relative">
                {parcel.statusLogs?.map((log: any, index: number) => {
                  const isLast = index === parcel.statusLogs.length - 1;
                  const isCurrent = log.status === parcel.status;

                  return (
                    <div key={index} className="relative flex gap-4 pb-6">
                      {!isLast && (
                        <div className="absolute left-6 top-12 w-0.5 h-full bg-gray-200"></div>
                      )}

                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                          isCurrent
                            ? 'bg-primary border-primary text-white'
                            : 'bg-white border-gray-200 text-gray-500'
                        }`}
                      >
                        {getStatusIcon(log.status)}
                      </div>

                      <div className="flex-grow pt-2">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 overflow-auto">
                          <div>
                            <h3
                              className={`font-semibold ${
                                isCurrent ? 'text-primary' : 'text-black'
                              }`}
                            >
                              {log.status.replace('_', ' ')}
                            </h3>
                            <p className="text-sm text-gray-600">{log.note}</p>
                          </div>
                          <span className="text-sm text-gray-500">
                            {formatDate(log.at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sender & Receiver Details */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Sender */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <User className="w-5 h-5 text-primary" />
                  <h3 className="font-bold text-black">Sender Details</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Name
                    </span>
                    <p className="font-semibold text-black">
                      {parcel.sender?.snapshot?.name}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Phone
                    </span>
                    <p className="flex items-center gap-2 text-black">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {parcel.sender?.snapshot?.phone}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Address
                    </span>
                    <p className="flex items-start gap-2 text-black">
                      <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                      <span>
                        {parcel.sender?.snapshot?.area},{' '}
                        {parcel.sender?.snapshot?.city}
                        <br />
                        {parcel.sender?.snapshot?.address}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Receiver */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <User className="w-5 h-5 text-primary" />
                  <h3 className="font-bold text-black">Receiver Details</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Name
                    </span>
                    <p className="font-semibold text-black">
                      {parcel.receiver?.snapshot?.name}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Phone
                    </span>
                    <p className="flex items-center gap-2 text-black">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {parcel.receiver?.snapshot?.phone}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">
                      Address
                    </span>
                    <p className="flex items-start gap-2 text-black">
                      <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                      <span>
                        {parcel.receiver?.snapshot?.area},{' '}
                        {parcel.receiver?.snapshot?.city}
                        <br />
                        {parcel.receiver?.snapshot?.address}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Package Information */}
            <div className="bg-black text-white rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Package className="w-6 h-6 text-primary" />
                <h3 className="font-bold text-lg">Package Info</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Type</span>
                  <span className="font-semibold capitalize">
                    {parcel.type}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Weight</span>
                  <span className="font-semibold flex items-center gap-1">
                    <Weight className="w-4 h-4" />
                    {parcel.weightKg} kg
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Fee</span>
                  <span className="font-semibold flex items-center gap-1 text-primary">
                    <DollarSign className="w-4 h-4" />৳
                    {parcel.fee?.toLocaleString()}
                  </span>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">Created</span>
                    <span className="text-sm flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(parcel.createdAt)}
                    </span>
                  </div>

                  {parcel.dispatchedAt && (
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">Dispatched</span>
                      <span className="text-sm flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatDate(parcel.dispatchedAt)}
                      </span>
                    </div>
                  )}

                  {parcel.expectedDeliveryDate && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Expected</span>
                      <span className="text-sm flex items-center gap-1 text-primary">
                        <Clock className="w-4 h-4" />
                        {formatDate(parcel.expectedDeliveryDate)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Security Status */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-black">Security Status</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Blocked</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      parcel.isBlocked
                        ? 'bg-red-100 text-red-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {parcel.isBlocked ? 'Yes' : 'No'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Cancelled</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      parcel.isCancelled
                        ? 'bg-red-100 text-red-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {parcel.isCancelled ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-black mb-4">Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  Share Tracking
                </button>
                <button className="w-full flex items-center justify-center gap-2 border border-gray-200 text-black py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  <AlertCircle className="w-4 h-4" />
                  Report Issue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ParcelDetailsPage;
