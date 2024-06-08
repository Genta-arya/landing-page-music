const Rating = ({ rating }) => {
    const stars = Array.from({ length: 5 }, (_, index) => index + 1);

    return (
      <div className="flex items-center">
        {stars.map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "text-yellow-400" : "text-gray-500"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 16.28l-4.223 2.157a.5.5 0 01-.734-.527l.81-4.736L.313 7.96a.5.5 0 01.277-.752l4.98-.724L8.554 1.98a.5.5 0 01.892 0l2.984 5.505 4.98.724a.5.5 0 01.276.752l-3.54 3.19.81 4.736a.5.5 0 01-.734.527L10 16.28z"
              clipRule="evenodd"
            />
          </svg>
        ))}
      </div>
    );
  };

  export default  Rating