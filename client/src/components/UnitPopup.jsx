import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

const UnitPopup = ({ isOpen, node, onClose }) => {
    const handleEnterLesson = () => {
        window.location.href = `http://localhost:3000/${node.type}/${node.id}`;
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Node Selected {node && node.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {node && `You selected a ${node.type} nodess with id: ${node.id}`}
                </DialogContentText> 
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
                <Button onClick={handleEnterLesson
            
                } color="primary">
                    Go to {node && node.type}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UnitPopup;