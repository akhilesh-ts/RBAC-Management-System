const DetailCard = ({ icon, title, value }) => (
    <div className="flex items-center gap-4 bg-gray-50 border rounded-lg p-4 shadow-sm">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-blue-600"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d={icon} />
      </svg>
      <div>
        <h3 className="text-gray-600 font-medium">{title}</h3>
        <p className="text-gray-800">{value}</p>
      </div>
    </div>
  );

  export default DetailCard