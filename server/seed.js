const Segment = require('./models/Segment');
const Service = require('./models/Service');
const Client = require('./models/Client');
const Highlight = require('./models/Highlight');
const Stats = require('./models/Stats');
const Admin = require('./models/Admin');
const Event = require('./models/Event');

async function seed() {
  try {
    // Seed Admin
    const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (!adminExists) {
      await Admin.create({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD, name: 'Infinity Admin' });
      console.log('✅ Admin seeded');
    }

    // Seed Stats
    const statsCount = await Stats.countDocuments();
    if (!statsCount) {
      await Stats.insertMany([
        { order: 1, label: 'Events Delivered', value: '500', suffix: '+' },
        { order: 2, label: 'Years Experience', value: '20', suffix: '+' },
        { order: 3, label: 'Global Hubs', value: '5', suffix: '' },
        { order: 4, label: 'Corporate Clients', value: '100', suffix: '+' },
        { order: 5, label: 'Intl Artists Booked', value: '50', suffix: '+' },
      ]);
      console.log('✅ Stats seeded');
    }

    // Seed Segments
    const segmentsData = [
      {
        order: 1,
        icon: '💼',
        label: 'Corporate',
        title: 'Corporate Events',
        sub: 'HSBC · Microsoft · Nestle · SriLankan Airlines · Unilever',
        accentColor: '#FFB800',
        bgGradient: 'linear-gradient(135deg,#1a1000,#2e1c00)',
        imageUrl: '/images/popup_corporate.png',
        gridSpan: 4,
        isWide: false,
        description: 'We specialize in brand building campaigns and product launches creating a buzz around the media, consumers, buyers and business and entertainment communities. We provide marketing services to our clients re-building brands or starting from scratch Our team of professionals also execute Media campaigns to Media conferences with a high percentage of success',
        details: 'We create custom management tools to convey the clients message to the media in a way that it will portray a positive connection to the target audience. From social media management, to press kit design and press releases, the client has the opportunity to be placed in press and media as well as executing successful events',
        offerings: []
      },
      {
        order: 2,
        icon: '🏛️',
        label: 'State Scale',
        title: 'State Events',
        sub: "CHOGM 2013 · High Security summits · Formal state banquets",
        accentColor: '#00F5FF',
        bgGradient: 'linear-gradient(135deg,#001520,#001a2e)',
        imageUrl: '/images/popup_state.png',
        gridSpan: 4,
        isWide: false,
        description: 'Having first hand expertise in handling many high profile state events over the past years, we reached it’s pinnacle when we were assigned to handle The Common Wealth Heads of Business Formal Dinner of 2000 pax hosted by the president of Sri Lanka and five other major sideline events for the Commonwealth',
        details: 'Commonwealth Heads of Government meetings, which was held in Colombo, Sri Lanka during the month of November 2013.The events had to conform strictly to the guidelines given by the Commonwealth Secretariat in the United Kingdom and the Ministry of External Affairs of Sri Lanka.\n\nInfinity Events & Entertainment ™has the experience and the expertise, to handle such large scale events with excellent PR skills and knowledge in all aspects of protocol, seating plans, coordinating & meeting the requirements of VIP security & executing grand state/international events to exact precision.',
        offerings: []
      },
      {
        order: 3,
        icon: '✨',
        label: 'Elite Social',
        title: 'Social Events',
        sub: 'VIP Red Carpets · Creative Theme Extravaganzas · Private Celebrations',
        accentColor: '#9B30FF',
        bgGradient: 'linear-gradient(135deg,#0e0020,#1a003a)',
        imageUrl: '/images/popup_social.png',
        gridSpan: 4,
        isWide: false,
        description: 'Whether you want to feel as if you have stepped into a whimsical land, journeyed through Paris or just want a funky fun fiesta with our “anything is possible” attitude we can help you make it happen.',
        details: 'You dream big. We make it happen. We will work with your vision and your budget and provide you with the best of our creativity, professional expertise, outstanding organizational abilities and deep knowledge of resources and contacts.',
        offerings: [
          'Fundraisers',
          'Galas',
          'Fashion shows',
          'VIP events',
          'New release parties',
          'Red carpet arrivals',
          'Sweet 16s',
          'Cocktails',
          'Engagement celebrations',
          'Private events',
          'Bridal showers',
          'Baby showers',
          'Anniversary celebrations',
          'Quinces'
        ]
      },
      {
        order: 4,
        icon: '✈️',
        label: 'Global Scale',
        title: 'International Events',
        sub: 'Global concert production in USA, Indonesia, Maldives and beyond',
        accentColor: '#FF2D78',
        bgGradient: 'linear-gradient(135deg,#1a0010,#3d0030)',
        imageUrl: '/images/popup_international.png',
        gridSpan: 5,
        isWide: false,
        description: 'Our International Experience in handling Mega scale Productions of – A * Listed artists is Significantly Showcased in USA , Indonesia, Maldives.',
        details: 'Total Production, from Contracting artists, Publicity, Press Conferences, PR, VIP arrangements, Flying in of Total equipment requirements per International riders, Stage Productions to Coordinations are what we have Deliveredto presission.',
        offerings: [
          'Maldives Toursit Arrival Countdown and New Year’s Party 2013',
          'Maldives Tourist Arrival Countdown and New Year’s Party 2014 ( Salim with Sulaiman and Band Live in Maldives )',
          'Maldives Tourist Arrival Music Festival January 2015 ( AKON Live In Maldives )',
          'Maldives Tourist Arrival Music festival 2015 ( Priyanka Chopra Live in Maldives )'
        ]
      },
      {
        order: 5,
        icon: '👗',
        label: 'Ramp & Management',
        title: 'Fashion & Models',
        sub: 'Miss Universe SL · Mister International SL · Photoshoots',
        accentColor: '#00F5FF',
        bgGradient: 'linear-gradient(135deg,#001215,#001e22)',
        imageUrl: '/images/popup_fashion.png',
        gridSpan: 4,
        isWide: false,
        description: 'Being innovative and original is what counts in the tough world of fashion , fashion events and sourcing models for ramp, events and photoshoots. From the earliest conceptual stages to a live show we can help you deliver the right impression with impact and on budget.',
        details: '',
        offerings: []
      },
      {
        order: 6,
        icon: '⛺',
        label: 'Mega Arenas',
        title: 'Outdoor Events',
        sub: 'Festivals · Mega-scale open-air structures · Dynamic rigs',
        accentColor: '#FFB800',
        bgGradient: 'linear-gradient(135deg,#1b0d00,#2e1c00)',
        imageUrl: '/images/popup_outdoor.png',
        gridSpan: 3,
        isWide: false,
        description: 'IInfinity Events & Entertainment ™️ has vast experience in outdoor events in all types of environments.',
        details: 'From outdoorfestivals, to the most advanced LED screen constructions and large-scale building projections (video mapping). We carry a large inventory of outdoor LED screens and a large range of solutions for outdoor events of any scale.',
        offerings: []
      },
      {
        order: 7,
        icon: '🎤',
        label: 'Live Entertainment',
        title: 'Live Concerts',
        sub: 'Akon · Sean Paul · Shreya Ghoshal · Priyanka Chopra',
        accentColor: '#FF2D78',
        bgGradient: 'linear-gradient(135deg,#24001c,#3a0026)',
        imageUrl: '/images/popup_concerts.png',
        gridSpan: 4,
        isWide: false,
        description: 'Infinity Events & Entertainment ™️ is widely known for providing high intensity entertainment to its patrons. Through years of the team’s combined and diverse experiences, Infinity Events & Entertainment ™️ has developed a way of uniquely creating theatrical and awe-inspiring live productions that not only leave people breathless, but also one that allows its participating artists and patrons to leave with a story and unforgettable memories about their experience.',
        details: 'Infinity Events & Entertainment ™️ common goal is to provide its customers and artists with an environment that will allow them both to be free to enjoy an experience of a lifetime, because every stage has its platform.',
        offerings: []
      },
      {
        order: 8,
        icon: '💍',
        label: 'Bespoke Planners',
        title: 'Weddings',
        sub: 'Weddings by Carren Brown™ · Full-service concierge planning',
        accentColor: '#9B30FF',
        bgGradient: 'linear-gradient(135deg,#1a0015,#2d0020)',
        imageUrl: '/images/popup_weddings.png',
        gridSpan: 4,
        isWide: false,
        description: 'Weddings will be done by our wedding specialist Carren Brown ™ Which specialises in full-service wedding planning and design for the discerning couple who are looking for personalised concierge-style service. Every detail of your wedding will be meticulously managed by the exceptional planning capabilities, contacts and resources of the Caren Brown™* production team.',
        details: 'From flowers to the linens, to the hard-to-source antique china and sterling flatware, we only work with the best professionals in the industry, including nationally recognized photographers, musicians, entertainers, floral designers, caterers, venues, and other vendors. We’ll handle both the big picture and the smallest details so that you are free to enjoy every moment of your wedding with your guests.\n\nWhether your budget calls for a stunning, intimate ceremony with only your closest family members, or an over-the-top extravaganza for hundreds of your friends, we will make sure that every aspect is handled professionally. elegantly. sustainably and perfectly for you on your special day with a wedding planner who cares about the perfection of your day as much as you do.',
        offerings: []
      },
      {
        order: 9,
        icon: '🎭',
        label: 'Visual Artistry',
        title: 'Theatre & Arts',
        sub: 'Projection mapping · Architectural lighting · National productions',
        accentColor: '#FFB800',
        bgGradient: 'linear-gradient(90deg,#10080a,#0a1020)',
        imageUrl: '/images/popup_theatre.png',
        gridSpan: 4,
        isWide: false,
        description: 'Helping the performing arts conceive, design and deliver a new perspective is always an exciting challenge for Infinity Events and Entertainment ™️.',
        details: 'Thanks to an ongoing commitment to acquiring the newest video technologies and providing innovative technical solutions for our clients, we consider ourselves fortunate to be involved in many of this country’s leading Theatre & arts events.',
        offerings: []
      }
    ];

    // Remove any segments that have order greater than 9
    await Segment.deleteMany({ order: { $gt: 9 } });

    // Synchronize segments in database
    for (const seg of segmentsData) {
      await Segment.updateOne(
        { order: seg.order },
        { 
          $set: { 
            icon: seg.icon,
            label: seg.label,
            title: seg.title,
            sub: seg.sub,
            accentColor: seg.accentColor,
            bgGradient: seg.bgGradient,
            imageUrl: seg.imageUrl,
            gridSpan: seg.gridSpan,
            isWide: seg.isWide,
            description: seg.description, 
            details: seg.details, 
            offerings: seg.offerings 
          } 
        },
        { upsert: true }
      );
    }
    console.log('✅ Segments database synchronized (upserted 9 categories)');

    // Seed Services (Upsert/Synchronize all 29 services)
    const servicesData = [
      'Promoting Sourcing Managing International Artists Performers And Entertainers',
      'Promoting Managing And Production Of International Events',
      'Promoting And Managing Professional Models(Ramp, Photoshoots, Events)',
      'Fashion Events',
      'Drone Shows',
      'Product Launches And Roadshows',
      'Conferences',
      'Media And Press Conferences',
      'Media Campaigns',
      'Graphics And Presentations',
      'Exhibition Stand Design And Management',
      'Lighting & Effects',
      'Audio Visual Productions',
      'Professional Sound Systems',
      'Installation Of Architectural Lighting For OutDoor And Indoor Applications',
      'Installation Of Professional Sound Systems (Auditoriums, Restaurants, Cafes, Clubs, Pubs)',
      'Renting Of Specialized Lighting And Effects, Lasers.',
      'Renting Of Professional Sound Reinforcement Systems',
      'Furniture & Accessories',
      'Live Entertainment',
      'Choreography For Fashion Shows',
      'Renting Of Audio And Visual Equipment',
      'Dancers & Performers',
      'Professional Photography And Videography',
      'Animation & Graphic Designing',
      'Web Design And Publishing',
      'Installation Of Audio And Visual Equipment',
      'Staging And Technical Direction',
      'Staging, Sets & Trussing'
    ].map((name, i) => ({ order: i + 1, name, description: '' }));

    await Service.deleteMany({});
    await Service.insertMany(servicesData);
    console.log('✅ Services database synchronized (seeded 29 capabilities)');

    // Seed Highlights
    const hlCount = await Highlight.countDocuments();
    if (!hlCount) {
      await Highlight.insertMany([
        { order:1, year:'2013', tag:'State Event', name:'CHOGM 2013', description:'2,000-pax formal dinner hosted by the President of Sri Lanka. South Asia\'s Largest Indoor LED Wall Solution.', accentColor:'#FF2D78', bgGradient:'linear-gradient(135deg,#FF2D78,#9B30FF)' },
        { order:2, year:'2015', tag:'Live Concert', name:'AKON LIVE Maldives', description:'Maldives Tourist Arrival Music Festival — full production, contracting, PR, VIP, equipment and stage coordination.', accentColor:'#00F5FF', bgGradient:'linear-gradient(135deg,#00F5FF,#9B30FF)' },
        { order:3, year:'2015', tag:'Music Festival', name:'SUN FEST 2015', description:'One of Sri Lanka\'s landmark outdoor music festivals featuring international headliners and world-class production.', accentColor:'#FFB800', bgGradient:'linear-gradient(135deg,#FFB800,#FF2D78)' },
        { order:4, year:'2018', tag:'Awards Show', name:'Hiru Golden Film Awards', description:'Spectacular pyrotechnics, LED walls and choreography for Sri Lanka\'s biggest film awards ceremony.', accentColor:'#9B30FF', bgGradient:'linear-gradient(135deg,#9B30FF,#FF2D78)' },
        { order:5, year:'Ongoing', tag:'Pageant', name:'Miss Universe Sri Lanka', description:'Full production and technical direction for the nation\'s premier international pageant qualifier.', accentColor:'#FF2D78', bgGradient:'linear-gradient(135deg,#FF2D78,#FFB800)' },
        { order:6, year:'Ongoing', tag:'Corporate', name:'Fortune 500 Events', description:'Microsoft, HSBC, IBM, Cisco, Unilever, Toyota — delivering world-class brand experiences for global giants.', accentColor:'#00F5FF', bgGradient:'linear-gradient(135deg,#00F5FF,#FFB800)' },
      ]);
      console.log('✅ Highlights seeded');
    }

    // Seed Clients
    const clientCount = await Client.countDocuments();
    if (!clientCount) {
      const hotelClients = ['The Kingsbury','Hilton Hotels & Resorts','Cinnamon Hotels','Galle Face Hotel','Mount Lavinia Hotel','Amaya Resorts & Spas','Taj Hotels','Berjaya Hotel','Galadari Hotel','Eden Resort & Spa','Cinnamon Grand','Aitken Spence'].map(name => ({ name, category:'hotel' }));
      const corpClients = ['HSBC','Microsoft','Cisco','IBM','Unilever','Toyota','Nestlé','Coca-Cola','Dialog','SLT-Mobitel','SriLankan Airlines','Sri Lanka Cricket','Brandix','John Keells Group','Commercial Bank','Sampath Bank','HNB','Seylan Bank'].map(name => ({ name, category:'corporate' }));
      await Client.insertMany([...hotelClients, ...corpClients]);
      console.log('✅ Clients seeded');
    }

    // Seed Events
    const eventCount = await Event.countDocuments();
    if (!eventCount) {
      await Event.insertMany([
        {
          order: 1,
          title: "GLOBAL DJ SUMMIT & LIGHT SHOW",
          artist: "DJ Armin van Buuren & Friends",
          date: "2026-10-15",
          location: "Colombo Beach Arena, Sri Lanka",
          category: "Outdoor Festival",
          description: "An immersive outdoor electronic music experience featuring state-of-the-art 3D visual projection mapping, high-intensity laser shows, and international EDM headliners.",
          imageUrl: "/images/popup_outdoor.png",
          accentColor: "#FFB800",
          ticketUrl: "https://tickets.infinityevents.lk/dj-summit",
          isFeatured: true
        },
        {
          order: 2,
          title: "CEYLON FASHION WEEK 2026",
          artist: "Top International & Local Designers",
          date: "2026-11-20",
          location: "Shangri-La Ballroom, Colombo",
          category: "Fashion Show",
          description: "Witness the pinnacle of couture fashion in South Asia, showcasing innovative seasonal lines and professional models walking the dynamic illuminated catwalk.",
          imageUrl: "/images/popup_fashion.png",
          accentColor: "#FF2D78",
          ticketUrl: "https://tickets.infinityevents.lk/fashion-week",
          isFeatured: false
        },
        {
          order: 3,
          title: "THE ANNUAL CORPORATE INNOVATION AWARDS",
          artist: "Exclusive Gala Dinner & Network Event",
          date: "2026-12-05",
          location: "Hilton Colombo Grand Ballroom",
          category: "Corporate Gala",
          description: "A prestigious evening celebrating corporate excellence and tech innovation, featuring executive keynote speakers, fine dining, and bespoke architectural light setups.",
          imageUrl: "/images/popup_corporate.png",
          accentColor: "#00F5FF",
          ticketUrl: "",
          isFeatured: false
        }
      ]);
      console.log('✅ Events seeded');
    }
  } catch (err) {
    console.error('Seed error:', err.message);
  }
}

module.exports = seed();
