import { XStack } from "@/common/components/atoms/ui/stack";
import { Separator } from "@/common/components/atoms/ui/separator";
import DocumentFolderCard from "@/common/components/molecules/card/document/document-folder-card";

export default function UserDocumentScreen() {
  return (
    <div className=" mx-auto">
      <div>
        <XStack className="mb-4 justify-between">
          <span className="text-2xl font-bold">Recent Documents</span>
        </XStack>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <DocumentFolderCard title="Form 137" to="./1" />
          <DocumentFolderCard to="/2" />
          <DocumentFolderCard to="/3" />
          <DocumentFolderCard to="/4" />
        </div>
      </div>

      <Separator className="my-4" />
      <div>
        <div>
          <span className="text-2xl font-bold">Recent Documents</span>
        </div>
      </div>
    </div>
  );
}
