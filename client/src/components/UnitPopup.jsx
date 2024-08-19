import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const UnitPopup = ({ isOpen, node, onClose, onInsert, onAppend, onEdit, onDelete, isAdmin }) => {

    const navigate = useNavigate();

    const handleEnterLesson = () => {
        navigate(`${node.id}`)
    };

    const titleStyle = {
        color: '#3ca3ee', // Blue color
        fontSize: '24px', 
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '20px 0'
    };

    const contentStyle = {
        fontSize: '18px',
        textAlign: 'center',
        marginBottom: '20px'
    };

    const buttonStyle = {
        margin: '10px',
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px'
    };

    const buttonPrimary = {
        ...buttonStyle,
        backgroundColor: '#3ca3ee',
        color: '#fff'
    };

    const buttonSecondary = {
        ...buttonStyle,
        backgroundColor: '#f1f3f4',
        color: '#000'
    };

    const buttonGreen = {
        ...buttonStyle,
        backgroundColor: '#34a853',
        color: '#fff'
    };

    const buttonRed = {
        ...buttonStyle,
        backgroundColor: '#ea4335',
        color: '#fff'
    };

    const buttonEdit = {
        ...buttonStyle,
        backgroundColor: '#646464',
        color: '#fff'
    };

    const dialogTitleStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: '24px',
        paddingLeft: '24px'
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle style={dialogTitleStyle}>
                <span style={titleStyle}>{node && node.title}</span>
                <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close" style={{margin: '12px'}}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText style={contentStyle}>
                    {node && node.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions style={{ justifyContent: 'center' }}>
                {/* <Button onClick={onClose} style={buttonSecondary}>Back</Button> */}
                <Button onClick={handleEnterLesson} style={buttonPrimary}>Enter</Button>
            </DialogActions>
            {
                isAdmin &&
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button onClick={onInsert} style={buttonGreen}>Insert Child</Button>
                    <Button onClick={onAppend} style={buttonGreen}>Append Child</Button>
                    <Button onClick={onEdit} style={buttonEdit}>Edit</Button>
                    <Button onClick={onDelete} style={buttonRed}>Delete</Button>
                </DialogActions>
            }
        </Dialog>
    );
};

export default UnitPopup;
