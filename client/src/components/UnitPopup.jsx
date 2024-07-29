import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

const UnitPopup = ({ isOpen, node, onClose, onInsert, onAppend, onEdit, onDelete, isAdmin }) => {
    const handleEnterLesson = () => {
        window.location.href = `http://localhost:3000/${node.type}/${node.id}`;
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>
                {node && node.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {node && node.content}
                </DialogContentText> 
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Close</Button>
                <Button onClick={handleEnterLesson} color="primary">Go to {node && node.type}</Button>
            </DialogActions>
            {
                isAdmin &&
                <DialogActions>
                    <Button onClick={onInsert} color="primary">Insert child</Button>
                    <Button onClick={onAppend} color="primary">Append child</Button>
                    <Button onClick={onEdit} color="primary">Edit</Button>
                    <Button onClick={onDelete} color="primary">Delete</Button>
                </DialogActions>
            }
            
        </Dialog>
    );
};

export default UnitPopup;