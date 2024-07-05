import { ILibraryNovelList } from "./types/library"
import { INovel } from "./types/novel"
import { IReview } from "./types/review"

export const genres = [
    'Action',
    'Adventure',
    'Comedy',
    'Drama',
    'Fantasy',
    'Harem',
    'Historical',
    'Horror',
    'Josei',
    'Martial Arts',
    'Mecha',
    'Mystery',
    'Psychological',
    'Romance',
    'School Life',
    'Sci-fi',
    'Seinen',
    'Shoujo',
    'Shounen',
    'Slice of Life',
    'Smut',
    'Sports',
    'Supernatural',
    'Tragedy',
    'Wuxia',
    'Xianxia',
    'Xuanhuan',
]

export const tags = [
    'Abandoned Children',
    'Ability Steal',
    'Absent Parents',
    'Abusive Characters',
    'Academy',
    'Accelerated Growth',
    'Acting',
    'Adapted from Manga',
    'Adapted from Manhua',
    'Adapted to Anime',
    'Adapted to Drama',
    'Adapted to Drama CD',
    'Adapted to Game',
    'Adapted to Manga',
    'Adapted to Manhua',
    'Adapted to Manhwa',
    'Adapted to Movie',
    'Adapted to Visual Novel',
    'Adopted Children',
    'Adopted Protagonist',
    'Adventurers',
    'Age Progression',
    'Age Regression',
    'Aggressive Characters',
    'Alchemy',
    'Aliens',
    'All-Girls School',
    'Alternate World',
    'Amnesia',
    'Amusement Park',
    'Anal',
    'Ancient China',
    'Ancient Times',
    'Androgynous Characters',
    'Androids',
    'Angels',
    'Animal Characteristics',
    'Animal Rearing',
    'Anti-Magic',
    'Anti-social Protagonist',
    'Antihero Protagonist',
    'Antique Shop',
    'Apartment Life',
    'Apathetic Protagonist',
    'Apocalypse',
    'Appearance Changes',
    'Appearance Different from Actual Age',
    'Archery',
    'Aristocracy',
    'Arms Dealers',
    'Army',
    'Army Building',
    'Arranged Marriage',
    'Arrogant Characters',
    'Artifact Crafting',
    'Artifacts',
    'Artificial Intelligence',
    'Artists',
    'Assassins',
    'Astrologers',
    'Autism',
    'Automatons',
    'Average-looking Protagonist',
    'Award-winning Work',
    'Awkward Protagonist',
    'Bands',
    'Based on a Movie',
    'Based on a Song',
    'Based on a TV Show',
    'Based on a Video Game',
    'Based on a Visual Novel',
    'Based on an Anime',
    'Battle Academy',
    'Battle Competition',
    'BDSM',
    'Beast Companions',
    'Beastkin',
    'Beasts',
    'Beautiful Female Lead',
    'Bestiality',
    'Betrayal',
    'Bickering Couple',
    'Biochip',
    'Bisexual Protagonist',
    'Black Belly',
    'Blackmail',
    'Blacksmith',
    'Blind Dates',
    'Blind Protagonist',
    'Blood Manipulation',
    'Bloodlines',
    'Body Swap',
    'Body Tempering',
    'Body-double',
    'Bodyguards',
    'Books',
    'Bookworm',
    'Boss-Subordinate Relationship',
    'Brainwashing',
    'Breast Fetish',
    'Broken Engagement',
    'Brother Complex',
    'Brotherhood',
    'Buddhism',
    'Bullying',
    'Business Management',
    'Businessmen',
    'Butlers',
    'Calm Protagonist',
    'Cannibalism',
    'Card Games',
    'Carefree Protagonist',
    'Caring Protagonist',
    'Cautious Protagonist',
    'Celebrities',
    'Character Growth',
    'Charismatic Protagonist',
    'Charming Protagonist',
    'Chat Rooms',
    'Cheats',
    'Chefs',
    'Child Abuse',
    'Child Protagonist',
    'Childcare',
    'Childhood Friends',
    'Childhood Love',
    'Childhood Promise',
    'Childish Protagonist',
    'Chuunibyou',
    'Clan Building',
    'Classic',
    'Clever Protagonist',
    'Clingy Lover',
    'Clones',
    'Clubs',
    'Clumsy Love Interests',
    'Co-Workers',
    'Cohabitation',
    'Cold Love Interests',
    'Cold Protagonist',
    'Collection of Short Stories',
    'College/University',
    'Coma',
    'Comedic Undertone',
    'Coming of Age',
    'Complex Family Relationships',
    'Conditional Power',
    'Confident Protagonist',
    'Confinement',
    'Conflicting Loyalties',
    'Contracts',
    'Cooking',
    'Corruption',
    'Cosmic Wars',
    'Cosplay',
    'Couple Growth',
    'Court Official',
    'Cousins',
    'Cowardly Protagonist',
    'Crafting',
    'Crime',
    'Criminals',
    'Cross-dressing',
    'Crossover',
    'Cruel Characters',
    'Cryostasis',
    'Cultivation',
    'Cunnilingus',
    'Cunning Protagonist',
    'Curious Protagonist',
    'Curses',
    'Cute Children',
    'Cute Protagonist',
    'Cute Story',
    'Dancers',
    'Dao Companion',
    'Dao Comprehension',
    'Daoism',
    'Dark',
    'Dead Protagonist',
    'Death',
    'Death of Loved Ones',
    'Debts',
    'Delinquents',
    'Delusions',
    'Demi-Humans',
    'Demon Lord',
    'Demonic Cultivation Technique',
    'Demons',
    'Dense Protagonist',
    'Depictions of Cruelty',
    'Depression',
    'Destiny',
    'Detectives',
    'Determined Protagonist',
    'Devoted Love Interests',
    'Different Social Status',
    'Disabilities',
    'Discrimination',
    'Disfigurement',
    'Dishonest Protagonist',
    'Distrustful Protagonist',
    'Divination',
    'Divine Protection',
    'Divorce',
    'Doctors',
    'Dolls/Puppets',
    'Domestic Affairs',
    'Doting Love Interests',
    'Doting Older Siblings',
    'Doting Parents',
    'Dragon Riders',
    'Dragon Slayers',
    'Dragons',
    'Dreams',
    'Drugs',
    'Druids',
    'Dungeon Master',
    'Dungeons',
    'Dwarfs',
    'Dystopia',
    'e-Sports',
    'Early Romance',
    'Earth Invasion',
    'Easy Going Life',
    'Economics',
    'Editors',
    'Eidetic Memory',
    'Elderly Protagonist',
    'Elemental Magic',
    'Elves',
    'Emotionally Weak Protagonist',
    'Empires',
    'Enemies Become Allies',
    'Enemies Become Lovers',
    'Engagement',
    'Engineer',
    'Enlightenment',
    'Episodic',
    'Eunuch',
    'European Ambience',
    'Evil Gods',
    'Evil Organizations',
    'Evil Protagonist',
    'Evil Religions',
    'Evolution',
    'Exorcism',
    'Eye Powers',
    'Fairies',
    'Fallen Angels',
    'Fallen Nobility',
    'Familial Love',
    'Familiars',
    'Family',
    'Family Business',
    'Family Conflict',
    'Famous Parents',
    'Famous Protagonist',
    'Fanaticism',
    'Fanfiction',
    'Fantasy Creatures',
    'Fantasy World',
    'Farming',
    'Fast Cultivation',
    'Fast Learner',
    'Fat Protagonist',
    'Fat to Fit',
    'Fated Lovers',
    'Fearless Protagonist',
    'Fellatio',
    'Female Master',
    'Female Protagonist',
    'Female to Male',
    'Feng Shui',
    'Firearms',
    'First Love',
    'First-time Intercourse',
    'Flashbacks',
    'Fleet Battles',
    'Folklore',
    'Forced into a Relationship',
    'Forced Living Arrangements',
    'Forced Marriage',
    'Forgetful Protagonist',
    'Former Hero',
    'Found Family',
    'Fox Spirits',
    'Friends Become Enemies',
    'Friendship',
    'Fujoshi',
    'Futanari',
    'Futuristic Setting',
    'Galge',
    'Gambling',
    'Game Elements',
    'Game Ranking System',
    'Gamers',
    'Gangs',
    'Gate to Another World',
    'Genderless Protagonist',
    'Generals',
    'Genetic Modifications',
    'Genies',
    'Genius Protagonist',
    'Ghosts',
    'Gladiators',
    'Glasses-wearing Love Interests',
    'Glasses-wearing Protagonist',
    'Goblins',
    'God Protagonist',
    'God-human Relationship',
    'Goddesses',
    'Godly Powers',
    'Gods',
    'Golems',
    'Gore',
    'Grave Keepers',
    'Grinding',
    'Guardian Relationship',
    'Guideverse',
    'Guilds',
    'Gunfighters',
    'Hackers',
    'Half-human Protagonist',
    'Handjob',
    'Handsome Male Lead',
    'Hard-Working Protagonist',
    'Harem-seeking Protagonist',
    'Harsh Training',
    'Hated Protagonist',
    'Healers',
    'Heartwarming',
    'Heaven',
    'Heavenly Tribulation',
    'Hell',
    'Helpful Protagonist',
    'Herbalist',
    'Heroes',
    'Heterochromia',
    'Hidden Abilities',
    'Hiding True Abilities',
    'Hiding True Identity',
    'Hikikomori',
    'Homunculus',
    'Honest Protagonist',
    'Hospital',
    'Hot-blooded Protagonist',
    'Human Experimentation',
    'Human Weapon',
    'Human-Nonhuman Relationship',
    'Humanoid Protagonist',
    'Hunters',
    'Hypnotism',
    'Identity Crisis',
    'Imaginary Friend',
    'Immortals',
    'Imperial Harem',
    'Incest',
    'Incubus',
    'Indecisive Protagonist',
    'Industrialization',
    'Inferiority Complex',
    'Inheritance',
    'Inscriptions',
    'Insects',
    'Interconnected Storylines',
    'Interdimensional Travel',
    'Introverted Protagonist',
    'Investigations',
    'Invisibility',
    'Jack of All Trades',
    'Jealousy',
    'Jiangshi',
    'Jobless Class',
    'JSDF',
    'Kidnappings',
    'Kind Love Interests',
    'Kingdom Building',
    'Kingdoms',
    'Knights',
    'Kuudere',
    'Lack of Common Sense',
    'Language Barrier',
    'Late Romance',
    'Lawyers',
    'Lazy Protagonist',
    'Leadership',
    'Legends',
    'Level System',
    'Library',
    'Limited Lifespan',
    'Livestreaming',
    'Living Abroad',
    'Living Alone',
    'Loli',
    'Loneliness',
    'Loner Protagonist',
    'Long Separations',
    'Long-distance Relationship',
    'Lost Civilizations',
    'Lottery',
    'Love at First Sight',
    'Love Interest Falls in Love First',
    'Love Rivals',
    'Love Triangles',
    'Lovers Reunited',
    'Low-key Protagonist',
    'Loyal Subordinates',
    'Lucky Protagonist',
    'Magic',
    'Magic Beasts',
    'Magic Formations',
    'Magical Girls',
    'Magical Space',
    'Magical Technology',
    'Maids',
    'Male Protagonist',
    'Male to Female',
    'Male Yandere',
    'Management',
    'Mangaka',
    'Manipulative Characters',
    'Manly Gay Couple',
    'Marriage',
    'Marriage of Convenience',
    'Martial Spirits',
    'Masochistic Characters',
    'Master-Disciple Relationship',
    'Master-Servant Relationship',
    'Masturbation',
    'Matriarchy',
    'Mature Protagonist',
    'Medical Knowledge',
    'Medieval',
    'Mercenaries',
    'Merchants',
    'Military',
    'Mind Break',
    'Mind Control',
    'Misandry',
    'Mismatched Couple',
    'Mistaken Identity',
    'Misunderstandings',
    'MMORPG',
    'Mob Protagonist',
    'Models',
    'Modern Day',
    'Modern Knowledge',
    'Money Grubber',
    'Monster Girls',
    'Monster Society',
    'Monster Tamer',
    'Monsters',
    'Movies',
    'Mpreg',
    'Multiple Identities',
    'Multiple Personalities',
    'Multiple POV',
    'Multiple Protagonists',
    'Multiple Realms',
    'Multiple Reincarnated Individuals',
    'Multiple Timelines',
    'Multiple Transported Individuals',
    'Murders',
    'Music',
    'Mutated Creatures',
    'Mutations',
    'Mute Character',
    'Mysterious Family Background',
    'Mysterious Illness',
    'Mysterious Past',
    'Mystery Solving',
    'Mythical Beasts',
    'Mythology',
    'Naive Protagonist',
    'Narcissistic Protagonist',
    'Nationalism',
    'Near-Death Experience',
    'Necromancer',
    'Neet',
    'Netorare',
    'Netorase',
    'Netori',
    'Nightmares',
    'Ninjas',
    'Nobles',
    'Non-humanoid Protagonist',
    'Non-linear Storytelling',
    'Nudity',
    'Nurses',
    'Obsessive Love',
    'Office Romance',
    'Older Love Interests',
    'Omegaverse',
    'Oneshot',
    'Online Romance',
    'Onmyouji',
    'Orcs',
    'Organized Crime',
    'Orgy',
    'Orphans',
    'Otaku',
    'Otome Game',
    'Outcasts',
    'Outdoor Intercourse',
    'Outer Space',
    'Overpowered Protagonist',
    'Overprotective Siblings',
    'Pacifist Protagonist',
    'Paizuri',
    'Parallel Worlds',
    'Parasites',
    'Parent Complex',
    'Parody',
    'Part-Time Job',
    'Past Plays a Big Role',
    'Past Trauma',
    'Persistent Love Interests',
    'Personality Changes',
    'Perverted Protagonist',
    'Pets',
    'Pharmacist',
    'Philosophical',
    'Phobias',
    'Phoenixes',
    'Photography',
    'Pill Based Cultivation',
    'Pill Concocting',
    'Pilots',
    'Pirates',
    'Playboys',
    'Playful Protagonist',
    'Poetry',
    'Poisons',
    'Police',
    'Polite Protagonist',
    'Politics',
    'Polyandry',
    'Polygamy',
    'Poor Protagonist',
    'Poor to Rich',
    'Popular Love Interests',
    'Possession',
    'Possessive Characters',
    'Post-apocalyptic',
    'Power Couple',
    'Power Struggle',
    'Pragmatic Protagonist',
    'Precognition',
    'Pregnancy',
    'Pretend Lovers',
    'Previous Life Talent',
    'Priestesses',
    'Priests',
    'Prison',
    'Proactive Protagonist',
    'Programmer',
    'Prophecies',
    'Prostitutes',
    'Protagonist Falls in Love First',
    'Protagonist Strong from the Start',
    'Protagonist with Multiple Bodies',
    'Psychic Powers',
    'Psychopaths',
    'Puppeteers',
    'Quiet Characters',
    'Quirky Characters',
    'R-15',
    'R-18',
    'Race Change',
    'Racism',
    'Rape',
    'Rape Victim Becomes Lover',
    'Rebellion',
    'Reincarnated as a Monster',
    'Reincarnated as an Object',
    'Reincarnated in a Game World',
    'Reincarnated in Another World',
    'Reincarnation',
    'Religions',
    'Reluctant Protagonist',
    'Reporters',
    'Restaurant',
    'Resurrection',
    'Returning from Another World',
    'Revenge',
    'Reverse Harem',
    'Reverse Rape',
    'Reversible Couple',
    'Rich to Poor',
    'Righteous Protagonist',
    'Rivalry',
    'Romantic Subplot',
    'Roommates',
    'Royalty',
    'Ruthless Protagonist',
    'Sadistic Characters',
    'Saints',
    'Salaryman',
    'Samurai',
    'Saving the World',
    'Schemes And Conspiracies',
    'Schizophrenia',
    'Scientists',
    'Sculptors',
    'Sealed Power',
    'Second Chance',
    'Secret Crush',
    'Secret Identity',
    'Secret Organizations',
    'Secret Relationship',
    'Secretive Protagonist',
    'Secrets',
    'Sect Development',
    'Seduction',
    'Seeing Things Other Humans Cant',
    'Selfish Protagonist',
    'Selfless Protagonist',
    'Seme Protagonist',
    'Senpai-Kouhai Relationship',
    'Sentient Objects',
    'Sentimental Protagonist',
    'Serial Killers',
    'Servants',
    'Seven Deadly Sins',
    'Seven Virtues',
    'Sex Friends',
    'Sex Slaves',
    'Sexual Abuse',
    'Sexual Cultivation Technique',
    'Shameless Protagonist',
    'Shapeshifters',
    'Sharing A Body',
    'Sharp-tongued Characters',
    'Shield User',
    'Shikigami',
    'Short Story',
    'Shota',
    'Shoujo-Ai Subplot',
    'Shounen-Ai Subplot',
    'Showbiz',
    'Shy Characters',
    'Sibling Rivalry',
    'Sibling Care',
    'Siblings',
    'Siblings Not Related by Blood',
    'Sickly Characters',
    'Sign Language',
    'Singers',
    'Single Parent',
    'Sister Complex',
    'Skill Assimilation',
    'Skill Books',
    'Skill Creation',
    'Slave Harem',
    'Slave Protagonist',
    'Slaves',
    'Sleeping',
    'Slow Growth at Start',
    'Slow Romance',
    'Smart Couple',
    'Social Outcasts',
    'Soldiers',
    'Soul Power',
    'Souls',
    'Spatial Manipulation',
    'Spear Wielder',
    'Special Abilities',
    'Spies',
    'Spirit Advisor',
    'Spirit Users',
    'Spirits',
    'Stalkers',
    'Stockholm Syndrome',
    'Stoic Characters',
    'Store Owner',
    'Straight Seme',
    'Straight Uke',
    'Strategic Battles',
    'Strategist',
    'Strength-based Social Hierarchy',
    'Strong Love Interests',
    'Strong to Stronger',
    'Stubborn Protagonist',
    'Student Council',
    'Student-Teacher Relationship',
    'Succubus',
    'Sudden Strength Gain',
    'Sudden Wealth',
    'Suicides',
    'Summoned Hero',
    'Summoning Magic',
    'Survival',
    'Survival Game',
    'Sword And Magic',
    'Sword Wielder',
    'System Administrator',
    'Teachers',
    'Teamwork',
    'Technological Gap',
    'Tentacles',
    'Terminal Illness',
    'Terrorists',
    'Thieves',
    'Threesome',
    'Thriller',
    'Time Loop',
    'Time Manipulation',
    'Time Paradox',
    'Time Skip',
    'Time Travel',
    'Timid Protagonist',
    'Tomboyish Female Lead',
    'Torture',
    'Toys',
    'Tragic Past',
    'Transformation Ability',
    'Transmigration',
    'Transplanted Memories',
    'Transported into a Game World',
    'Transported Modern Structure',
    'Transported to Another World',
    'Trap',
    'Tribal Society',
    'Trickster',
    'Tsundere',
    'Twins',
    'Twisted Personality',
    'Ugly Protagonist',
    'Ugly to Beautiful',
    'Unconditional Love',
    'Underestimated Protagonist',
    'Unique Cultivation Technique',
    'Unique Weapon User',
    'Unique Weapons',
    'Unlimited Flow',
    'Unlucky Protagonist',
    'Unreliable Narrator',
    'Unrequited Love',
    'Valkyries',
    'Vampires',
    'Villainess Noble Girls',
    'Virtual Reality',
    'Vocaloid',
    'Voice Actors',
    'Voyeurism',
    'Waiters',
    'War Records',
    'Wars',
    'Weak Protagonist',
    'Weak to Strong',
    'Wealthy Characters',
    'Werebeasts',
    'Wishes',
    'Witches',
    'Wizards',
    'World Hopping',
    'World Travel',
    'World Tree',
    'Writers',
    'Yandere',
    'Youkai',
    'Younger Brothers',
    'Younger Love Interests',
    'Younger Sisters',
    'Zombies'
]

export const novels: INovel[] = [
    {
        id: "1",
        title: "Wired (Buchanan-Renard)",
        genres: ["Romance"],
        author: "Julie Garwood",
        authorId: "11",
        tags: ["Detectives"],
        image: "https://allnovel.net/images/wired-buchanan-renard-13.jpg",
        chapters: 110,
        rating: 4.0,
        ratingCount: 1,
        status: "Completed",
        views: 1921611,
        description: "A beautiful computer hacker and a bad-boy FBI agent must collaborate—in more ways than one—in the sizzling new novel from #1 New York Times bestselling author Julie Garwood. Allison Trent doesn’t look like a hacker. In fact, when she’s not in college working on her degree, she models on the side. But behind her gorgeous face is a brilliant mind for computers and her real love is writing—and hacking—code. Her dream is to write a new security program that could revolutionize the tech industry. Hotshot FBI agent Liam Scott has a problem: a leak deep within his own department. He needs the skills of a top-notch hacker to work on a highly sensitive project: to secretly break into the FBI servers and find out who the traitor is. But he can’t use one of his own. He finds the perfect candidate in Allison. Only, there’s one problem—she wants nothing to do with his job and turns him down flat. What Liam doesn’t know is that Allison is hiding secrets that she doesn’t want the FBI to uncover. But Liam will do nearly anything to persuade her to join his team, even break a few rules if that’s what it takes. A temptation that could put his job—and both of their futures—on the line… and longing for more . . .",
        updatedDate: "2021-09-02",
        createdDate: "2021-09-02"
    },
    {
        id: "2",
        title: "The Sign of the Four",
        genres: ["Mystery"],
        author: "Arthur Conan Doyle",
        authorId: "2",
        tags: ["Detectives"],
        image: "https://www.gutenberg.org/cache/epub/2097/pg2097.cover.medium.jpg",
        chapters: 1,
        rating: 4.9,
        ratingCount: 2,
        status: "Completed",
        views: 200456,
        description: "",
        updatedDate: "2000-05-01",
        createdDate: "2000-05-01"
    },
    {
        id: "3",
        title: "Minute Mysteries",
        genres: ["Mystery"],
        author: "H. A. Ripley",
        authorId: "3",
        tags: ["Detectives"],
        image: "https://www.gutenberg.org/cache/epub/50603/pg50603.cover.medium.jpg",
        chapters: 1,
        rating: 4.9,
        ratingCount: 2,
        status: "Completed",
        views: 10,
        description: "",
        updatedDate: "2015-12-04",
        createdDate: "2015-12-04"
    },
    {
        id: "4",
        title: "The Man in the Brown Suit",
        genres: ["Drama"],
        author: "Agatha Christiey",
        authorId: "4",
        tags: ["Detectives"],
        image: "https://www.gutenberg.org/cache/epub/61168/pg61168.cover.medium.jpg",
        chapters: 1,
        rating: 3,
        ratingCount: 2,
        status: "Completed",
        views: 105,
        description: "",
        updatedDate: "2023-05-31",
        createdDate: "2020-01-14"
    },
    {
        id: "5",
        title: "The house without a key",
        genres: ["Slice of Life"],
        author: "Earl Derr Biggers",
        authorId: "5",
        tags: ["Detectives"],
        image: "https://www.gutenberg.org/cache/epub/73771/pg73771.cover.medium.jpg",
        chapters: 1,
        rating: 3,
        ratingCount: 2,
        status: "Completed",
        views: 105,
        description: "",
        updatedDate: "2024-06-04",
        createdDate: "2024-06-04"
    },
    {
        id: "6",
        title: "The Brooklyn murders",
        genres: ["Mystery"],
        author: "G. D. H. Cole",
        authorId: "6",
        tags: ["Detectives"],
        image: "https://www.gutenberg.org/cache/epub/73716/pg73716.cover.medium.jpg",
        chapters: 1,
        rating: 3,
        ratingCount: 2,
        status: "Completed",
        views: 105,
        description: "",
        updatedDate: "2024-05-28",
        createdDate: "2024-05-28"
    },
]

export const library: ILibraryNovelList[] = [
    {
        id: "1",
        title: "Fantasy Collection",
        isPublic: true,
        novels: [
            {
                id: "101",
                title: "The Dragon's Roar",
                genres: ["Fantasy", "Adventure"],
                author: "Jane Doe",
                authorId: "auth_001",
                tags: ["Dragon", "Magic", "Quest"],
                image: "https://example.com/images/dragons_roar.jpg",
                chapters: 50,
                rating: 4.5,
                ratingCount: 120,
                status: "Ongoing",
                views: 2000,
                description: "A thrilling journey of a young hero who teams up with a dragon to save the kingdom.",
                updatedDate: "2024-06-24",
                createdDate: "2023-06-24"
            },
            {
                id: "102",
                title: "Elven Forest",
                genres: ["Fantasy", "Mystery"],
                author: "John Smith",
                authorId: "auth_002",
                tags: ["Elf", "Forest", "Magic"],
                image: "https://example.com/images/elven_forest.jpg",
                chapters: 30,
                rating: 4.2,
                ratingCount: 95,
                status: "Completed",
                views: 1500,
                description: "Unveil the mysteries of the enchanted forest with an elf as your guide.",
                updatedDate: "2024-01-15",
                createdDate: "2022-12-01"
            }
        ]
    },
    {
        id: "2",
        title: "Science Fiction Picks",
        isPublic: false,
        novels: [
            {
                id: "201",
                title: "Mars Odyssey",
                genres: ["Science Fiction", "Adventure"],
                author: "Alice Green",
                authorId: "auth_003",
                tags: ["Mars", "Space", "Exploration"],
                image: "https://example.com/images/mars_odyssey.jpg",
                chapters: 45,
                rating: 4.8,
                ratingCount: 150,
                status: "Ongoing",
                views: 3000,
                description: "Join the first human expedition to Mars in an epic adventure.",
                updatedDate: "2024-05-20",
                createdDate: "2023-03-15"
            },
            {
                id: "202",
                title: "The Quantum Realm",
                genres: ["Science Fiction", "Thriller"],
                author: "Bob Brown",
                authorId: "auth_004",
                tags: ["Quantum", "Science", "Parallel Worlds"],
                image: "https://example.com/images/quantum_realm.jpg",
                chapters: 35,
                rating: 4.6,
                ratingCount: 110,
                status: "Completed",
                views: 2200,
                description: "Explore the mind-bending possibilities of quantum mechanics.",
                updatedDate: "2024-02-28",
                createdDate: "2022-10-10"
            }
        ]
    },
    {
        id: "3",
        title: "Historical Fiction Favorites",
        isPublic: true,
        novels: [
            {
                id: "301",
                title: "The Medieval Knight",
                genres: ["Historical Fiction", "Drama"],
                author: "Charlie King",
                authorId: "auth_005",
                tags: ["Knight", "Medieval", "History"],
                image: "https://example.com/images/medieval_knight.jpg",
                chapters: 20,
                rating: 4.3,
                ratingCount: 70,
                status: "Ongoing",
                views: 1000,
                description: "Follow the journey of a knight during the medieval era.",
                updatedDate: "2024-04-10",
                createdDate: "2023-05-05"
            },
            {
                id: "302",
                title: "Roman Conquests",
                genres: ["Historical Fiction", "War"],
                author: "Diana Prince",
                authorId: "auth_006",
                tags: ["Rome", "Conquest", "History"],
                image: "https://example.com/images/roman_conquests.jpg",
                chapters: 25,
                rating: 4.7,
                ratingCount: 85,
                status: "Completed",
                views: 1300,
                description: "Experience the epic battles and politics of ancient Rome.",
                updatedDate: "2024-03-18",
                createdDate: "2022-11-30"
            }
        ]
    }
]

export const reviews: IReview[] = [
    {
        id: '1',
        rating: 4,
        review: 'This novel kept me on the edge of my seat!',
        novelId: "101",
        novelTitle: 'The Great Adventure',
        userId: "1",
        userAvatar: 'https://example.com/avatar1.jpg',
        userName: 'JohnDoe',
        updateDate: '2021-09-07',
        liked: ["201", "user2"],
        createAt: '2021-09-07'
    },
    {
        id: '2',
        rating: 5,
        review: 'A must-read for everyone!',
        novelId: "102",
        novelTitle: 'Mystery in the Woods',
        userId: "202",
        userAvatar: 'https://example.com/avatar2.jpg',
        userName: 'JaneSmith',
        updateDate: '2022-09-01',
        liked: ["user1", "user3", "user4"],
        createAt: '2022-09-01'
    },
    {
        id: '3',
        rating: 3,
        review: 'Interesting plot, but the ending was predictable.',
        novelId: "103",
        novelTitle: 'Secrets of the Past',
        userId: "203",
        userAvatar: 'https://example.com/avatar3.jpg',
        userName: 'MichaelBrown',
        updateDate: '2010-09-01',
        liked: [],
        createAt: '2022-09-01'},

    {
        id: '4',
        rating: 5,
        review: 'Couldn\'t put it down!',
        novelId: "104",
        novelTitle: 'The Lost City',
        userId: "204",
        userAvatar: 'https://example.com/avatar4.jpg',
        userName: 'EmilyJohnson',
        updateDate: '2021-09-01',
        liked: ["user1", "user2"],
        createAt: '2022-09-01'
    },
]