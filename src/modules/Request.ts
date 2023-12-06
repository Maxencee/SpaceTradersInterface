export default async function Request (url: string, config: Object) {
    try {
        const context = await fetch(url, config);
        const response = await context.json();
        return response;
    } catch (error) {
        return error;
    }  finally {
        console.log('Requested ' + url);
    }
}