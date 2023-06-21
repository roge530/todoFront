import CommonResult from "@/interfaces/commonResult";
export default async function DeleteActivity(idUser:string, activityID: string): Promise<CommonResult> {
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
                activityID
            }),
        });
        if (response.ok) return {success: true}
    } catch (error: any) {
        return {success: false, errorMessage: error.message}
    }
    return {success: false}
}