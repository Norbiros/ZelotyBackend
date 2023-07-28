import {ActivityType, Client, GatewayIntentBits, REST, Routes} from 'discord.js';

import ZelotygiaCommand from "./commands/ZelotygiaCommand";
import AuthCommand from "./commands/AuthCommand";
import InfoCommand from "./commands/InfoCommand";
import Command from "./commands/Command";
import CalendarCommand from "./commands/CalendarCommand";

export default class Discord {
    client: Client;

    constructor(token: string | undefined) {
        if (!token) return;
        this.init(token);
    }

    async init(token: string) {
        const commands: { [key: string]: Command } = {
            'info': new InfoCommand(),
            'auth': new AuthCommand(),
            'zelotygia': new ZelotygiaCommand(),
            'kalendarz': new CalendarCommand(),
        }
        const commandsList = [];
        for (const [key, value] of Object.entries(commands)) {
            commandsList.push({name: key, description: value.description});
        }

        const rest = new REST({version: '10'}).setToken(token);
        try {
            await rest.put(Routes.applicationCommands("1133333135149498441"), {body: commandsList});
            console.log("Successfully registered application commands.")
        } catch (error) {
            console.error("Error while registering commands", error);
        }

        this.client = new Client({intents: [GatewayIntentBits.Guilds]});
        this.client.on("ready", () => {
            console.log(`Logged in as ${this.client.user?.tag}!`);
            this.client.user?.setStatus('online');
            this.client.user?.setActivity(`Zelotygia`, {type: ActivityType.Playing});
        });

        this.client.on('interactionCreate', async interaction => {
            if (!interaction.isChatInputCommand()) return;
            if (commands[interaction.commandName]) {
                const command = commands[interaction.commandName];
                const embed = await command.execute(interaction);
                if (command.style) {
                    embed.setColor(0x026839);
                    embed.setFooter({
                        text: 'Niech żyje Zelotygia!',
                        iconURL: 'https://cdn.discordapp.com/icons/938422856805646346/aab8fde84319f7ad81fd4fd53d4b7367.webp'
                    });
                }
                await interaction.reply({embeds: [embed], ephemeral: command.ephemeral});
            }
        });
        await this.client.login(token);
    }
}
