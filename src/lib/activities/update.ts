import CommonResult from "@/interfaces/commonResult";
export default async function UpdateActivity(idUser:string, idActivity: string, name: string, status: string): Promise<CommonResult> {
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
                idUser,
                idActivity,
                name,
                status,
            }),
        });
        if (response.ok) return {success: true}
        else return {success: false, errorMessage: 'Failed to update activity name on the server'}
    } catch (error: any) {
        return {success: false, errorMessage: error.message}
    }  
}