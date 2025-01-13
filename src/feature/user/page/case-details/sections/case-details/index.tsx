import { Badge } from "@/common/components/atoms/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/atoms/ui/card";
import { CalendarDays, FileText } from "lucide-react";
const CaseDetailsSection = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold">CASE-2024-002</CardTitle>
            <p className="text-muted-foreground">Criminal Case: MURDER</p>
          </div>
          <Badge variant="destructive" className="text-lg py-1 rounded-full">
            Civil Case
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <CalendarDays className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Filing Date</p>
                <p>11/01/2025</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Case Type</p>
                <p>MURDER</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Case Description</h3>
            <p>
              This is to report that John Doe stole Two Hundred Thousand Pesos
              (₱200,000.00) from Criztian Smith. The incident happened on
              January 25,2001 at Barangay B neneg G. According to Criztian, John
              Doe took the money without permission when they steal it using
              dirt. The complainant has made several attempts to contact John
              Doe to return the money, but the latter has been ignoring all
              communications.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseDetailsSection;
