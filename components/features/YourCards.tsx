export const YourCard = () => {
  return (
    <div className="bg-white shadow-md p-4 rounded">
      <h4 className="text-lg font-semibold mb-4">Your Cards</h4>
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded">
          <p className="text-sm mb-1">12XX XXXX XXXX XX66</p>
          <p className="text-sm">Adam Jacobs</p>
          <p className="text-sm text-gray-950">04/28</p>
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <p className="text-sm mb-1">91XX XXXX XXXX XX46</p>
          <p className="text-sm">Adam Jacobs</p>
          <p className="text-sm text-gray-950">04/28</p>
        </div>
      </div>
    </div>
  );
};
