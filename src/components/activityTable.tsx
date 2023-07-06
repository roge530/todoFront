'use client'

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Select, MenuItem, Button, Modal, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { Activity } from '@/interfaces/activities';
import GetAllActivities from '@/lib/activities/read';
import ErrorModal from './errorModal';
import UpdateActivity from '@/lib/activities/update';
import DeleteActivity from '@/lib/activities/delete';
import CreateActivity from '@/lib/activities/create';
import { useSession } from 'next-auth/react';

const ActivityTable: React.FC = () => {
    const {data: session} = useSession();
    const token = session?.user.token;
    const idUser = session?.user.id;
    const [openNewActModal, setOpenNewActModal] = useState(false);
    const [openDelActDialog, setOpenDelActDialog] = useState(false);
    const [activityToDelete, setActivityToDelete] = useState('');
    const [name, setName] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [activities, setActivities] = useState<Activity[]>([]);
    const [ogActivities, setOGActivities] = useState<Activity[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchValue, setSearchValue] = useState('');

    //Get all activities
    useEffect(() => {
        const fetchActivities = async () => {
            if (idUser){
                let result = await GetAllActivities(idUser);
                if (result.success) {
                    const activitiesWithEditMode = result.activitiesData.map((activity: Activity) => ({
                        ...activity,
                        isEditMode: false,
                        originalName: activity.name,
                        originalStatus: activity.status,
                    }));
                    setActivities(activitiesWithEditMode);
                    setOGActivities(activitiesWithEditMode);
                }
                else setErrorMessage(result.errorMessage || 'Unknown error occurred');
            }
        };
    
        fetchActivities();
    }, [idUser]);

    //Clean error message after modal
    const afterCloseModal = () => {
        setErrorMessage('');
    }
    
    //Updates locally the name of an activity
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => {
        const updatedActivities = activities.map((activity) => 
            activity.id === id ? {...activity, name: event.target.value} : activity
        );
        setActivities(updatedActivities);
    };

    //Updates locally the status of an activity
    const handleStatusChange = (event: SelectChangeEvent<string>, id: string) => {
        const updatedActivities = activities.map((activity) =>
            activity.id === id ? {...activity, status: event.target.value as string} : activity
        );
        setActivities(updatedActivities);
    };

    //Activates edit mode
    const handleEditClick = (id: string) => {
        const updatedActivities = activities.map((activity) =>
            activity.id === id ? { ...activity, isEditMode: true, originalName: activity.name, originalStatus: activity.status } : activity
        );
        setActivities(updatedActivities);
    }

    //Send updated activity
    const handleSaveClick = async (id: string) => {
        const activity = activities.find((activity) => activity.id === id);
        let sendChange = false;

        if (!activity) {
            setErrorMessage('Activity not found');
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

        if (sendChange && idUser) {
            let result = await UpdateActivity(idUser, activity.id, activity.name, activity.status)
            if (!result.success) setErrorMessage(result.errorMessage || 'Unknown error occurred'); 
        }
    };
    
    //Delete an activity
    const handleDeleteClick = async (id: string) => {
        if (idUser) {
            let result = await DeleteActivity(idUser, id);
            if (result.success) {
                const updatedActivities: Activity[] = activities.filter((activity: Activity) => activity.id !== id);
                setActivities(updatedActivities);
                handleCloseDelActDialog();
            }
            else setErrorMessage(result.errorMessage || 'Unknown error occurred');
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
        if (idUser) {
            let result = await CreateActivity(idUser, name, 'new');
            if (result.success) {
                setSuccessMessage('Activity created');
                const newActivity = { id: result.newActivityID, name, status: 'new', isEditMode: false, originalName: name, originalStatus: 'new' };
                setActivities((prevActivities) => prevActivities.concat(newActivity));
            }
            else {
                setSuccessMessage('An error ocurr')
                setErrorMessage(result.errorMessage || 'Unknown error occurred');
            }
            handleCloseNewActModal();
            setName('');
        }
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(`change: ${event.target.value}`)
        setSearchValue(event.target.value);
        if (event.target.value === '') {
            setActivities(ogActivities);
        }
        else {
            let lowerCase = event.target.value.toLowerCase()
            let filterActivities = ogActivities.filter((activity: Activity) => {
                return activity.status.toLowerCase().includes(lowerCase);
            })
            console.log(filterActivities)
            setActivities(filterActivities);
        }
    };

    return (
        <section className='flex justify-center items-center h-screen'>
            <div>
                <div className='flex justify-end'>
                    <TextField
                        label="Buscar"
                        value={searchValue}
                        onChange={handleSearch}
                        variant="filled"
                        color="warning"
                        className="bg-rose-800 text-white mx-2 my-2"
                    />
                    <Tooltip title={successMessage} open={!!successMessage} onClose={() => setSuccessMessage('')}>
                        <Button variant="contained" onClick={handleOpenNewActModal} className="bg-gray-700 text-white">
                            New Activity
                        </Button>
                    </Tooltip>
                    <Modal open={openNewActModal} onClose={handleCloseNewActModal}>
                        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full">
                            <div className="bg-gray-800 p-4 rounded shadow text-white">
                            <h2 className="text-white px-2">New Activity</h2>
                            <div className='flex flex-row item-center '>
                                <div className='h-full w-full px-2 my-2'>
                                    <TextField
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="bg-gray-200 text-black"
                                    />
                                </div>
                                <div className="flex flex-col items-center">
                                    <Button variant="contained" className="bg-gray-700 mb-2 w-full" onClick={handleSave}>
                                    Save
                                    </Button>
                                    <Button
                                    variant="contained"
                                    className="bg-gray-700 w-full"
                                    onClick={handleCloseNewActModal}
                                    >
                                    Cancel
                                    </Button>
                                </div>
                            </div>
                            </div>
                        </div>
                    </Modal>
                </div>

                <TableContainer className="bg-gray-300">
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
                                                <MenuItem value="new">new</MenuItem>
                                                <MenuItem value="doing">doing</MenuItem>
                                                <MenuItem value="done">done</MenuItem>
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
                {errorMessage && <ErrorModal message={errorMessage} afterClose={afterCloseModal}/>}
            </div>
        </section>
    )
}

export default ActivityTable;