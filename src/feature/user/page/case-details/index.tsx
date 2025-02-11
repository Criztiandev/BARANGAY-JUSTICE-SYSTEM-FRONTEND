import { useParams } from "react-router-dom";
import CaseDetailsSection from "./sections/case-details";
import CasePartySection from "./sections/case-party";
import useFetchCase from "../cases/hooks/use-fetch-case";

const CaseDetailsScreen = () => {
  const { id } = useParams();
  const { data: result } = useFetchCase(id ?? "");

  console.log(result);

  return (
    <div>
      <CaseDetailsSection />
      <CasePartySection />
    </div>
  );
};

export default CaseDetailsScreen;
