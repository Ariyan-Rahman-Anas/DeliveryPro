// import React from 'react'

// const AdminOverviewPage = () => {
//   return (
//     <div>AdminOverviewPage</div>
//   )
// }

// export default AdminOverviewPage

// Admin Flowchart Component
const AdminParcelLifecycleChart: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [hoveredConnection, setHoveredConnection] = useState<string | null>(
    null
  );

  const FlowchartNode: React.FC<{ status: ParcelStatusInfo }> = ({
    status,
  }) => {
    const isSelected = selectedStatus === status.status;
    const isConnected =
      selectedStatus &&
      (PARCEL_STATUSES[selectedStatus]?.nextStates.includes(status.status) ||
        status.nextStates.includes(selectedStatus));

    return (
      <div
        className={`
          absolute bg-white rounded-lg border-2 p-3 cursor-pointer transition-all duration-300 w-40
          hover:shadow-lg hover:scale-105 hover:z-10
          ${
            isSelected
              ? 'border-green-500 shadow-lg ring-2 ring-green-200 z-20'
              : isConnected
              ? 'border-green-300 shadow-md'
              : status.borderColor
          }
        `}
        style={{
          left: `${status.position.x * 200 + 50}px`,
          top: `${status.position.y * 120 + 50}px`,
        }}
        onClick={() => setSelectedStatus(isSelected ? null : status.status)}
      >
        <div className="flex items-center mb-2">
          <div
            className={`${status.color} ${status.bgColor} p-2 rounded-lg mr-2`}
          >
            {status.icon}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-xs text-gray-800">
              {status.title}
            </h3>
          </div>
        </div>
        <p className="text-xs text-gray-600 mb-2">{status.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {status.nextStates.length} transitions
          </span>
          {status.nextStates.length === 0 && (
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
              Final
            </span>
          )}
        </div>
      </div>
    );
  };

  const ConnectionLine: React.FC<{
    from: ParcelStatusInfo;
    to: ParcelStatusInfo;
  }> = ({ from, to }) => {
    const fromCenter = {
      x: from.position.x * 200 + 50 + 80,
      y: from.position.y * 120 + 50 + 40,
    };
    const toCenter = {
      x: to.position.x * 200 + 50 + 80,
      y: to.position.y * 120 + 50 + 40,
    };

    const isHighlighted =
      selectedStatus === from.status ||
      hoveredConnection === `${from.status}-${to.status}`;

    // Calculate arrow position and angle
    const angle = Math.atan2(
      toCenter.y - fromCenter.y,
      toCenter.x - fromCenter.x
    );
    const arrowSize = 8;
    const arrowX = toCenter.x - Math.cos(angle) * 20;
    const arrowY = toCenter.y - Math.sin(angle) * 20;

    return (
      <g>
        <line
          x1={fromCenter.x}
          y1={fromCenter.y}
          x2={toCenter.x - Math.cos(angle) * 20}
          y2={toCenter.y - Math.sin(angle) * 20}
          stroke={isHighlighted ? '#10b981' : '#d1d5db'}
          strokeWidth={isHighlighted ? 3 : 2}
          markerEnd={`url(#arrowhead-${isHighlighted ? 'green' : 'gray'})`}
          className="transition-all duration-300"
          onMouseEnter={() =>
            setHoveredConnection(`${from.status}-${to.status}`)
          }
          onMouseLeave={() => setHoveredConnection(null)}
        />
      </g>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border-l-4 border-green-500">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🚚 DeliveryPro - Parcel Lifecycle Chart
          </h1>
          <p className="text-gray-600">
            Interactive flowchart showing all possible parcel transitions
          </p>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
              <span className="text-sm text-gray-700">Initial/Success</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
              <span className="text-sm text-gray-700">Processing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-amber-100 border border-amber-200 rounded"></div>
              <span className="text-sm text-gray-700">Transit</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
              <span className="text-sm text-gray-700">Cancelled</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-100 border border-purple-200 rounded"></div>
              <span className="text-sm text-gray-700">Returns</span>
            </div>
          </div>
        </div>

        {/* Interactive Flowchart */}
        <div className="bg-white rounded-lg shadow-sm p-6 overflow-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Interactive Lifecycle Flowchart
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Click on any status to highlight its connections. Hover over arrows
            to see transitions.
          </p>

          <div
            className="relative"
            style={{ height: '1000px', minWidth: '800px' }}
          >
            {/* SVG for connection lines */}
            <svg
              className="absolute inset-0 pointer-events-none"
              style={{ width: '100%', height: '100%' }}
            >
              <defs>
                <marker
                  id="arrowhead-green"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
                </marker>
                <marker
                  id="arrowhead-gray"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="#d1d5db" />
                </marker>
              </defs>

              {/* Render all connections */}
              {Object.values(PARCEL_STATUSES).map((fromStatus) =>
                fromStatus.nextStates.map((toStatusKey) => {
                  const toStatus = PARCEL_STATUSES[toStatusKey];
                  return (
                    <ConnectionLine
                      key={`${fromStatus.status}-${toStatusKey}`}
                      from={fromStatus}
                      to={toStatus}
                    />
                  );
                })
              )}
            </svg>

            {/* Render all nodes */}
            {Object.values(PARCEL_STATUSES).map((status) => (
              <FlowchartNode key={status.status} status={status} />
            ))}
          </div>
        </div>

        {/* Selected Status Details */}
        {selectedStatus && (
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6 border-l-4 border-green-500">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Status Details: {PARCEL_STATUSES[selectedStatus].title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Description</h4>
                <p className="text-gray-600">
                  {PARCEL_STATUSES[selectedStatus].description}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  Possible Transitions (
                  {PARCEL_STATUSES[selectedStatus].nextStates.length})
                </h4>
                <div className="space-y-2">
                  {PARCEL_STATUSES[selectedStatus].nextStates.map(
                    (nextState) => (
                      <div
                        key={nextState}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <ArrowRight className="w-4 h-4 mr-2 text-green-600" />
                        {PARCEL_STATUSES[nextState].title}
                      </div>
                    )
                  )}
                  {PARCEL_STATUSES[selectedStatus].nextStates.length === 0 && (
                    <p className="text-sm text-gray-500 italic">
                      This is a final status
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
