import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import Button from "../components/ui/button";
import { useEffect } from "react";

interface ISummary {
  summary: { [key: string]: number };
}

const SummaryTable = ({ summary }: { summary: ISummary }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!summary || Object.keys(summary).length === 0) {
      navigate("/");
    }
  }, [summary, navigate]);

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="absolute top-4 left-4">
        <Link to="/" className="text-white flex items-center hover:underline">
          <FaArrowLeftLong className="mr-2" /> Back to upload section
        </Link>
      </div>

      <div className="w-[600px] bg-white/10 backdrop-blur-lg rounded-xl py-6 px-10 shadow-lg border border-white/20">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Summary of KML Elements
        </h2>
        <table className="border-collapse border border-gray-700 w-full text-white">
          <thead>
            <tr className="bg-gray-700">
              <th className="border border-gray-600 px-4 py-2">Element Type</th>
              <th className="border border-gray-600 px-4 py-2">Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(summary).map(([key, value], index) => (
              <tr
                key={key}
                className={index % 2 === 0 ? "bg-gray-600" : "bg-gray-700"}
              >
                <td className="border border-gray-600 px-4 py-2">{key}</td>
                <td className="border border-gray-600 px-4 py-2">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 text-center">
          <Link to="/map">
            <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              In Detailed
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SummaryTable;
