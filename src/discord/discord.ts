import {Client, EmbedBuilder, GatewayIntentBits, REST, Routes} from 'discord.js';
import {AuthUtils} from "../utils/auth-utils";

export default class Discord {
    client: Client;

    constructor(token: string | undefined) {
        if (!token) return;
        this.init(token);
    }

    async init(token: string) {

        const commands = [
            {
                name: 'info',
                description: 'Informacje o ZelotyBOT',
            },
            {
                name: 'zelotygia',
                description: 'Niech żyje Zelotygia!',
            },
            {
                name: 'auth',
                description: 'Niech żyje Zeloatygia!',
            },
        ];

        const rest = new REST({ version: '10' }).setToken(token);

        try {
            console.log('Started refreshing application (/) commands.');

            await rest.put(Routes.applicationCommands("1133333135149498441"), { body: commands });

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }

        this.client = new Client({ intents: [GatewayIntentBits.Guilds] });
        this.client.on("ready", () => {
            console.log(`Logged in as ${this.client.user?.tag}!`);
        });
        const exampleEmbed = new EmbedBuilder()
            .setColor(0x026839)
            .setTitle('ZelotyBOT')
            .setDescription('@Norbiros postanowił napisać Moda do Minecraft (Fabric) oraz bota na DC. Aby Zelotygia była jeszcze bardziej **ARCY  POTĘŻNA**!')
            .addFields(
                { name: 'Mod', value: 'Mod będzie zawierał wiele funkcji jak głosowanie na ustawy. Łączony chat z discordem. Autoryzacja, i wiel innych!' },
                { name: 'Bot', value: 'Bot będzie przypominał o wydarzeniach, pozwalał łatwiej zarządzać serwerem DC, oraz pozwalał łączyć konta!' }
            )
            .setFooter({ text: 'Niech żyje Zelotygia!', iconURL: 'https://cdn.discordapp.com/icons/938422856805646346/aab8fde84319f7ad81fd4fd53d4b7367.webp' });

        const zEmbed = new EmbedBuilder()
            .setColor(0x026839)
            .setAuthor({ name: 'Niech żyje Zelotygia!', iconURL: 'https://cdn.discordapp.com/icons/938422856805646346/aab8fde84319f7ad81fd4fd53d4b7367.webp' })

        this.client.on('interactionCreate', async interaction => {
            if (!interaction.isChatInputCommand()) return;

            if (interaction.commandName === 'info') {
                await interaction.reply({embeds: [exampleEmbed]});
            } else if (interaction.commandName == 'zelotygia') {
                await interaction.reply({embeds: [zEmbed]})
            } else if (interaction.commandName == 'auth') {
                const authEmbed = new EmbedBuilder()
                    .setColor(0x026839)
                    .setTitle('Autoryzacjia')
                    .setDescription(`${await AuthUtils.createDiscordCode(interaction.user.id)}`)
                    .setFooter({ text: 'Niech żyje Zelotygia!', iconURL: 'https://cdn.discordapp.com/icons/938422856805646346/aab8fde84319f7ad81fd4fd53d4b7367.webp' });
                await interaction.reply({embeds: [authEmbed]})
            }
        });
        await this.client.login(token);
    }
}