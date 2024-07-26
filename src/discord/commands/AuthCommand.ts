import { EmbedBuilder, GuildMemberRoleManager, Interaction } from 'discord.js'
import Command from './Command'
import { AuthUtils } from '../../utils/auth-utils'

export default class AuthCommand extends Command {
    description: string
    ephemeral: boolean
    style: boolean

    constructor() {
        super()
        this.description = 'Połączą konto MC z Discordem.'
        this.ephemeral = true
    }

    async execute(interaction: Interaction): Promise<EmbedBuilder> {
        if (!interaction.member) {
            return new EmbedBuilder()
                .setTitle('Autoryzacja')
                .setDescription('Nie jesteś na serwerze!')
        }

        if (
            !(interaction.member.roles as GuildMemberRoleManager).cache.has(
                '938424043575595029'
            )
        ) {
            return new EmbedBuilder()
                .setTitle('Autoryzacja')
                .setDescription('Nie jesteś obywatelem!')
        }

        if (await AuthUtils.isConnected(interaction.user.id)) {
            return new EmbedBuilder()
                .setTitle('Autoryzacja')
                .setDescription('Już połączyłeś/aś konta!')
        }

        return new EmbedBuilder()
            .setTitle('Autoryzacja')
            .setDescription(
                `Twój kod: \`${await AuthUtils.createDiscordCode(interaction.user.id)}\`` +
                    `\n\nAby połączyć konto wpisz \`/auth <kod>\` w MC.`
            )
    }
}
