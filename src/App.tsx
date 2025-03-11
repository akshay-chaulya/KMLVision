import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Map from "./pages/Map";
import { Toaster } from "react-hot-toast";
import Layout from "./layout/Layout";
import PageNotFaound from "./pages/PageNotFound";
import { useState } from "react";
import { IParseResult } from "./components/FileUpload";
import SummaryTable from "./pages/SummaryTable";

function App() {
  const [data, setData] = useState<IParseResult>({
    parsedData: [],
    summaryData: {},
  });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home data={data} setData={setData} />} />
            <Route
              path="/summary"
              element={<SummaryTable summary={data.summaryData} />}
            />
            <Route path="/map" element={<Map mapData={data.parsedData} />} />
          </Route>
          <Route path="*" element={<PageNotFaound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
