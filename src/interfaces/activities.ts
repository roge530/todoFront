export interface Activity {
    id: string;
    name: string;
    originalName: string;
    status: string;
    originalStatus: string;
    isEditMode: boolean;
}

export interface GetActivitiesResult {
    success: boolean;
    activitiesData: any;
    errorMessage?: string;
}

export interface newActivity {
    success: boolean;
    newActivityID: string;
    errorMessage?: string;
}