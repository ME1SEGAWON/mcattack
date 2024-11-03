import fs from 'fs';
import mineflayer from 'mineflayer';

// Baca file usernames.txt
const usernames = ['Bot1', 'Bot2', 'Bot3', 'Bot4', 'Bot5', 'Bot6', 'Bot7', 'Bot8', 'Bot9', 'Bot10', 'Bot11', 'Bot12', 'Bot13', 'Bot14', 'Bot15', 'Bot16', 'Bot17', 'Bot18', 'Bot19', 'Bot20', 'Bot21', 'Bot22', 'Bot23', 'Bot24', 'Bot25', 'Bot26', 'Bot27', 'Bot28', 'Bot29', 'Bot30']; //fs.readFileSync('usernames.txt', 'utf-8').split('\n').filter(Boolean);

// Baca file proxies.txt
const proxies = fs.readFileSync('proxies.txt', 'utf-8').split('\n').filter(Boolean);

// Pilih 10 username pertama dari file
const selectedUsernames = usernames.slice(0, 30);

// Fungsi untuk membuat bot
function createBot(username, proxy) {
    const [proxyHost, proxyPort] = proxy.split(':');
    const bot = mineflayer.createBot({
        host: '152.42.214.111', // Ganti dengan alamat server Minecraft Anda
        port: 25565,            // Ganti dengan port server Minecraft Anda
        username: username,
        proxy: {
            host: proxyHost,
            port: parseInt(proxyPort, 10)
        }
    });

    bot.on('login', () => {
        console.log(`${username} has logged in`);
    });

    bot.on('error', (err) => {
        console.error(`Error for ${username}:`, err);
    });

    bot.on('end', () => {
        console.log(`${username} has disconnected`);
    });

    bot.on('kicked', (reason, loggedIn) => {
        console.error(`${username} was kicked for: ${reason}. Logged in: ${loggedIn}`);
    });

    bot.on('death', () => {
        console.log(`${username} died`);
    });
}

// Buat bot dengan proxy yang berbeda dengan delay 10 detik
selectedUsernames.forEach((username, index) => {
    const proxy = proxies[index % proxies.length]; // Gunakan proxy secara bergantian
    setTimeout(() => {
        createBot(username, proxy);
    }, index * 10000); // Delay 10 detik per bot
});