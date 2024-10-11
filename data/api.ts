import {Movie} from '@/models/movie';

const mockMovies: Movie[] = [
    {
        id: '1',
        title: 'Inception',
        posterUrl: 'https://picsum.photos/230/130',
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O. However, his tragic past may doom the project and his team to disaster.\n\nAs the team delves deeper into the dream world, they must navigate layers of subconscious and face unforeseen challenges that test their skills and resolve.'
    },
    {
        id: '2',
        title: 'The Dark Knight',
        posterUrl: 'https://picsum.photos/230/200',
        description: 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.\n\nWith the help of allies, Batman must confront the Joker\'s devious plans and save Gotham from descending into anarchy.'
    },
    {
        id: '3',
        title: 'Interstellar',
        posterUrl: 'https://picsum.photos/230/130',
        description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival. As they venture into the unknown, they must confront the limits of human endurance and the vastness of space.\n\nThe mission challenges their understanding of time, space, and love, pushing them to make sacrifices for the greater good.'
    },
    {
        id: '4',
        title: 'Dunkirk',
        posterUrl: 'https://picsum.photos/230/130',
        description: 'Allied soldiers from Belgium, the British Empire, and France are surrounded by the German Army and evacuated during a fierce battle in World War II. The film portrays the harrowing experiences of soldiers, pilots, and civilians involved in the evacuation.\n\nThrough land, sea, and air, the story captures the tension, bravery, and resilience of those who fought to survive and save others.'
    },
    {
        id: '5',
        title: 'Tenet',
        posterUrl: 'https://picsum.photos/230/130',
        description: 'Armed with only one word, Tenet, and fighting for the survival of the world, a protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.\n\nAs he navigates the complexities of time inversion, he must uncover the truth and prevent a catastrophic event.'
    },
    {
        id: '6',
        title: 'Memento',
        posterUrl: 'https://picsum.photos/230/130',
        description: 'A man with short-term memory loss attempts to track down his wife\'s murderer. Using notes and tattoos to remember important information, he pieces together clues to solve the mystery.\n\nThe non-linear narrative structure challenges the audience to piece together the story alongside the protagonist.'
    },
    {
        id: '7',
        title: 'The Prestige',
        posterUrl: 'https://picsum.photos/230/130',
        description: 'After a tragic accident, two stage magicians engage in a bitter rivalry to create the ultimate illusion while sacrificing everything they have to outwit each other. Their obsession leads to a series of dangerous and deceitful acts.\n\nThe film explores themes of ambition, sacrifice, and the blurred line between reality and illusion.'
    },
    {
        id: '8',
        title: 'Batman Begins',
        posterUrl: 'https://picsum.photos/230/130',
        description: 'After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption. He must confront his own fears and the dark forces that threaten the city.\n\nThe origin story delves into Bruce Wayne\'s transformation into the Dark Knight and his quest for justice.'
    },
    {
        id: '9',
        title: 'Insomnia',
        posterUrl: 'https://picsum.photos/230/130',
        description: 'Two Los Angeles homicide detectives are dispatched to a northern town where the sun doesn\'t set to investigate the methodical murder of a local teen. The constant daylight and personal demons challenge their ability to solve the case.\n\nThe psychological thriller explores themes of guilt, morality, and the effects of sleep deprivation.'
    },
    {
        id: '10',
        title: 'Following',
        posterUrl: 'https://picsum.photos/230/130',
        description: 'A young writer who follows strangers for material meets a thief who takes him under his wing. As he becomes more involved in the thief\'s world, he finds himself drawn into a web of deception and crime.\n\nThe film explores themes of identity, obsession, and the consequences of curiosity.'
    },
    {
        id: '11',
        title: 'The Matrix',
        posterUrl: 'https://picsum.photos/230/130',
        description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers. He must choose between the illusion of the Matrix and the harsh reality of the real world.\n\nThe groundbreaking sci-fi film explores themes of reality, freedom, and the power of choice.'
    },
    {
        id: '12',
        title: 'The Matrix Reloaded',
        posterUrl: 'https://picsum.photos/230/130',
        description: 'Neo and the rebel leaders estimate that they have 72 hours until 250,000 probes discover Zion and destroy it. During this time, Neo must decide how he can save Trinity from a dark fate in his dreams.\n\nThe sequel delves deeper into the Matrix universe, exploring themes of destiny, control, and the nature of existence.'
    },
    {
        id: '13',
        title: 'The Matrix Revolutions',
        posterUrl: 'https://picsum.photos/230/130',
        description: 'The human city of Zion defends itself against the massive invasion of the machines as Neo fights to end the war at another front while also opposing the rogue Agent Smith.\n\nThe final installment of the trilogy brings the epic conflict to a climax, exploring themes of sacrifice, hope, and the struggle for freedom.'
    },
    {
        id: '14',
        title: 'John Wick',
        posterUrl: 'https://picsum.photos/230/130',
        description: 'An ex-hitman comes out of retirement to track down the gangsters that killed his dog and took everything from him. His quest for vengeance leads him back into the dangerous underworld he left behind.\n\nThe action-packed film explores themes of revenge, loyalty, and the consequences of a violent past.'
    },
    {
        id: '15',
        title: 'John Wick: Chapter 2',
        posterUrl: 'https://picsum.photos/230/130',
        description: 'After returning to the criminal underworld to repay a debt, John Wick discovers that a large bounty has been put on his life. He must navigate a world of assassins and betrayal to survive.\n\nThe sequel expands the universe of John Wick, exploring themes of honor, loyalty, and the relentless pursuit of vengeance.'
    },
    {
        id: '16',
        title: 'John Wick: Chapter 3',
        posterUrl: 'https://picsum.photos/230/130',
        description: 'John Wick is on the run after killing a member of the international assassins\' guild, and with a \$14 million price tag on his head, he is the target of hit men and women everywhere.\n\nThe third installment continues the high-octane action, exploring themes of survival, trust, and the consequences of breaking the rules.'
    },
    {
        id: '17',
        title: 'Speed',
        posterUrl: 'https://picsum.photos/230/130',
        description: 'A young police officer must prevent a bomb exploding aboard a city bus by keeping its speed above 50 mph. The high-stakes situation tests his skills and courage.\n\nThe action-thriller explores themes of heroism, quick thinking, and the relentless pursuit of justice.'
    },
    {
        id: '18',
        title: 'Constantine',
        posterUrl: 'https://picsum.photos/230/130',
        description: 'Supernatural detective John Constantine helps a policewoman prove her sister\'s death was not a suicide, but something more. His journey takes him into the world of angels and demons.\n\nThe film explores themes of redemption, faith, and the battle between good and evil.'
    },
];

export async function fetchMovies(): Promise<Movie[]> {
    // This can later be replaced with a real API call
    return mockMovies;
}

export async function fetchMovieById(id: string): Promise<Movie | undefined> {
    // This can later be replaced with a real API call to fetch movie by ID
    return mockMovies.find(movie => movie.id === id);
}