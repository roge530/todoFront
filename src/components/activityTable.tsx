'use client'

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Select, MenuItem, Button, Modal, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import Cookies from 'js-cookie';

interface Activity {
    id: string;
    name: string;
    originalName: string;
    status: string;
    originalStatus: string;
    isEditMode: boolean;
}

const ActivityTable: React.FC = () => {
    const token = Cookies.get('token');
    const idUser = Cookies.get('id');
    const [openNewActModal, setOpenNewActModal] = useState(false);
    const [openDelActDialog, setOpenDelActDialog] = useState(false);
    const [activityToDelete, setActivityToDelete] = useState('');
    const [name, setName] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        const fetchActivities = async () => {
          try {
            if (!process.env.API_URL || !process.env.API_PORT) {
                throw new Error('API_URL or API_PORT is not defined');
            }
            const response = await fetch(`http://${process.env.API_URL}:${process.env.API_PORT}/activity/${idUser}`);
            if (response.ok) {
              const data = await response.json();
              const activitiesWithEditMode = data.activities.map((activity: Activity) => ({
                ...activity,
                isEditMode: false,
                originalName: activity.name,
                originalStatus: activity.status,
              }));
              setActivities(activitiesWithEditMode);
            }
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchActivities();
    }, [idUser]);
    
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
            activity.id === id ? { ...activity, isEditMode: true, originalName: activity.name } : activity
        );
        setActivities(updatedActivities);
    }

    const handleSaveClick = async (id: string) => {
        const activity = activities.find((activity) => activity.id === id);
        let sendChange = false;

        if (!activity) {
            console.log('Activity not found');
            return;
        }

        if (activity.name !== activity.originalName) {
            sendChange = true;
        }

        if (activity.status !== activity.originalStatus) {
            sendChange = true;
        }

        const updatedActivities = activities.map((activity) =>
          activity.id === id ? { ...activity, isEditMode: false } : activity
        );

        setActivities(updatedActivities);

        if (sendChange) {
            try {
                if (!process.env.API_URL || !process.env.API_PORT) {
                    throw new Error('API_URL or API_PORT is not defined');
                }
                const response = await fetch(`http://${process.env.API_URL}:${process.env.API_PORT}/activity/editActivity`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idUser: idUser,
                        idActivity: activity.id,
                        name: activity.name,
                        status: activity.status,
                    }),
                });
    
                if (response.ok) {
                    console.log('Activity updated on the server');
                } else {
                    console.log('Failed to update activity name on the server');
                }
            } catch (error) {
                console.log('An error occurred while sending the PATCH request:', error);
            }
        }
    };
    
    const handleDeleteClick = async (id: string) => {
        try {
            if (!process.env.API_URL || !process.env.API_PORT) {
                throw new Error('API_URL or API_PORT is not defined');
            }
            const response = await fetch(`http://${process.env.API_URL}:${process.env.API_PORT}/activity/removeActivity/${idUser}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    activityID: id
                }),
            });

            if (response.ok) {
                const updatedActivities: Activity[] = activities.filter((activity: Activity) => activity.id !== id);
                setActivities(updatedActivities);
                handleCloseDelActDialog();
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleOpenNewActModal = () => {
        setOpenNewActModal(true);
    }

    const handleCloseNewActModal = () => {
        setOpenNewActModal(false);
    }

    const handleOpenDelActDialog = (idActivity: string) => {
        setOpenDelActDialog(true);
        setActivityToDelete(idActivity);
    }

    const handleCloseDelActDialog = () => {
        setOpenDelActDialog(false);
        setActivityToDelete('');
    }

    const handleSave = async () => {
        try {
            if (!process.env.API_URL || !process.env.API_PORT) {
                throw new Error('API_URL or API_PORT is not defined');
            }
            const response = await fetch(`http://${process.env.API_URL}:${process.env.API_PORT}/activity/newActivity/${idUser}`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, status: 'new' }),
            });
            if (response.ok) {
                setSuccessMessage('Activity created');
                const data = await response.json();
                const newActivity = { id: data.id, name, status: 'new', isEditMode: false, originalName: name, originalStatus: 'new' };
                setActivities((prevActivities) => prevActivities.concat(newActivity));
            }
            else setSuccessMessage('An error ocurr')
            handleCloseNewActModal();
            setName('');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section>
            <div>
                <Tooltip title={successMessage} open={!!successMessage} onClose={() => setSuccessMessage('')}>
                    <Button variant="contained" onClick={handleOpenNewActModal}>
                        New Activity
                    </Button>
                </Tooltip>
                <Modal open={openNewActModal} onClose={handleCloseNewActModal}>
                    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full">
                        <div className="bg-white p-4 rounded shadow">
                            <h2>New Activity</h2>
                            <TextField value={name} onChange={(e) => setName(e.target.value)} />
                            <Button variant="contained" onClick={handleSave}>
                                Save
                            </Button>
                            <Button variant="contained" onClick={handleCloseNewActModal}>
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
                                    <Button onClick={() => handleOpenDelActDialog(activity.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={openDelActDialog}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <p>Are you sure that you want to delete this activity?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDelActDialog} color='primary'>Cancel</Button>
                    <Button onClick={() => handleDeleteClick(activityToDelete)} color='primary' autoFocus>Confirm</Button>
                </DialogActions>
            </Dialog>
        </section>
    )
}

export default ActivityTable;