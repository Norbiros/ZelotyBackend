import { EmbedBuilder } from 'discord.js'
import Command from './Command'

export default class CalendarCommand extends Command {
    description: string
    ephemeral: boolean
    style: boolean

    constructor() {
        super()
        this.description =
            'Dowiedz się jaki jest dzisiaj dzień w Starowiańskim kalendarzu.'
        this.style = false
    }

    async execute(): Promise<EmbedBuilder> {
        const endDate = new Date()
        const diff = endDate.getTime() - new Date('2022-02-02').getTime()
        const daysDiff = Math.floor(diff / (1000 * 60 * 60 * 24))

        const day = (daysDiff % 9) + 1
        const tercja = Math.floor((daysDiff % 27) / 9) + 1
        const year = Math.floor(daysDiff / 27) + 1

        const tercjaNames = ['św. Człowiek', 'św. Krasnolud', 'św. Elf']
        const tercjaName = tercjaNames[tercja - 1]

        return new EmbedBuilder()
            .setColor(0x026839)
            .setTitle('Kalendarz Starowierstwa')
            .setDescription(
                'Kalendarz rozpoczął się 2 lutego 2022 roku. Rok słada się z 3 tecji. Tecja składa się z 9 dni.'
            )
            .addFields(
                {
                    name: 'Dzień',
                    value: `${day}`,
                },
                {
                    name: 'Tecja',
                    value: `${tercja} ${tercjaName}`,
                },
                {
                    name: 'Rok',
                    value: `${year}`,
                }
            )
    }
}
