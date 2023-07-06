import { FC } from "react";
import { Button } from "./ui/Button";
import { X } from "lucide-react";

const CloseModal: FC = () => {
  return (
    <Button>
      <X className="h-4 w-4" />
    </Button>
  );
};

export default CloseModal;
