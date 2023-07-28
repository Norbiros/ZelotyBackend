import {EmbedBuilder} from "discord.js";
import Command from "./Command";

export default class InfoCommand extends Command {
    description: string;
    ephemeral: boolean;
    style: boolean;

    constructor() {
        super();
        this.description = 'Informacje o ZelotygiaBOCIE.';
    }

    async execute(): Promise<EmbedBuilder> {
        return new EmbedBuilder()
            .setTitle('ZelotyBOT')
            .setDescription('@Norbiros postanowił napisać Moda do Minecraft (Fabric) oraz bota na DC. Aby Zelotygia była jeszcze bardziej **ARCY  POTĘŻNA**!')
            .addFields(
                {
                    name: 'Mod',
                    value: 'Mod będzie zawierał wiele funkcji jak głosowanie na ustawy. Łączony chat z discordem. Autoryzacja, i wiel innych!'
                },
                {
                    name: 'Bot',
                    value: 'Bot będzie przypominał o wydarzeniach, pozwalał łatwiej zarządzać serwerem DC, oraz pozwalał łączyć konta!'
                }
            )
    }
}