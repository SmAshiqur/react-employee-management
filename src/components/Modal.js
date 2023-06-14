import * as React from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import UserForm from "./UserForm";

export default function Modal({ open, onClose, title }) {
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle className="text-center">{title}</DialogTitle>
        <DialogContent>
          <UserForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
