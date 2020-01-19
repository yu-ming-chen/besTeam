# Shopper TelegramBot @PaymentDemoBot

# Hack and Roll 2020
This serves as the code base for Hack and Roll 2020 submission on a telebot that sells merchandise and serves as payment bot using Stripe and telegraf (server agent).

#### Pre-requisites
1. Install Nodejs 
2. Telegram on Mobile 

#### Usage
1) Run the virtual env first in the env1 directory by typing: env1\Scripts\activate (windows) source env1\Scripts\activate (macos/linux-try'/'if doesnt work)
2) Then, go into the telegram-payment-bot\TelegramBot directory and run:
  a) node index.js
3) Please note that since the bot is working in test mode, it will only be able to send invoices to those Telegram users that are mutual contacts with the account of the bot's creator. So make sure that those who will help you test the payments functionality are in your contacts list.
