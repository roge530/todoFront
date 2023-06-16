'use client'

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Select, MenuItem, Button, Modal, Tooltip } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import Cookies from 'js-cookie';

interface Activity {
    id: string;
    name: string;
    status: string;
    isEditMode: boolean;
}

const ActivityTable: React.FC = () => {
    const token = Cookies.get('token');
    const id = Cookies.get('id');
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        const fetchActivities = async () => {
          try {
            const response = await fetch(`http://localhost:3002/activity/${id}`);
            if (response.ok) {
              const data = await response.json();
              const activitiesWithEditMode = data.activities.map((activity: Activity) => ({
                ...activity,
                isEditMode: false,
              }));
              setActivities(activitiesWithEditMode);
            }
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchActivities();
    }, [id]);
    
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => {
        const updatedActivities = activities.map((activity) => 
            activity.id === id ? {...activity, name: event.target.value} : activity
        );
        setActivities(updatedActivities);
    };

    const handleStatusChange = (event: SelectChangeEvent<string>, id: string) => {
        const updatedActivities = activities.map((activity) =>
            activity.id === id ? {...activity, status: event.target.value as string} : activity
        );
        setActivities(updatedActivities);
    };

    const handleEditClick = (id: string) => {
        const updatedActivities = activities.map((activity) =>
            activity.id === id ? { ...activity, isEditMode: true } : activity
        );
        setActivities(updatedActivities);
    }

    const handleSaveClick = (id: string) => {
        const updatedActivities = activities.map((activity) =>
          activity.id === id ? { ...activity, isEditMode: false } : activity
        );
        setActivities(updatedActivities);
        // Lógica para guardar los cambios en la API o realizar otras acciones
    };
    
    const handleDeleteClick = (id: string) => {
        console.log("borrando " + id);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:3002/activity/newActivity/${id}`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, status: 'new' }),
            });
            if (response.ok) {
                setSuccessMessage('Activity created');
                const data = await response.json();
                const newActivity = { id: data.id, name, status: 'new', isEditMode: false };
                setActivities((prevActivities) => prevActivities.concat(newActivity));
            }
            else setSuccessMessage('An error ocurr')
            handleClose();
            setName('');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section>
            <div>
                <Tooltip title={successMessage} open={!!successMessage} onClose={() => setSuccessMessage('')}>
                    <Button variant="contained" onClick={handleOpen}>
                        New Activity
                    </Button>
                </Tooltip>
                <Modal open={open} onClose={handleClose}>
                    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full">
                        <div className="bg-white p-4 rounded shadow">
                            <h2>New Activity</h2>
                            <TextField value={name} onChange={(e) => setName(e.target.value)} />
                            <Button variant="contained" onClick={handleSave}>
                                Save
                            </Button>
                            <Button variant="contained" onClick={handleClose}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
            <TableContainer>
                <Table>

                    <TableHead>
                        <TableRow>
                            <TableCell>Activity</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {activities.map((activity) => (
                            <TableRow key={activity.id}>
                                <TableCell>
                                    {activity.isEditMode ? (
                                        <TextField
                                            value={activity.name}
                                            onChange={(event) => handleNameChange(event, activity.id)}
                                        />
                                        ) : (
                                            activity.name
                                        )
                                    }
                                </TableCell>
                                <TableCell>
                                    {activity.isEditMode ? (
                                        <Select 
                                            value={activity.status}
                                            onChange={(event) => handleStatusChange(event, activity.id)}
                                        >
                                            <MenuItem value="new">New</MenuItem>
                                            <MenuItem value="doing">Doing</MenuItem>
                                            <MenuItem value="done">Done</MenuItem>
                                        </Select>
                                        ) : (
                                            activity.status
                                        )
                                    }
                                </TableCell>
                                <TableCell>
                                    {activity.isEditMode ? (
                                            <Button onClick={() => handleSaveClick(activity.id)}>Save</Button>
                                        ) : (
                                            <Button onClick={() => handleEditClick(activity.id)}>Edit</Button>
                                        )
                                    }
                                    <Button onClick={() => handleDeleteClick(activity.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </section>
    )
}

export default ActivityTable;