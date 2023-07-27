import { randomBytes } from 'crypto';

export class AuthUtils {
    static map: { [discordId: string]: string } = { };

    public static async createDiscordCode(discordId: string): Promise<string> {
        const pinNumber = parseInt(randomBytes(3).toString('hex'), 16) % 1000000;
        const pin = pinNumber.toString().padStart(6, '0');
        AuthUtils.map[discordId] =  pin;
        return pin;
    }
}