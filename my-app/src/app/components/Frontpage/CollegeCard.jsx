const CollegeCard = ({ logo, name, address, gradient }) => {
  return (
    <div className="h-[600px] text-center min-w-[300px] md:min-w-[500px]  mx-4 rounded-2xl flex flex-col items-center  justify-evenly"
      style={{
        background: gradient,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3 className="text-white font-bold text-2xl">{name}</h3>

      <img
        src={logo}
        alt={`${name} logo`}
        style={{ width: "120px", height: "120px", marginBottom: "10px" }}
      />
      <p className="text-black font-semibold text-xl">{address}</p>
    </div>
  );
};

export default CollegeCard;
