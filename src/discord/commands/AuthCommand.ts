import {EmbedBuilder, Interaction} from "discord.js";
import Command from "./Command";
import {AuthUtils} from "../../utils/auth-utils";

export default class AuthCommand extends Command {
    description: string;
    ephemeral: boolean;
    style: boolean;

    constructor() {
        super();
        this.description = 'Połączą konto MC z Discordem.';
        this.ephemeral = true;
    }

    async execute(interaction: Interaction): Promise<EmbedBuilder> {
        return new EmbedBuilder()
            .setTitle('Autoryzacjia')
            .setDescription("Twój kod: `" + await AuthUtils.createDiscordCode(interaction.user.id) + "`");
    }
}