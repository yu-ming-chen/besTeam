const Telegraf = require('telegraf')
const { Markup } = Telegraf
const TelegrafInlineMenu = require('telegraf-inline-menu')

const app = new Telegraf('')
const PAYMENT_TOKEN = ''

const products = [
    {
        name: 'Varsity T-Shirt (Maroon & White)',
        price: 12.00,
        description: 'Available sizes: XS to XL, Unisex',
        photoUrl: 'https://scontent-sin6-2.xx.fbcdn.net/v/t45.5328-0/p180x540/19577772_2304807232878808_7066807389176987648_n.png?_nc_cat=104&_nc_ohc=nlrxL-7VmYUAX9mjVzR&_nc_ht=scontent-sin6-2.xx&oh=217602b33d6e25d67f8e58e0e9373f7f&oe=5EA1948E'
    },
    {
        name: 'Laptop Sleeve',
        price: 10.90,
        description: 'We turn food into code. Size: (13” / 15")',
        photoUrl: 'https://scontent-sin6-2.xx.fbcdn.net/v/t45.5328-0/s552x414/29350573_1910217315712502_7713305279823085568_n.png?_nc_cat=105&_nc_ohc=gHv6API3au0AX_NbKTM&_nc_ht=scontent-sin6-2.xx&oh=6e4454cc4c1030722c3e28efbf8fc109&oe=5E9E7AFD'
    },
    {
        name: 'SoCCat Nanoblock',
        price: 7.90,
        description: 'Featuring our very own mascot SoCCat',
        photoUrl: 'https://scontent-sin6-2.xx.fbcdn.net/v/t45.5328-0/s552x414/29599137_1527972927319986_964894386213093376_n.png?_nc_cat=111&_nc_ohc=uZx72puBDq8AX-CZ-Cu&_nc_ht=scontent-sin6-2.xx&oh=8ed86c11ba7df9c114acb6d8f4dbf70a&oe=5ED67EB5'
    }
]

const events = [
    {
        name: 'Meliorium 2020',
        date: '1 Feb 2020',
        description: '',
        photoUrl: 'https://scontent-sin6-2.xx.fbcdn.net/v/t1.0-9/80817417_2566201056781429_3955999869885218816_o.jpg?_nc_cat=104&_nc_ohc=zgi6shhI59oAX_y2yis&_nc_ht=scontent-sin6-2.xx&oh=6d6e7bd0dba82667e093adfed99518ab&oe=5EA22905'
    },
    {
        name: 'FoC Camp OGL Sign up',
        date: '7 July 2020',
        description: '',
        photoUrl: 'Join us this summer as an OGL, Househead, Helper or Medic and look forward to a summer filled with fun, laughter and newly forged friendships! \n\nSign up now https://orgsync.com/134658/forms'
    },
    {
        name: 'Rag & Flag',
        date: '10 Aug 2020',
        description: '',
        photoUrl: 'Have you ever wanted to be part of a performance for a better cause? Look no further as SoC Receive-And-Give (RAG) invites you to join us on a two month journey. In order to show appreciation to our public for their support and generous donations to our beneficiaries during FLAG, students from SoC RAG put together the performance of the summer.\n\n Sign up now at https://orgsync.com/134658/forms'
    }
]

const coursematerials = [
    {
        name: 'Introduction to Linear Algebra, Fifth Edition',
        price: 12.00,
        description: 'Will be available for collection in 2 weeks',
        photoUrl: 'http://math.mit.edu/~gs/linearalgebra/linearalgebra5_Front.jpg'
    },
    {
        name: 'Competitive programming for CS204 by Steven Halim',
        price: 10.90,
        description: 'Will be available for collection in 2 weeks',
        photoUrl: 'https://cpbook.net/img/cp3.png'
    },
    {
        name: 'Java for dummies',
        price: 27.90,
        description: 'Will be available for collection in 2 weeks',
        photoUrl: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/1192/9781119247791.jpg'
    }
]

const menu = new TelegrafInlineMenu(ctx => 'Welcome to NUS Students Computing Club bot, nice to meet you! How can I help you?')

menu.setCommand('start')

menu.simpleButton('Merch', 'a', {
  doFunc: ctx => ctx.reply('We sell various SOC merchandise. Just type "merch" to see what do we sell to start.')
})

menu.simpleButton('Events', 'b', {
    doFunc: ctx => ctx.reply('We have a list of upcoming events as well! Just type "event" to see the list of events SOC has.')
})

menu.simpleButton('Course Material', 'c', {
    doFunc: ctx => ctx.reply('We sell course materials for your modules too. Just type "course" to see what we have to offer.')
})


app.use(menu.init())

app.startPolling()


function createInvoice (product) {
    return {
        provider_token: PAYMENT_TOKEN,
        start_parameter: 'foo',
        title: product.name,
        description: product.description,
        currency: 'SGD',
        photo_url: product.photoUrl,
        is_flexible: false,
        need_phone_number: true,
        send_phone_number_to_provider: false,
        need_shipping_address: true,
        prices: [{ label: product.name, amount: Math.trunc(product.price * 100) }],
        payload: {}
    }
}



// Start command
app.command('start', ({ reply }) => reply('Welcome to NUS Students Computing Club shopper bot, nice to meet you! We sell various SOC merchandise. Just ask what do we sell to start.'))
app.command('help', ({ reply }) => reply('Just type what and you will see a list of our current items on sale!'))
app.command('contact', ({ reply }) => reply('Feel free to contact us through any of our social medias Facebook: @nuscomputing or Instagram: @nuscomputingclub'))


// Show offer
app.hears(/^merch.*/i, ({ replyWithMarkdown }) => replyWithMarkdown(`
Here is what we have to offer!
${products.reduce((acc, p) => {
    return (acc += `*${p.name}* - ${p.price} SGD\n`)
    }, '')}    
What do you want?`,
    Markup.keyboard(products.map(p => p.name)).oneTime().resize().extra()
))

// Show events
app.hears(/^event.*/i, ({ replyWithMarkdown }) => replyWithMarkdown(`
Here are the upcoming events!
${events.reduce((acc, e) => {
    return (acc += `*${e.name}* - ${e.date} \n`)
    }, '')}    
What do you want?`,
    Markup.keyboard(events.map(e => e.name)).oneTime().resize().extra()
))

// Course materials
app.hears(/^course.*/i, ({ replyWithMarkdown }) => replyWithMarkdown(`
Here is the list of course materials up for sale!
${coursematerials.reduce((acc, e) => {
    return (acc += `*${e.name}* - ${e.price} SGD\n`)
    }, '')}    
What do you want?`,
    Markup.keyboard(coursematerials.map(e => e.name)).oneTime().resize().extra()
))

// Order product
products.forEach(p => {
    app.hears(p.name, (ctx) => {
        console.log(`${ctx.from.first_name} is about to buy a ${p.name}.`);
        ctx.replyWithInvoice(createInvoice(p))
        //ctx.replyWithInvoice()
    })
})

// Sign up event
events.forEach(p => {
    app.hears(p.name, (ctx) => {
        console.log(`${ctx.from.first_name} is about to sign up for ${p.name}.`);
        if(p.name == 'Meliorium 2020') {
            ctx.replyWithMarkdown('Calling All International and Local SoC Students! 📣 \n \nWhy not start off the semester in pursuit of better things? \nMeliorium - inspired by Latin word “Meliora” would be a great way for you to meet new people while having fun together. \n\nCompete against other groups in the Amazing Race around COM1 & 2 and break free from the Escape Room. The quickest teams stand to win limited SoC merchandise. \n\nParticipation is free of charge. All you need is some familiarity to SoC, an open mind, and willingness to have fun. All SoC students, international and local, are strongly encouraged to join us! Bring along a friend and enjoy this amazing fun-filled day! \n\nMeliorium will be held on Saturday, 18th Jan 2020, from 10.30am-6pm. \n\nInterested? Sign up now at https://bitly.com/meliorium! Sign ups close on 11th Jan 2359.')
        
        } else if (p.name == 'Rag & Flag') {
            ctx.replyWithMarkdown('Have you ever wanted to be part of a performance for a better cause? Look no further as SoC Receive-And-Give (RAG) invites you to join us on a two month journey. In order to show appreciation to our public for their support and generous donations to our beneficiaries during FLAG, students from SoC RAG put together the performance of the summer.\n\n Sign up now at https://orgsync.com/134658/forms')
        } else {
            ctx.replyWithMarkdown('Join us this summer as an OGL, Househead, Helper or Medic and look forward to a summer filled with fun, laughter and newly forged friendships! \n\nSign up now https://orgsync.com/134658/forms')
        }
            //ctx.replyWithInvoice()
    })
})

// Order coursematerials
coursematerials.forEach(p => {
    app.hears(p.name, (ctx) => {
        console.log(`${ctx.from.first_name} is about to buy a ${p.name}.`);
        ctx.replyWithInvoice(createInvoice(p))
        //ctx.replyWithInvoice()
    })
})

// Handle payment callbacks
app.on('pre_checkout_query', ({ answerPreCheckoutQuery }) => answerPreCheckoutQuery(true))
app.on('successful_payment', (ctx) => {
    console.log(`${ctx.from.first_name} (${ctx.from.username}) just payed ${ctx.message.successful_payment.total_amount / 100} SGD.`)
})

app.startPolling()
