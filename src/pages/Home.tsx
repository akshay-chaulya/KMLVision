import FileUpload, { IParseResult } from "../components/FileUpload";
import Button from "../components/ui/button";
import { Link } from "react-router-dom";

const Home = ({
  setData,
  data,
}: {
  setData: (data: IParseResult) => void;
  data: IParseResult;
}) => {
  const isSummary =
    data.summaryData && Object.keys(data.summaryData).length > 0;

  const handleFileUpload = (result: IParseResult) => {
    setData(result);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="w-[400px] bg-white/10 backdrop-blur-lg rounded-xl py-6 px-10 shadow-lg border border-white/20">
        <h2 className="text-2xl font-bold text-white text-center mb-4">
          Upload KML File
        </h2>
        <FileUpload onFileUpload={handleFileUpload} />
        <div className="mt-4 w-full text-center">
          {isSummary && (
            <Button>
              <Link to="/summary">View Summary</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
