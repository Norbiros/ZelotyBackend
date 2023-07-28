import {EmbedBuilder, Interaction} from "discord.js";

export default abstract class Command {
    description: string;
    ephemeral: boolean;
    style: boolean;

    protected constructor() {
        this.style = true;
        this.ephemeral = false;
    }

    abstract execute(interaction: Interaction): Promise<EmbedBuilder>;
}