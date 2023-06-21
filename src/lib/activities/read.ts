import { GetActivitiesResult } from "@/interfaces/activities";
export default async function GetAllActivities(idUser: string): Promise<GetActivitiesResult> {
    const emptyActivy: string[] = [];
    try {
        if (!process.env.API_URL || !process.env.API_PORT) {
            throw new Error('API_URL or API_PORT is not defined');
        }
        const response = await fetch(`http://${process.env.API_URL}/activity/${idUser}`);
        if (response.ok) {
            const data = await response.json();
            return { success: true, activitiesData: data.activities };
        }
    } catch (error: any) {
        return { success: false, activitiesData: emptyActivy,errorMessage: error.message};
    }
    return { success: false, activitiesData: emptyActivy };
}