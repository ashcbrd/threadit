import { FC } from "react";
import { Button } from "./ui/Button";
import { X } from "lucide-react";

const CloseModal: FC = () => {
  return (
    <Button
      variant="subtle"
      className="h-6 w-6 p-0 rounded-md"
      aria-label="close modal"
    >
      <X className="h-4 w-4" />
    </Button>
  );
};

export default CloseModal;
