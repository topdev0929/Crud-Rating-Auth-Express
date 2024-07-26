import { usersModel } from "../Models/Auth.model.js";
import { contentModel } from "../Models/Content.model.js";
import { rateModel } from "../Models/Rate.model.js";
import bcrypt from "bcrypt";


const users = [
    { name: 'Alice Smith', email: 'alice@example.com', password: '' },
    { name: 'Bob Johnson', email: 'bob@example.com', password: '' },
    { name: 'Carol Davis', email: 'carol@example.com', password: '' },
    { name: 'Dave Wilson', email: 'dave@example.com', password: '' },
    { name: 'Emma Brown', email: 'emma@example.com', password: '' },
    { name: 'Frank Moore', email: 'frank@example.com', password: '' },
    { name: 'Grace Lee', email: 'grace@example.com', password: '' },
    { name: 'Henry Clark', email: 'henry@example.com', password: '' },
    { name: 'Ivy Walker', email: 'ivy@example.com', password: '' },
    { name: 'Jack Adams', email: 'jack@example.com', password: '' }
];

const contents = [
    { title: 'Ultimate Gaming Guide', description: 'A comprehensive guide to gaming.', category: 'game', thumbnail_url: '/images/gaming-guide-thumbnail.jpg', content_url: '/content/gaming-guide.mp4', created_at: '2024-07-20T10:00:00' },
    { title: 'Top 10 Video Games 2024', description: 'List of top games for this year.', category: 'game', thumbnail_url: '/images/top-games-thumbnail.jpg', content_url: '/content/top-games.mp4', created_at: '2024-07-21T11:00:00' },
    { title: 'How to Paint Like Van Gogh', description: 'Painting tutorial by expert.', category: 'artwork', thumbnail_url: '/images/van-gogh-thumbnail.jpg', content_url: '/content/van-gogh.mp4', created_at: '2024-07-22T12:00:00' },
    { title: 'Best Classical Music', description: 'A collection of classical pieces.', category: 'music', thumbnail_url: '/images/classical-music-thumbnail.jpg', content_url: '/content/classical-music.mp3', created_at: '2024-07-23T13:00:00' },
    { title: 'The Art of Video Editing', description: 'Video editing tips and tricks.', category: 'video', thumbnail_url: '/images/video-editing-thumbnail.jpg', content_url: '/content/video-editing.mp4', created_at: '2024-07-24T14:00:00' },
    { title: 'Epic Game Soundtracks', description: 'Soundtracks from top games.', category: 'music', thumbnail_url: '/images/game-soundtracks-thumbnail.jpg', content_url: '/content/game-soundtracks.mp3', created_at: '2024-07-25T15:00:00' },
    { title: 'Creating Stunning Art', description: 'Guide to creating digital art.', category: 'artwork', thumbnail_url: '/images/digital-art-thumbnail.jpg', content_url: '/content/digital-art.mp4', created_at: '2024-07-26T16:00:00' },
    { title: 'Exploring VR Worlds', description: 'Overview of popular VR games.', category: 'game', thumbnail_url: '/images/vr-worlds-thumbnail.jpg', content_url: '/content/vr-worlds.mp4', created_at: '2024-07-27T17:00:00' },
    { title: 'Behind the Scenes: Music Production', description: 'Inside music production studios.', category: 'music', thumbnail_url: '/images/music-production-thumbnail.jpg', content_url: '/content/music-production.mp4', created_at: '2024-07-28T18:00:00' },
    { title: 'Mastering Photography', description: 'Photography tips and techniques.', category: 'artwork', thumbnail_url: '/images/photography-thumbnail.jpg', content_url: '/content/photography.mp4', created_at: '2024-07-29T19:00:00' },
    { title: 'The Future of Gaming', description: 'Innovations in gaming technology.', category: 'game', thumbnail_url: '/images/future-gaming-thumbnail.jpg', content_url: '/content/future-gaming.mp4', created_at: '2024-07-30T20:00:00' },
    { title: 'Analyzing Game Mechanics', description: 'Breakdown of game mechanics.', category: 'game', thumbnail_url: '/images/game-mechanics-thumbnail.jpg', content_url: '/content/game-mechanics.mp4', created_at: '2024-07-31T21:00:00' },
    { title: 'Tips for Effective Video Tutorials', description: 'How to create engaging video tutorials.', category: 'video', thumbnail_url: '/images/video-tutorials-thumbnail.jpg', content_url: '/content/video-tutorials.mp4', created_at: '2024-08-01T22:00:00' },
    { title: 'Understanding Music Genres', description: 'Overview of different music genres.', category: 'music', thumbnail_url: '/images/music-genres-thumbnail.jpg', content_url: '/content/music-genres.mp3', created_at: '2024-08-02T23:00:00' },
    { title: 'How to Create Stunning Artworks', description: 'Techniques for creating digital artworks.', category: 'artwork', thumbnail_url: '/images/artworks-thumbnail.jpg', content_url: '/content/artworks.mp4', created_at: '2024-08-03T09:00:00' },
    { title: 'The Ultimate Guide to Video Production', description: 'Everything you need to know about video production.', category: 'video', thumbnail_url: '/images/video-production-thumbnail.jpg', content_url: '/content/video-production.mp4', created_at: '2024-08-04T10:00:00' },
    { title: 'Gaming Hardware Reviews', description: 'Reviews of the latest gaming hardware.', category: 'game', thumbnail_url: '/images/gaming-hardware-thumbnail.jpg', content_url: '/content/gaming-hardware.mp4', created_at: '2024-08-05T11:00:00' },
    { title: 'Exploring Different Art Styles', description: 'Guide to various art styles.', category: 'artwork', thumbnail_url: '/images/art-styles-thumbnail.jpg', content_url: '/content/art-styles.mp4', created_at: '2024-08-06T12:00:00' },
    { title: 'The Evolution of Music Technology', description: 'How music technology has evolved over time.', category: 'music', thumbnail_url: '/images/music-tech-thumbnail.jpg', content_url: '/content/music-tech.mp3', created_at: '2024-08-07T13:00:00' },
    { title: 'Essential Video Editing Tools', description: 'Tools you need for video editing.', category: 'video', thumbnail_url: '/images/editing-tools-thumbnail.jpg', content_url: '/content/editing-tools.mp4', created_at: '2024-08-08T14:00:00' }
];

const generateUniqueRandomRates = (userIds, contentIds) => {
    const rates = [];
    const numRates = 10; 
    const usedCombinations = new Set();

    while (rates.length < numRates) {
        const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
        const randomContentId = contentIds[Math.floor(Math.random() * contentIds.length)];
        const combination = `${randomUserId}-${randomContentId}`;

        if (!usedCombinations.has(combination)) {
            usedCombinations.add(combination);
            const randomRate = Math.floor(Math.random() * 5) + 1; // Random rating between 1 and 5

            rates.push({
                userId: randomUserId,
                contentId: randomContentId,
                rating: randomRate
            });
        }
    }

    return rates;
};

export const seedDatabase = async() =>{
    const hash = await bcrypt.hash('password', 5);
    users.map(user => user.password = hash)

    await usersModel.deleteMany({});
    const insertedUsers = await usersModel.insertMany(users);

    await contentModel.deleteMany({});
    const insertedContents = await contentModel.insertMany(contents);

    const userIds = insertedUsers.map(user => user._id);
    const contentIds = insertedContents.map(content => content._id);

    const rates = generateUniqueRandomRates(userIds, contentIds);

    await rateModel.deleteMany({});
    await rateModel.insertMany(rates);
}
  







