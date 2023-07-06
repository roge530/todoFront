import { newActivity } from "@/interfaces/activities";
export default async function CreateActivity(idUser:string, name: string, status: string): Promise<newActivity> {
    try {
        if (!process.env.API_URL || !process.env.API_PORT) {
            throw new Error('API_URL or API_PORT is not defined');
        }
        const response = await fetch(`${process.env.API_URL}/activity/newActivity/${idUser}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, status }),
        });
        if (response.ok) {
            const data = await response.json();
            return {success: true, newActivityID: data.id}
        }
    } catch (error: any) {
        return {success: false, newActivityID: '', errorMessage: error.message}
    }
    return {success: false, newActivityID: ''}
}