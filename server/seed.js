const Segment = require('./models/Segment');
const Service = require('./models/Service');
const Client = require('./models/Client');
const Highlight = require('./models/Highlight');
const Stats = require('./models/Stats');
const Admin = require('./models/Admin');

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
    const segCount = await Segment.countDocuments();
    if (!segCount) {
      await Segment.insertMany([
        { order:1, icon:'🎤', label:'Live Entertainment', title:'International Concerts & Festivals', sub:'Akon · Sean Paul · Shreya Ghoshal · Sun Fest 2015 · Priyanka Chopra Live', accentColor:'#FF2D78', bgGradient:'linear-gradient(135deg,#1a0010,#3d0030)', gridSpan:5, isWide:false },
        { order:2, icon:'🏛️', label:'State & Mega Scale', title:'State & Government Productions', sub:'CHOGM 2013 · South Asia\'s Largest Indoor LED Wall', accentColor:'#00F5FF', bgGradient:'linear-gradient(135deg,#001520,#001a2e)', gridSpan:4 },
        { order:3, icon:'💼', label:'Corporate', title:'Corporate & Brand Building', sub:'HSBC · Microsoft · Nestle · SriLankan Airlines · Unilever', accentColor:'#FFB800', bgGradient:'linear-gradient(135deg,#1a1000,#2e1c00)', gridSpan:3 },
        { order:4, icon:'✨', label:'Elite Private', title:'Social & Elite Private Galas', sub:'VIP Events · Fundraisers · Red Carpet Arrivals · Themed Extravaganzas', accentColor:'#9B30FF', bgGradient:'linear-gradient(135deg,#0e0020,#1a003a)', gridSpan:4 },
        { order:5, icon:'💍', label:'Weddings by Carren Brown™', title:'Luxury Weddings', sub:'Full-service concierge wedding planning for discerning couples', accentColor:'#FF2D78', bgGradient:'linear-gradient(135deg,#1a0015,#2d0020)', gridSpan:3 },
        { order:6, icon:'👗', label:'Fashion & Models', title:'Fashion Events & Model Management', sub:'Miss Universe SL · Mister International SL · Ramp & Photoshoots', accentColor:'#00F5FF', bgGradient:'linear-gradient(135deg,#001215,#001e22)', gridSpan:4 },
        { order:7, icon:'🎭', label:'Theatre & Performing Arts', title:'Theatre & Arts', sub:'Innovative video mapping · Architectural lighting · Technical direction for Sri Lanka\'s leading national cultural events', accentColor:'#FFB800', bgGradient:'linear-gradient(90deg,#10080a,#0a1020)', gridSpan:8, isWide:true },
      ]);
      console.log('✅ Segments seeded');
    }

    // Seed Services
    const svcCount = await Service.countDocuments();
    if (!svcCount) {
      await Service.insertMany([
        { order:1, name:'International Artist Management', description:'Sourcing, booking, promoting and managing A-list international artists, entertainers and performers. Full rider compliance, VIP arrangements, and press conference management.' },
        { order:2, name:'Next-Gen Tech: Drone Shows & Video Mapping', description:'Spectacular drone light shows, large-scale building projections and video mapping. South Asia\'s largest indoor LED wall solutions. Cutting-edge architectural lighting for indoor and outdoor applications.' },
        { order:3, name:'Pro AV & Sound Solutions', description:'Professional sound system installation for auditoriums, clubs, pubs, restaurants and cafes. Renting specialized lighting, effects and lasers. Complete audio-visual productions and technical direction.' },
        { order:4, name:'Staging, Sets & Infrastructure', description:'Complete staging and technical direction, sets and trussing, exhibition stand design and management, furniture and accessories for any scale event.' },
        { order:5, name:'Media Campaigns & PR', description:'Full media campaigns, press kit design, social media management, press releases, animation & graphic design, professional photography & videography. We build the buzz around your brand.' },
        { order:6, name:'Model Management & Fashion Choreography', description:'Professional model sourcing for ramp, photoshoots and events. Complete conceptual live show production, choreography for fashion shows, and dancers & performers sourcing.' },
      ]);
      console.log('✅ Services seeded');
    }

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
  } catch (err) {
    console.error('Seed error:', err.message);
  }
}

module.exports = seed();
