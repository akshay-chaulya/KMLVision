import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

export interface IParseResult {
  parsedData: object[];
  summaryData: object;
}

const FileUpload = ({
  onFileUpload,
}: {
  onFileUpload: (result: IParseResult) => void;
}) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const kmlText = e.target?.result as string;
        if (!kmlText) throw new Error("File reading failed");

        const kmlDocument = new DOMParser().parseFromString(
          kmlText,
          "text/xml"
        );

        const placemarks = kmlDocument.getElementsByTagName("Placemark");
        const points = kmlDocument.getElementsByTagName("Point");
        const lineStrings = kmlDocument.getElementsByTagName("LineString");
        const polygons = kmlDocument.getElementsByTagName("Polygon");

        const summaryData = {
          Placemark: placemarks.length,
          Point: points.length,
          LineString: lineStrings.length,
          Polygon: polygons.length,
        };

        const parsedData = Array.from(placemarks).map((placemark) => {
          return {
            name:
              placemark.getElementsByTagName("name")[0]?.textContent ||
              "Unnamed",
            coordinates:
              placemark.getElementsByTagName("coordinates")[0]?.textContent ||
              "No coordinates",
          };
        });

        onFileUpload({ parsedData, summaryData });
      } catch (error: any) {
        toast.error(error.message || "Error parsing KML file");
        console.error("Error parsing KML:", error);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="mt-4">
      <label className="font-medium w-full cursor-pointer px-4 py-2 text-center flex items-center justify-center border rounded-lg bg-gray-100 hover:bg-gray-200">
        {fileName ? fileName : "Upload KML File"}
        <input
          type="file"
          accept=".kml"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default FileUpload;
