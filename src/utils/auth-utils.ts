import { randomBytes } from 'crypto'
import prisma from '../prisma'

export class AuthUtils {
    static map: { [discordId: string]: string } = {}

    public static async createDiscordCode(discordId: string): Promise<string> {
        const pinNumber = parseInt(randomBytes(3).toString('hex'), 16) % 1000000
        const pin = pinNumber.toString().padStart(6, '0')
        AuthUtils.map[discordId] = pin
        return pin
    }

    public static async isConnected(discordId: string): Promise<boolean> {
        return !!prisma.users.findFirst({
            where: {
                discord: discordId,
            },
        })
    }
}
