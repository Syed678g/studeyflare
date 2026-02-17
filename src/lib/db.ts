import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src/data/users.json');

export interface UserData {
    id: string; // e.g., email or unique ID
    email: string;
    name: string;
    plan: 'free' | 'premium';
    stripeCustomerId?: string;
    subscriptionId?: string;
    planEndDate?: string; // ISO Date string
    usage: {
        date: string;
        questionsCount: number;
    };
}

// Ensure DB file exists
function ensureDb() {
    if (!fs.existsSync(DB_PATH)) {
        const dir = path.dirname(DB_PATH);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(DB_PATH, JSON.stringify({}));
    }
}

export function getUser(email: string): UserData | null {
    ensureDb();
    const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    return data[email] || null;
}

export function createUser(user: UserData): UserData {
    ensureDb();
    const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    // If user exists, return existing (or update? for now just return)
    if (data[user.email]) {
        return data[user.email];
    }
    data[user.email] = user;
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    return user;
}

export function updateUser(email: string, updates: Partial<UserData>): UserData | null {
    ensureDb();
    const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    if (!data[email]) return null;

    data[email] = { ...data[email], ...updates };
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    return data[email];
}

export function getUserByStripeCustomerId(customerId: string): UserData | null {
    ensureDb();
    const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    const users = Object.values(data) as UserData[];
    return users.find(u => u.stripeCustomerId === customerId) || null;
}
