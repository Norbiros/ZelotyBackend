import { EmbedBuilder } from 'discord.js'
import Command from './Command'

export default class ZelotygiaCommand extends Command {
    description: string
    ephemeral: boolean
    style: boolean

    constructor() {
        super()
        this.description = 'Niech żyje Zelotygia!'
        this.style = false
    }

    async execute(): Promise<EmbedBuilder> {
        return new EmbedBuilder().setColor(0x026839).setAuthor({
            name: 'Niech żyje Zelotygia!',
            iconURL:
                'https://cdn.discordapp.com/icons/938422856805646346/aab8fde84319f7ad81fd4fd53d4b7367.webp',
        })
    }
}
