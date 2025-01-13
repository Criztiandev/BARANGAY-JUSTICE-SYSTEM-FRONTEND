import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/atoms/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import Avatar from "@/common/components/atoms/avatar/Avatar";
import CasePartyInformationCard from "@/common/components/molecules/card/case/case-party-information-card";

const CasePartySection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CasePartyInformationCard
        title="Complainant Details"
        partyType="compliant"
        partyInfo={{
          name: "Criztian Jade M Tuplano",
          gender: "Male",
          email: "criztianjade@gmail.com",
          phone: "09123456789",
          address: "Rawis, San Fernando, Pampanga",
          avatarFallback: "CJ",
        }}
        className="col-span-1"
      />
      <CasePartyInformationCard
        title="Respondent Details"
        partyType="respondent"
        partyInfo={{
          name: "John Doe",
          gender: "Male",
          email: "john.doe@gmail.com",
          phone: "09123456789",
          address: "Rawis, San Fernando, Pampanga",
          avatarFallback: "JD",
        }}
        className="col-span-1"
      />
    </div>
  );
};

export default CasePartySection;
