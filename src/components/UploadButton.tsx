'use client'

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";

const UploadButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onModalisVisibleChange = (isVisible: boolean) => { if (!isVisible) setIsOpen(isVisible) }

  return (
    <Dialog open={isOpen} onOpenChange={onModalisVisibleChange}>
      <DialogTrigger asChild onClick={() => { setIsOpen(true) }}>
        <Button>Upload pdf</Button>
      </DialogTrigger>
      <DialogContent>
        example content
      </DialogContent>
    </Dialog>
  );
}

export default UploadButton;