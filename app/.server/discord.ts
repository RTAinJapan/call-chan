export const callAdmins = async () => {
    const customUser = process.env['DISCORD_USERNAME'];
    const webhookUrl = process.env['DISCORD_WEBHOOK'];
    const mention = process.env['DISCORD_MENTION'] ?? '';

    if (!webhookUrl) {
        console.error('Webhook URL is not defined!');
        return;
    }

    const content = `${mention} 呼ばれているよ！`;

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            body: JSON.stringify({
                content,
                ... customUser ? { username: customUser } : {}
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            console.log('Called admins!');
            return;
        }

        console.error('Failed to call admin.');
        console.error(await response.json());
    } catch (err) {
        console.error(err);
    }


}